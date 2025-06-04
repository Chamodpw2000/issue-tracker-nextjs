'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { use } from 'react'

const statuses: {label: string, value?: Status}[] = [
  {label: 'All'}, 
  {label: 'Open', value: "OPEN"}, 
  {label: 'In Progress', value: "IN_PROGRESS"}, 
  {label: 'Closed', value: "CLOSED"}
]



const IssueStatusFilter = () => {
  const searchParams = useSearchParams(); 

  const router = useRouter();
  
  return (
    <div>
<Select.Root 
defaultValue={searchParams.get('status') || "ALL"}

onValueChange={(status) => {
  const params = new URLSearchParams(searchParams);
  
  if (status && status !== "ALL") {
    params.set('status', status);
    params.set('page', '1'); 
  } else {
    params.delete('status');
  }
  
  const query = params.toString();
  const url = `/issues${query ? `?${query}` : ''}`;
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
