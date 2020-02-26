const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path'); 
const fs = require('fs'); 

module.exports = {
    //toda aplicacao leva um tempo para ser buscada no servidor, entao precisa ser definido como async
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({    //como e uma requisicao que pode demorar utiliza await
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        req.io.emit('post', post);  //envia para todos do servidor que tem um novo post

        return res.json(post);
    }
};