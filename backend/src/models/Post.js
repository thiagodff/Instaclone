const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({    //vai falar quais colunas estao disponiveis dentro da tabela de banco de dados
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,   //cria um campo para cada registro, armazena data de criacao e data da ultima modificacao
});

module.exports = mongoose.model('Post', PostSchema);