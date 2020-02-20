import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import { NextPage } from "next";
import { Tutorial } from "../../utils/types";
import axios from "axios";
import { TUTORIALS_RETRIEVE } from "../../utils/endpoints";
import TutorialLink from "../../components/TutorialLink";
import { TutorialsList } from "../../components/TutorialsList";
import { Search } from "js-search";
import SearchLayout from "../../layouts/SearchLayout";
import {search_tutorials} from "../../utils/search_index";

const Topic: NextPage<{ data: Tutorial[] }> = ({ data }) => {
  const [keyword, setKeyword] = useState("");
  console.log(data);
  search_tutorials.addDocuments(data);

  data = !keyword ? data : search_tutorials.search(keyword) as Tutorial[];

  const FilterTutorials = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === ""){
      setKeyword("");
    }else{
      setKeyword(e.target.value);
    }
  }

  return (
    <MainLayout>
      <SearchLayout callback = {FilterTutorials} keyword = {keyword}>
        <TutorialsList data={data} />
      </SearchLayout>
    </MainLayout>
  );
};

Topic.getInitialProps = async ({ query }) => {
  const topic = query.topic;
  let results: Tutorial[] = [];

  try {
    results = (await axios.get(TUTORIALS_RETRIEVE + topic)).data;
  } catch (err) {
    console.log(err);
  }
  return { data: results };
};

export default Topic;
