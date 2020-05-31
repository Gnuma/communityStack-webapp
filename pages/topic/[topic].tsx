import React, { useState, useEffect } from "react";
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
import { createTutorialSearcher } from "../../utils/search_index";
import SearchLayout from "../../layouts/SearchLayout";

interface TopicProps {
  data: Tutorial[];
  topic?: TopicType;
  category?: Category;
}

const tutorialSearcher = createTutorialSearcher();

const Topic: NextPage<TopicProps> = ({ data, category, topic }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      setSearchQuery("");
      setFilteredData(data);
    } else {
      setSearchQuery(value);
      setFilteredData(tutorialSearcher.search(value) as Tutorial[]);
    }
  };

  useEffect(() => {
    tutorialSearcher.addDocuments(data);
  }, []);

  return (
    <MainLayout>
      <NavigationHistory category={category} topic={topic} />
      <h3 className="title">Find your solution</h3>
      <SearchLayout
        callback={onSearch}
        keyword={searchQuery}
        placeholder="Find your solution"
      >
        <TutorialsList data={filteredData} />
      </SearchLayout>
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
