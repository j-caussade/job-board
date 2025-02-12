import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const user = await prisma.user.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(user);
}
