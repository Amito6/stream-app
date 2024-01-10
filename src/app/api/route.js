import { NextResponse } from "next/server"

export const GET = (request) =>{
    return NextResponse.json({
        message : "Get Requested"
    },{status:200})
}
export const POST = (request) =>{
    return NextResponse.json({
        message : "Post Requested"
    },{status:200})
}