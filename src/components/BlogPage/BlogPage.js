import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import { Element } from 'react-scroll';

const BlogPage = () => {

  const [blogs, setBlogs] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    genre: '',
    image: null
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // LOAD BLOGS
  useEffect(() => {
    fetch("https://react-cinescoop.onrender.com/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  // LOAD WATCHLIST (FIXED WARNING)
  useEffect(() => {
    if (user?.username) {
      fetch(`https://react-cinescoop.onrender.com/watchlist/${user.username}`)
        .then(res => res.json())
        .then(data => setWatchlist(data));
    }
  }, [user?.username]);

  // ADD BLOG
  const addBlog = async () => {

    if (!newBlog.title || !newBlog.content || !newBlog.genre) return;

    await fetch("https://react-cinescoop.onrender.com/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newBlog,
        username: user.username
      })
    });

    setNewBlog({ title: '', content: '', genre: '', image: null });

    // reload blogs
    fetch("https://react-cinescoop.onrender.com/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  };

  // IMAGE
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ADD TO WATCHLIST
  const addToWatchlist = async (blog) => {

    await fetch(`https://react-cinescoop.onrender.com/watchlist/${user.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    });

    fetch(`https://react-cinescoop.onrender.com/watchlist/${user.username}`)
      .then(res => res.json())
      .then(data => setWatchlist(data));
  };

  // REMOVE FROM WATCHLIST
  const removeFromWatchlist = async (blog) => {

    await fetch(`https://react-cinescoop.onrender.com/watchlist/${user.username}/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    });

    fetch(`https://react-cinescoop.onrender.com/watchlist/${user.username}`)
      .then(res => res.json())
      .then(data => setWatchlist(data));
  };

  return (
    <Element className='blog' id='Blog'>

      <h1>Blogs</h1>

      <div className="blogPage">

        {/* BLOG LIST */}
        <div className="blogList">

          <h2>View Blogs</h2>

          {blogs.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            blogs.map((blog, index) => (
              <div key={index} className="blogItem">

                {blog.image && <img src={blog.image} alt="" />}

                <p><strong>Posted by:</strong> {blog.username}</p>

                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p><strong>{blog.genre}</strong></p>

                <button onClick={() => addToWatchlist(blog)}>
                  + Watchlist
                </button>

              </div>
            ))
          )}

        </div>

        {/* ADD BLOG */}
        <div className="addBlogSection">

          <h2>Add Blog</h2>

          <input
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />

          <textarea
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          />

          <input
            placeholder="Genre"
            value={newBlog.genre}
            onChange={(e) => setNewBlog({ ...newBlog, genre: e.target.value })}
          />

          <input type="file" onChange={handleImageUpload} />

          <button onClick={addBlog}>Add Blog</button>

        </div>

      </div>

      {/* WATCHLIST */}
      <h2>Watchlist</h2>

      <div className="watchlist">

        {watchlist.map((blog, index) => (
          <div key={index} className="watchlistItem">

            {blog.image && <img src={blog.image} alt="" />}

            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <button onClick={() => removeFromWatchlist(blog)}>
              Remove
            </button>

          </div>
        ))}

      </div>

    </Element>
  );
};

export default BlogPage;