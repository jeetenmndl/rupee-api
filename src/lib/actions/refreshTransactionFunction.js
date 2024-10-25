"use server"

import { revalidatePath } from "next/cache";


const refreshTransactionFunction = async (uuid, amount, path, vendor)=>{
  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/${vendor}/refresh/${uuid}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid:uuid,
        amount:amount,
      })
    });
      
    const result = await response.json()
    console.log(result);

    revalidatePath(path);

   
    return {success:true, data:result.data}

  }
  catch(error){
    return {success:false, message:"INTERNAL SERVER ERROR"+error}
  }
  }

  export default refreshTransactionFunction;