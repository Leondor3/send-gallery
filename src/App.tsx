import { AddPhotos } from "./components/AddPhoto"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ListPhotos } from "./components/ListPhoto"
import { PhotoList } from "./components/PhotosList";
import { Home } from "./pages";

function App() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start space-y-4">
      <div className="pt-24">
        <h1 className="text-gray-50 font-bold text-4xl">Express
          <span className="text-blue-600">Flow5988</span>
        </h1>
      </div>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photos" element={<PhotoList />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App