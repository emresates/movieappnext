import Comment from "@/models/Comment";
import Product from "@/models/Product";
import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { text, productID, user, type } = await request.json();
  await connectMongoDB();
  const newComment = new Comment({
    text,
    productID,
    user,
  });
  console.log(newComment);
  try {
    await newComment.save();

    //* Find Product
    const isProductExist = await Product.findOne({ id: productID });
    if (isProductExist) {
      isProductExist.comments.push(newComment);
      console.log("Comment pushed to existed product");
      await isProductExist.save();
    } else {
      const newProduct = new Product({
        id: productID,
        type,
      });
      await newProduct.save();
      newProduct.comments.push(newComment);
      await newProduct.save();
      console.log("Product Created and Comment Pushed");
      return NextResponse.json(
        { message: "Product Created and Comment Pushed" },
        { status: 201 }
      );
    }

    //* Find User
    const userToUpdate = await User.findOne({ _id: user });
    if (!userToUpdate) {
      return new NextResponse("Product not found", { status: 404 });
    }
    userToUpdate.comments.push(newComment);
    await userToUpdate.save();

    return NextResponse.json({ message: "Comment Created" }, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const comments = await Comment.find();
  return NextResponse.json({ comments });
}
