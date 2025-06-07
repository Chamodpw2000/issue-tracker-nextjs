import IssueForm from '@/app/issues/_components/IssueForm';
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

const EditIssue = async ({ params }: Props) => {
    const { id } = await params;
    
    const issue = await prisma.issue.findUnique({ 
        where: { id: parseInt(id) } 
    });
    
    if (!issue) notFound();
    
    return (
        <IssueForm issue={issue} />
    );
}

export default EditIssue;
