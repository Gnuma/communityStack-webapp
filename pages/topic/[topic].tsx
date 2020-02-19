import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { NextPage } from "next";
import { Tutorial } from "../../utils/types";
import axios from "axios";
import { TUTORIALS_RETRIEVE } from "../../utils/endpoints";
import TutorialLink from "../../components/TutorialLink";
import { TutorialsList } from "../../components/TutorialsList";

const Topic: NextPage<{ data: Tutorial[] }> = ({ data }) => {
  return (
    <MainLayout>
      <TutorialsList data={data} />
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
