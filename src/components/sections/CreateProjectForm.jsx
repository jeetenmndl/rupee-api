"use client"

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import postProject from '@/lib/actions/postProject'
import { useToast } from '@/hooks/use-toast'
  


const formSchema = z.object({
    name: z.string().min(3, {
      message : "Minimum 3 letters.",
    }).regex(/^\S+$/, { message: "Word must not contain spaces" }),
    websiteUrl: z.string().optional(),
    description: z.string().min(10, {
        message : "Minimum 10 letters.",
    }),
    
    
  })

const CreateProjectForm = () => {

    const router = useRouter()
    const {toast}= useToast();
    const [loading, setLoading] = useState(false);


    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            websiteUrl:"",
            description:"",
    },
    })


    // 2. Define a submit handler.
    async function onSubmit(values) {
        console.log("values are:", values);
        try {
            setLoading(true);

            const response = await postProject(values);

            console.log("in create project page", response);
            if(response.posted==true){
                toast({
                    title: "Congratulations !",
                    description: "Project created sucessfully.",
                })
                router.push("/projects");
                
            }
            else{
                toast({
                    title: "Oops !",
                    description: response.message,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Oops !",
                description: "Some error occured."+error,
                variant: "destructive",
            })
            
        }finally{
            setLoading(false);
        }
    }

  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="pb-8 w-1/2">
 
    
        <div className="space-y-4">
            {/* name */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Project Name</FormLabel>
                <FormControl>
                   <Input autoFocus className="placeholder:text-gray-400 font-light" placeholder="Mero-ecommerce " {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* description  */}
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Description</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us more"
                  className="resize-none placeholder:text-gray-400 font-light"
                  {...field}
                />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

            {/* websiteUrl */}
            <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Website URL</FormLabel>
                <FormControl>
                   <Input className="placeholder:text-gray-400 font-light" placeholder="https://www.rupeeapi.com" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-gray-400">
                    (optional for development mode) Enter the URL of your website if it is in production.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
           
        </div>

             
        {/* submit button */}
        <div className='mt-8'>
            {
                !loading
                ?
                <div className='w-full space-y-3'>
                <Button type="submit" className="w-full bg-main hover:bg-purple-700">Submit</Button>
                </div>
                :
                <Button className="w-full bg-main" disabled>
                    <Loader2 className=" h-4 w-4 animate-spin" />
                </Button>
            }
        </div>
            
    </form>
    </Form>
  )
}

export default CreateProjectForm