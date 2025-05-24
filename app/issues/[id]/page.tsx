import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import EditIssueButton from '../_components/EditIssueButton'
import DeleteIssueButton from '../_components/DeleteIssueButton'
import IssueDetails from '../_components/IssueDetails'
import { Box, Flex, Grid } from '@radix-ui/themes'


interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) notFound()






  return (
    <Grid columns={{ initial: "1", md: '5' }} gap="5" >

      <Box className='lg:col-span-4'>

        <IssueDetails issue={issue} />


      </Box>



      <Flex direction="column" gap="5"  align={"center"} justify="center" >

        <EditIssueButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id} />

      </Flex>











    </Grid>
  )
}

export default IssueDetailsPage