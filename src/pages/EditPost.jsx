import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";

function EditPost() {
    const [post, setPost] = useState(null);
    const { postId } = useParams(); // Changed to postId
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) { // Changed to postId
            appwriteService.getPost(postId).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        }
    }, [postId, navigate]); // Changed to postId

    return (
        <div className='py-6'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}

export default EditPost;
