import React from "react";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="bg-slate-100 text-slate-950 text-center min-h-screen p-4">
      <div className="container mx-auto pt-5 pb-10">
        <h1 className="text-5xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg">
          Welcome to <span className="font-bold">Escape Me</span>, your premier
          escape room adventure! Our mission is to provide unique and immersive
          experiences for people looking for a thrill, a challenge, and a great
          story to tell.
        </p>
        <p className="text-lg mt-4">
          Each of our escape rooms is designed with intricate details and
          compelling narratives to truly transport you to another world. Whether
          you're defusing a bomb, solving a mystery, or escaping a haunted
          mansion, you'll have to work together with your team to unravel the
          puzzles and make it out before time runs out.
        </p>
        <p className="text-lg mt-4">
          Our puzzles are crafted to test your wit, creativity, and teamwork.
          We're passionate about bringing people together to create memories
          that will last a lifetime.
        </p>
        <p className="text-lg mt-4">
          So, gather your friends, family, or colleagues, and come see if you
          have what it takes to escape!
        </p>
        <div className="text-center mt-8">
          <Link
            to="/escaperooms"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-4 rounded-lg block my-4 text-xl"
          >
            View Escape Rooms
          </Link>
          <Link
            to="/rules"
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-lg block my-4 text-xl"
          >
            Rules
          </Link>
          <Link
            to="/howtobook"
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-lg block my-4 text-xl"
          >
            How To Book
          </Link>
          <Link
            to="/booking"
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-lg block my-4 text-xl"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
