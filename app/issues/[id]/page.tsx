import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';

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
        <div>
            {/* Your existing JSX content here */}
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            {issue.assignedToUser && (
                <p>Assigned to: {issue.assignedToUser.name}</p>
            )}
        </div>
    );
}

export default IssueDetailPage;
