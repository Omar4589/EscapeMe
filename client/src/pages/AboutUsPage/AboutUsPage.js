import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-slate-100 text-slate-950 min-h-screen p-4">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg">
          Welcome to <span className="font-bold">Escape Me</span>, your premier escape room adventure! Our mission is to provide unique and immersive experiences for people looking for a thrill, a challenge, and a great story to tell.
        </p>
        <p className="text-lg mt-4">
          Each of our escape rooms is designed with intricate details and compelling narratives to truly transport you to another world. Whether you're defusing a bomb, solving a mystery, or escaping a haunted mansion, you'll have to work together with your team to unravel the puzzles and make it out before time runs out.
        </p>
        <p className="text-lg mt-4">
          Our puzzles are crafted to test your wit, creativity, and teamwork. We're passionate about bringing people together to create memories that will last a lifetime.
        </p>
        <p className="text-lg mt-4">
          So, gather your friends, family, or colleagues, and come see if you have what it takes to escape!
        </p>
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
