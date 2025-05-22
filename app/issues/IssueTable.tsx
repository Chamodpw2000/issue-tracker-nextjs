'use client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import { Interface } from 'readline'
import { Status } from '@prisma/client';
import Link from 'next/link'

interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  description: String
}


const IssueTable = ({issues} : {issues:Issue[]}) => {
  return (
    <div>


        <Table.Root variant='surface'>

        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell> Issue </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>


          </Table.Row>



        </Table.Header>

        <Table.Body>

          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} className='text-blue-500 hover:underline'> {issue.title}
</Link>
                
               
                <div className=' md:hidden my-3'>

                  <IssueStatusBadge status={issue.status} />

                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{new Date(issue.createdAt).toDateString()}</Table.Cell>

            </Table.Row>
          ))}


        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssueTable