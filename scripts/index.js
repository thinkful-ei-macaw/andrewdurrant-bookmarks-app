import bookmarksApp from './bookmarksApp.js';
import api from './api.js';
import store from './store.js';

// This line is helpful for debugging in the console. 
window.render = bookmarksApp.render;

const main = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => {
        store.addBookmark(bookmark);
        
      });
      bookmarksApp.render();
    })
    .catch((error) => {
      console.log(error);
    });

  bookmarksApp.bindEventListeners();
  bookmarksApp.render();
};

$(main);