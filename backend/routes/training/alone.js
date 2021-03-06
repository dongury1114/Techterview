var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
const { Questions } = require('../../models');

router.get('/api/questions/:subcategory', async (req, res) => {
    try {
        const questionsDB = await Questions.findAll({
            where : { SubCategoryId : req.params.subcategory },
        })
        
        var questions = [];
        questionsDB.forEach((value) => {
            questions.push(value.questions_name)
        })
        shuffle(questions)
        data = {
            value : questions,
            cnt : questions.length
        }

        res.send(data)
    } catch (err){
        console.error(err);
        done(err);
    }
})



module.exports = router;