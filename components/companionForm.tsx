"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(1, { message: 'Companion is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  topic: z.string().min(1, { message: 'Topic is required.' }),
  voice: z.string().min(1, { message: 'Voice is required.' }),
  style: z.string().min(1, { message: 'Style is required.' }),
  duration: z.number().min(1, { message: 'Duration is required.' }),
})


const CompanionForm = () => {

  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 15,
    },
  })

  // 2. Define a submit handler.
  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const companion = await createCompanion(values)

    if (companion) {
      setIsLoading(true)
      redirect(`/companions/${companion.id}`);
    } else {
      setIsLoading(false)
      console.log("Failed to create companion");
      redirect('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem value={subject} key={subject} className="capitalize">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="Eg. Derivatives and Integrals" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>
                      Male
                    </SelectItem>
                    <SelectItem value='female'>
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='formal'>
                      Formal
                    </SelectItem>
                    <SelectItem value='casual'>
                      Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  placeholder="15"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Build Your Companion
          {isLoading &&
            <Ring
              size="15"
              stroke="2"
              bgOpacity="0"
              speed="2"
              color="white"
            />
          }
        </Button>
      </form>
    </Form>
  )
}

export default CompanionForm