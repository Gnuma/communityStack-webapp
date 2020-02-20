import * as Search from 'js-search';

export const search_topics = new Search.Search('name');
search_topics.addIndex('description')

export const search_tutorials = new Search.Search('id');
search_tutorials.addIndex('title');
search_tutorials.addIndex('abstract');
search_tutorials.addIndex('author_name')
