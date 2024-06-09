import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { firestore } from '../firebase/firebase';
import { collection, addDoc, getDocs, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa';
import './Post.css';
import PostContainer from './PostContainer';

function Post() {
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const { userLoggedIn, currentUser, isEmailUser, isGoogleUser } = useAuth() || {};
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setTotalPages(Math.ceil(posts.length / ITEMS_PER_PAGE));
  }, [posts]);

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(firestore, 'posts', postId));
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handlePost = async () => {
    if (!postContent.trim()) {
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        content: postContent,
        userId: currentUser.email,
        createdAt: serverTimestamp(),
        likes: []
      });

      setPostContent('');
      fetchPosts();
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const handleLikePost = async (postId) => {
    const postRef = doc(firestore, 'posts', postId);
    const post = posts.find(post => post.id === postId);

    if (post) {
      try {
        const updatedLikes = post.likes.includes(currentUser.email)
          ? post.likes.filter(email => email !== currentUser.email)
          : [...post.likes, currentUser.email];

        await updateDoc(postRef, {
          likes: updatedLikes
        });

        setPosts(posts.map(p => p.id === postId ? { ...p, likes: updatedLikes } : p));
      } catch (error) {
        console.error("Error updating post likes: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setPostContent(e.target.value);
  };

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'posts'));
    const postsData = [];
    querySnapshot.forEach((doc) => {
      postsData.push({ id: doc.id, ...doc.data(), likes: doc.data().likes || [] });
    });
    postsData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, [userLoggedIn, postContent]);

  const debug = (e) => {
    e.preventDefault();
    if (currentUser) {
      console.log(currentUser.username);
      console.log("userLoggedIn= ", userLoggedIn);
      console.log("isEmailUser= ", isEmailUser);
      console.log("isGoogleUser= ", isGoogleUser);
      console.log("data of currentUser = ", currentUser);
    } else {
      console.log("no current user");
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the project!</h1>
      {userLoggedIn && (
        <>
          <p>Hello, {currentUser.email}</p>
          <div className="post-input">
            <textarea
              placeholder="Write your post here..."
              value={postContent}
              onChange={handleInputChange}
            />
            <button onClick={handlePost}>Post</button>
          </div>
          <h2>Posts</h2>
          <div className="posts-list">
            {paginatedPosts.map((post) => (
              <PostContainer
                key={post.id}
                post={post}
                currentUser={currentUser}
                handleLikePost={handleLikePost}
                handleDeletePost={handleDeletePost}
              />
            ))}
          </div>
          <div className="pagination">
            <FaArrowLeft className="arrow-icon" onClick={handlePreviousPage} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}
            <FaArrowRight className="arrow-icon" onClick={handleNextPage} />
          </div>
        </>
      )}
      <p>This is the home page where users can see posts.</p>
      <Button variant="info" onClick={debug}>debug</Button>
    </div>
  );
}

export default Post;
