"use server"


const getEsewaPath = async ()=>{

   const esewaData={
      path: process.env.ESEWA_TEST_API,
      productCode: process.env.ESEWA_TEST_PRODUCT_CODE
   }

   return esewaData;
  }

  export default getEsewaPath;