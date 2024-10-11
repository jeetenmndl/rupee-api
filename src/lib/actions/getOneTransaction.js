"use server"


const getOneTransaction = async (id)=>{
  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/transactions/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }},  { cache: 'no-store',})
      
    const result = await response.json()

   
    return {success:true, data:result.data}

  }
  catch(error){
    return {success:false, data:"Some error occured"}

  }
  }

  export default getOneTransaction;