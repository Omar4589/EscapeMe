const BookingStep = ({ stepNumber, stepInstruction }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <span className=" font-semibold">{stepNumber}.</span>
      </div>
      <p className="ml-4 ">{stepInstruction}</p>
    </div>
  );
};

export default BookingStep;
