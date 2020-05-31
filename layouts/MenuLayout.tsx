import React, { FunctionComponent, useEffect, useState } from "react";
import { Topic } from "../utils/types";
import * as colors from "../utils/colors";
import Link from "next/link";

interface MenuLayoutProps {
  topics: Topic[];
}
const MenuLayout: FunctionComponent<MenuLayoutProps> = ({ topics }) => {
  const [columns, setColumns] = useState(2);

  const handleResize = () => {
    if (getWindowDimensions().width < 600) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rows: Topic[][] = [];
  topics.forEach((topic, index) => {
    if (index % columns === 0) rows.push([topic]);
    else rows[rows.length - 1].push(topic);
  });

  return (
    <div className="main-menu-container">
      {rows.map((row, rowIndex) => {
        const sizes = row.map(topic => topic.name.length);
        return (
          <div className="row" key={rowIndex}>
            {row.map((item, index) => {
              const total = sizes.reduce((tot, value) => (tot += value), 0);
              const sizeWeight = 2;
              const minFlex = 1 / (sizes.length + sizeWeight);
              const flex =
                minFlex + (sizes[index] / total) * (minFlex * sizeWeight);
              return (
                <Link href={`/topic/${item.id}`} key={item.id}>
                  <div
                    className="menu-item"
                    style={{
                      flex,
                      marginRight: index != row.length - 1 ? "10px" : "0"
                    }}
                  >
                    <span className="uppercase item-title">{item.name}</span>
                    <span className="topic-description">
                      {item.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
      <style jsx>
        {`
          .main-menu-container {
            display: flex;
            flex-direction: column;
            box-sizing: content-box;
          }

          .row {
            display: flex;
            flex-direction: row;
          }

          .menu-item {
            flex: 1;
            border: 2px solid;
            border-radius: 5px;
            border-color: ${colors.PRIMARY_BLUE};
            margin-top: 10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
          }

          .item-title {
            padding-bottom: 10px;
            font-size: 20px;
          }

          .topic-description {
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

          .spacer {
            width: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default MenuLayout;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
