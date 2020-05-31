import React from "react";
import * as colors from "../utils/colors";

interface LogoProps {
  x: number;
  y: number;
  radius?: number;
  fill?: boolean;
}

export default ({ x, y, radius = 10, fill = true }: LogoProps) => (
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
