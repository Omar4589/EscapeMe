import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Header from "./components/HeaderComponent/Header";
import { DarkModeProvider } from "./utils/DarkModeContext"; // adjust the path as needed
import SignUpPage from "./pages/SignUpPage/SignUp";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
