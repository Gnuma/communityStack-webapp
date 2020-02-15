import React from "react";
import * as colors from "../utils/colors";
import Link from "../components/Link";

export default function Footer() {
  return (
    <div className="footer">
      <span className="footer-title uppercase">
        React native stack. all rights reserved.
      </span>
      <Link style={{ padding: "6px" }} href="#" content="Home" />
      <Link style={{ padding: "6px" }} href="/index" content="about" />
      <Link style={{ padding: "6px" }} href="#" content="contributions" />
      <style jsx>{`
        .footer {
          width: 100vw;
          padding: 10px;
          box-sizing: border-box;
          background-color: ${colors.PRIMARY_BLUE};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .footer-title {
          padding: 15px;
          font-size: 14px;
          color: ${colors.GREY};
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
