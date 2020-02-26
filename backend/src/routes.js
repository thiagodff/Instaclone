const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController');
const LikeControler = require('./controllers/LikeControler');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.single('image'), PostController.store);  //rota do tipo get, (req, res) é um middleware, receptor de chamadas e requisições
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeControler.store);


module.exports = routes;