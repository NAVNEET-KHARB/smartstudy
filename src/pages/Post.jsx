import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import youtubeLogo from "../assets/youtube-logo.png";

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
    setPost(updatedPost);
  };

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const averageRating =
    post && post.numberOfRatings > 0
      ? (post.totalRating / post.numberOfRatings).toFixed(1)
      : "No ratings yet";

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-2xl p-2 shadow-lg transition-transform transform hover:scale-105 duration-300">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-2xl w-full h-auto max-h-96 object-cover shadow-md"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <div className="mt-4 text-gray-700 text-lg">{parse(post.content)}</div>
        </div>

        {/* Sections Section */}
        <div className="w-full mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Sections
          </h2>
          {post.sections && post.sections.length > 0 ? (
            <div className="space-y-4">
              {post.sections.map((section, index) => {
                const [title, youtubeLink] = section.split("|");
                return (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-md bg-white flex flex-row justify-between items-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {title || "No Title"}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      {youtubeLink ? (
                        <a
                          href={youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <img
                            src={youtubeLogo}
                            alt="YouTube Link"
                            className="w-6 h-6 mr-2 transition-transform transform hover:scale-110 duration-200"
                          />
                          <span className="hover:text-blue-600 transition-colors duration-200">Watch Video</span>
                        </a>
                      ) : (
                        <p>No YouTube Link</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No sections available.</p>
          )}
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
            className="border rounded p-2 mb-2 w-1/3 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rate (0.0 - 5.0)"
          />
          <Button
            onClick={submitRating}
            className="mt-2 bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Submit Rating
          </Button>
          <p className="text-lg mt-2 text-gray-800">
            Average Rating:{" "}
            <span className="font-semibold">{averageRating}</span>
          </p>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
