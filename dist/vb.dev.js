"use strict";

var next = require('next');

var express = require('express');

var wooConfig = require('./wooConfig');

var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: wooConfig.siteUrl,
  consumerKey: wooConfig.consumerKey,
  consumerSecret: wooConfig.consumerSecret,
  wpAPI: true,
  version: 'wc/v1'
});
var port = 3005;
var dev = process.env.NODE_ENV !== 'production';
var app = next({
  dev: dev
});
var handle = app.getRequestHandler();
app.prepare().then(function () {
  var server = express();
  server.get('/getProducts', function (req, response) {
    WooCommerce.get('products', function (err, data, res) {
      response.json(JSON.parse(res));
    });
  });
  server.get('*', function (req, res) {
    return handle(req, res);
  });
  server.listen(port, function (err) {
    if (err) {
      throw err;
    }

    console.log("Ready on ".concat(port));
  });
})["catch"](function (ex) {
  console.error(ex.stack);
  process.exit(1);
});
;