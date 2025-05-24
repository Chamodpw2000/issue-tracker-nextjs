import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props{
    issue : Issue
}

const IssueDetails = ({issue}:Props) => {
  return (
    <div >


            <div className=' w-full'>
        <h1 className='text-2xl font-bold'>{issue.title}</h1>
        <p className='text-sm text-gray-500'>{new Date(issue.createdAt).toDateString()}</p>

        <div className="mt-5">

          <IssueStatusBadge status={issue.status} />

        </div>

        <div className='mt-5 border-2 rounded-2xl p-5 w-full'>
          <div className='prose w-full '>
            <ReactMarkdown>{issue.description}</ReactMarkdown>

          </div>

        </div>




      </div>

    </div>
  )
}

export default IssueDetails