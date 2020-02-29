import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { NextPage } from "next";
import { Tutorial, Topic as TopicType, Category } from "../../utils/types";
import axios from "axios";
import {
  TUTORIALS_RETRIEVE,
  TOPIC_DETAIL,
  CATEGORIES_RETRIEVE
} from "../../utils/endpoints";
import TutorialLink from "../../components/TutorialLink";
import { TutorialsList } from "../../components/TutorialsList";
import NavigationHistory from "../../components/NavigationHistory";

interface TopicProps {
  data: Tutorial[];
  topic?: TopicType;
  category?: Category;
}

const Topic: NextPage<TopicProps> = ({ data, category, topic }) => {
  return (
    <MainLayout>
      <NavigationHistory category={category} topic={topic} />
      <TutorialsList data={data} />
    </MainLayout>
  );
};

Topic.getInitialProps = async ({ query }) => {
  const topic = query.topic;
  let results: Tutorial[] = [];
  let topicDetail: TopicType | undefined;
  let categoryDetail: Category | undefined;
  try {
    results = (await axios.get(TUTORIALS_RETRIEVE + topic)).data;
    topicDetail = (await axios.get(TOPIC_DETAIL + topic)).data;
    if (!topicDetail) throw "can't retrieve detail";
    categoryDetail = (
      await axios.get(CATEGORIES_RETRIEVE + topicDetail.category)
    ).data;
    if (!categoryDetail) throw "can't retrieve detail";
  } catch (err) {
    console.log(err);
  }
  return { data: results, topic: topicDetail, category: categoryDetail };
};

export default Topic;
