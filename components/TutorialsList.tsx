import React, { FunctionComponent, Fragment } from "react";
import { Tutorial } from "../utils/types";
import TutorialLink from "./TutorialLink";

interface TutorialsListProps {
  data: Tutorial[];
}

export const TutorialsList: FunctionComponent<TutorialsListProps> = ({
  data
}) => {
  return (
    <div className="tutorials-list">
      {data.map(item => (
        <TutorialLink
          tutorial={item}
          key={item.id}
          containerStyle={{ marginBottom: 15 }}
        />
      ))}
      <style jsx>
        {`
          .tutorials-list {
            max-width: 800px;
            width: calc(100vw - 30px);
            display: flex;
            flex-direction: column;
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};
