const express = require("express");
const router = express.Router();
const Forum = require('../models/ForumModel');

router.post('/createAdMusician', async (req, res) => {

    const token = req.query.token;
    console.log(token);
    const newForum = Forum({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        accountType: req.body.accountType,
        instrument: req.body.instrument,
        genre: req.body.genre,
        location: req.body.location,
        createdAt: Date.now()
   });

   await newForum.save();
   res.send(newForum);
});

router.post('/createAdTavern', async (req, res) => {

    const token = req.query.token;
    console.log(token);
    const newForum = Forum({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        genre: req.body.genre,
        type: req.body.type,
        accountType: req.body.accountType,
        location: req.body.location,
        createdAt: Date.now()
   });

   console.log("Account type:")
   console.log(req.body.types);
   await newForum.save();
   res.send(newForum);
});

router.post('/createAdBand', async (req, res) => {

    const token = req.query.token;
    console.log(token);
    const newForum = Forum({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        accountType: req.body.accountType,
        instrument: req.body.instrument,
        genre: req.body.genre,
        location: req.body.location,
        createdAt: Date.now()
   });

   console.log("Account type:")
   console.log(req.body.types);
   await newForum.save();
   res.send(newForum);
});

router.get('/getMusicians', async (req, res) => {
    console.log(req.query.accountType);
    /* use this to select based on checked filters */
    const query = await Forum.find({ accountType : "musician"}); /* .select({title: "rock"}); */
    // console.log(query);

    res.send(query);
});

router.get('/getMusiciansFilter', async (req, res) => {
    /* use this to select based on checked filters */
    console.log(req.body.accountType)
    if (req.query.genre === undefined && req.query.instrument === undefined && req.query.location === "not_selected") {
        console.log("nothing checked");
        const query = await Forum.find({ accountType: "musician" });
        res.send(query);
    }
    else if (req.query.genre === undefined && req.query.location === "not_selected") {
        console.log("only instrument selected");
        const query = await Forum.find({ accountType: "musician", instrument: req.query.instrument });
        res.send(query);
    }
    else if (req.query.genre === undefined && req.query.instrument === undefined) {
        console.log("only location");
        const query = await Forum.find({ accountType: "musician", location: req.query.location });
        res.send(query);
    }
    else if (req.query.location === "not_selected" && req.query.instrument === undefined) {
        console.log("only genre");
        const query = await Forum.find({ accountType: "musician", genre: req.query.genre });
        res.send(query);
    }
    else if (req.query.location === "not_selected") {
        console.log("genre and instrument")
        const query = await Forum.find({ accountType: "musician", genre: req.query.genre, instrument: req.query.instrument });
        res.send(query);
    }
    else if (req.query.instrument === undefined) {
        console.log("genre and location");
        const query = await Forum.find({ accountType: "musician", genre: req.query.genre, location: req.query.location });
        res.send(query);
    }
    else if (req.query.genre === undefined) {
        console.log("instrument and location")
        const query = await Forum.find({ accountType: "musician", instrument: req.query.instrument, location: req.query.location });
        res.send(query);
    }
    else {
        console.log("checked genre, instrument and average age");
        const query = await Forum.find({ accountType: "musician", genre: req.query.genre, instrument: req.query.instrument, location: req.query.location });
        res.send(query);
    }

    // res.send(query);
});

router.get('/getByEmail', async (req, res) => {
    const query = await Forum.find({ user : req.query.email});
    res.send(query);
});

router.get('/getBands', async (req, res) => {
    console.log(req.query.accountType);
    /* use this to select based on checked filters */
    const query = await Forum.find({ accountType: "band" });

    res.send(query);
});

router.get('/getBandsFilter', async (req, res) => {
    /* use this to select based on checked filters */
    console.log(req.body.accountType)
    if (req.query.genre === undefined && req.query.instrument === undefined && req.query.location === "not_selected") {
        console.log("nothing checked");
        const query = await Forum.find({ accountType: "band" });
        res.send(query);
    } 
    else if (req.query.genre === undefined && req.query.location === "not_selected") {
        console.log("only instrument selected");
        const query = await Forum.find({ accountType: "band", instrument: req.query.instrument });
        res.send(query);
    } 
    else if (req.query.genre === undefined && req.query.instrument === undefined) {
        console.log("only location");
        const query = await Forum.find({ accountType: "band", location: req.query.location });
        res.send(query);
    }
    else if (req.query.location === "not_selected" && req.query.instrument === undefined) {
        console.log("only genre");
        const query = await Forum.find({ accountType: "band", genre: req.query.genre });
        res.send(query);
    }
    else if (req.query.location === "not_selected") {
        console.log("genre and instrument")
        const query = await Forum.find({ accountType: "band", genre: req.query.genre, instrument: req.query.instrument });
        res.send(query);
    }
    else if (req.query.instrument === undefined) {
        console.log("genre and location");
        const query = await Forum.find({ accountType: "band", genre: req.query.genre, location: req.query.location });
        res.send(query);
    }
    else if (req.query.genre === undefined) {
        console.log("instrument and location")
        const query = await Forum.find({ accountType: "band", instrument: req.query.instrument, location: req.query.location });
        res.send(query);
    }
    else {
        console.log("checked genre, instrument and average age");
        const query = await Forum.find({ accountType: "band", genre: req.query.genre, instrument: req.query.instrument, location: req.query.location });
        res.send(query);
    }

    // res.send(query);
});

router.get('/getTaverns', async (req, res) => {
    console.log(req.query.accountType);
    /* use this to select based on checked filters */
    const query = await Forum.find({ accountType: "tavern" });
    res.send(query);
});

router.get('/getTavernsFilter', async (req, res) => {
    console.log("type of tavern: " + req.query.type);
    console.log("location: " + req.query.location);
    
    /* use this to select based on checked filters */
    if (req.query.type === undefined && req.query.location === "not_selected") {
        console.log("nothing checked");
        const query = await Forum.find({ accountType: "tavern" });
        res.send(query);
    } 
    else if (req.query.type === undefined) {
        const query = await Forum.find({ accountType: "tavern", location: req.query.location });
        res.send(query);
    }
    else if (req.query.location === "not_selected") {
        console.log("upao ovde")
        const query = await Forum.find({ accountType: "tavern", type: req.query.type });
        res.send(query);
    }
    else {
        console.log("checked type and location");
        const query = await Forum.find({ accountType: "tavern", type: req.query.type, location: req.query.location });
        res.send(query);
    }

    // const query = await Forum.find({ accountType : req.query.accountType, instruments: req.query.instruments, genres: req.query.genres});

    // res.send(query);
});



router.get('/getAllAds', async (req, res) => {
    console.log(req.query.accountType);
    const query = await Forum.find(); /* .select({title: "rock"}); */
    // console.log(query);

    res.send(query);
});


// delete Ad
router.post('/deleteAd', async (req, res) => {
    console.log(req.body.id);
    try {
        await Forum.findOneAndDelete( { _id: req.body.id });
        console.log("Deleted ad!");
    } catch (e) {
        console.log("Delete ad failed!");
    }

    res.send();
});


module.exports = router;