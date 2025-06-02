import { NextResponse } from "next/server";

//GET -> http://localhost:3000/api/hello
export async function GET() {
  return NextResponse.json({
    message: "Hello from the API!",
    time: new Date().toISOString(),
  });
}
