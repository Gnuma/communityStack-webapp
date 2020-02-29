import React, { FunctionComponent, useState } from "react";
import * as colors from "../utils/colors";

interface SearchLayoutProps {
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

const SearchLayout: FunctionComponent<SearchLayoutProps> = ({
  children,
  callback,
  keyword
}) => {
  return (
    <div className="content-container">
      <div className="search-div">
        <input
          type="text"
          name="filter"
          className="search-field"
          placeholder="Find your solutions ..."
          value={keyword}
          onChange={callback}
        />
        {children}
      </div>
      <style jsx>
        {`
          .content-container {
            width: 100%;
            max-width: 800px;
            margin: 0 10px;
          }
          .search-field {
            width: 100%;
            font-size: 18px;
            border-radius: 5px;
            height: 40px;
            border: 1px solid ${colors.BLACK};
            padding-left: 15px;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default SearchLayout;
