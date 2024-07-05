import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const getAllBlogsFromDatabase = await Blog.find({});

    if (getAllBlogsFromDatabase) {
      return NextResponse.json({
        success: true,
        data: getAllBlogsFromDatabase,
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
