import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './PostContainer.css';

const PostContent = ({ post, currentUser, handleLikePost, handleDeletePost }) => {
  return (
    <div className="post-item">
      <p className="post-content">
        {post.content.length > 30 ? `${post.content.slice(0, 30)}...` : post.content}
      </p>
      <p>Posted by: {post.userId}</p>
      <p>{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
      <div className="likes-section">
        <FaHeart
          className={post.likes.includes(currentUser.email) ? 'liked' : ''}
          onClick={() => handleLikePost(post.id)}
        />
        <span>{post.likes.length}</span>
      </div>
      {post.userId === currentUser.email && (
        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
      )}
    </div>
  );
};

export default PostContent;
