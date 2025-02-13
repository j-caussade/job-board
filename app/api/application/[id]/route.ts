import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const application = await prisma.application.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(application);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const application = await prisma.application.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(application);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const application = await prisma.application.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(application);
}
