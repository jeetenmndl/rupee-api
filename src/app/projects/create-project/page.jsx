import CreateProjectForm from '@/components/sections/CreateProjectForm'
import { auth, currentUser } from '@clerk/nextjs/server'

const page = async () => {
  const user =  await currentUser();
  // console.log(user.id);
  return (
    <main className='py-20 '>

    {/* heading  */}
    <section className="px-24 flex justify-center">
       <h1 className='text-3xl font-bold w-1/2'>Create Project</h1>
    </section>

    <section className='px-24 pt-12 flex justify-center'>
      <CreateProjectForm />
    </section>

    </main>
  )
}

export default page