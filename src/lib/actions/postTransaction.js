"use server"


const postTransaction = async (details)=>{


  try{
    const response = await fetch(`${process.env.DOMAIN}/api/khalti/postTransaction`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(details)
    
    })
      
    const result = await response.json();

    
      return {posted:true, data:result.data}


  }
  catch(error){
    return {posted:false, message:"Some error occured"+error}

  }
  }

  export default postTransaction;