// src/Pages/LandingPage.js
import React, { useState } from 'react';
import './LandingPage.css';

// Dummy posts data for pagination (15 posts)
const postsData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  author: 'Ishmam',
  content: `This is the content of post number ${i + 1}.`,
  comments: [
    { id: 1, text: 'Great post!' },
    { id: 2, text: 'Thanks for sharing.' },
  ],
}));

const trendingTech = [
  'Hypersonic Missiles',
  'AI-Powered Drones',
  'Directed Energy Weapons (Lasers)',
  'Cyber Warfare Systems',
  'Autonomous Combat Robots',
  'Space-Based Surveillance',
  'Electronic Warfare Systems',
  'Stealth Technology (Next-Gen Aircraft)',
  'Quantum Communication',
  'Unmanned Underwater Vehicles (UUVs)',
];

const Reactions = ({ reaction, setReaction }) => {
  return (
    <div className="reactions">
      <span
        className={`reaction-box ${reaction === 'like' ? 'active-like' : ''}`}
        onClick={() => setReaction('like')}
      >
        <span className="reaction-icon">👍</span>
      </span>
      <span
        className={`reaction-box ${reaction === 'love' ? 'active-love' : ''}`}
        onClick={() => setReaction('love')}
      >
        <span className="reaction-icon">❤️</span>
      </span>
      <span
        className={`reaction-box ${reaction === 'angry' ? 'active-angry' : ''}`}
        onClick={() => setReaction('angry')}
      >
        <span className="reaction-icon">😠</span>
      </span>
    </div>
  );
};

const LandingPage = () => {
  const [postReactions, setPostReactions] = useState({});
  const [commentReactions, setCommentReactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(postsData.length / postsPerPage);

  const handlePostReaction = (postId, reaction) => {
    setPostReactions((prev) => ({
      ...prev,
      [postId]: prev[postId] === reaction ? null : reaction,
    }));
  };

  const handleCommentReaction = (commentId, reaction) => {
    setCommentReactions((prev) => ({
      ...prev,
      [commentId]: prev[commentId] === reaction ? null : reaction,
    }));
  };

  const paginatedPosts = postsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="container">
      <h1>Posts</h1>

      {paginatedPosts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>
            <strong>Author:</strong>{' '}
            <a href="/profile" className="author-link">
              {post.author}
            </a>
          </p>
          <p>{post.content}</p>

          {/* Post Reactions */}
          <div>
            <b>Reactions:</b>
            <Reactions
              reaction={postReactions[post.id]}
              setReaction={(reaction) => handlePostReaction(post.id, reaction)}
            />
          </div>

          {/* Comments */}
          <div className="comments">
            <b>Comments:</b>
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.text}</p>
                <Reactions
                  reaction={commentReactions[`${post.id}-${comment.id}`]}
                  setReaction={(reaction) =>
                    handleCommentReaction(`${post.id}-${comment.id}`, reaction)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`page-btn ${currentPage === pageNum ? 'active-page' : ''}`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Trending Tech */}
      <div className="trending-tech">
        <h2>Trending Technologies</h2>
        <ul>
          {trendingTech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
