import React, {useState} from "react";
import { NextPage } from "next";
import { Topic} from "../../utils/types";
import axios from "axios";
import { TOPICS_RETRIEVE } from "../../utils/endpoints";
import MainLayout from "../../layouts/MainLayout";
import MenuLayout from  "../../layouts/MenuLayout";
import SearchLayout from "../../layouts/SearchLayout";
import {search_topics} from "../../utils/search_index";


const Category: NextPage<{topics : Topic[]}> = ({topics}) => {
  const [keyword, setKeyword] = useState("");
  search_topics.addDocuments(topics);
  topics = !keyword ? topics : search_topics.search(keyword) as Topic[];

  const FilterTopics = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === ""){
      setKeyword("");
    }else{
      setKeyword(e.target.value);
    }
  }

  return (
    <MainLayout> 
      <SearchLayout callback = {FilterTopics} keyword = {keyword}>
        <MenuLayout topics = {topics} />
      </SearchLayout>
    </MainLayout>
  );
};

Category.getInitialProps = async ({query}) => {
    const topic = query.category;
    let result:Topic[] = [];

    try{
        result = (await axios.get(TOPICS_RETRIEVE + topic)).data
    }catch(err){}


    return {
        topics : result
    };
}

export default Category;
