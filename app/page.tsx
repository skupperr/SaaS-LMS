import CompanionCard from "@/components/companionCard"
import CompanionList from "@/components/companionLists"
import Cta from "@/components/CTA"
import { recentSessions } from "@/constants"
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"

const Page = async () => {

  const companions = await getAllCompanions({limit: 3});
  const recentSessionCompanions = await getRecentSessions(10)

  return (
    <main>
      <h1 className=''>Popular Companions</h1>

      <section className='home-section'>
        {companions.map((companion: typeof companions[number]) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
        />
        ))}
        
      </section>

      <section className="home-section">
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessionCompanions}
          classNames='w-2/3 max-lg:w-full' 
        />
        <Cta/>
      </section>
    </main>
  )
}

export default Page