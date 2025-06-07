import {  PatchIssueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    // const session = await getServerSession(authOptions);
    // if(!session) return NextResponse.json({error:"Unauthorized"}, {status:401});
    
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    
    if (!validation.success) {
        console.log("Validation failed:", validation.error.format());
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    
    const issue = await prisma.issue.findUnique({ 
        where: { id: parseInt(id) } 
    });
    
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    
    if (body.assignedToUserId) {
        console.log("Assigned to user ID:", body.assignedToUserId);
        const user = await prisma.user.findUnique({ 
            where: { id: body.assignedToUserId } 
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    }
    
    try {
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(id) },
            data: {
                title: body.title,
                description: body.description,
                assignedToUserId: body.assignedToUserId
            }
        });
        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error) {
        console.error("Error updating issue:", error);
        return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const issue = await prisma.issue.findUnique({ 
        where: { id: parseInt(id) } 
    });
    
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    
    try {
        await prisma.issue.delete({ 
            where: { id: parseInt(id) } 
        });
        return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting issue:", error);
        return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    try {
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
        
        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }
        
        return NextResponse.json(issue, { status: 200 });
    } catch (error) {
        console.error("Error fetching issue:", error);
        return NextResponse.json({ error: "Failed to fetch issue" }, { status: 500 });
    }
}
