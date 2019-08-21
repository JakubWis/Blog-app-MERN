const Post = require('../models/post.model');
const uuid = require('uuid');

const getPosts = async (req, res) => {
    try {
        res.status(200).json(await Post.find())
    }catch(err){
        res.status(500).json(err);
    }
};

const getSinglePost = async (req, res) => {
    try {
        res.status(200).json( await Post.find({ id: req.params.id }) )
    }catch(err){
        res.status(500).json(err);
    }
}

const addPost = async (req, res) => {
    try {
        let newPost = new Post(req.body);
        newPost.id = uuid();

        postSaved = await newPost.save();
        res.status(200).json(postSaved);

    } catch(err) {
        res.status(500).json(err);
    }
};

const editPost = async (req, res) => {
    try {
        res.status(200).json( await Post.findOneAndUpdate({ id: req.params.id }, req.body, {upsert:true}) )

    } catch(err) {
        res.status(500).json(err);
    }
};

const getPostsByRange = async (req, res) => {
    try {
        let { startAt, limit } = req.params;

        startAt = parseInt(startAt);
        limit = parseInt(limit);

        const posts = await Post.find().skip(startAt).limit(limit)
        const amount = await Post.countDocuments();

        res.status(200).json({
            posts,
            amount,
        });
    
    }catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getPosts,
    getSinglePost,
    addPost,
    editPost,
    getPostsByRange
}