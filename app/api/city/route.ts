import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cities = await prisma.city.findMany({
    include: {
      postalCode: true,
      country: true,
    },
  });
  return NextResponse.json(cities);
}

export async function POST(request: Request) {
  const body = await request.json();
  const city = await prisma.city.create({ data: body });
  return NextResponse.json(city);
}
