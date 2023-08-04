import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

//* Get Product
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ id: id });
  return NextResponse.json({ product }, { status: 200 });
}
