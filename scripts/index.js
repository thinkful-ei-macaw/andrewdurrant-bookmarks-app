import bookmarksApp from './bookmarksApp.js';
import api from './api.js';
import store from './store.js';

const main = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addItem(bookmark));
      bookmarksApp.render();
    })
    .catch((error) => console.log(error)

    );

  bookmarksApp.bindEventListeners();
  bookmarksApp.render();
};

$(main);