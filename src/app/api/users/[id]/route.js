import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//* Edit User
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newUsername: username,
      newEmail: email,
      newName: name,
      newSurname: surname,
      newPassword: password,
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 8);
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {
      username,
      email,
      name,
      surname,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Username is exist!" },
      { status: 501 }
    );
  }
}

//* Get User
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}

//* Delete User
export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User Deleted" }, { status: 201 });
}
