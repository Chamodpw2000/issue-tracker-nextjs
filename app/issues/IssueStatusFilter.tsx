'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: {label: string, value?: Status}[] = [
  {label: 'All'}, 
  {label: 'Open', value: "OPEN"}, 
  {label: 'In Progress', value: "IN_PROGRESS"}, 
  {label: 'Closed', value: "CLOSED"}
]

const IssueStatusFilter = () => {
  const router = useRouter();
  
  return (
    <div>
      <Select.Root onValueChange={(status) => {
        console.log("Selected status:", status);
        const query = status && status !== "ALL" ? `?status=${status}` : '';
        const url = `/issues${query}`;
        console.log("Navigating to:", url);
        router.push(url);
      }}>
        <Select.Trigger placeholder='Filter Issue by Status'/>
        <Select.Content>
          {statuses.map((s) => (
            <Select.Item key={s.label} value={s.value || "ALL"}>
              {s.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default IssueStatusFilter
