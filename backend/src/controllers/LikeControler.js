const Post = require('../models/Post');

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        await post.save();

        req.io.emit('like', post);  //envia para todos do servidor o like
        return res.json(post);
    }
};