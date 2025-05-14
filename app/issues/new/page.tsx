'use client'

import { Button, TextField } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

const NewIssuePage = () => {


  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Enter the title of the issue" />
      <SimpleMDE placeholder="Enter the description of the issue" />
      <Button>Submit</Button>
    </div>
  )
}

export default NewIssuePage
