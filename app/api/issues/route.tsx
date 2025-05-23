import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma/client";
import { IssueSchema } from "../../ValidationSchemas";


export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400})

    }


   try {
       const newIssue = await prisma.issue.create({
           data: {
               title: body.title,
               description: body.description
           }
       });
       return NextResponse.json(newIssue, { status: 201 });
   } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
   }


}


export async function GET(request: NextRequest){

    
    try {
const issues =await  prisma.issue.findMany();
console.log("issues are", issues);

return NextResponse.json(issues,{status:200});        
    } catch (error: any) {

        return NextResponse.json({error:error.message},{status:500});


        
    }
}

