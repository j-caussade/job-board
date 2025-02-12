import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const country = await prisma.country.create({ data: body });
  return NextResponse.json(country);
}
