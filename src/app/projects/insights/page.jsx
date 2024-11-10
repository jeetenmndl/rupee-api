import DailyChart from '@/components/sections/DailyChart'
import React from 'react'

const page = ({params}) => {
  return (
    <main className="px-20 py-8">
      <DailyChart projectID={params.id}/>
    </main>
  )
}

export default page