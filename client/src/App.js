import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtecdRoute from "./components/protecdRoute";
import Home from "./pages/Home/index";


function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && (
        <div className="loaderparent">
          <div className="loader">
            
          </div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtecdRoute>
                <Home />
              </ProtecdRoute>
            }
          />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
