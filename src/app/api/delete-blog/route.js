import Blogs from "@/app/blogs/page";
import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentID = searchParams.get("id");
    if (!getCurrentID) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }
    const deleteCurrentBlogById = await Blog.findByIdAndDelete(getCurrentID);
    if (deleteCurrentBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog is Deleted successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong!, Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!, Please try again later",
    });
  }
}
