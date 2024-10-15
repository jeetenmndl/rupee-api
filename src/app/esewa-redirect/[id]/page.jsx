import EsewaForm from '@/components/sections/EsewaForm';
import esewaFormAlternate from '@/lib/actions/esewa/esewaFormAlternate';
import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit';
// import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import getOneTransaction from '@/lib/actions/getOneTransaction'
import React from 'react'

const page = async ({params}) => {

  return (
    <main>

    <div>{params.id}</div>
    <EsewaForm data={params.id} />
    
    </main>
  )
}

export default page