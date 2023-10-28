import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Header from "./components/HeaderComponent/Header";
import { DarkModeProvider } from "./utils/DarkModeContext"; // adjust the path as needed

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
