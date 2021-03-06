var myApp = angular.module("myApp", []);

myApp.filter('unique', function() {
  return function (arr, field) {
    var o = {}, i, l = arr.length, r = [];
    for(i=0; i<l;i+=1) {
      o[arr[i][field]] = arr[i];
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
    };
});

myApp.controller("BookController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newBook = {};
  self.books = [];

  getBooks();

  // read only
  function getBooks() {
    $http.get('/books')
      .then(function(response) {
        console.log(response.data);
        self.books = response.data;
      });
  }

  // tied to DOM thru self object
  self.addBook = function() {
    console.log('new book: ', self.newBook);
    $http.post('/books', self.newBook)
      .then(function(response) {
        console.log('POST finished. Get books again.');
        getBooks();
      });
  };

  self.deleteMe = function(bookObj) {
    console.log('delete', bookObj);
    $http.delete('/books/' + bookObj.id)
      .then(function(response) {
        console.log('DELETE finished. Get books again.');
        getBooks();
      });
  };

  self.editMe = function(bookObj) {
    $http.put('/books/' + bookObj.id, bookObj)
      .then(function(response) {
        console.log('Edited');
        getBooks();
      });
  };

}]);
