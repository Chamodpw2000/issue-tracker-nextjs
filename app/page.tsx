import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./issues/IssueChart";
import IssueSummary from "./issues/IssueSummary";
import LatestIssue from "./issues/LatestIssue";



export default async function Home() {

const open = await prisma.issue.count({
  where: { status: 'OPEN' }
});
const inProgress = await prisma.issue.count({
  where: { status: 'IN_PROGRESS' }
});
const closed = await prisma.issue.count({
  where: { status: 'CLOSED' }
});

  return (
    <div>
{/* <LatestIssue/>
<IssueSummary open={open} inProgress={inProgress} closed={closed} />
<IssueChart open={open} inProgress={inProgress} closed={closed} /> */}


<Grid columns={{initial:"1", md:"2"}} gap="5">

  <Flex direction="column" gap="4">
    <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    <IssueChart open={open} inProgress={inProgress} closed={closed} />
  </Flex>
  <Flex>
    <LatestIssue />
  </Flex>

</Grid>


    </div>
  );
}
