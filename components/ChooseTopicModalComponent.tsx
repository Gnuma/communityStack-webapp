import React, { FunctionComponent, useState, useEffect } from "react";
import * as endpoints from "../utils/endpoints";
import { search_topics } from "../utils/search_index";
import SearchLayout from "../layouts/SearchLayout";
import MenuLayout from "../layouts/MenuLayout";
import { Topic } from "../utils/types";
import axios from "axios";

interface ChoosechooseTopicModalComponentProps {
  data: number;
  callback: CallableFunction;
}

const ChooseTopicModalComponent: FunctionComponent<ChoosechooseTopicModalComponentProps> = ({
  data,
  callback
}) => {
  const [topics, setTopics] = useState([]);
  const [keyword, setKeyword] = useState("");
  let topics_nonstate = !keyword
    ? topics
    : (search_topics.search(keyword) as Topic[]);
  console.log(topics_nonstate);
  useEffect(() => {
    const getTopics = async () => {
      const topics = (await axios.get(endpoints.TOPICS_RETRIEVE + data)).data;
      setTopics(topics);
    };

    getTopics();
  }, []);
  search_topics.addDocuments(topics);
  const FilterTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setKeyword("");
    } else {
      setKeyword(e.target.value);
    }
  };

  return (
    <div className="choose-modal">
      <SearchLayout
        callback={FilterTopics}
        keyword={keyword}
        placeholder="Test"
      ></SearchLayout>
      <style jsx>
        {`
          .choose-modal {
            overflow: none;
            width: 100%;
            height: 100%;
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default ChooseTopicModalComponent;
