"use server"



const getDailyInsights = async (id)=>{
  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/dashboard/${id}/insights/dailyTransactions`, {
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

  export default getDailyInsights;