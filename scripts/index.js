import $ from 'jquery';
// import 'normalize.css';
// import './index.css';
import bookmarksApp from './bookmarksApp';
import api from './api';
import store from './store';

const main = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addItem(bookmark));
      bookmarksApp.render();
    });

  bookmarksApp.bindEventListeners();
  bookmarksApp.render();
};

$(main);