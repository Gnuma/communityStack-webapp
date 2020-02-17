import React, { FunctionComponent } from "react";
import * as colors from "../utils/colors";

interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

export const H4: FunctionComponent<TextProps> = ({ children, ...rest }) => {
  return (
    <h4 {...rest}>
      {children}
      <style jsx>{`
          h4{
              font-size: 18px;
              text-transform: uppercase;
              font-weight: 400;
              color: ${colors.GRAY}
              text-transform: uppercase;
              letter-spacing: 0.1em;
          }
          `}</style>
    </h4>
  );
};

export const H5: FunctionComponent<TextProps> = ({ children, ...rest }) => {
  return (
    <h5 {...rest}>
      {children}
      <style jsx>{`
        h5{
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 400;
            color: ${colors.GRAY}
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        `}</style>
    </h5>
  );
};
