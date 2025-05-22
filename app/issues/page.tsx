import React  from 'react'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'
import { prisma } from '@/prisma/client'



const IssuesPage = async () => {

const issues =await prisma.issue.findMany()




  return (
    <div>

      <IssueActions/> 



  

<IssueTable issues={issues}/>

      

    </div>
  )
}

export default IssuesPage