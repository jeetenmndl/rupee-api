"use server"

import { revalidatePath } from "next/cache";



const revalidateFunction = async (path)=>{

    revalidatePath(path);
    
  }

  export default revalidateFunction;