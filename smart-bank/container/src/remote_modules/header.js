import React, { useEffect, useRef } from "react";
import { mount } from "header/HeaderComponent";
import { useNavigate } from "react-router-dom";

const Header = ({userDetails, setUserDetails}) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    mount(ref.current, navigate, userDetails, setUserDetails);
  }, [userDetails]);

  return (
    <>
      <div ref={ref}></div>
    </>
  );
};

export default Header;
