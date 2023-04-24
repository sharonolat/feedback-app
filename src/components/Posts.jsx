import { Navigate, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


function Posts() {
  const navigate = useNavigate();

  const status = true;

  if (status === true) {
    navigate('/about');

    // return <Navigate to="/about" />
  }

  return (
    <div>
      <button
        onClick={() => <Navigate to="/show" />}
      >
        Hi
      </button>

      <Routes>
        <Route path="/show" element={<h1>Home</h1>} />
      </Routes>
    </div>
  )
}

export default Posts