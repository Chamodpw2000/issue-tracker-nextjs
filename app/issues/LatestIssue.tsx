import { prisma } from '@/prisma/client'
import { Avatar, Card, Heading, Table } from '@radix-ui/themes';
import React from 'react'
import Link from '../components/Link';
import IssueStatusBadge from '../components/IssueStatusBadge';

const LatestIssue = async () => {
const issues =await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include:{assignedToUser: true}
});


  return (
    <div>
<Card>
    <Heading as='h2' size='5' className='mb-5'>Latest Issues</Heading>
        <Table.Root>
            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell >

                            <div className='flex justify-between '>

                          
                            <div className='flex flex-col gap-y-4 items-start'>
                          
                           <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                           <IssueStatusBadge status={issue.status} /> 
                                 
                            </div>
{issue.assignedToUser &&
                            <Avatar src={issue.assignedToUser.image!}
                            fallback="?"
                            radius='full' />
}
                              </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>


</Card>

    </div>
  )
}

export default LatestIssue