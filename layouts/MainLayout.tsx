import React, { FunctionComponent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as colors from "../utils/colors";
import { Category } from "../utils/types";

interface MainLayoutProps {
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header/>
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
            margin-top:50px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
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
        `}
      </style>
    </div>
  );
};

export default MainLayout;
