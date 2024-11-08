const { Router } = require("express");
const { User, Show } = require("../models/index");
const router = Router();
const { check, validationResult, matchedData } = require("express-validator");

router.get("/", async function(req, res) {
    const shows = await Show.findAll();
    res.json(shows);
});

router.get("/:showId", async function(req, res) {
    const show = await Show.findByPk(req.params.showId);

    if (!show) {
        res.status(404).json({ error: "Movie not found" });
        return;
    }

    res.json(show);
});

router.get("/:showId/users", async function (req, res) {
    const show = await Show.findByPk(req.params.showId);

    if(!show) {
        res.status(200).json([]);
        return;
    }

    const users = show.getUsers();
    res.json(users);
});

router.put("/:showId/available", async function (req, res) {
    const show = await Show.findByPk(req.params.showId);
    if (show.available === true){
        await show.update({ available: false});
    } else if (show.available === false){
        await show.update({ available: true});
    }

    res.send("Movie's availability updated");
})

router.delete("/:showId", async function (req, res) {
    const deletedShow = await Show.destroy({where: {id: req.params.showId}});
    res.send("Movie removed");
})

router.get("/:showGenre", async function (req, res) {
    const showsWithGenre = await Show.findAll({where: {genre: req.params.showGenre}});
    res.json(showsWithGenre);
})


module.exports = router;