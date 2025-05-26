import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteIssueButton from '../_components/DeleteIssueButton'
import EditIssueButton from '../_components/EditIssueButton'
import IssueDetails from '../_components/IssueDetails'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/auth/authOptions'


interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {

  const session = await getServerSession(authOptions);
  
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) notFound()






  return (
    <Grid columns={{ initial: "1", md: '5' }} gap="5" >

      <Box className='lg:col-span-4'>

        <IssueDetails issue={issue} />


      </Box>



      { session && <Flex direction="column" gap="5"  align={"center"} justify="center" >

        <EditIssueButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id} />

      </Flex>


  }








    </Grid>
  )
}

export default IssueDetailsPage