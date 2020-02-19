import React from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPage } from "next";
import { Category } from "../utils/types";
import axios from "axios";

const Contributors: NextPage<{}> = ({}) => {
  return <MainLayout>Contributors</MainLayout>;
};

Contributors.getInitialProps = async () => {
  return {};
};

export default Contributors;
