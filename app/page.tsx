import { prisma } from "@/prisma/client";
import Pagination from "./components/pagination";
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
<LatestIssue/>
<IssueSummary open={open} inProgress={inProgress} closed={closed} />


    </div>
  );
}
