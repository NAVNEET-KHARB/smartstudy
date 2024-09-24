import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (postId) {
          const fetchedPost = await appwriteService.getPost(postId);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [postId, navigate]);

  const handleRatingChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value >= 0 && value <= 5) {
      setNewRating(value);
    }
  };

  const submitRating = async () => {
    await appwriteService.ratePost(postId, newRating);
    const updatedPost = await appwriteService.getPost(postId);
    setPost(updatedPost); // Update the post with new rating
  };

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const averageRating = post && post.numberOfRatings > 0 
    ? (post.totalRating / post.numberOfRatings).toFixed(1) 
    : "No ratings yet";

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2 shadow-lg'>
          <img 
            src={appwriteService.getFilePreview(post.featuredImage)} 
            alt={post.title} 
            className='rounded-xl w-full h-auto max-h-96 object-cover' 
          />
          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <div className="mt-4 text-gray-700">
            {parse(post.content)}
          </div>
        </div>

        {/* Rating section */}
        <div className="flex flex-col items-center mt-6">
          <input 
            type="number" 
            value={newRating} 
            onChange={handleRatingChange} 
            min="0" 
            max="5" 
            step="0.1" 
            className="border rounded p-2 mb-2 w-1/3 text-center"
            placeholder="Rate (0.0 - 5.0)" 
          />
          <Button onClick={submitRating} className="mt-2 bg-blue-600 hover:bg-blue-700 transition duration-200">
            Submit Rating
          </Button>
          <p className="text-lg mt-2 text-gray-800">
            Average Rating: <span className="font-semibold">{averageRating}</span>
          </p>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
