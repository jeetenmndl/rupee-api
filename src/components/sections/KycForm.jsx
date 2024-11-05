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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/select'
  


const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .trim(),
  
  address: z
    .string()
    .min(1, { message: 'Address is required' }),

  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters long' })
    .trim(),

  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim(),

  idType: z
    .enum(['citizenship', 'pan'], { message: 'Invalid ID type' }),

  idNumber: z
    .string()
    .min(1, { message: 'ID Number is required' })
    .trim(),

  idPhoto: z
    .any()
    
  })

const KycForm = () => {

    const router = useRouter()
    const {toast}= useToast();
    const [loading, setLoading] = useState(false);


    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            email: "",
            idType: "",
            idNumber: "",
            idPhoto: "",
    },
    })


    // 2. Define a submit handler.
    async function onSubmit(values) {
        console.log("values are:", values);
        
        // try {
        //     setLoading(true);

        //     const response = await postProject(values);

        //     console.log("in create project page", response);
        //     if(response.posted==true){
        //         toast({
        //             title: "Congratulations !",
        //             description: "Project created sucessfully.",
        //         })
        //         router.push("/projects");
                
        //     }
        //     else{
        //         toast({
        //             title: "Oops !",
        //             description: response.message,
        //             variant: "destructive",
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        //     toast({
        //         title: "Oops !",
        //         description: "Some error occured."+error,
        //         variant: "destructive",
        //     })
            
        // }finally{
        //     setLoading(false);
        // }
    }

  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="pb-8 lg:w-1/2">
 
    
        <div className="space-y-4">
            {/* name */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Full Name</FormLabel>
                <FormControl>
                   <Input autoFocus className="placeholder:text-gray-400 font-light" placeholder="Ram Bahadur" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />
            
            {/* address  */}
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Address</FormLabel>
                <FormControl>
                <Input className="placeholder:text-gray-400 font-light" placeholder="Main Road, Biratnagar 07, Nepal" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

            {/* phone */}
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Phone</FormLabel>
                <FormControl>
                   <Input type="number" className="placeholder:text-gray-400 font-light" placeholder="98XXXXXXXX" {...field} />
                </FormControl>
                {/* <FormDescription className="text-xs text-gray-400">
                    
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

             {/* email */}
             <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Email</FormLabel>
                <FormControl>
                   <Input type="email" className="placeholder:text-gray-400 font-light" placeholder="abc@xyz.com" {...field} />
                </FormControl>
                {/* <FormDescription className="text-xs text-gray-400">
                    
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

            {/* idType */}
            <FormField
            control={form.control}
            name="idType"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>ID Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger  className="w-full" >
                    <SelectValue placeholder="Select ID Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectGroup>
                    <SelectItem value="citizenship">Citizenship</SelectItem>
                    <SelectItem value="pan">PAN</SelectItem>
                </SelectGroup>
                </SelectContent>
              </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* idNumber */}
            <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">ID Number</FormLabel>
                <FormControl>
                   <Input className="placeholder:text-gray-400 font-light" placeholder="123-456-789 " {...field} />
                </FormControl>
                {/* <FormDescription className="text-xs text-gray-400">
                    
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

             {/* idPhoto */}
             <FormField
            control={form.control}
            name="idPhoto"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">ID Photo</FormLabel>
                <FormControl>
                   <Input type="file" accept="image/*" className="placeholder:text-gray-400 font-light"  {...field} />
                </FormControl>
                {/* <FormDescription className="text-xs text-gray-400">
                    
                </FormDescription> */}
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

export default KycForm