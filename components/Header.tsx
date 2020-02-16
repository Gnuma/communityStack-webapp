import React from "react";
import { default as NextLink } from "next/link";
import Link from "../components/Link";
import * as colors from "../utils/colors";
import Button from "./Button";

export default function Header() {
  return (
    <div className="header">
      <NextLink href="../pages/index">
        <a className="uppercase header-title">react native stack</a>
      </NextLink>
      <div className="main-inner-header">
        <Link
          content="home"
          color={colors.BLACK}
          href="#"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
        <Link
          content="about"
          color={colors.BLACK}
          href="#"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
        <Link
          content="contributions"
          color={colors.BLACK}
          href="#"
          size="l"
          style={{ margin: "0px 40px 0px 40px" }}
        />
      </div>

      <div className="contributes-button">
        <Button>Contribute</Button>
      </div>

      <style jsx global>{`
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
