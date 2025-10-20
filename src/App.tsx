import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Personalities from "./pages/Personalities"
import About from "./pages/About"
import Questions from "./pages/Questions"
import Footer from "./components/Footer"
import IntroForm from "./components/IntroForm"

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/personalities" element={<Personalities />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
        </Routes>
        {/* <IntroForm></IntroForm> */}
      </main>
      <Footer />
    </>
  )
}

export default App
