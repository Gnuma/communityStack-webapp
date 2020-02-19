import React, { FunctionComponent } from "react";
import { Topic } from "../utils/types";
import * as colors from "../utils/colors";
import { GeneralData } from "../utils/types";

interface MenuLayoutProps {
  data: GeneralData[];
  keyword: string;
}

const MenuLayout: FunctionComponent<MenuLayoutProps> = ({ data, keyword }) => {
  return (
    <div className="main-menu-container w3-animate-fading">
      {
        data.map(topic => {
        return (
          <div className="menu-item">
            <span className="uppercase item-title">{(topic as Topic).name}</span>
            <span className="topic-description">{(topic as Topic).description}</span>
          </div>
        );
      })}

      {console.log(keyword)}
      <style jsx>
        {`
          .main-menu-container {
            padding: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 1000px;
            min-height: 10px;
            align-items: flex-start;
            align-content: flex-start;
            justify-content: center;
          }

          .menu-item {
            border: 2px solid;
            border-radius: 5px;
            border-color: ${colors.PRIMARY_BLUE};
            margin: 10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
          }

          .item-title {
            padding: 10px;
            font-size: 20px;
          }

          .topic-description {
            padding: 5px;
            font-size: 15px;
          }

          .menu-item > span {
            color: ${colors.PRIMARY_BLUE};
          }

          .menu-item:hover {
            background-color: ${colors.PRIMARY_BLUE};
            cursor: pointer;
          }

          .menu-item:hover > span {
            color: ${colors.WHITE};
          }
        `}
      </style>
    </div>
  );
};

export default MenuLayout;
