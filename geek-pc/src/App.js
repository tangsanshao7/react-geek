import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
