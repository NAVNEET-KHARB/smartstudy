import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
    defaultValues: {
      title: "",
      category: "",
      content: "",
      status: "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [sections, setSections] = useState([{ title: "", youtubeLink: "" }]); // State for course sections

  // Populate form with existing post data
  useEffect(() => {
    if (post) {
      reset({
        title: post?.title || "",
        category: post?.category || "",
        content: post?.content || "",
        status: post?.status || "active",
      });
      // Populate sections from the post if it exists
      if (post.sections) {
        const parsedSections = post.sections.map(section => {
          const [title, youtubeLink] = section.split('|');
          return { title, youtubeLink };
        });
        setSections(parsedSections);
      }
    }
  }, [post, reset]);

  const addSection = (event) => {
    event.preventDefault(); // Prevent default behavior to avoid form submission
    setSections([...sections, { title: "", youtubeLink: "" }]);
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const deleteSection = (index) => {
    const newSections = sections.filter((_, idx) => idx !== index);
    setSections(newSections);
  };

  const submit = async (data) => {
    const sectionsArray = sections.map(section => `${section.title}|${section.youtubeLink}`);
  
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
  
      // If there is a new file, delete the old one and update the featuredImage
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
        await appwriteService.updatePost(post.$id, {
          ...data,
          sections: sectionsArray,
          featuredImage: file.$id, // Make sure to set featuredImage to the new file ID
        });
      } else {
        // If no new file, just update the rest of the data
        await appwriteService.updatePost(post.$id, {
          ...data,
          sections: sectionsArray,
        });
      }
  
      // Navigate to the post after update
      navigate(`/post/${post.$id}`);
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
  
      if (file) {
        const fileId = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          sections: sectionsArray,
          featuredImage: fileId, // Ensure to set featuredImage for new posts
        });
  
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-nowrap gap-6">
      {/* Left Column for Title, Slug, Content, and Sections */}
      <div className="w-full md:w-2/3 space-y-6">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Category :"
          placeholder="Category"
          className="mb-4"
          {...register("category", { required: true })}
          onInput={(e) => {
            const uppercaseValue = e.currentTarget.value.toUpperCase();
            setValue("category", uppercaseValue, { shouldValidate: true });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        
        {/* Sections Table */}
        <div className="mt-6">
          <h2 className="text-lg font-bold">Course Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="flex space-x-4 mb-2 items-center">
              <Input
                label="Section Title"
                placeholder="Title"
                value={section.title}
                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                className="flex-1"
              />
              <Input
                label="YouTube Link"
                placeholder="https://..."
                value={section.youtubeLink}
                onChange={(e) => handleSectionChange(index, 'youtubeLink', e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={() => deleteSection(index)} className="bg-red-500 hover:bg-red-600 text-white">
                Delete
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addSection} className="mt-2">Add Section</Button>
        </div>
      </div>

      {/* Right Column for Image, Status, and Submit Button */}
      <div className="w-full md:w-1/3 space-y-6">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
