'use client'
import ErrorMessage from '@/app/components/ErrorMessage'
import { IssueSchema } from '@/app/ValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import axios from 'axios'
import "easymde/dist/easymde.min.css"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'






interface Props {
  issue?: Issue
}



type IssueFormData = z.infer<typeof IssueSchema>;




const IssueForm = ({ issue }: Props) => {





  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(IssueSchema) });

  const [error, setError] = useState("");

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>

      {error && <Callout.Root color='red' className='mb-5'>

        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <form onSubmit={handleSubmit(async (data) => {





        try {

          setIsSubmitting(true);

          if (issue) {
            await axios.patch(`/api/issues/${issue.id}`, data);
          }

          else {


            await axios.post('/api/issues', data);


          }
          setIsSubmitting(false);

          router.push('/issues')
          router.refresh();
        } catch (error) { setError("An error occurred while creating the issue. Please try again "); }

      })} className='max-w-xl space-y-3'>
        <TextField.Root defaultValue={issue?.title} placeholder="Enter the title of the issue" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Enter the description of the issue"  {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {isSubmitting && <Button disabled={true}>{issue ? "Updating" : "Submitting"}{" "} <Spinner /></Button>}
        {!isSubmitting && <Button >

          {issue ? "Update Issue" : "Submit New Issue"}




        </Button>}

      </form>
    </div>


  )
}

export default IssueForm
