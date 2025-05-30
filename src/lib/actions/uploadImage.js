"use server"

import { currentUser } from "@clerk/nextjs/server";


const uploadImage = async (formData)=>{

    const user =  await currentUser();
    const userID = user.id;
    console.log(userID, "in kyc post")

    // const imageFormData = new FormData();
    // imageFormData.append('file', idPhoto);
    // imageFormData.append('text', "hi");

    // console.log(imageFormData)

  
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/cloudinary`, {
      method: 'POST',
      // headers: {
          // 'Content-Type': 'application/json',
      // },
      body: formData
    
    })
      
    const result = await response.json()

   
    return result;

  }
  catch(error){
    return {success:false, data:"Some error occured"+error}

  }
  }

  export default uploadImage;