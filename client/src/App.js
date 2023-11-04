import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Auth from "../src/utils/auth";
import { Navigate } from "react-router-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Header from "./components/HeaderComponent/Header";
import { DarkModeProvider } from "./utils/DarkModeContext"; // adjust the path as needed
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";
import Footer from "./components/FooterComponent/Footer";
import EscapeRoomsPage from "./pages/EscapeRoomsPage/EscapeRoomsPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import FaqPage from "./pages/FaqPage/FaqPage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DarkModeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={  Auth.loggedIn() ? <Navigate to="/home" /> : <WelcomePage />} />
            <Route
              path="/signup"
              element={
                Auth.loggedIn() ? <Navigate to="/home" /> : <SignUpPage />
              }
            />
            <Route path="/login" element={  Auth.loggedIn() ? <Navigate to="/home" /> : <LoginPage />} />
            <Route
              path="/home"
              element={Auth.loggedIn() ? <UserHomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking"
              element={Auth.loggedIn() ? <BookingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mybookings"
              element={Auth.loggedIn() ? <MyBookingsPage /> : <Navigate to="/login" />}
            />
          </Routes>
          <Footer />
        </Router>
      </DarkModeProvider>
    </ApolloProvider>
  );
}

export default App;
