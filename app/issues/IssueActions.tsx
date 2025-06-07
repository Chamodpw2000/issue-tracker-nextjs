'use client'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React, { Suspense } from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (

  


      <div className='mb-5 flex justify-between '>
        <Suspense fallback={<div>Loading...</div>}>
        <IssueStatusFilter/>

</Suspense>
        <Button><Link href='/issues/new'>New Issue   </Link></Button>


      </div>

  )  
}

export default IssueActions