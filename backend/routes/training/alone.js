var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
const { Questions } = require('../../models');

router.get('/api/questions', async (req, res) => {
    try {
        const questionsDB = await Questions.findAll({
            where : { SubCategoryId : '8' },
        })

        var questions = [];
        questionsDB.forEach((value) => {
            questions.push(value.questions_name)
        })
        res.send(shuffle(questions))
    } catch (err){
        console.error(err);
        done(err);
    }
})



module.exports = router;