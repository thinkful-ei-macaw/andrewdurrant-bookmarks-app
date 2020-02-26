import store from './store.js';
import api from './api.js';



// Generate Functions:
const generateLandingPage = function (bookmarks) {
  // Initial page load of .actions and image
  return `
    <h1 class="app-name">My Bookmarks</h1>
    <article class="actions-box">
      <button class="add-bookmark-btn">New Bookmark</button>
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
    <section class="bookmark-section">
      ${generateBookmarksString(bookmarks)}
    </section>
    ${generateNewBookmarkForm()}
  `; 
};

const generateBookmarksString = function (bookmarks) {
  let bookmarksHtmlArray = bookmarks.map(bookmark => generateBookmarks(bookmark));
  return bookmarksHtmlArray.join('');
};

const generateRatingString = function (rating) {
  let starRating = [];
  for(let i = 0; i < rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }
  while(starRating.length < 5) {
    starRating.push('<i class="far fa-star"></i>');
  }
  return starRating.join('');
};

const generateBookmarks = function (bookmark) {
  return `
  <article class="bookmark-card" data-id="${bookmark.id}">
    <div class="bookmark-condensed">
      <h4 class="title">${bookmark.title}</h4>
      <span class="rating">${generateRatingString(bookmark.rating)}</span>
    </div>
    <div class="bookmark-expanded">
      <h4>Description</h4>
      <p>${bookmark.desc}</p>
      <div>
        <h4><a href="${bookmark.url}" target="_blank">SITE</a></h4>
        <button class="delete-btn" name="delete"><i class="far fa-trash-alt"></i></i></button>
      </div>
    </div>
  </article>
  `;
};

const generateNewBookmarkForm = function () {
  return `
  <section class="page add-bookmark hidden">
    <h1 class="app-name">My Bookmarks</h1>
    <h3>Create New:</h3>
    <form action="#" class="new-bookmark" id="submitBookmarkForm">
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
          <textarea type="text" id="description" name="desc" cols="200" rows="10" required></textarea>
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
};




// Handle Functions:
const handleNewBookmarkClicked = function () {
  // Renders form for new bookmark submission
  // This is done by changing bookmarks.newBookmarkClicked = true
  $( 'main' ).on('click', '.add-bookmark-btn', () => {
    $('.add-bookmark').toggleClass('hidden');
  });
};

const handleMinimumRatingClicked = function () {
  //This changes the value of store.bookmarks.ratingFilter to user selected
  
};

const handleBookmarkClicked = function () {
  // This takes the class of hidden off of the div that surrounds description and url and delete btn
  // $('.bookmark-section').on('click', '.bookmark-card', event => {
  //   // get the index of the item in store.items
  //   console.log('yes')
  //   const id = getItemIdFromElement(event.currentTarget);
  //   // delete the item
  //   console.log(id);
  // });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.bookmark-card')
    .data('id');
};

function serializeJson(form) {
  const formData = new FormData(form[0]);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

const handleNewBookmarkSubmit = function () {
  // This submits the form that turns into a fetch: POST
  $( 'main' ).on('submit', '.new-bookmark', (e) => {
    e.preventDefault();
    let form = $('#submitBookmarkForm');
    let formObject = serializeJson(form);
    console.log(formObject);
    
    api.createBookmark(formObject)
      .then((bookmark) => {
        store.addBookmark(bookmark); 
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
        console.log('oops');
      });
  });
};

const handleDeleteClicked = function () {
  $( 'main' ).on('click', '.delete-btn', event => {
    const id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
      });
  });
};

const handleCancelClicked = function () {
  // When cancel is clicked, we render the page after setting newBookmarkClicked back to false
  $( 'main' ).on('click', '#cancelBtn', () => {
    $('.add-bookmark').toggleClass('hidden');
  });
};



// Render Functions:
const render = function () {
  let bookmarks = [...store.bookmarks];
  let error = store.error;
  let ratingFilter = store.ratingFilter;


  // Write a func that checks for error in store

  const landingPage = generateLandingPage(bookmarks);
  $( 'main' ).html(landingPage);
};




const bindEventListeners = function () {
  handleNewBookmarkClicked();
  handleMinimumRatingClicked();
  handleBookmarkClicked();
  handleNewBookmarkSubmit();
  handleCancelClicked();
  handleDeleteClicked();
};

export default{
  render,
  bindEventListeners
};