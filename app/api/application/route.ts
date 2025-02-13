import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const applications = await prisma.application.findMany();
  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();
  const application = await prisma.application.create({ data: body });
  return NextResponse.json(application);
}
