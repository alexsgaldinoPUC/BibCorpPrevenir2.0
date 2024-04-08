const proxy = [
  {
    "/api/*": {
    "target": 'http://localhost:5254',
    "secure": false,
    "pathRewrite": { "^/api" : "" },
    "changeOrigin": false,
    "logLevel": "debug"
    }
  }
];

module.exports = proxy
