import React from 'react'
import Header from './components/Header/header'
import Topcontainer from './components/Topcontainer/topcontainer'
import Nowplaying from './components/Nowplaying/nowplaying'
import BlogPage from './components/BlogPage/BlogPage'
import Footer from './components/Footer/footer'
import EditorialContainer from './components/EditorialContainer/EditorialContainer'
const App = () => {
  return (
    <div>
      <Header />
      <Topcontainer />
      <Nowplaying />
      <EditorialContainer />
      <BlogPage />
      <Footer />
    </div>
  )
}

export default App