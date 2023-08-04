import Comment from "@/models/Comment";
import Product from "@/models/Product";
import User from "@/models/User";
import connectMongoDB from "@/utils/mongoDb";
import { NextResponse } from "next/server";

//* Get Comment
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const comment = await Comment.findOne({ _id: id });
  return NextResponse.json({ comment }, { status: 200 });
}

//* Delete Comment
export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  await Product.findOneAndUpdate(
    { id: comment.productID },
    { $pull: { comments: id } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: comment.user },
    { $pull: { comments: id } },
    { new: true }
  );
  const comment = await Comment.findByIdAndDelete({ _id: id });

  return NextResponse.json({ message: "Comment Deleted" }, { status: 201 });
}
