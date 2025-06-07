import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueButton from '../_components/EditIssueButton';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
        include: {
            assignedToUser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    
    if (!issue) notFound();
    
    return (
        <div  className='flex justify-between items-betwen mb-5 flex-col md:flex-row'>
            {/* Your existing JSX content here */}
            <div className='mb-5'>

           
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            {issue.assignedToUser && (
                <p>Assigned to: {issue.assignedToUser.name}</p>
            )}
    
             </div>

             <div className='flex flex-col gap-y-5'>
        <EditIssueButton issueId={issue.id} />
            
            <AssigneeSelect issue={issue} />
             </div>
        </div>
    );
}

export default IssueDetailPage;
