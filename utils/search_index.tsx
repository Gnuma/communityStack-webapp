import * as Search from "js-search";

export const createTopicSearcher = () => {
  const search_topics = new Search.Search("id");
  search_topics.addIndex("name");
  search_topics.addIndex("description");
  return search_topics;
};

export const createTutorialSearcher = () => {
  const search_tutorials = new Search.Search("id");
  search_tutorials.addIndex("title");
  search_tutorials.addIndex("abstract");
  return search_tutorials;
};
