import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const potalCode = await prisma.postalCode.findMany({
    include: {
      country: true,
    },
  });
  return NextResponse.json(potalCode);
}

export async function POST(request: Request) {
  const body = await request.json();
  const potalCode = await prisma.postalCode.create({ data: body });
  return NextResponse.json(potalCode);
}
