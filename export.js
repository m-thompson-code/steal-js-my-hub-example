var stealTools = require("steal-tools");

stealTools.export({
  steal: {
    main: "myhub/weather/weather",
    config: __dirname+"/package.json!npm"
  },
  options: {
    verbose: true
  },
  outputs: {
    "+amd": {},
    "+global-js": {
        exports: {
            "myhub/weather/weather":"weather",
            "jquery": "jQuery"
        },
        dest: __dirname+"/dist/global/weather.js"
    },
    "+global-css": {
      dest: __dirname+"/dist/global/weather.css"
    }
  }
});