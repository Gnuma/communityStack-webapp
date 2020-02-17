import React from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPage } from "next";
import Link from "next/link";
import { Category } from "../utils/types";
import axios from "axios";
import { CATEGORIES_RETRIEVE } from "../utils/endpoints";
import Button from "../components/Button";

const Index: NextPage<{ categories: Category[] }> = ({ categories }) => {
  return (
    <MainLayout>
      <div>
        {categories.map(item => {
          return (
            <Link key={item.id} href={`categories/${item.id}`}>
              <Button>{item.name}</Button>
            </Link>
          );
        })}
      </div>
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
