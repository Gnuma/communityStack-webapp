import React, { FunctionComponent, useState } from "react";
import * as colors from "../utils/colors";

interface SearchLayoutProps {
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
  placeholder: string;
}

const SearchLayout: FunctionComponent<SearchLayoutProps> = ({
  children,
  callback,
  keyword,
  placeholder
}) => {
  return (
    <div className="content-container">
      <div className="search-div">
        <input
          type="text"
          name="filter"
          className="search-field"
          placeholder={placeholder}
          value={keyword}
          onChange={callback}
        />
        {children}
      </div>
      <style jsx>
        {`
          .content-container {
            max-width: 800px;
            width: calc(100vw - 30px);
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
