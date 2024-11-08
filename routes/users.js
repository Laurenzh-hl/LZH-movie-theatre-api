const { Router } = require("express");
const { User, Show } = require("../models/index");
const router = Router();
const { check, validationResult, matchedData } = require("express-validator");

router.get("/", async function(req, res) {
    const users = await User.findAll();
    res.json(users);
});

router.get("/:userId", async function(req, res) {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.json(user);
});

router.get("/:userId/shows", async function (req, res) {
    const user = await User.findByPk(req.params.userId);

    if(!user) {
        res.status(200).json([]);
        return;
    }

    const shows = await user.getShows();
    res.json(shows);
});

router.post("/:userId/shows/:showId", async function (req, res) {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const show = await Show.findByPk(req.params.showId);

    if (!show) {
        res.status(404).json({ error: "Show not found" });
        return;
    }

    await user.addShow(show);
    res.send("Movie has been added to user's watched list");
});

module.exports = router;

