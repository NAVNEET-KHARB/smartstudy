import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import Container from '../components/container/Container';
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState("highestToLowest");

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response && response.documents) {
        const allPosts = response.documents;
        setPosts(allPosts);
        const uniqueCategories = ["All", ...new Set(allPosts.map((post) => post.category))];
        setCategories(uniqueCategories);
      }
    });
  }, []);

  const filterPostsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filterPostsByRating = (rating) => {
    setSelectedRating(rating);
  };

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (selectedRating === "highestToLowest") {
      return b.totalRating - a.totalRating;
    } else {
      return a.totalRating - b.totalRating;
    }
  });

  return (
    <div className="w-full py-12 bg-gray-50">
      <Container>
        {/* Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <span className="text-gray-700 mr-3 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => filterPostsByCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring focus:ring-blue-300"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-3 font-medium">Rating:</span>
            <select
              value={selectedRating}
              onChange={(e) => filterPostsByRating(e.target.value)}
              className="p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring focus:ring-blue-300"
            >
              <option value="highestToLowest">Highest to Lowest</option>
              <option value="lowestToHighest">Lowest to Highest</option>
            </select>
          </div>
        </div>

        {/* Display filtered posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <div className="transform transition duration-500 hover:scale-105" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available in this category.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
