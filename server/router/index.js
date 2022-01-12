const { Router } = require('express');
const Controller = require('../controller');

const router = Router();

router.get('/login', function(req, res) {
  res.status(200).send("hello world");
});
router.put('/register', Controller.createUser);

router.get('/posts', Controller.searchPost);
router.put('/post', Controller.createPost);
router.delete('/post', Controller.deletePost);
router.post('/post', Controller.updatePost);

router.get('/comments', Controller.searchComment);
router.put('/comment', Controller.createComment);
router.delete('/comment', Controller.deleteComment);
router.post('/comment', Controller.updateComment);

router.get('/users', Controller.searchUser);
router.put('/user', Controller.createUser);
router.delete('/user', Controller.deleteUser);
router.post('/user', Controller.updateUser);

module.exports = router;