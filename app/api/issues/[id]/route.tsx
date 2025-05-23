import { IssueSchema } from "@/app/ValidationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest , {params}:{params:{id:string}}){
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if(!issue) return NextResponse.json({error:"Issue not found"},{status:404})
    try {
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        });
        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}


export async function DELETE(request: NextRequest, {params}:{params:{id:string}}){
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if(!issue) return NextResponse.json({error:"Issue not found"},{status:404})
    try {
        await prisma.issue.delete({ where: { id: parseInt(params.id) } });
        return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}