import React, { FunctionComponent } from "react";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import * as colors from "../utils/colors";

interface LinkProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    NextLinkProps {
  color?: string;
  size?: "s" | "m" | "l";
  content?: string;
}

const Link: FunctionComponent<LinkProps> = ({
  color,
  size,
  href,
  content,
  style,
  ...rest
}) => {
  return (
    <NextLink href={href}>
      <span
        style={{ color, fontSize: size ? SIZE_VALUE[size] : "14px", ...style }}
        className="link"
      >
        {content}
        <style jsx>{`
          .link {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 14px;
            font-weight: 400;
            color: ${colors.WHITE};
          }
          .link:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        `}</style>
      </span>
    </NextLink>
  );
};

const SIZE_VALUE = {
  s: "12px",
  m: "14px",
  l: "16px"
};

export default Link;
