import Auth from "../../utils/auth";

const UserHomeComponent = () => {
  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <section className="bg-indigo-600 text-white p-5 rounded-lg my-5 mx-3">
            <div className="container mx-auto text-center mb-2">
              <h1 className="text-4xl font-bold mb-3">Welcome to EscapeMe,</h1>
              <p className="text-lg mb-5">
                Experience the thrill of our escape rooms and book your next
                adventure!
              </p>
              <a
                href="/booking"
                className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded"
              >
                Book Now
              </a>
            </div>
          </section>

          {/* Escape Rooms Section  */}
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                Escape Rooms
              </h2>
              <div
                id="escape-rooms"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-950"
              >
                {/* Begin escape room card loop  */}

                {/* End of escape room card loop  */}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div> Please log in </div>
      )}
    </>
  );
};

export default UserHomeComponent;
