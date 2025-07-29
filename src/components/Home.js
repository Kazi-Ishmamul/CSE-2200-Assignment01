import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Home.module.css';

function Home() {
  const navigate = useNavigate();
  const [reaction, setReaction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 2;

  const [comments, setComments] = useState([
    { id: 1, author: 'Atik', date: '22 July 2025', text: 'Hypersonic missiles are revolutionizing modern warfare.', likes: 12, dislikes: 1, userReaction: null },
    { id: 2, author: 'Sayem', date: '23 July 2025', text: 'Their speed makes defense extremely challenging.', likes: 8, dislikes: 0, userReaction: null },
    { id: 3, author: 'Rafiq', date: '24 July 2025', text: 'We need to focus on new countermeasures urgently.', likes: 5, dislikes: 2, userReaction: null },
    { id: 4, author: 'Nadim', date: '25 July 2025', text: 'Global stability could be impacted by this technology.', likes: 6, dislikes: 1, userReaction: null },
    { id: 5, author: 'Aisha', date: '26 July 2025', text: 'The race for hypersonic arms is intensifying worldwide.', likes: 7, dislikes: 0, userReaction: null },
    { id: 6, author: 'Karim', date: '27 July 2025', text: 'International agreements need to address these weapons soon.', likes: 9, dislikes: 3, userReaction: null }
  ]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleLike = (id) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === id) {
          if (comment.userReaction === 'like') {
            return {
              ...comment,
              likes: comment.likes - 1,
              userReaction: null,
            };
          } else if (comment.userReaction === 'dislike') {
            return {
              ...comment,
              likes: comment.likes + 1,
              dislikes: comment.dislikes - 1,
              userReaction: 'like',
            };
          } else {
            return {
              ...comment,
              likes: comment.likes + 1,
              userReaction: 'like',
            };
          }
        }
        return comment;
      })
    );
  };

  const handleDislike = (id) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === id) {
          if (comment.userReaction === 'dislike') {
            return {
              ...comment,
              dislikes: comment.dislikes - 1,
              userReaction: null,
            };
          } else if (comment.userReaction === 'like') {
            return {
              ...comment,
              dislikes: comment.dislikes + 1,
              likes: comment.likes - 1,
              userReaction: 'dislike',
            };
          } else {
            return {
              ...comment,
              dislikes: comment.dislikes + 1,
              userReaction: 'dislike',
            };
          }
        }
        return comment;
      })
    );
  };

  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.postTitle}>
        Hypersonic Missiles: The Future of Warfare and Security
      </h2>
      <p className={styles.postSubText}>
        Hypersonic missiles are shaping the next era of military technology with unprecedented speed and power.
      </p>

      <img src="/hypersonic_missile.jpg" alt="Hypersonic Missile" className={styles.imageBox} />

      <p className={styles.caption}>
        Understanding hypersonic missiles is critical for global defense strategies.
      </p>

      <div className={styles.authorInfo}>
        <div className={styles.authorFlex}>
          <div>
            <button onClick={() => navigate('/author')} className={styles.authorButton}>
              Kazi Ishmamul
            </button>
            <p className={styles.authorDate}>22 July 2025</p>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <p className={styles.postBody}>
        Hypersonic missiles travel at speeds greater than five times the speed of sound, making detection and interception extremely difficult. As nations race to develop and deploy these weapons, the balance of power and global security faces new challenges.
      </p>

      <hr className={styles.divider} />

      <div className={styles.reactionSummary}>
        <div className={styles.reactionContainer}>
          {['Like', 'Love', 'Angry', 'Sad'].map((r) => (
            <button
              key={r}
              onClick={() => setReaction(r)}
              className={`${styles.reactionButton} ${reaction === r ? styles.selected : ''}`}
            >
              {r}
            </button>
          ))}
        </div>
        <p className={styles.reactionStats}>
          Like 20% &nbsp;&nbsp; Love 60% &nbsp;&nbsp; Angry 5% &nbsp;&nbsp; Sad 5%
        </p>
      </div>

      <div className={styles.commentSection}>
        <h4>{comments.length} Comments</h4>
        <div className={styles.commentInputBox}>
          <input type="text" placeholder="Write your comment.." />
          <button>&rarr;</button>
        </div>

        {currentComments.map((comment) => (
          <div key={comment.id} className={styles.commentBox}>
            <div>
              <strong>{comment.author}</strong>
              <p className={styles.commentDate}>{comment.date}</p>
            </div>
            <p>{comment.text}</p>
            <div className={styles.commentActions}>
              <span
                onClick={() => handleLike(comment.id)}
                style={{
                  cursor: 'pointer',
                  fontWeight: comment.userReaction === 'like' ? 'bold' : 'normal',
                  color: comment.userReaction === 'like' ? '#00796b' : '#000'
                }}
              >
                Like {comment.likes}
              </span>
              <span
                onClick={() => handleDislike(comment.id)}
                style={{
                  cursor: 'pointer',
                  fontWeight: comment.userReaction === 'dislike' ? 'bold' : 'normal',
                  color: comment.userReaction === 'dislike' ? '#d32f2f' : '#000'
                }}
              >
                Dislike {comment.dislikes}
              </span>
              <span>Reply</span>
            </div>
          </div>
        ))}

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.selected : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
