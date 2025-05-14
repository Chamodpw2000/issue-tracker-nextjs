'use client'
import axios from 'axios'
import { Button, TextField } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation'

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)
interface IssueForm {
    title: string;
    description: string;
}




const NewIssuePage = () => {

   const {register , control , handleSubmit} = useForm<IssueForm>();

const router = useRouter();


  return (


    <form onSubmit={handleSubmit(async (data)=>{ await axios.post('/api/issues',data);
    router.push('/issues')
    })} className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Enter the title of the issue" {...register('title')} />
      <Controller 
      name="description"
      control={control}
      render  ={({field})=><SimpleMDE placeholder="Enter the description of the issue"  {...field}/>}
/>
      <Button>Submit</Button>
    </form>
  )
}

export default NewIssuePage
