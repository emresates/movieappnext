import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newUsername: username, newEmail: email } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { username, email });
  return NextResponse.json({ message: "User Updated!" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
