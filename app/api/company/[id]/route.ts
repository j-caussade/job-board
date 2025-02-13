import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const company = await prisma.company.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(company);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const company = await prisma.company.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(company);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const company = await prisma.company.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(company);
}
