import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section>
      <h1>404 Not Found</h1>
      <h3>Page does not exists</h3>
      <Link to="/">Go Back</Link>
    </section>
  );
};

export default NotFoundPage;
