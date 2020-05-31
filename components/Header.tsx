import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as colors from "../utils/colors";
import Button from "./Button";
import AddResourceButton from "./AddResourceButton";

export default function Header({ openModal }: { openModal: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<string | number>("100vw");

  const updateWindowWidth = () =>
    setWindowWidth(
      document.getElementsByTagName("body")[0].getBoundingClientRect().width
    );

  const getWindowWidth = () =>
    typeof windowWidth === "string" ? windowWidth : windowWidth + "px";

  useEffect(() => {
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return (
    <div className="header">
      <Link href="/">
        <a className="uppercase header-title">
          <img alt="RNS" src="/media/Logo.svg" />
          react native stack
        </a>
      </Link>
      <button
        onClick={() => setIsOpen(true)}
        style={{ padding: "10px" }}
        className="open-menu"
      >
        <img src="/media/menu.svg" alt="MENU" />
      </button>
      <div className={"main-inner-header " + (isOpen && "open")}>
        <Link href="/">
          <a className="link">home</a>
        </Link>
        <Link href="/about">
          <a className="link">about</a>
        </Link>
        <Link href="/contributions">
          <a className="link">contributions</a>
        </Link>
        <div className="mobile-contibution-btn">
          <Button onClick={openModal}>Add Resource</Button>
        </div>
      </div>

      <div className="contributes-button">
        <Button onClick={openModal}>Add Resource</Button>
      </div>
      <div className={"mobile-overlay " + (isOpen && "open")}>
        <button className="exit-header" onClick={() => setIsOpen(false)}>
          <img src="/media/exit.svg" alt="X" />
        </button>
      </div>
      <AddResourceButton
        onClick={openModal}
        className={"add-resource-mobile " + (isOpen && "open")}
      />
      <style jsx global>{`
        .header {
          max-width: 100%;
          width: 100vw;
          height: 100px;
          padding: 0 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          justify-content: space-between;
        }
        .header-title {
          box-sizing: border-box;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: ${colors.PRIMARY_BLUE};
          box-sizing: border-box;
          text-decoration: none;
          display: flex;
          align-items: center;
          width: 350px;
        }
        .header-title > img {
          margin-right: 14px;
        }

        .main-inner-header {
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          flex-direction: row;
          align-items: center;
        }

        .contributes-button {
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;
          width: 350px;
        }

        .link {
          width: 200px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 18px;
          font-weight: 400;
          color: ${colors.BLACK};
          text-decoration: none;
        }
        .link:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .mobile-contibution-btn {
          display: none;
          flex: 1;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 6px;
        }
        .open-menu {
          display: none;
        }

        .mobile-overlay {
          display: none;
        }

        @media screen and (max-width: 1000px) {
          .header {
            padding: 0 10px;
            height: 60px;
            border-bottom: solid 2px ${colors.PRIMARY_BLUE};
          }
          .header-title {
            font-size: 1.34em;
          }
          .contributes-button {
            display: none;
          }
          .main-inner-header {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
            width: calc(${getWindowWidth()} - ${DRAWER_MARGIN}px);
            background-color: ${colors.WHITE};
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 60px 20px 20px 20px;
            transform: translateX(
              calc(${getWindowWidth()} - ${DRAWER_MARGIN}px)
            );
            transition: 0.3s;
          }
          .main-inner-header.open {
            transform: translateX(0);
          }
          .mobile-overlay {
            position: fixed;
            display: block;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 998;
            opacity: 0;
            transition: 0.3s;
            pointer-events: none;
          }
          .mobile-overlay.open {
            pointer-events: auto;
            opacity: 1;
          }
          .link {
            text-align: left;
            padding: 20px 0;
            width: 100%;
          }
          .mobile-contibution-btn {
            display: flex;
          }
          .open-menu {
            display: block;
          }
          .exit-header {
            position: absolute;
            left: ${(DRAWER_MARGIN - 40) / 2}px;
            top: 20px;
            width: 40px;
            background-color: transparent;
            border: none;
            padding: 0;
            outline: none;
          }
        }
      `}</style>
      <style jsx global>
        {`
          .add-resource-mobile {
            display: none;
          }
          @media screen and (max-width: 1000px) {
            .add-resource-mobile {
              z-index: 999;
              position: fixed;
              display: block;
              right: 20px;
              bottom: 20px;
              border: none;
              background-color: white;
              outline: none;
              transition: 0.3s;
            }
            .add-resource-mobile.open {
              transform: translateX(
                calc(
                  ${DRAWER_MARGIN}px - ${getWindowWidth()} + 20px -
                    ${(DRAWER_MARGIN - ADD_RESOURCE_BTN_WIDTH) / 2}px
                )
              );
            }
          }
        `}
      </style>
    </div>
  );
}

const DRAWER_MARGIN = 70;
const ADD_RESOURCE_BTN_WIDTH = 50;
