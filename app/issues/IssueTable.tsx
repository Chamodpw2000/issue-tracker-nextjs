'use client'
import { Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import IssueStatusBadge from '../components/IssueStatusBadge'
import Link from '../components/Link'
import { columns } from './constants'

interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  description: string;
}

const IssueTable = ({ issues }: { issues: Issue[] }) => {
  const searchParams = useSearchParams();

  return (
    <div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: {
                    ...Object.fromEntries(searchParams.entries()),
                    orderBy: column.value,
                    orderDirection: 'asc'
                  }
                }}>
                  {column.label}
                </NextLink>
                {searchParams.get('orderBy') === column.value && searchParams.get('orderDirection') === 'asc' ? (
                  <span className='ml-2'>↑</span>
                ) : searchParams.get('orderBy') === column.value && searchParams.get('orderDirection') === 'desc' ? (
                  <span className='ml-2'>↓</span>
                ) : null}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='md:hidden my-3'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {new Date(issue.createdAt).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default IssueTable;
