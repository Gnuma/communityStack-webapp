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
    <div>
      <div className="search-div">
        <form>
          <input
            type="text"
            name="filter"
            className="search-field"
            placeholder="Filter here..."
            value={keyword}
            onChange={callback}
          />
        </form>
        {children}
      </div>
      <style jsx>
        {`
            .search-div{
                display: :flex;
                flex-direction: column;
                justify-content: center;
                witdh: 100%;
            }

            .search-div > form{
                width:100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 50px;
            }

            .search-field{
                font-size: 18px;
                width:100%;
                border-radius:5px;
                height: 40px;
                border: 1px solid ${colors.BLACK};
                padding-left: 2%;
            }
          `}
      </style>
    </div>
  );
};

export default SearchLayout;
