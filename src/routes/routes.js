const express = require("express");
const routes = require('express').Router(); // ja cria a instancia
const multer = require("multer");
const multerConfig = require('../config/multer');
const Post = require("../models/post");
const excluir = require("../sevices/deleteFunc");

//imagens
//app.use(express.static("uploads")) // jeito certo?
routes.use("/static", express.static("tmp/uploads"));

// posts
routes.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    const {originalname: name, size, filename: key} = req.file;
    console.log(req.file.destination)

    const post = await Post.create({
        name,
        size,
        key,
        url: req.file.path
    })

    return res.json(post);
})

// posts get 
routes.get('/posts', async (req, res ) => {
    const posts = await Post.find({});

    return res.json(posts);
})

//posts delete 
routes.delete("/posts/:id", async (req, res ) => {
    const item = await Post.findOne({key: req.params.id});

    var erro = {}

    try{
        excluir(item.url);
    } catch (err) {
        erro = err    
    }

    const deleted = await Post.deleteOne({key : req.params.id});
    
    return res.json({
        deleted,
        erro
    });
})



module.exports = routes;




