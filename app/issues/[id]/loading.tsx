import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@radix-ui/themes'

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>



       <h1 className='text-2xl font-bold'><Skeleton/></h1>
        <p className='text-sm text-gray-500'><Skeleton/></p>

        <div className="mt-5">

  

        </div>

        <div className='mt-5 border-2 rounded-2xl p-5'>
<div className='prose'>
        <Skeleton count={5}/>

</div>

        </div>
    </Box>
  )
}

export default LoadingIssueDetailsPage