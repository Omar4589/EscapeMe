const RulesComponent = () => {
  return (
    <div>
      <ul className="text-xl">
        <li className="pb-6">
          1. Please arrive at least 15 minutes before your scheduled time.
        </li>
        <li className="pb-6">
          2. Your game guide will explain the rules of your escape room and
          provide information about your escape room.
        </li>
        <li className="pb-6">
          3. The{" "}
          <span className="underline decoration-orange-600 font-bold">
            maximum
          </span>{" "}
          number of players per escape room is 4.
        </li>
        <li className="pb-6">
          4. You will have 60 minutes to complete your escape room challenge.
        </li>
        <li className="pb-6">
          5. You can request hints from your game guide at any time; there's no
          limit to the number of hints you can receive.
        </li>
        <li className="pb-6">
          6. Please respect the props and equipment in the escape rooms to
          ensure the safety and enjoyment of all participants.
        </li>
        <li className="pb-6">
          7. Photography and video recording inside the escape rooms are{" "}
          <span className="underline decoration-orange-600 font-bold">
            NOT allowed
          </span>{" "}
          to maintain the mystery and integrity of the experience.
        </li>
        <li className="  pb-5">
          8. If you need to cancel or reschedule your booking, please contact us
          at least{" "}
          <span className="underline decoration-orange-600">
            24 hours in advance
          </span>{" "}
          to avoid any cancellation fees.
        </li>
        <li className="text-xl pb-6">
          9.{" "}
          <span className="text-2xl font-bold">
            Have fun and enjoy your adventure!{" "}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RulesComponent;
