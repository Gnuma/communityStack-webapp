import React, { useState, FunctionComponent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as colors from "../utils/colors";
import { Category } from "../utils/types";
import ModalComponent from "../components/ModalComponent";
import ReactModal from "react-modal";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header openModal={() => setIsModalOpen(true)} />
      <ReactModal
        isOpen={isModalOpen}
        shouldCloseOnEsc={true}
        onRequestClose={() => setIsModalOpen(false)}
        className="contribute-modal"
        overlayClassName="modal-overlay"
      >
        <ModalComponent closeModal={() => setIsModalOpen(false)} />
      </ReactModal>
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
            min-height: calc(100vh - 100px);
            max-width: 100%;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            overflow-x: hidden;
            position: relative;
            margin-bottom: 10px;
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
            font-weight: 300;
            margin: 0;
            padding: 0 20px 20px 20px;
            text-align: center;
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
          .modal-overlay {
            z-index: 999;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .contribute-modal {
            width: calc(100vw - 30px);
            max-width: 800px;
            height: 600px;
            max-height: calc(100vh - 30px);
            background-color: ${colors.DIRT_WHITE};
            border-radius: 6px;
            outline: none;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .loader {
            width: 50px;
          }

          @media screen and (max-width: 1000px) {
            .content {
              min-height: calc(100vh - 60px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
