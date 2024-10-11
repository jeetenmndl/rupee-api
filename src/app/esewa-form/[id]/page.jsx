import EsewaForm from '@/components/sections/EsewaForm';
import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit';
// import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import getOneTransaction from '@/lib/actions/getOneTransaction'
import React from 'react'

const page = async ({params}) => {

    const transaction = await getOneTransaction(params.id);
    console.log("page.jsx transaction fetched")

    // esewaFormSubmit();

  return (
    <main>

    <div>{params.id}</div>
    {/* <EsewaForm data={transaction.data} /> */}
    
    </main>
  )
}

export default page