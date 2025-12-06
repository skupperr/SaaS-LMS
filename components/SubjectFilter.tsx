"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const subject = searchParams.get("subject") || "";

    const updateFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value === "all") {
            params.delete("subject");
            router.push("/companions")
        } else {
            params.set("subject", value);
            const newUrl = params.toString() ? `?${params.toString()}` : "/companions";
            router.push(`/companions${newUrl}`, { scroll: false });
        }
        
    };

    return (
        <Select onValueChange={updateFilter} value={subject || undefined}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                        {s}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;