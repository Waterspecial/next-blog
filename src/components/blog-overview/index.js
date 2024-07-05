"use client";

import AddNewBlog from "../add-new-blog";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogOverview = ({ blogList }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      console.log(blogFormData);
      const response =
        currentEditedId !== null
          ? await fetch(`/api/update-blog?id=${currentEditedId}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });
      const result = await response.json();
      if (result?.success === true) {
        setBlogFormData(initialBlogFormData);
        setOpenDialog(false);
        setLoading(false);
        setCurrentEditedId(null);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  };

  async function handleDeleteBlogById(currentId) {
    try {
      const response = await fetch(`/api/delete-blog?id=${currentId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(blogItem) {
    setCurrentEditedId(blogItem?._id);
    setBlogFormData({
      title: blogItem?.title,
      description: blogItem?.description,
    });
    setOpenDialog(true);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        initialBlogFormData={initialBlogFormData}
        currentEditedId={currentEditedId}
        setCurrentEditedId={setCurrentEditedId}
      />
      <div>Blog List Section</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList?.length > 0 ? (
          blogList.map((blogItem) => (
            <Card key={blogItem?._id} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="flex items-center mt-5 gap-5">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogById(blogItem?._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            NO blog found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
