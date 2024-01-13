import { Link } from "react-router-dom";


const EscapeRoomCard = ({room}) =>{
    return ( <div
        className="rounded-xl mt-10 mb-10 flex flex-col justify-between bg-cover bg-center relative overflow-hidden h-full"
        style={{ backgroundImage: `url(${room.image_url})` }}
      >
        <div
          id="black-overlay"
          className="absolute rounded-xl bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 "
        ></div>

        <div className="relative z-10 p-4 flex flex-col justify-between h-full ">
          <img
            src={room.image_url}
            alt={room.theme}
            className="h-52 w-11/12 object-cover mb-5 rounded mx-auto drop-shadow-xl"
          />

          <h3
            id="escape-room-theme"
            className="text-2xl font-bold mb-1 underline decoration-orange-600 drop-shadow-lg "
          >
            {room.theme}
          </h3>
          <div>
            <p className="mb-1 text-lg drop-shadow-lg">
              Difficulty: {room.difficulty}
            </p>
            <p className="drop-shadow-lg">
              Duration: {room.duration}min
            </p>
            <p className=" my-2 text-center text-lg drop-shadow-xl">
              {room.description}
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to={`/booking/${room.id}`}
              className="bg-orange-600 py-2 px-10 rounded-lg mt-5 text-xl font-roboto"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>)
}

export default EscapeRoomCard;