import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import NavButtonComponent from "../../components/NavButtonComponent/NavButtonComponent";

const AboutUsPage = () => {
  return (
    <div className="bg-zinc-950 text-slate-100 text-center min-h-screen p-6 md:px-12 lg:px-36 lg:text-justify">
      <div className="container mx-auto pt-5 pb-10">
        <h1 className="text-4xl font-bold text-center mb-5 underline decoration-orange-600">About Us</h1>
        <p className="text-xl">
          Welcome to <span className="font-bold underline decoration-orange-600">Escape Me</span>, your premier
          escape room adventure! Our mission is to provide unique and immersive
          experiences for people looking for a thrill, a challenge, and a great
          story to tell.
        </p>
        <p className="text-xl mt-4">
          Each of our escape rooms is designed with intricate details and
          compelling narratives to truly transport you to another world. Whether
          you're defusing a bomb, solving a mystery, or escaping a haunted
          mansion, you'll have to work together with your team to unravel the
          puzzles and make it out before time runs out.
        </p>
        <p className="text-xl mt-4">
          Our puzzles are crafted to test your wit, creativity, and teamwork.
          We're passionate about bringing people together to create memories
          that will last a lifetime.  So, gather your friends, family, or colleagues, and come see if you
          have what it takes to escape!
        </p>
        <div className="text-center mt-16">
        <NavButtonComponent route="/escaperooms" text="View Escape Rooms" />
          <NavButtonComponent route="/rules" text="Rules" />
          <NavButtonComponent route="/howtobook" text="How To Book" />
          <NavButtonComponent route="/booking/1" text="Book Now" />
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop(AboutUsPage);
