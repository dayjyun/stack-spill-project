import { NavLink } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <>
      <div id="error-page-container">
        <h1>404: PAGE NOT FOUND</h1>
        <div className="error-page-text">Oh No! The Honey! It's Spilling!</div>
        {/* <div>
          Let's go back <Link to="/">Home</Link>{" "}
        </div> */}
        <div id="error-page-image-container">
          <img
            id="error-page-image"
            src={
              // "https://stack-spill-project.s3.us-east-2.amazonaws.com/404+Page.webp"
              "https://stack-spill-project.s3.us-east-2.amazonaws.com/404+Page+2.gif"
            }
          />
        </div>
        <div className="error-page-text">
          Let's go back to the{" "}
          <NavLink id="error-page-home-link" to="/">
            Main Page
          </NavLink>{" "}
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
