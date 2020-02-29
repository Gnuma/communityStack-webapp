import React from "react";
import { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";
import * as colors from "../utils/colors";

const About: NextPage<{}> = () => {
  return (
    <div>
      <MainLayout>
        <div className="about-content">
          <span className="title">about</span>
          <span className="about-text">
            React Native Stack is a community where developers around the world
            can find tutorials about their problems.
          </span>
          <span className="about-text">
            The difference between us and the other communities out there is
            that we focus on bringing the content that it’s already avialable
            all in one place.
          </span>
          <span className="about-text">
            This is because we truly belive that the problem with the current
            way of finding solutions is not about “finding one”, but rather
            about <b>funding the right one</b>>.
          </span>
          <span className="about-text">
            To provide this service we heavily rely on our community and their
            work in finding the tutorials avaialble.
          </span>
          <span className="about-text">
            On this note, if you know of some content avaialble that you want to
            be found here, just hit the <b>Add Resource</b> button and fill in
            the blanks. We’ll personally review and add the content to the
            platform.
          </span>
          <span className="title">our pledge</span>
          <span className="subtitle">
            React Native stack will always be free and open
          </span>
          <span className="about-text">
            React Native Stack is a community built from developers for
            developers.
          </span>
          <span className="about-text">
            We recognize that our community is crucial to our daily work, so why
            not gather all the resources in one place.
          </span>
          <span className="about-text">
            For these resons we take the responsability to keep this platform
            <b> free</b> and <b>open</b> to every one <b>forever</b>.
          </span>
          <style jsx>
            {`
              .about-content > * {
                margin: 15px;
              }

              .about-content {
                max-width: 700px;
                width: calc(100vw - 30px);
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .about-text {
                font-size: 18px;
                letter-spacing: 0.1em;
                color: ${colors.BLACK};
              }
            `}
          </style>
        </div>
      </MainLayout>
    </div>
  );
};

export default About;
