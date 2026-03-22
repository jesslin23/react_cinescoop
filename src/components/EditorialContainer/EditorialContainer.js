import React, { useState, useEffect } from 'react';
import './editorialContainer.css';
import { Element } from 'react-scroll';

const EditorialContainer = () => {

  const [editorials, setEditorials] = useState([]);
  const [comments, setComments] = useState({});
  const [inputs, setInputs] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showComments, setShowComments] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("https://react-cinescoop.onrender.com/editorials")
      .then(res => res.json())
      .then(data => setEditorials(data));
  }, []);

  // LOAD COMMENTS
  const loadComments = async (id) => {
    const res = await fetch(`https://react-cinescoop.onrender.com/editorials/${id}/comments`);
    const data = await res.json();

    setComments(prev => ({
      ...prev,
      [id]: data
    }));
  };

  // TOGGLE COMMENTS
  const toggleComments = (id) => {
    if (!showComments[id]) {
      loadComments(id);
    }

    setShowComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // LIKE
  const handleLike = async (id) => {

    await fetch(`https://react-cinescoop.onrender.com/editorials/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username
      })
    });

    fetch("https://react-cinescoop.onrender.com/editorials")
      .then(res => res.json())
      .then(data => setEditorials(data));
  };

  // ADD COMMENT
  const handleAddComment = async (id) => {

    const text = inputs[id];
    if (!text) return;

    await fetch(`https://react-cinescoop.onrender.com/editorials/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        text: text
      })
    });

    setInputs(prev => ({ ...prev, [id]: "" }));
    loadComments(id);
  };

  // DELETE COMMENT
  const handleDelete = async (commentIndex, editorialId) => {

    await fetch(`https://react-cinescoop.onrender.com/comments/${commentIndex}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username
      })
    });

    loadComments(editorialId);
  };

  return (
    <Element className="editorials" id="editorials">

      <h2 className="heading">Interviews</h2>

      {editorials.map((e, index) => (

        <div className="editorial-card" key={e.id}>

          <h2>{e.title}</h2>
          <p className="date">{e.date}</p>

          <p className="desc">{e.shortDescription}</p>

          {expandedIndex === index && (
            <p className="desc">{e.fullDescription}</p>
          )}

          <button
            className="read-more"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            {expandedIndex === index ? "Show Less" : "Read More"}
          </button>

          {/* LIKE */}
          <div className="actions">
            <button onClick={() => handleLike(e.id)} className="like">
              ❤️ {e.likes}
            </button>
          </div>

          {/* COMMENTS */}
          <div className="comment-box">

            <div className="input-row">
              <input
                placeholder="Add a comment..."
                value={inputs[e.id] || ""}
                onChange={(ev) =>
                  setInputs({ ...inputs, [e.id]: ev.target.value })
                }
              />

              <button onClick={() => handleAddComment(e.id)}>
                Post
              </button>
            </div>

            <button
              className="show-btn"
              onClick={() => toggleComments(e.id)}
            >
              {showComments[e.id] ? "Hide Comments" : "View Comments"}
            </button>

            {showComments[e.id] && (
              <div className="comments">

                {(comments[e.id] || []).map((c, i) => (
                  <div key={i} className="comment">
                    <strong>{c.username}</strong>
                    <span>{c.text}</span>

                    {/* DELETE ONLY OWN COMMENT */}
                    {c.username === user.username && (
                      <button
                        onClick={() => handleDelete(i, e.id)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      ))}

    </Element>
  );
};

export default EditorialContainer;