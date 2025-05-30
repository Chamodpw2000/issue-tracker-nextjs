import React from 'react'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'
import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'

interface Props{
  searchParams: Promise<{ status?: Status}>
}

const IssuesPage = async ({searchParams}: Props) => {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  
  console.log("📋 IssuesPage rendered");
  console.log("📋 Full searchParams:", JSON.stringify(resolvedSearchParams));
  console.log("📋 searchParams.status:", resolvedSearchParams.status);
  console.log("📋 Type of searchParams.status:", typeof resolvedSearchParams.status);
  
  const whereClause = resolvedSearchParams.status ? { status: resolvedSearchParams.status } : {};
  console.log("📋 Where clause:", JSON.stringify(whereClause));
  
  const issues = await prisma.issue.findMany({
    where: whereClause
  });
  
  console.log("📋 Found issues:", issues.length);
  
  return (
    <div>
      <div style={{padding: '10px', background: '#f0f0f0', marginBottom: '10px'}}>
        <strong>Debug Info:</strong><br/>
        searchParams: {JSON.stringify(resolvedSearchParams)}<br/>
        status: {resolvedSearchParams.status || 'undefined'}<br/>
        issues found: {issues.length}
      </div>
      <IssueActions/>
      <IssueTable issues={issues}/>
    </div>
  )
}

export default IssuesPage
