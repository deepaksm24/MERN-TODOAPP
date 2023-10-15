// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/api', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
