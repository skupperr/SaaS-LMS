'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";


export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    if(!author) return;
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');

    return data[0];
}

// export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
//     const supabase = createSupabaseClient();

//     let query = supabase.from('companions').select();

//     if(subject && topic) {
//         query = query.ilike('subject', `%${subject}%`)
//             .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
//     } else if(subject) {
//         query = query.ilike('subject', `%${subject}%`)
//     } else if(topic) {
//         query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
//     }

//     query = query.range((page - 1) * limit, page * limit - 1);

//     const { data: companions, error } = await query;

//     if(error) throw new Error(error.message);

//     return companions;
// }

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc(
    "get_companions_with_bookmarks",
    {
      auth_user_id: userId,
      limit_count: limit,
      page_num: page,
      subject_filter: subject,
      topic_filter: topic,
    }
  );

  if (error) throw new Error(error.message);
  return data;
};


// export const getCompanion = async (id: string) => {
//     const supabase = createSupabaseClient();

//     const { data, error } = await supabase
//     .from('companions').select().eq('id', id);

//     if(error) throw new Error(error.message);
//     return data[0]
// }

export const getCompanion = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc(
    "get_companion_with_bookmarks",
    {
      auth_user_id: userId,
      companion_id: id
    }
  );

  if (error) throw new Error(error.message);
  return data[0];
};


export const addToSessionHistory = async (companionId: string) => {
    const {userId} = await auth();
    if(!userId) return;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
    .insert({companion_id: companionId, user_id: userId})

    if(error) throw new Error(error.message);

    return data;
}


export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}


export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

// export const getUserCompanions = async (userId: string) => {
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase
//         .from('companions')
//         .select()
//         .eq('author', userId)
//         .order('created_at', { ascending: false })

//     if(error) throw new Error(error.message);

//     return data;
// }

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc(
    "get_user_companions_with_bookmarks",
    { auth_user_id: userId }
  );

  if (error) throw new Error(error.message);
  return data;
};



export const isBookmarked = async (companionId: string) => {
  const { userId } = await auth();
  if (!userId) return false;

  const supabase = createSupabaseClient();

  const { data } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("companion_id", companionId)
    .maybeSingle();

  return !!data;
};



export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: userId,
      companion_id: companionId,
    });

  if (error && error.code !== "23505") throw new Error(error.message); 
  // 23505 = unique constraint (already bookmarked)

  revalidatePath(path);
};


export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("companion_id", companionId);

  if (error) throw new Error(error.message);

  revalidatePath(path);
};


// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  
  const { data, error } = await supabase
  .rpc("get_bookmarked_companions", {auth_user_id: userId})

  if (error) throw new Error(error.message);
  return data;
};


export const newCompanionPermissions = async () => {
    const {userId, has} = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if(has({plan: 'pro'})){
        console.log('pro');
        return true;
    } else if(has({feature: '3_active_companions'})){
        console.log('3');
        limit = 3;
    } else if(has({feature: '10_active_companions'})){
        console.log('10');
        limit = 10;
    } 

    const {data, error} = await supabase
    .from('companions').select('id', {count: 'exact'}).eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit){
        return false;
    } else{
        return true;
    }
}