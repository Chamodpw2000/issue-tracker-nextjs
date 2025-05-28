'use client'
import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Select.Root disabled><Select.Trigger placeholder='Loading...' style={{ width: '100%' }} /></Select.Root>

  if (error) return null;

  const assignUser = async (value: string) => {

        try {
          const assignedToUserId = value === 'non' ? null : value;
          await axios.patch(`/api/issues/${issue.id}`, {
            assignedToUserId
          });
        } catch (error) {

          toast.error('Failed to assign user');

        }

      }

  return (

    <div className='w-full'>




      <Select.Root defaultValue={issue.assignedToUserId || "non"} onValueChange={assignUser} >
        <Select.Trigger placeholder='Assign...' style={{ width: '100%' }} />
        <Select.Content>
          <Select.Group>

            <Select.Label>Suggestions</Select.Label>

            <Select.Item value="non" >Unassigned</Select.Item>
            {users?.map((user) => (<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}


          </Select.Group>
        </Select.Content>
      </Select.Root>

    </div>
  )
}



const useUsers = () => useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get<User[]>('/api/users');
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    retry: 3,
  });

export default AssigneeSelect
