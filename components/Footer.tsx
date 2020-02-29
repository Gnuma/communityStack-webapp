import React from "react";
import * as colors from "../utils/colors";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo uppercase">
        <img src="/media/Logo-white.svg" alt="" />
        react native stack
      </div>
      <span className="footer-title uppercase">
        From the Community, for the Community.
      </span>
      <div className="pagelinks">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>about</a>
        </Link>
        <Link href="/contributions">
          <a>Contribution</a>
        </Link>
      </div>
      <div className="endLink">
        <a href="mailto:infocommunity@gmail.com">
          <img src="/media/email.svg" alt="" />
          infocommunity@gmail.com
        </a>
        <a
          href="https://github.com/Gnuma/communityStack-webapp"
          target="_BLANK"
        >
          <img src="/media/github.svg" alt="" />
          github
        </a>
      </div>
      <style jsx>{`
        .footer {
          max-width: 100%;
          width: 100vw;
          padding: 20px 0;
          background-color: ${colors.PRIMARY_BLUE};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${colors.GREY};
        }
        .footer-title {
          text-align: center;
          padding-top: 10px;
          font-size: 15px;
          color: ${colors.GREY};
          box-sizing: border-box;
        }
        .logo {
          display: flex;
          align-items: center;
          color: ${colors.WHITE};
        }
        .logo > img {
          padding-right: 8px;
        }
        .pagelinks {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
        }
        a {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 15px;
          padding: 5px 0;
          color: ${colors.WHITE};
          text-decoration: none;
        }
        a > img {
          margin-right: 5px;
        }
        a:hover {
          text-decoration: underline;
        }
        .endLink {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
        .endLink > * {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
}
