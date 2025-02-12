import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const city = await prisma.city.findUnique({
    where: { id: Number(params.id) },
    include: {
      postalCode: true,
      country: true,
    },
  });
  return NextResponse.json(city);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const city = await prisma.city.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(city);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const city = await prisma.city.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(city);
}
