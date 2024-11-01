"use server"

import { revalidatePath } from "next/cache";


const startSettlement = async (id, amount)=>{
  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/dashboard/${id}/settlement`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id, 
        amount: amount
      })
    })
      
    const result = await response.json();


    revalidatePath(`/dashboard/${id}/settlement`)
    revalidatePath(`/dashboard/${id}/transactions`)
    revalidatePath(`/dashboard/${id}`)


   
    return {success:true, message:result.message}

  }
  catch(error){
    return {success:false, message:"Some error occured"}

  }
  }

  export default startSettlement;