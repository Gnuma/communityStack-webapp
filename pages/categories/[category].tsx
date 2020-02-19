import React from "react";
import { NextPage } from "next";
import { Topic, GeneralData } from "../../utils/types";
import axios from "axios";
import { TOPICS_RETRIEVE } from "../../utils/endpoints";
import MainLayout from "../../layouts/MainLayout";
import MenuLayout from  "../../layouts/MenuLayout";
import SearchComponent from "../../components/Search"

const Category: NextPage<{topics : GeneralData[]}> = ({topics}) => {
  return (
    <MainLayout>
      <SearchComponent layout={MenuLayout} data = {topics}/>
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
