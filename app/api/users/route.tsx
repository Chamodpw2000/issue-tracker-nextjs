import { prisma } from "@/prisma/client";
import {  NextResponse } from "next/server";

export async function GET(){
    try {
          const users = await prisma.user.findMany({orderBy: { name: 'asc' }});
    return NextResponse.json(users, { status: 200 });  
    } catch (error) {
        console.log(error);
        
        
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
        
    }

}