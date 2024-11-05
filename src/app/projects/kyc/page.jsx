import KycForm from '@/components/sections/KycForm'
import KycFormSection from '@/components/sections/KycFormSection'
import React from 'react'

const page = () => {
  return (
    <main className='py-20 my-4'>

    {/* heading  */}
    <section className="px-24 flex justify-center">
       <h1 className='text-3xl font-bold lg:w-1/2'>KYC Form</h1>
    </section>

    <section className='px-24 pt-12 flex justify-center'>
      {/* <KycForm /> */}
      <KycFormSection />
    </section>

    </main>
  )
}

export default page