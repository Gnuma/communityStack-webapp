import * as Search from 'js-search';

export const search_topics = new Search.Search('name');
search_topics.addIndex('description')
  