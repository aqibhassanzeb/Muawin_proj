import React from "react";

const FormHeader = ({ text }) => {
  return (
    <div className="flex-center">
      <p
        className="py-2"
        style={{
          fontSize: 18,
          fontWeight: 600,
          textAlign: "center",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: 4,
          marginBottom: 30,
          width: 350,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default FormHeader;
