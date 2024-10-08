import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link';

const ProjectCard = (props) => {
    const {project} = props;

  return (
    
    <Link href={"/dashboard/"+project.name}>
    
    <Card className="cursor-pointer border-gray-300 hover:border-main">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className='flex items-center gap-2 '>
                <div className='h-3 w-3 rounded-full bg-green-600'></div>
                <h3 className='text-lg font-semibold'>{project.name}</h3>
            </div>
            <div>
                <EllipsisVertical size={18} />
            </div>
        </CardHeader>
        <CardContent>
            <span className="rounded-full px-4 py-1.5 text-xs bg-gray-200 text-gray-800 size-sm">{project.websiteUrl==""?"Development Mode":project.websiteUrl}</span>
        </CardContent>
        <CardFooter>
            <div className="flex items-center justify-between text-sm w-full px-1.5">
                <p className='text-black text-semibold'>
                    {project.createdAt==project.updatedAt?"Created at : ":"Updated at : "}
                </p>
                <p className=' text-gray-700'>{project.updatedAt.substr(0,10)} &nbsp; {project.updatedAt.substr(11,5)}</p>
            </div>
        </CardFooter>
    </Card>

    </Link>
  )
}

export default ProjectCard