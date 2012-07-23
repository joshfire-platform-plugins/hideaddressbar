define([], function () {
  return function(runtime, params, callback) {

    if (params.deploy.flags.web) {
      runtime.readFile("src/lib.js",function(err,js) {
        if (err) return callback(err);
        params.content += js;
        callback();
      });
    } else {
      callback();
    }

    

  };
});
