import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { name, surname, password, username, email } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 8);
  await connectMongoDB();
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return NextResponse.json({ message: `User Created` }, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}
