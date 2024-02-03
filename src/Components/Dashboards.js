import React from "react";
import { useSelector } from "react-redux";

const Dashboards = () => {
  const state = useSelector((state) => state.userDetails);

  return (
    <>
      {state?.first_name && (
        <h1>
          Welcome to BloggersWebsite:
          {` ${state?.first_name} ${state.last_name}`}
        </h1>
      )}
      {state?.your_password && (
        <>
          <h1>Your temparary password is :{state?.your_password}</h1>
          <p>Please change it in profile update</p>
        </>
      )}
    </>
  );
};

export default Dashboards;
