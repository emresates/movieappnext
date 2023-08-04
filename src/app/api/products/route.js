import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request) {
  const { id, type, comments, votes } = await request.json();
  await connectMongoDB();
  console.log(id, type, comments, votes );
  const newProduct = new Product({
    id,
    type,
    comments,
    votes,
  });
  console.log("id:", id, "type:", type, "comments:", comments, "votes:", votes);
  try {
    await newProduct.save();
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}
