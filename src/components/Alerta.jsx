import React from "react";

const Alerta = ({children}) => {
  return (
    <div className="text-center my-4 bg-red-500 text-white p-1 uppercase">
      {children}
    </div>
  );
};

export default Alerta;
