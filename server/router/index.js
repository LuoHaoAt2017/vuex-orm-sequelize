import { Router } from 'express';

const router = Router();

router.get('/', function(req, res) {
  res.status(200).send("hello world");
});

router.get('/posts', function(req, res) {
  res.status(200).send("hello world");
});

router.put('/post', function(req, res) {
  res.status(200).send("hello world");
});

router.put('/comment', function(req, res) {
  res.status(200).send("hello world");
});

router.put('/dislike', function(req, res) {
  res.status(200).send("hello world");
});