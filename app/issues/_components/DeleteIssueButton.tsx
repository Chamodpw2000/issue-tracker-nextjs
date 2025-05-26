'use client'
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes'
import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();
    const [error, setError] = useState(false)

    const deleteIssue = async () => {
        setIsDeleting(true);


        try {
            await axios.delete(`/api/issues/${issueId}`)
                .then(() => {
                    router.push('/issues')
                })
        } catch (error) {

            setError(true)

        }

        setIsDeleting(false);


    }
    return (
        <>

            <AlertDialog.Root>

                <AlertDialog.Trigger>
                   <Button color='red' style={{ width: '100%' }} disabled={isDeleting}>
  <Flex gap="3" align="center" justify="center">
    <Box><AiFillDelete /></Box>
    <Box>Delete Issue</Box>
    {isDeleting && (
      <Box ml="1">
        <Spinner />
      </Box>
    )}
  </Flex>
</Button>



                </AlertDialog.Trigger>

                <AlertDialog.Content>

                    <AlertDialog.Title>
                        <Box className='text-red-500'>Delete Issue?</Box>
                    </AlertDialog.Title>

                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
                    <Flex direction='column' gap='3' style={{ marginTop: '1rem' }}>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray' style={{ width: '100%' }}>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action>
                            <Button color='red' style={{ width: '100%' }} onClick={deleteIssue}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>

            </AlertDialog.Root>


            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        <Box className='text-red-500'>An error occurred while deleting the issue. Please try again</Box>
                    </AlertDialog.Title>



                    <Button variant='soft' color='gray' style={{ width: '100%' }} onClick={() => setError(false)}>
                        OK !

                    </Button>


                </AlertDialog.Content>





            </AlertDialog.Root>


        </>
    )
}

export default DeleteIssueButton;