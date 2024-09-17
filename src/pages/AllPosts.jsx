import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import Container from '../components/container/Container';
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch all posts from the Appwrite service
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        const allPosts = posts.documents;
        setPosts(allPosts);

        // Extract unique categories from the posts
        const uniqueCategories = ["All", ...new Set(allPosts.map((post) => post.category))];
        setCategories(uniqueCategories);
      }
    });
  }, []);

  // Function to filter posts by selected category
  const filterPostsByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Filtered posts based on the selected category
  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="w-full py-8">
      <Container>
        {/* Filter Section */}
        <div className="mb-6 flex justify-end items-center">
          <span className="mr-2 font-medium">Filter By Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => filterPostsByCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Display filtered posts */}
        <div className="flex flex-wrap">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p>No posts available in this category.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
