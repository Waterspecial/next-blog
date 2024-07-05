import { validateBlog } from "@/app/utils/blog";
import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentId = searchParams.get("id");
    if (!getCurrentId) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = validateBlog.validate({ title, description });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateByBlogId = await Blog.findByIdAndUpdate(
      {
        _id: getCurrentId,
      },
      { title, description },
      { new: true }
    );
    if (updateByBlogId) {
      return NextResponse.json({
        success: true,
        message: "Blog is updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong!, Please try again laterr",
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
