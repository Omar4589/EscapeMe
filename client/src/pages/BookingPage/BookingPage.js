import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingFormComponent from "../../components/BookingFormComponent/BookingForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import BookingConfirmationComponent from "../../components/BookingConfirmationComponent/BookingConfirmationComponent";

const BookingPage = () => {
  //destructuring roomId parameters
  const { roomId } = useParams();
  //turning value into integer
  const roomID = parseInt(roomId, 10);
  //-----------------STATE---------------//
  //Used to show/hide confirmation page after booking is succesful
  const [confirmationPage, setConfirmationPage] = useState(false);
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [formData, setFormData] = useState({
    escape_room_id: roomID,
    escape_room_image: "",
    escape_room_description: "",
    numberOfPlayers: 1,
    date: "",
    time: "",
  });

  return (
    <div id="main" className=" min-h-screen bg-zinc-950 text-slate-100 mx-auto px-6 py-12 md:px-12 lg:px-12">
      <BookingFormComponent
        confirmationPage={confirmationPage}
        setConfirmationPage={setConfirmationPage}
        escapeRooms={escapeRooms}
        setEscapeRooms={setEscapeRooms}
        formData={formData}
        setFormData={setFormData}
      />
      {confirmationPage ? (
        <BookingConfirmationComponent
          bookingDetails={{
            escapeRoomTheme: escapeRooms.find(
              (room) => room.id === formData.escape_room_id
            )?.theme,
            escapeRoomImage: escapeRooms.find(
              (room) => room.id === formData.escape_room_id
            )?.image_url,
            description: formData.escape_room_description,
            numberOfPlayers: formData.numberOfPlayers,
            date: formData.date,
            time: formData.time,
          }}
          setConfirmationPage={setConfirmationPage}
        />
      ) : null}
    </div>
  );
};

export default ScrollToTop(BookingPage);
