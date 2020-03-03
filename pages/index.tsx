import React, { Fragment, useState } from "react";
import "../utils/initializeGA";
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
      <h3 className="title">Select your Category</h3>
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
    name: "User Interface"
  },
  {
    id: 2,
    name: "Integrations"
  },
  {
    id: 3,
    name: "Testing"
  },
  {
    id: 4,
    name: "Navigation"
  },
  {
    id: 5,
    name: "Utils"
  },
  {
    id: 6,
    name: "State Managment"
  }
];
