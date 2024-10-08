"use server"

import { currentUser } from "@clerk/nextjs/server";


const getTransactions = async (projectID)=>{

    const user =  await currentUser();
    const userID = user.id;
    console.log(userID)

  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/transactions/${projectID}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }},  { cache: 'no-store',})
      
    const result = await response.json()

   
    return {success:true, data:result.data}

  }
  catch(error){
    return {success:false, data:"Some error occured"+error}

  }
  }

  export default getTransactions;