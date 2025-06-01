import React from 'react'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'
import { prisma } from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { columns } from './constants'
import Pagination from '../components/pagination'

interface Props {
  searchParams: Promise<
    {
      status?: Status,
      orderBy?:keyof Issue,
      page?: number
     }>
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams promise
  const awaitedSearchParams = await searchParams;
  const pageNumber = parseInt(awaitedSearchParams.page?.toString() ?? '1');
  // Fix the orderBy logic with proper type checking
  // Only allow valid Issue keys for orderBy
  const validOrderByKeys: (keyof Issue)[] = columns.map(column => column.value);
  
  const pageSize = 10;
  const orderBy = awaitedSearchParams.orderBy && 
                  validOrderByKeys.includes(awaitedSearchParams.orderBy as keyof Issue)
    ? { [awaitedSearchParams.orderBy]: 'asc' as const }
    : { createdAt: 'asc' as const };


  let status = awaitedSearchParams.status ? awaitedSearchParams.status : undefined;
  if (status !== undefined && !Object.values(Status).includes(status)) {
    status = undefined;
  }

  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy,
    skip: (pageNumber-1)* pageSize,
    take:  pageSize



  });


const issueCount = await prisma.issue.count({where:{status}})

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} />
      <Pagination pageSize={pageSize} currentPage={pageNumber} itemCount={issueCount}/>
    </div>
  )
}

export default IssuesPage
