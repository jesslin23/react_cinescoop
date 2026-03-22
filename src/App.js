import React from 'react'
import Header from './components/Header/header'
import Topcontainer from './components/Topcontainer/topcontainer'
import Nowplaying from './components/Nowplaying/nowplaying'
import BlogPage from './components/BlogPage/BlogPage'
import Footer from './components/Footer/footer'
import EditorialContainer from './components/EditorialContainer/EditorialContainer'
import Auth from './components/Auth/Auth'

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user ? (
        <>
          <Header />
          <Topcontainer />
          <Nowplaying />
          <EditorialContainer />
          <BlogPage />
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App