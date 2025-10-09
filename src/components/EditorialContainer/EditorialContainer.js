import React, { useState, useEffect } from 'react';
import './editorialContainer.css';
import { Element } from 'react-scroll';
import i1 from '../../images/i1.avif';
import i2 from '../../images/i2.jpeg';
import i3 from '../../images/i3.avif';

const EditorialContainer = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editorials, setEditorials] = useState(() => {
    // Retrieve the editorials from localStorage, or use default values if not available
    const storedEditorials = localStorage.getItem('editorials');
    return storedEditorials ? JSON.parse(storedEditorials) : [
      {
        title: 'South Korean actor Lee Chung Ah on Hide and being a fan of Irrfan’s The Lunchbox',
        date: 'Oct 01, 2024 04:50 PM IST',
        imgSrc: i1,
        shortDescription: 'Lee Chung Ah has been watching a bunch of Bollywood movies and movie with Indian characters. She lists her favourites.',
        fullDescription: 'South Korean actor Lee Chung Ah tells us with a laugh, “If I were given the chance, I would like to work on a story like The Lunchbox or a romance, or melodrama in Bollywood. But I guess it would have to be a Korean student or a traveller because of the language, right."',
        likes: 50,
        isLiked: false,
        comments: [],
        commentInput: '',
      },
      {
        title: 'South Korean actor on why ‘Cobweb’ is a major turning point in her career',
        date: 'Oct 5, 2024 12:35 PM IST',
        imgSrc: i2,
        shortDescription: 'In an exclusive interview with The Hindu from Seoul, actor Jeon Yeo-been calls Cobweb a turning point in her career.',
        fullDescription: 'Recalling the film’s premiere at Cannes earlier this year, she says that the ten-minute standing ovation after the screening was a moment of intense passion for the cast and crew. “Director Kim Jee-woon possesses not only a discerning perspective, but also keeps an open mind when it comes to people, events, and objects. This attitude influences an actor positively,” says Yeo-been.',
        likes: 200,
        isLiked: false,
        comments: [],
        commentInput: '',
      },
      {
        title: 'South Korean actor Jung Ryeo Won on similarities between India and Korea',
        date: 'Oct 7, 2024 06:09 PM IST',
        imgSrc: i3,
        shortDescription: 'Jung Ryeo Won reflects on the evolving working environment in Korean entertainment industry and her approach to roles.',
        fullDescription: 'Actor Jung Ryeo-won makes her long-awaited comeback in the drama genre with The Midnight Romance at Hagwon. She plays Seo Hye Jin, a sought-after instructor at a “hagwon” (private academy)...',
        likes: 110,
        isLiked: false,
        comments: [],
        commentInput: '',
      }
    ];
  });

  // Update localStorage whenever the editorials state changes
  useEffect(() => {
    localStorage.setItem('editorials', JSON.stringify(editorials));
  }, [editorials]);

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleLike = (index) => {
    setEditorials((prevEditorials) => {
      const updatedEditorials = prevEditorials.map((editorial, i) =>
        i === index
          ? {
              ...editorial,
              likes: editorial.isLiked ? editorial.likes - 1 : editorial.likes + 1,
              isLiked: !editorial.isLiked,
            }
          : editorial
      );
      return updatedEditorials; // Return updated editorials to set the state
    });
  };

  const handleAddComment = (index) => {
    const newComment = editorials[index].commentInput.trim();
    if (newComment) {
      setEditorials((prevEditorials) => {
        const updatedEditorials = prevEditorials.map((editorial, i) =>
          i === index
            ? {
                ...editorial,
                comments: [...editorial.comments, newComment],
                commentInput: '', 
              }
            : editorial
        );
        return updatedEditorials;
      });
    }
  };

  const handleInputChange = (index, value) => {
    setEditorials((prevEditorials) =>
      prevEditorials.map((editorial, i) =>
        i === index
          ? { ...editorial, commentInput: value } // Update the comment input value
          : editorial
      )
    );
  };

  return (
    <Element className='editorials' id='editorials'>
      <h2 className='heading'>Interviews</h2>

      {editorials.map((editorial, index) => (
        <div className="editorial-container" key={index}>
          <h2>{editorial.title}</h2>
          <p><strong>{editorial.date}</strong></p>
          <img
            src={editorial.imgSrc}
            alt={editorial.title}
            className="editorial-image"
          />
          <p>{editorial.shortDescription}</p>

          {expandedIndex === index && (
            <div className="editorial-detail">
              <p>{editorial.fullDescription}</p>
            </div>
          )}

          <button onClick={() => handleReadMore(index)} className="read-more-button">
            {expandedIndex === index ? 'Show Less' : 'Read More'}
          </button>

          <div className="interaction-section">
            <div className="like-section">
              <button onClick={() => handleLike(index)} className="like-button">
                {editorial.isLiked ? '🤍' : '♡'}
              </button>
              <span className="like-count">{editorial.likes} Likes</span>
            </div>

            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment"
                className="comment-input"
                value={editorial.commentInput}
                onChange={(e) => handleInputChange(index, e.target.value)} 
              />
              <button
                onClick={() => handleAddComment(index)} 
                className="add-comment-button"
              >
                Add Comment
              </button>
              <div className="comments">
                {editorial.comments.map((comment, i) => (
                  <p key={i} className="comment-text">- {comment}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Element>
  );
};

export default EditorialContainer;
