'use client'
import { Card } from '@radix-ui/themes'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}
const IssueChart = ({ open, inProgress, closed }: Props ) => {
const data = [
    { name: 'Open', count: open },
    { name: 'In Progress', count: inProgress },
    { name: 'Closed', count: closed }
  ];
  return (

    <div>

<Card>
  <ResponsiveContainer width="100%" height={300}>

    <BarChart data={data}>

<XAxis dataKey="name" />
<YAxis dataKey="count" />
<Bar dataKey="count"  barSize={60} style={{fill: 'var(--accent-9)'}} />

    </BarChart>


    
  </ResponsiveContainer>

</Card>

    </div>
  )
}

export default IssueChart