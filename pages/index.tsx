import React from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPage } from "next";
import { Category } from "../utils/types";
import axios from "axios";
import { CATEGORIES_RETRIEVE } from "../utils/endpoints";

const Index: NextPage<{ categories: Category[] }> = ({ categories }) => {
  return (
    <MainLayout>
      {categories.map(item => {
        return <span key={item.id}>{item.name}</span>;
      })}
    </MainLayout>
  );
};

Index.getInitialProps = async () => {
  let result: Category[] = [];
  try {
    result = (await axios.get(CATEGORIES_RETRIEVE)).data;
  } catch (err) {
    console.log(err);
  }
  return { categories: result };
};

export default Index;
