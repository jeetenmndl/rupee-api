// import KycForm from '@/components/sections/KycForm'
import KycFormSection from '@/components/sections/KycFormSection'
import KYCInfoPage from '@/components/sections/KycInfo';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {

  const user =  await currentUser();
  const userID = user.id;

  const result = await fetch(`${process.env.DOMAIN}/api/kyc/getUserKyc`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: userID})
  });

const response = await result.json();
// console.log(response);

const userInfo = await currentUser();


  return (
    <main className='py-20 '>
    {

      response.data?
      <KYCInfoPage data={response.data} image={userInfo.imageUrl} />
      :
        <section className='px-24 pt-8 flex justify-center'>
          {/* <KycForm /> */}
          <KycFormSection />
        </section>
    }

    </main>
  )
}

export default page