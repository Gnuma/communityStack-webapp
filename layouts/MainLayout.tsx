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
            box-sizing: border-box;
          }
          .content {
            padding-top: 50px;
            padding-bottom: 150px;
            min-height: calc(100vh - 100px);
            max-width: 100%;
            width: 100vw;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          .uppercase {
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .title {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: ${colors.PRIMARY_BLUE};
            font-size: 24px;
          }

          .subtitle {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: ${colors.PRIMARY_BLUE};
            font-size: 20px;
          }

          button {
            border: none;
            background-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
