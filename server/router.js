const express = require('express');
const router = express.Router();

const info = require('./schema');

router.route('/applicants').get((req, res, next) => {
  info.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
