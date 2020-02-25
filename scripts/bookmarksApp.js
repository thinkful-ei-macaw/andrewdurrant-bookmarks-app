import store from './store.js';
import api from './api.js';



// Generate Functions:
const generateLandingPage = function () {
  // Initial page load of .actions and image
  return `
    <h1 class="app-name">My Bookmarks</h1>
    <article class="actions">
      <button class="add-bookmark-clicked">New Bookmark</button>
      <form class="rating-dropdown" action="">
        <label class="rating-label" for="rating">Minimum Rating</label>
        <select class="select-rating" id="rating" name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </article>
    <section class="bookmark-container">
    </section>
  `; 
};

const generateBookmarks = function (bookmark) {
  return `
  <article class="bookmark-card">
    <div class="bookmark-condensed">
      <h4 class="title">${bookmark.title}</h4>
      <span class="rating">${bookmark.rating}</span>
    </div>
    <div class="bookmark-expanded">
      <h4>Description</h4>
      <p>${bookmark.description}</p>
      <div>
        <h4><a href="#">${bookmark.url}</a></h4>
        <button class="delete-btn" name="delete"><i class="far fa-trash-alt"></i></i></button>
      </div>
    </div>
  </article>
  `;
};

const generateNewBookmark = function () {
  return `
  <section class="page add-bookmark">
  <h1 class="app-name">My Bookmarks</h1>
  <h3>Create New:</h3>
  <form action="#" class="new-bookmark">
      <div>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" required>
      </div>
      <div>
        <label for="url">URL:</label><br>
        <input type="url" id="url" name="url" required>
      </div>
      <div>
        <label for="description">Description:</label><br>
        <textarea type="text" id="description" name="description" cols="200" rows="10" required></textarea>
      </div>
      <div class="radio-div">
        <div class="radio-btn">
          <input type="radio" id="5-star" name="rating" value="5" required>
          <label for="5-star">5 Stars</label><br>
        </div>
        <div class="radio-btn">
          <input type="radio" id="4-star" name="rating" value="4" required>
          <label for="4-star">4 Stars</label><br>
        </div>
        <div class="radio-btn">
          <input type="radio" id="3-star" name="rating" value="3" required>
          <label for="3-star">3 Stars</label><br>
        </div>
        <div class="radio-btn">
          <input type="radio" id="2-star" name="rating" value="2" required>
          <label for="2-star">2 Stars</label><br>
        </div>
        <div class="radio-btn">
          <input type="radio" id="1-star" name="rating" value="1" required>
          <label for="1-star">1 Star</label>
        </div>
      </div>
    <button id="submitBtn" type="submit">Submit</button>
    <button id="cancelBtn" type="button">Cancel</button>
  </form>
</section>
  `;
}




// Handle Functions:
const handleNewBookmarkClicked = function () {
  // Renders form for new bookmark submission
  // This is done by changing bookmarks.newBookmarkClicked = true
  $( 'main' ).on('click', '.add-bookmark-clicked', event => {
 
  });
};

const handleMinimumRatingClicked = function () {
  //This changes the value of store.bookmarks.ratingFilter to user selected
  $( 'main' ).on()
};

const handleBookmarkClicked = function () {
  // This takes the class of hidden off of the div that surrounds description and url and delete btn
};

const handleNewBookmarSubmit = function () {
  // This submits the form that turns into a fetch: POST
};

const handleCancelClicked = function () {
  // When cancel is clicked, we render the page after setting newBookmarkClicked back to false
}



// Render Functions:
const render = function () {

  let bookmarks = [...store.bookmarks];
  let addBookmarkClicked = store.addBookmarkClicked;
  let error = store.error;
  let ratingFilter = store.ratingFilter;

  const landingPage = generateLandingPage();

  $( 'main' ).html(landingPage);

  if (bookmarks.newBookmarkClicked) {
    const newBookmarkForm = generateNewBookmark();
    $( 'main' ).html(newBookmarkForm);
  }

  if (bookmarks.length > 0) {
    let bookmarksHtmlArray = bookmarks.map(bookmark => generateBookmarks(bookmark));
    bookmarksHtmlArray.join(',');
    $( '.bookmark-container' ).html(bookmarksHtmlArray);
  }

  


};




const bindEventListeners = function () {
  // all of my handle functions
};

export default{
  render,
  bindEventListeners
}