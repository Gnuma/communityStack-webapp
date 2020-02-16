import React, { FunctionComponent } from "react";
import * as colors from "../utils/colors";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: FunctionComponent<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="default-button uppercase" {...rest}>
      {children}
      <style jsx>
        {`
          .default-button {
            border: solid 2px ${colors.PRIMARY_BLUE};
            padding: 10px 16px;
            border-radius: 6px;
            color: ${colors.PRIMARY_BLUE};
            background-color: ${colors.WHITE};
            transition: 0.2s;
            font-size: 16px;
            box-sizing: border-box;
          }

          .default-button:hover {
            color: ${colors.WHITE};
            background-color: ${colors.PRIMARY_BLUE};
            cursor: pointer;
          }
        `}
      </style>
    </button>
  );
};

export default Button;
