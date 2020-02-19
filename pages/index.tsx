import React, { Fragment, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPage } from "next";
import Link from "next/link";
import { Category } from "../utils/types";
import axios from "axios";
import { CATEGORIES_RETRIEVE } from "../utils/endpoints";
import Button from "../components/Button";
import CategoriesMenu from "../components/CategoriesMenu";

const Index: NextPage<{ categories: Category[] }> = ({ categories }) => {
  console.log("Render");
  return (
    <MainLayout>
      <CategoriesMenu data={categories} />
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

const MockCategories: Category[] = [
  {
    id: 1,
    name: "Primo"
  },
  {
    id: 2,
    name: "Secondo"
  },
  {
    id: 2,
    name: "Secondo"
  },
  {
    id: 2,
    name: "Secondo"
  }
];
