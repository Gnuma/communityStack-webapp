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
const SEMI_HEIGHT = BUTTON_HEIGHT / 2;
const SEMI_WIDTH = BUTTON_WIDTH / 2;
const BUTTON_DIAGONAL = Math.sqrt(
  Math.pow(BUTTON_WIDTH, 2) + Math.pow(BUTTON_HEIGHT, 2)
);
const SPLIT_THETA = Math.acos(BUTTON_WIDTH / BUTTON_DIAGONAL);

const SIZE = RADIUS * 2;
const BUTTON_OFFSET = 20;
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
        const { theta } = item;
        bP.x -= BUTTON_WIDTH / 2;
        bP.y -= BUTTON_HEIGHT / 2;

        bP.x += Math.cos(theta) * (SEMI_WIDTH + BUTTON_OFFSET);
        bP.y += Math.sin(theta) * (SEMI_HEIGHT + BUTTON_OFFSET);
        /*
        let thetaLessThanPiOverTwo = getThetaLessThanPiOverTwo(theta);
        if (Math.sin(theta) * Math.cos(theta) < 0)
          thetaLessThanPiOverTwo = Math.PI / 2 - thetaLessThanPiOverTwo; // HACK
        console.log(Math.sign(Math.sin(theta)));
        let dx, dy;
        if (thetaLessThanPiOverTwo >= SPLIT_THETA) {
          dy = Math.sign(Math.sin(theta)) * SEMI_HEIGHT;
          dx =
            Math.sign(Math.sin(theta)) * ((1 / Math.tan(theta)) * SEMI_HEIGHT);
        } else {
          dx = Math.sign(Math.cos(theta)) * SEMI_WIDTH;
          dy = Math.sign(Math.cos(theta)) * (Math.tan(theta) * SEMI_WIDTH);
        }
        console.log(data[index].id + ": dx=" + dx + " dy=" + dy);
        const xOffset = BUTTON_OFFSET * (BUTTON_WIDTH / BUTTON_HEIGHT);
        const yOffset = BUTTON_OFFSET * (BUTTON_HEIGHT / BUTTON_WIDTH);
        bP.x += dx;
        bP.y += dy;
        let k;
        if (Math.abs(Math.cos(theta)) < Math.abs(Math.sin(theta))) {
          k = Math.cos(theta);
        } else {
          k = Math.sin(theta);
        }
        bP.x += k * xOffset;
        bP.x += Math.cos(theta) * BUTTON_OFFSET;
        bP.y += Math.sin(theta) * BUTTON_OFFSET;
        */
        return (
          <div key={data[index].id}>
            <svg width={SIZE} height={SIZE} className="svg-canvas">
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
            <Link href={`categories/${data[index].id}`}>
              <button
                className="category-button uppercase"
                style={{ position: "absolute", left: bP.x, bottom: bP.y }}
              >
                {data[index].name}
              </button>
            </Link>
          </div>
        );
      })}
      <svg width={SIZE} height={SIZE} className="svg-canvas">
        <Logo x={center.x} y={SIZE - center.y} />
      </svg>
      <style jsx>
        {`
          .categories-container {
            width: ${SIZE}px;
            height: ${SIZE}px;
            position: relative;
            margin: auto;
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
            z-index: 1;
            transition: 0.3s;
            border: solid 2px ${colors.PRIMARY_BLUE};
            width: ${BUTTON_WIDTH}px;
            height: ${BUTTON_HEIGHT}px;
            border-radius: 6px;
            color: ${colors.PRIMARY_BLUE};
            background-color: ${colors.WHITE};
            background-color: ${colors.WHITE};
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

const getThetaLessThanPiOverTwo = (theta: number) => {
  while (theta > Math.PI / 2) theta -= Math.PI / 2;
  return theta;
};

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
