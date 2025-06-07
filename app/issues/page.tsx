import { prisma } from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import Pagination from '../components/pagination'
import { columns } from './constants'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'
import { Suspense } from 'react'

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    page?: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams promise
  const awaitedSearchParams = await searchParams;
    
  // Parse page number with proper error handling
  const pageNumber = awaitedSearchParams.page 
    ? Math.max(1, parseInt(awaitedSearchParams.page))
    : 1;

  // Fix the orderBy logic with proper type checking
  const validOrderByKeys: (keyof Issue)[] = columns.map(column => column.value);
  const pageSize = 10;
  const orderBy = awaitedSearchParams.orderBy &&
                  validOrderByKeys.includes(awaitedSearchParams.orderBy as keyof Issue)
    ? { [awaitedSearchParams.orderBy]: 'asc' as const }
    : { createdAt: 'asc' as const };

  // Validate status
  let status = awaitedSearchParams.status ? awaitedSearchParams.status : undefined;
  if (status !== undefined && !Object.values(Status).includes(status)) {
    status = undefined;
  }

  // Fetch issues with pagination
  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize
  });

  // Get total count for pagination
  const issueCount = await prisma.issue.count({ 
    where: { status }
  });

  return (
    <div>
      <Suspense fallback={<div>Loading actions...</div>}>
        <IssueActions />
      </Suspense>
      <Suspense fallback={<div>Loading table...</div>}>
        <IssueTable issues={issues} />
      </Suspense>
      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination
          pageSize={pageSize}
          currentPage={pageNumber}
          itemCount={issueCount}
        />
      </Suspense>
    </div>
  );
};

export default IssuesPage;
