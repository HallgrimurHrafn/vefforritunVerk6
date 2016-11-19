/* routes hér */
const express = require('express');
const schedule = require('./schedule.js');

const router = express.Router();

function indexG(req, res) {
  schedule.channels()
    .then((result) => {
      // her ma baeta vid adgerdum fyrir channels
      res.render('index', {
        channels: result.data.results,
        valinstod: 'null',
        err: false });
    });
}

function indexP(req, res) {
  const x = req.body.data;
  schedule.channels()
    .then((result) => {
      // her ma baeta vid adgerdum fyrir channel
      schedule.channel(x)
        .then((valid) => {
          // her ma baeta vid adgerdum fyrir channels
          res.render('index', {
            channels: result.data.results,
            valinstod: valid.data.results,
            err: false });
        })
        .catch((error) => {
          res.render('index', {
            channels: result.data.results,
            valinstod: 'null',
            err: true,
          });
        });
    })
    .catch((error) => {
      res.render('index', {
        channels: 'null',
        valinstod: 'null',
        err: true,
      })
    });
}


router.get('/', indexG);
router.post('/', indexP);

module.exports = router;
