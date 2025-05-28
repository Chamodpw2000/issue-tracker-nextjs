import { IssueSchema, PatchIssueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest , {params}:{params:{id:string}}){
        // const session = await getServerSession(authOptions);
        // if(!session) return NextResponse.json({error:"Unauthorized"}, {status:401});
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if(!validation.success){
        console.log("Validation failed:", validation.error.format());
        
        return NextResponse.json(validation.error.format(),{status:400})
    }

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if(!issue) return NextResponse.json({error:"Issue not found"},{status:404})


    if(body.assignedToUserId){
        console.log("Assigned to user ID:", body.assignedToUserId);
        
        const user = await prisma.user.findUnique({ where: { id: body.assignedToUserId } });
        if(!user) return NextResponse.json({error:"User not found"},{status:404});
    }
    try {
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description,
                assignedToUserId: body.assignedToUserId
            }
        });
        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}


export async function DELETE(request: NextRequest, {params}:{params:{id:string}}){
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({error:"Unauthorized"}, {status:401});

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if(!issue) return NextResponse.json({error:"Issue not found"},{status:404})
    try {
        await prisma.issue.delete({ where: { id: parseInt(params.id) } });
        return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}