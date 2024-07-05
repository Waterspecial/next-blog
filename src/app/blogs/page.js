import React from "react";
import BlogOverview from "../../components/blog-overview";

async function fetchBlogs() {
  try {
    const response = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });
    const result = await response.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Blogs() {
  const blogList = await fetchBlogs();

  return <BlogOverview blogList={blogList} />;
}

export default Blogs;
