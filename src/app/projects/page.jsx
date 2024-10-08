import ProjectCard from '@/components/parts/ProjectCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import getMyProjects from '@/lib/actions/getMyProjects'
import { CirclePlus, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async () => {

 const user = await getMyProjects();
//  console.log(projects1.data[0].userProjects)

  return (
    <main className='py-20'>
        {/* heading */}
        <section className='flex items-center justify-between px-24'>
        <div className='flex items-baseline gap-4'>
            <h1 className='text-3xl font-bold'>{user.data[0].firstName}&apos;s Projects</h1>
            <span className='text-sm text-gray-700'>{user.data.length} projects</span>
        </div>
        <div>
        <Link href="/projects/create-project">
            <Button className="bg-main hover:bg-purple-700">Add New &nbsp; <Plus size={20} /></Button>
        </Link>
        </div>
        </section>

        {/* projects  */}
        <section className='px-24 pt-6'>

            {
                user.data[0].userProjects.length == 0?
                <Card className="grid place-items-center py-24">
                    <p className='text-4xl font-bold text-gray-500'> You have no projects to show!!!</p>
                    <Link href="/projects/create-project"><Button className="mt-8 bg-main hover:bg-purple-700">Create new project &nbsp; <Plus size={20} /></Button></Link>
                </Card>
                :
                <Card className="grid gap-8 grid-cols-3 p-8 rounded-2xl">
                    {
                        user.data[0].userProjects.map((item)=>{
                            return(
                                <ProjectCard project={item} key={item._id} />
                            )
                        })
                    }
                </Card>
                
                  
            }
            


        </section>

    </main>
  )
}

export default page