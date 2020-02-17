import React, { FunctionComponent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as colors from "../utils/colors";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
          * {
            margin: 0;
            padding: 0;
            color: ${colors.BLACK};
            font-family: "Roboto", sans-serif;
            box-sizing: content-box;
          }
          .content {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            flex-direction: row;
          }

          .uppercase {
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
