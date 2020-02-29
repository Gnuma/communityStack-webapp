import React from "react";
import { NextPage } from "next";
import { User } from "../utils/types";
import axios from "axios";
import {
  BEST_CONTRIBUTORS_USER_ENDPOINT,
  LAST_CONTRIBUTORS_USER_ENDPOINT
} from "../utils/endpoints";
import MainLayout from "../layouts/MainLayout";
import * as colors from "../utils/colors";

const Contributions: NextPage<{ best_users: User[]; last_users: User[] }> = ({
  best_users,
  last_users
}) => {
  return (
    <MainLayout>
      <div className="contributions-container">
        <span className="title">Contributions</span>
        <span className="contributions-text">
          Here you can find all of the contributors of our community. To be part
          of this just add your first resource.
        </span>
        <div className="leaderboards">
          <div className="leaderboard">
            <span className="subtitle">top contributors</span>
            {best_users.map(contributor => {
              return (
                <div className="contributor">
                  <div className="contributor-div">
                    <div className="contributions-num">
                      <span>{contributor.contributions}</span>
                    </div>
                    <span className="contributor">{contributor.username}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="leaderboard latest-contributors">
            <span className="subtitle">latest contributors</span>
            {last_users.map(contributor => {
              return (
                <div className="contributor">
                  <div className="contributor-div">
                    <div className="contributions-num">
                      <span>{contributor.contributions}</span>
                    </div>
                    <span className="contributor">{contributor.username}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style jsx>{`
          .contributions-text {
            font-size: 18px;
            letter-spacing: 0.1em;
            color: ${colors.BLACK};
          }

          .contributions-container {
            max-width: 700px;
            width: calc(100vw - 30px);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .contributions-container > span {
            margin: 15px;
          }

          .leaderboards {
            max-width: 700px;
            width: calc(100vw - 30px);
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .leaderboard {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .leaderboard > * {
            margin: 5px;
          }

          .contributor-div {
            display: flex;
            flex-direction: row;
            align-items: baseline;
          }

          .contributions-num > span {
            color: ${colors.WHITE};
          }

          .contributions-num {
            border-radius: 5px;
            background-color: ${colors.PRIMARY_BLUE};
            padding: 10px 20px 10px 20px;
          }

          .contributor {
            margin-left: 10px;
            font-size: 16px;
            text-transform: uppercase;
            color: ${colors.BLACK};
            letter-spacing: 0.1em;
          }
          @media screen and (max-width: 700px) {
            .leaderboards {
              flex-direction: column;
              align-items: center;
            }
            .latest-contributors {
              margin-top: 10px;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
};

Contributions.getInitialProps = async () => {
  let best_users: User[] = [];
  let last_users: User[] = [];

  try {
    best_users = (await axios.get(BEST_CONTRIBUTORS_USER_ENDPOINT)).data;
    last_users = (await axios.get(LAST_CONTRIBUTORS_USER_ENDPOINT)).data;
  } catch (error) {
    // do nothing for now.
  }

  console.log(best_users);
  return {
    best_users: best_users,
    last_users: last_users
  };
};

export default Contributions;
