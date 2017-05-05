const APIUtils = {
  test: function(callback) {
    return window.$l.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      method: 'GET',
      success(res) {
        console.log(res);
        callback(res);
      },
      error() {
        console.log("error");
      }
    });
  }
};

module.exports = APIUtils;
