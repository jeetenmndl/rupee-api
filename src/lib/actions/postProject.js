"use server"

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';



const postProject = async (formData)=>{

  const user =  await currentUser();
  const clerkID = user.id;
  const uuidKey = await uuidv4();

    let details = {
        name:formData.name,
        websiteUrl:formData.websiteUrl,
        description:formData.description,
        userID:clerkID,
        apiKey: uuidKey,
    }

    console.log("in post project function",details)
  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
  try{
    const check = await fetch(`${process.env.DOMAIN}/api/projects/${clerkID}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }},  { cache: 'no-store',})
      
    const checkResponse = await check.json();

    

    if(checkResponse.data.length==0 || !checkResponse.data.some(e => e.name === formData.name)){
      const query = await fetch(`${process.env.DOMAIN}/api/projects`, settings)
      const response = await query.json()

      revalidatePath("/projects");

      return {posted:true, data:response}
    }
      else{
        return {posted:false, message:"Project already exists"}
    }

  }
  catch(error){
    return {posted:false, message:"Some error occured"+error}

  }
  }

  export default postProject;