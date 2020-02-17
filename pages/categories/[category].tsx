import React from "react";
import { NextPage } from "next";
import { Topic } from "../../utils/types";
import axios from "axios";
import { TOPICS_RETRIEVE } from "../../utils/endpoints";
import MainLayout from "../../layouts/MainLayout";
import MenuLayout from  "../../layouts/MenuLayout";

const Category: NextPage<{topics : Topic[]}> = ({topics}) => {
  return (
    <MainLayout>
        <MenuLayout topics = {topics}/>
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
