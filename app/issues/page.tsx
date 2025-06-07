// app/issues/page.tsx
import { prisma } from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import Pagination from '../components/pagination'
import { columns } from './constants'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'

interface SearchParams {
  status?: Status
  orderBy?: keyof Issue
  page?: string
}

interface Props {
  searchParams: SearchParams
}

const IssuesPage = async ({ searchParams }: Props) => {
  const pageSize = 10

  const pageNumber = parseInt(searchParams.page ?? '1', 10)

  const validOrderByKeys: (keyof Issue)[] = columns.map(column => column.value)
  const orderBy =
    searchParams.orderBy && validOrderByKeys.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' as const }
      : { createdAt: 'asc' as const }

  let status = searchParams.status
  if (status && !Object.values(Status).includes(status)) {
    status = undefined
  }

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where: { status } })

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={pageNumber}
        itemCount={issueCount}
      />
    </div>
  )
}

export default IssuesPage
