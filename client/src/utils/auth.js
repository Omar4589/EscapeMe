// Import the decode function from the "jwt-decode" library
import decode from "jwt-decode";

// Define a class named AuthService to manage authentication-related functionality
class AuthService {
  // Method to get user profile information from the JWT token
  getProfile() {
    return decode(this.getToken()); //Decode the token using jwt-decode library
  }

  // Method to check if a user is logged in
  loggedIn() {
    const token = this.getToken(); // Retrieve token from local storage
    // Check if there is a token and it's not expired, return `true`, otherwise return `false`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    const decoded = decode(token); // Decode the token to get its contents
    // Compare the expiration time in the token with the current time
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token"); // Remove token from local storage
      return true; // Token is expired
    }
    return false; // Token is not expired
  }

  // Method to get the token from local storage
  getToken() {
    return localStorage.getItem("id_token"); // Retrieve the token
  }

  // Method to log in the user
  login(idToken) {
    localStorage.setItem("id_token", idToken); // Store the token in local storage
    window.location.assign("/"); // Redirect the user to the home page
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem("id_token"); // Remove the token from local storage
    window.location.reload("/"); // Reload the page to reflect the logout state
  }
}

// Export an instance of the AuthService class
export default new AuthService();
