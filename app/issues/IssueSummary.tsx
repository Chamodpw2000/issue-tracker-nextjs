import { Status } from '@prisma/client';
import { Card } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'


interface Props {
    open: number,
    inProgress: number,
    closed: number
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {

    const containers : { label: string, count: number, status:Status }[] = [
        { label: 'Open', count: open, status: 'OPEN' },
        { label: 'In Progress', count: inProgress, status: 'IN_PROGRESS' },
        { label: 'Closed', count: closed, status: 'CLOSED' }
    ];

  return (
    <div className='flex gap-4 my-4 '>
      {containers.map((container) => (
        <Card>
        <div key={container.label} className='p-4 rounded '>
          <Link href={`/issues?status=${container.status}`} className='text-lg '>{container.label}</Link>
          <p className='text-2xl'>{container.count}</p>
        </div>

        </Card>
      ))}
    </div>
  )
}

export default IssueSummary