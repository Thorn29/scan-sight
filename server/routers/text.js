const express = require('express');
const router = new express.Router();
const db = require('../db/database');
const auth = require('../middleware/auth');
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}` );

router.post('/scan', (req, res) => {
  const { input } = req.body;

  stub.PostModelOutputs(
      {
          model_id: 'f1b1005c8feaa8d3f34d35f224092915',
          inputs: [{data: {image: {url: input}}}]
      },
      metadata,
      (err, response) => {
          if (err) {
              return res.status(400).send(err);
          }

          if (response.status.code !== 10000) {
              return res.status(500).send('Invalid link');
          }

          let outputData = [];
          let outputText = [];

          for (const c of response.outputs) {
            outputData.push(c.data.regions);
          }

          for (const c of outputData) {
            outputText.push(c.data.text.raw);
          }
          console.log('Yeah, you improved it');
          res.status(200).send(outputData);
      }
  );
});

router.get('/pinned', auth, (req, res) => {
  const { id } = req.user;

  db('entries').where({ author_id: id }).select('*')
  .then(response => {
    res.status(200).send(response);
  }).catch(err => res.sendStatus(500))
});

router.post('/pinned', auth, (req, res) => {
  const { id } = req.user
  const { content } = req.body;

  db('entries').returning('*').insert({ author_id: id, content })
  .then(response => res.status(200).send(response[0]))
  .catch(err => res.status(500).send(err));
});

router.delete('/pinned/:id', auth, (req, res) => {
  const author_id = req.user.id;
  const { id } = req.params;

  db('entries').where({ id, author_id }).del()
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).send('No such text, or you do not have necessary permissions to delete it'))
});

module.exports = router;
