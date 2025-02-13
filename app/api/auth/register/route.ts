import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

type DecodedToken = {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export async function POST(request: Request) {
  try {
    // // Check if the user is authenticated
    // const authHeader = request.headers.get("Authorization");
    // if (!authHeader || !authHeader.startsWith("Bearer")) {
    //   return NextResponse.json({ error: "Access denied" }, { status: 401 });
    // }
    // // Extract the token
    // const token = authHeader.split(" ")[1];
    // // Verify the token
    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    // } catch (error) {
    //   return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    // }

    // decoded = decoded as DecodedToken;
    // if (decoded.role !== "admin") {
    //   console.log(decoded.role);
    //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    // }

    const { email, password, name, role, isValidated } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        isValidated,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}
