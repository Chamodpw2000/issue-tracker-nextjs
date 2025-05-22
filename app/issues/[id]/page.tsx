import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'


interface Props {
    params: {id: string}
}

const IssueDetailsPage = async ({params}:Props) => {
    const issue = await prisma.issue.findUnique({ where : {id : parseInt(params.id)}})
  
  if(!issue) notFound()


  
  
    return (
    <div>


        <h1 className='text-2xl font-bold'>{issue.title}</h1>
        <p className='text-sm text-gray-500'>{new Date(issue.createdAt).toDateString()}</p>

        <div className="mt-5">

        <IssueStatusBadge status={issue.status}/>

        </div>

        <div className='mt-5 border-2 rounded-2xl p-5'>
<div className='prose'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>

</div>

        </div>
      



    


        




    </div>
  )
}

export default IssueDetailsPage