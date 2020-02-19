import React, {
  FunctionComponent,
  useState,
  Fragment,
  CSSProperties
} from "react";
import { Tutorial } from "../utils/types";
import TutorialLink from "./TutorialLink";
import * as colors from "../utils/colors";

interface UserPicProps {
  url: string;
  name: string;
  size?: number;
  style?: CSSProperties;
}

const UserPic: FunctionComponent<UserPicProps> = ({
  url,
  name,
  size,
  style
}) => {
  const [hasImg, setHasImg] = useState(true);
  return (
    <Fragment>
      {hasImg ? (
        <img
          src={url}
          onError={() => setHasImg(false)}
          style={{ width: size, height: size, ...style }}
        />
      ) : (
        <span style={{ width: size, height: size, ...style }}>
          {name.trim().charAt(0)}
        </span>
      )}
      <style jsx>
        {`
          img {
            width: 30px;
            height: 30px;
            border-radius: 999px;
          }

          span {
            width: 30px;
            height: 30px;
            line-height: 30px;
            vertical-align: center;
            text-align: center;
            background-color: ${colors.PRIMARY_BLUE};
            color: ${colors.WHITE};
            border-radius: 999px;
          }
        `}
      </style>
    </Fragment>
  );

  if (hasImg)
    return (
      <Fragment>
        <img src={url} onError={() => setHasImg(false)} />
      </Fragment>
    );
  else return <span>{name.trim().charAt(0)}</span>;
};

export default UserPic;
