import store from './store.js';
import api from './api.js';

// This is helpful for debugging. It allows me to type store into the console and it will display everything currently in the store!!
// window.store = store;


// Generate Functions:

const generateLandingPage = function () {
  return `
  <section class="heading-wrapper">
    <h1 class="app-name">My Bookmarks</h1>
  </section>
  <section class="actions-box">
    <button class="new-bookmark-btn basicBtn">New Bookmark</button>
    <form class="rating-dropdown" action="">
      <label class="rating-label" for="rating">Minimum Rating</label>
      <select class="select-rating" id="rating" name="rating">
        ${generateOptions()}
      </select>
    </form>
  </section> 
  `; 
};

const generateOptions = function () {
  let options = [];

  for(let i = 0; i <= 5; i++) {
    if(store.ratingFilter === i) {
      options.push(`<option value="${i}" selected="${i}">${i}</option>`);
    } else {
      options.push(`<option value="${i}">${i}</option>`);
    }
  }
  return options;
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
  let condensedBookmark = `
  <div class="bookmark-expanded">
    <h4>Description</h4>
    <p>${bookmark.desc}</p>
    <div>
      <h4><a href="${bookmark.url}" target="_blank">SITE</a></h4>
      <button class="delete-btn" name="delete"><i class="far fa-trash-alt"></i></i></button>
    </div>
  </div>
  `;

  if (!bookmark.expanded) {
    condensedBookmark = '';
  }

  return `
  <article class="bookmark-card" data-id="${bookmark.id}" tabindex="0">
    <div class="bookmark-condensed">
      <h4 class="title">${bookmark.title}</h4>
      <span class="rating">${generateRatingString(bookmark.rating)}</span>
    </div>
    ${condensedBookmark}
  </article>
  `;
};

const generateNewBookmarkForm = function () {
  return `
  <section class="add-bookmark">
    <h3>Create New</h3>
    <form action="#" class="new-bookmark" id="submitBookmarkForm">
      <div>
        <label for="title">Title</label><br>
        <input type="text" id="title" name="title" required>
      </div>
      <div>
        <label for="url">URL</label><br>
        <input type="url" id="url" name="url" required>
      </div>
      <div>
        <label for="description">Description</label><br>
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
      <div class="form-buttons">
        <button class="basicBtn" id="submitBtn" type="submit">Submit</button>
        <button class="basicBtn" id="cancelBtn" type="button">Cancel</button>
      </div>
    </form>
  </section>
  `;
};

const generateErrorMessage = function () {
  return `
  <section class="error-message">
    <h4>${store.error}</h4>
  </section>
  `;
};


// Handle Functions:
const handleNewBookmarkClicked = function () {
  $( 'main' ).on('click', '.new-bookmark-btn', () => {    
    store.addingBookmark = true;    
    render();
  });
};

const handleMinimumRatingClicked = function () {
  $( 'main' ).on('input', '.select-rating', () => {
    let rating = $('.select-rating').val();

    // Line below displays number but break filter
    // $('.select-rating').val().change();
    store.ratingFilter = rating;

    render();
  });
  
};

const openBookmark = function (e) {
  let clickedId = getItemIdFromElement(e.currentTarget);

  store.bookmarks.forEach(bookmark => {
    if (bookmark.id === clickedId) {
      bookmark.expanded = !bookmark.expanded;
    }
  });
  
  render();
};

const handleBookmarkClicked = function () {
  $('main').on('click', '.bookmark-card', e => {
    openBookmark(e);
  });
};

// Added for Accessibility
const handleBookmarkKeyPress = function () {
  $('main').on('keypress', '.bookmark-card', e => {
    if ( event.which === 13 ) {
      openBookmark(e);
    }
  });
}

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
    store.addingBookmark = false;
    let form = $('#submitBookmarkForm');
    let formObject = serializeJson(form);
    
    api.createBookmark(formObject)
      .then((bookmark) => {
        store.addBookmark(bookmark); 
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        render();
        console.log('error has been thrown');
      });
  });
};

const deleteBookmark = function (e) {
  const id = getItemIdFromElement(e.currentTarget);
    
  api.deleteBookmark(id)
    .then(() => {
      store.findAndDelete(id);
      render();
    })
    .catch((error) => {
      store.setError(error.message);
      render();
    });
};

const handleDeleteClicked = function () {
  $( 'main' ).on('click', '.delete-btn', e => {
    deleteBookmark(e);
  });
};

// Added for Accessibility
const handleDeleteKeyPress = function () {
  $('main').on('keypress', '.delete-btn', e => {
    if ( event.which === 13 ) {
      deleteBookmark(e);    
    }
  });
}

const handleCancelClicked = function () {
  $( 'main' ).on('click', '#cancelBtn', () => {
    store.addingBookmark = false;
    render();
  });
};

// Render Function:

const render = function () {  
  // Filter does not reset. need to figure that out
  let bookmarks = store.filterBookmarks();
  let fillerImage = '<img class="fillerImage" src="https://images.unsplash.com/photo-1511148776-27c92f27f3b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" alt="bookstore reflection">';

  let page = '';
  page += generateLandingPage();

  if (store.error) {
    page += generateErrorMessage();
  }

  if (store.addingBookmark) {
    page += generateNewBookmarkForm();
  } 

  if (bookmarks.length < 1) {
    page += fillerImage;
  } else {
    page += generateBookmarksString(bookmarks);
  }


  $( 'main' ).html(page);
};




const bindEventListeners = function () {
  handleNewBookmarkClicked();
  handleMinimumRatingClicked();
  handleBookmarkClicked();
  handleBookmarkKeyPress(); 
  handleNewBookmarkSubmit();
  handleCancelClicked();
  handleDeleteClicked();
  handleDeleteKeyPress();
};

export default{
  render,
  bindEventListeners
};