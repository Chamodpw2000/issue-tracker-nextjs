'use client'
import { Box, Button, Flex } from '@radix-ui/themes'
import React from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`} style={{ width: '100%' }}>
      <Button style={{ width: '100%' }}>
        <Flex gap="3" align="center" justify="center" style={{ width: '100%' }}>
          <Box><Pencil2Icon /></Box>
          <Box>Edit Issue</Box>
        </Flex>
      </Button>
    </Link>
  )
}

export default EditIssueButton
