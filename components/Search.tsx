import React, { FunctionComponent, useState } from "react";
import * as colors from "../utils/colors";
import { GeneralLayout, GeneralData } from "../utils/types"

const SearchComponent: FunctionComponent<{layout: GeneralLayout, data: GeneralData[]}> = ({ layout, data }) => {
  const [keyword, setKeyword] = useState("");

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
            onChange={event => setKeyword(event.target.value)}
          />
        </form>
        {React.createElement(layout, {data : data, keyword : keyword})}
      </div>
      <style jsx>
        {`
            .search-div{
                display: :flex;
                flex-direction: column;
                justify-content: center;
                witdh:1000px;
            }

            .search-div > form{
                width:100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 50px;
            }

            .search-field{
                font-size:18px;
                width:100%;
                border-radius:5px;
                height: 40px;
                border: 1px solid ${colors.BLACK};
                padding-left: 15px;
            }
          `}
      </style>
    </div>
  );
};

export default SearchComponent;