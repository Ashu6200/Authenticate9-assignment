import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";


function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <main className="relative w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={user !== null ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </main>
  )
}

export default App
