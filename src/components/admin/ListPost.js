import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";

function ListPosts() {
    
    const [posts, setPosts] = useState([]);
    const user = useSelector(store => store.auth.user);  // Get user from Redux store

    function fetchPosts() {
        if (!user || !user.token) {
            return; // Exit if user or user token is not available
        }
    
        axios.get('http://127.0.0.1:8000/listt', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.token}`  // Include the token in the headers
            }
        }).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.error("There was an error fetching the posts!", error);
        });
    }

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-4">Blog</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 offset-2">
                        <Link to="/blog/posts/create" className="btn btn-info mb-2">Create Post</Link>
                        {posts.map(post => (
                            <PostListItem key={post.id} post={post} refresh={fetchPosts} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPosts;
