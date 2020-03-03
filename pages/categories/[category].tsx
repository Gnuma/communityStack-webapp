import React, { useState } from "react";
import { NextPage } from "next";
import { Topic } from "../../utils/types";
import axios from "axios";
import { TOPICS_RETRIEVE, CATEGORIES_RETRIEVE } from "../../utils/endpoints";
import MainLayout from "../../layouts/MainLayout";
import MenuLayout from "../../layouts/MenuLayout";
import SearchLayout from "../../layouts/SearchLayout";
import { search_topics } from "../../utils/search_index";
import { Category as CategoryType } from "../../utils/types";
import NavigationHistory from "../../components/NavigationHistory";

const Category: NextPage<{ topics: Topic[]; category?: CategoryType }> = ({
  topics,
  category
}) => {
  const [internal_topics, setTopics] = useState(topics);
  const [keyword, setKeyword] = useState("");

  search_topics.addDocuments(topics);

  const FilterTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setTopics(topics);
      setKeyword("");
    } else {
      setTopics(search_topics.search(e.target.value) as Topic[]);
      setKeyword(e.target.value);
    }
  };

  return (
    <MainLayout>
      <NavigationHistory category={category} />
      <h3 className="title">Choose your topic</h3>
      <SearchLayout
        callback={FilterTopics}
        keyword={keyword}
        placeholder="Choose your topic"
      >
        <MenuLayout topics={internal_topics} />
      </SearchLayout>
    </MainLayout>
  );
};

Category.getInitialProps = async ({ query }) => {
  const category = query.category;
  let result: Topic[] = [];
  let categoryDetail: CategoryType | undefined;

  try {
    result = (await axios.get(TOPICS_RETRIEVE + category)).data;
    categoryDetail = (await axios.get(CATEGORIES_RETRIEVE + category)).data;
  } catch (err) {}

  return {
    topics: result,
    category: categoryDetail
  };
};

export default Category;
