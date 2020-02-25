const bookmarks = [
  // I will need to delete this example
  {
    id: '13di74rfq',
    title: 'Flaviocopes',
    description: 'One of my favorite learning   resources for all things javascript',
    url: 'https://flaviocopes.com/javascript-expressions/',
    rating: 4
  },
  {
    id: '1378qt4rfq',
    title: 'Thinkful Dashboard',
    description: 'The center of my current universe',
    url: 'https://overview.thinkful.com/programs/web-development-full-time',
    rating: 5
  }
];
let newBookmarkClicked = true;
let error = null;
let ratingFilter = 0;


const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
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
  newBookmarkClicked,
  error, 
  ratingFilter,
  findById,
  addBookmark,
  findAndDelete,
  filterBookmarks,
  setError
};

