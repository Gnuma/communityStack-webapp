import React, {useState, FunctionComponent} from "react";
import { default as NextLink } from "next/link";
import Link from "../components/Link";
import * as colors from "../utils/colors";
import Button from "./Button";
import ReactModal from "react-modal";
import { Category } from "../utils/types";
import ModalComponent from "./ModalComponent";


const Header: FunctionComponent<{}> = () => {
  const [modalOpen, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className="header">
      <NextLink href="/">
        <a className="uppercase header-title">
          <img alt="RNS" src="/media/Logo.svg" />
          react native stack
        </a>
      </NextLink>
      <div className="main-inner-header">
        <Link
          content="home"
          color={colors.BLACK}
          href="/"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
        <Link
          content="about"
          color={colors.BLACK}
          href="/about"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
        <Link
          content="contributors"
          color={colors.BLACK}
          href="/contributors"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
      </div>

      <div className="contributes-button">
        <Button onClick={openModal}>Contribute</Button>
      </div>

      <ReactModal isOpen = {modalOpen} shouldCloseOnEsc = {true} onRequestClose={closeModal} className="contribute-modal">
        <ModalComponent />
      </ReactModal>

      <style jsx global>{`

        .contribute-modal {
          outline: none;
          width:40%;
          padding: 1px;
          border: 1px solid ${colors.BLACK};
          margin: 10% auto;
          background-color: ${colors.WHITE};
          border-radius: 3px;
          height: 40%;
          display: flex;
          flex-direction: row;
        }

        .header {
          width: 100vw;
          padding: 30px 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .header-title {
          box-sizing: border-box;
          flex: 1;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: ${colors.BLACK};
          box-sizing: border-box;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .header-title > img {
          margin-right: 14px;
        }

        .main-inner-header {
          box-sizing: border-box;
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: row;
          align-items: center;
        }

        .contributes-button {
          box-sizing: border-box;
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}

export default Header;