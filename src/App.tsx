import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Markdownreact from "./components/markdown/Markdownreact";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Markdownreact />} />
      </Routes>
    </Router>
  );
}

export default App;
