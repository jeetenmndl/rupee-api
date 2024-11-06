"use server"

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const postKyc = async (values, photo)=>{

    const user =  await currentUser();
    const userID = user.id;
    console.log(userID)

    const data = {
        ...values,
        idPhoto: photo,
        userID: userID
    }

  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/kyc`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    
    })
      
    const result = await response.json()

    revalidatePath("/projects/kyc")

   
    return result;

  }
  catch(error){
    return {success:false, data:"Some error occured"+error}

  }
  }

  export default postKyc;