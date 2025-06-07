import { authOptions } from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../ValidationSchemas";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    try {
        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description
            }
        });
        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.json(
            { error: "Failed to create issue" }, 
            { status: 500 }
        );
    }
}
//

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log("issues are", issues);
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return NextResponse.json(
            { error: "Failed to fetch issues" }, 
            { status: 500 }
        );
    }
}
