import React from "react";

const Footer = React.memo(({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "col-start-2" : "col-start-1"
      } col-end-3 row-start-4 row-end-5 bg-primary-dark text-white text-center py-5`}
    >
      Made by Graduate Students at CSU:
      <br/>
      Armando, Scarlett, Donald, Priyanka
    </div>
  );
});

export default Footer;
