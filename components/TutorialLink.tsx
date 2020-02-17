import React, { FunctionComponent, CSSProperties } from "react";
import * as colors from "../utils/colors";
import { Tutorial, User } from "../utils/types";
import { H5, H4 } from "./Text";

interface TutorialLinkProps {
  tutorial: Tutorial;
  containerStyle: CSSProperties;
}

const TutorialLink: FunctionComponent<TutorialLinkProps> = ({
  tutorial,
  containerStyle
}) => {
  return (
    <div className="tutorial-container" style={containerStyle}>
      <div className="tutorial-header">
        <div className="tutorial-author">
          <img src={tutorial.author_img} alt="" />
          <H4>{tutorial.author_name}</H4>
        </div>
        <H5>{tutorial.time_reading} min read</H5>
      </div>
      <a href={tutorial.link} target="_blank" className="tutorial-link">
        <div className="tutorial-content">
          <h2>{tutorial.title}</h2>
          <p>{tutorial.abstract}</p>
          <span className="uppercase">{getLinkSite(tutorial.link)}</span>
        </div>
      </a>
      <div className="tutorial-footer">
        <H5 style={{ flex: 1 }}>
          {getDateFromTimestamp(tutorial.last_updated)}
        </H5>
        <H5>added by {getUsername(tutorial.user)}</H5>
      </div>
      <style jsx>{`
        .tutorial-container {
          display: block;
        }

        .tutorial-header,
        .tutorial-content,
        .tutorial-footer {
          padding: 0 15px;
        }

        .tutorial-header {
          display: flex;
          align-items: flex-end;
          padding-bottom: 5px;
        }

        .tutorial-author {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .tutorial-author > img {
          width: 40px;
          border-radius: 999px;
          margin-right: 10px;
        }

        .tutorial-reading-time {
          border: solid 2px ${colors.PRIMARY_BLUE};
          width: 30px;
          height: 30px;
          border-radius: 999px;
          text-align: center;
          vertical-align: center;
          line-height: 30px;
          color: ${colors.PRIMARY_BLUE};
          box-sizing: content-box;
        }

        .tutorial-content {
          box-sizing: content-box;
          transition: 0.3s;
          padding: 10px 15px;
          border: solid 2px ${colors.PRIMARY_BLUE};
          border-radius: 6px;
          box-sizing: border-box;
          overflow: hidden;
          height: 160px;
          max-height: 54px;
          position: relative;
        }

        .tutorial-link {
          text-decoration: none;
        }

        .tutorial-content > h2 {
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          line-height: 30px;
          color: ${colors.PRIMARY_BLUE};
        }

        .tutorial-content > p {
          position: relative;
          z-index: 1;
          margin: 0;
          padding-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: ${colors.WHITE};
        }

        .tutorial-content:hover {
          max-height: 160px;
          background-color: ${colors.PRIMARY_BLUE};
          cursor: pointer;
        }

        .tutorial-content:hover > h2 {
          -webkit-line-clamp: 2;
          color: ${colors.WHITE};
        }

        .tutorial-content > span {
          z-index: 0;
          font-size: 15px;
          text-transform: uppercase;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: absolute;
          right: 15px;
          bottom: 15px;
          color: ${colors.WHITE};
        }

        .tutorial-footer {
          display: flex;
          align-items: center;
          padding-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default TutorialLink;

const getLinkSite = (url: string) => {
  var hostname;
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];
  return hostname;
};

const getDateFromTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return (
    MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  );
};

const getUsername = (user: User) =>
  user.username ? user.username : "Anonymous";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
