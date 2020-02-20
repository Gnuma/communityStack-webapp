import React, { FunctionComponent, useState } from "react";
import * as colors from "../utils/colors";
import { Category } from "../utils/types";
import Button from "./Button";
import Link from "next/link";

type PointType = { x: number; y: number };
type CirclePointType = { x: number; y: number; theta: number };

interface CategoriesMenuProps {
  data: Category[];
}

//<Logo x={p.x} y={SIZE - p.y} fill={false} />

const RADIUS = 200;
const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 46;
const BUTTON_DIAGONAL = Math.sqrt(
  Math.pow(BUTTON_WIDTH, 2) + Math.pow(BUTTON_HEIGHT, 2)
);
const SIZE = RADIUS * 2;
const BUTTON_OFFSET = 30;
const PADDING = 15;

const CategoriesMenu: FunctionComponent<CategoriesMenuProps> = ({ data }) => {
  const center = { x: RADIUS, y: RADIUS };
  const coordinates: CirclePointType[] = data.map((item, index) => {
    const dTheta = (2 * Math.PI) / data.length;
    const theta = Math.PI / 2 + index * dTheta;
    return {
      x: (RADIUS - PADDING) * Math.cos(theta),
      y: (RADIUS - PADDING) * Math.sin(theta),
      theta
    };
  });

  return (
    <div className="categories-container">
      {coordinates.map((item, index) => {
        const p: PointType = getXYFromCenter(center, item);
        const bP = { ...p };
        bP.x -= BUTTON_WIDTH / 2;
        bP.y -= BUTTON_HEIGHT / 2;
        const cosTheta = Math.cos(item.theta);
        const sinTheta = Math.sin(item.theta);
        bP.x += cosTheta * (BUTTON_WIDTH / 2 + BUTTON_OFFSET);
        bP.y += sinTheta * (BUTTON_HEIGHT / 2 + BUTTON_OFFSET);
        /*--Bad Math
        const cosSign = Math.sign(cosTheta);
        const sinSign = Math.sign(sinTheta);
        const rectTrig = Math.min(Math.abs(cosTheta), Math.abs(sinTheta));
        bP.x += cosSign * rectTrig * ((BUTTON_DIAGONAL - BUTTON_WIDTH) / 2);
        bP.y += sinSign * rectTrig * ((BUTTON_DIAGONAL - BUTTON_HEIGHT) / 2);
        --Bad Math */

        return (
          <div>
            <svg
              width={SIZE}
              height={SIZE}
              className="svg-canvas"
              key={data[index].id}
            >
              <line
                x1={p.x}
                y1={SIZE - p.y}
                x2={center.x}
                y2={SIZE - center.y}
                stroke={colors.PRIMARY_BLUE}
                strokeWidth={2}
              />
              <Logo x={p.x} y={SIZE - p.y} fill={false} />
            </svg>
            <button
              className="category-button uppercase"
              style={{ position: "absolute", left: bP.x, bottom: bP.y }}
            >
              {data[index].name}
            </button>
          </div>
        );
      })}
      <Logo x={center.x} y={SIZE - center.y} />

      <style jsx>
        {`
          .categories-container {
            width: ${SIZE}px;
            height: ${SIZE}px;
            position: relative;
            margin-top: 100px;
          }
          .svg-canvas {
            position: absolute;
            left: 0;
            top: 0;
          }
          .point {
            position: absolute;
            margin: -5px;
            margin: -5px;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background-color: red;
          }
          .category-button {
            transition: 0.3s;
            border: solid 2px ${colors.PRIMARY_BLUE};
            width: ${BUTTON_WIDTH}px;
            height: ${BUTTON_HEIGHT}px;
            //border-radius: 100%;
            color: ${colors.PRIMARY_BLUE};
            //background-color: ${colors.WHITE};
            background-color: transparent;
            transition: 0.2s;
            font-size: 16px;
            box-sizing: border-box;
            text-align: center;
          }

          .category-button:hover {
            background-color: ${colors.PRIMARY_BLUE};
            color: ${colors.WHITE};
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default CategoriesMenu;

const getXYFromCenter = (center: PointType, point: PointType): PointType => ({
  x: center.x + point.x,
  y: center.y + point.y
});

interface LogoProps {
  x: number;
  y: number;
  radius?: number;
  fill?: boolean;
}

const Logo = ({ x, y, radius = 10, fill = true }: LogoProps) => (
  <svg>
    <circle
      cx={x}
      cy={y}
      r={radius}
      strokeWidth={radius / 5}
      stroke={colors.PRIMARY_BLUE}
      fill={colors.WHITE}
    ></circle>
    {fill && <circle cx={x} cy={y} r={radius / 2} fill={colors.PRIMARY_BLUE} />}
  </svg>
);
