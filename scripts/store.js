const bookmarks = [];

let error = null;
let ratingFilter = 0;
let addingBookmark = false;


const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
};


const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const filterBookmarks = function () {
  // change filter to the number the user chose
  return this.bookmarks.filter(bookmark => bookmark.rating >= this.ratingFilter);
  // filter bookmarks by rating
};

// Still trying to understand errors!
const setError = function (error) {
  this.error = error;
};


export default {
  bookmarks, 
  error, 
  ratingFilter,
  addingBookmark,
  findById,
  addBookmark,
  findAndDelete,
  filterBookmarks,
  setError
};

