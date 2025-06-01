import React from 'react'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'
import { prisma } from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { columns } from './constants'

interface Props {
  searchParams: Promise<
    {
      status?: Status,
      orderBy?:keyof Issue,
     }>
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams promise
  const awaitedSearchParams = await searchParams;
  
  // Fix the orderBy logic with proper type checking
  // Only allow valid Issue keys for orderBy
  const validOrderByKeys: (keyof Issue)[] = columns.map(column => column.value);
  
  
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
    orderBy
  });

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} />
    </div>
  )
}

export default IssuesPage
