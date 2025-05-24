import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'


interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) notFound()






  return (
    <div className='flex gap-x-5 flex-col md:flex-row gap-y-5 '>

      <div className=' w-full max-w-2xl'>
        <h1 className='text-2xl font-bold'>{issue.title}</h1>
        <p className='text-sm text-gray-500'>{new Date(issue.createdAt).toDateString()}</p>

        <div className="mt-5">

          <IssueStatusBadge status={issue.status} />

        </div>

        <div className='mt-5 border-2 rounded-2xl p-5'>
          <div className='prose'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>

          </div>

        </div>




      </div>




      <div className='p-2 w-[200px] rounded-md flex h-[50px] border-2  justify-center bg-purple-600 text-white font-bold hover:bg-purple-800 items-center'>
        <Link href={`/issues/${issue.id}/edit`}>

          <div className='flex items-baseline gap-x-3 '>

            <Pencil2Icon />  Edit Issue
          </div>

        </Link>


      </div>









    </div>
  )
}

export default IssueDetailsPage