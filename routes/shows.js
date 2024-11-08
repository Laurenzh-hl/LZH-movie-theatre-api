const { Router } = require("express");
const { User, Show } = require("../models/index");
const router = Router();
const { check, validationResult, matchedData } = require("express-validator");

// router.post("/", 
//     check("title").isLength({ min: 0, max:25 }),
//     async function(req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.json({error: errors.array()})
//     } else {
//     const show = await Show.create(req.body);
//     const shows = await Show.findAll();
//     res.json(shows);
//     }
// })

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

    const users = await show.getUsers();
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

router.get("/genre/:genre", async function (req, res) {
 const showsWithGenre = [];
 const shows = await Show.findAll();
 for (let i = 0; i < shows.length; i++) {
     if ((shows[i].genre).toLowerCase() == req.params.genre) {
         showsWithGenre.push(shows[i]);
    }
}
 res.json(showsWithGenre);
});


module.exports = router;