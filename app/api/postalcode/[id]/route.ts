import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const potalCode = await prisma.postalCode.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(potalCode);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const potalCode = await prisma.postalCode.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(potalCode);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const potalCode = await prisma.postalCode.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(potalCode);
}
