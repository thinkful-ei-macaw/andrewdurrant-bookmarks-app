const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrewd';

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = { code: res.status };
      }
      // In either case, parse the JSON stream:
      return res.json();
    })
    .then(data => {
    // If error was flagged, reject the Promise with the error object
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      // Otherwise give back the data as resolved Promise
      return data;
    });
}

function getBookmarks(){
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createBookmark(bookmark){
  const newBookmark = JSON.stringify({bookmark});
    
  return listApiFetch( `${BASE_URL}/bookmarks`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: newBookmark
  });
}

function deleteBookmark(id) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`,{
    method: 'DELETE',
  });
}

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};