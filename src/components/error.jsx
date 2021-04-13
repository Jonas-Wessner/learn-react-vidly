import React from "react";

function Error(props) {
  return (
    <h1>{props.message || "Sorry, some unexpected error has occurred."}</h1>
  );
}

export default Error;
