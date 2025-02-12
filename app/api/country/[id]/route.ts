import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const country = await prisma.country.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(country);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const country = await prisma.country.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(country);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const country = await prisma.country.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(country);
}
