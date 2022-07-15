var express  = require('express');
var router   = express.Router();
const { Questions } = require('../../models');

router.get('/questions', async (req, res) => {
    try {
        const questionsDB = await Questions.findAll({
            where : { SubCategoryId : '8' },
        })
        
        var questions = [];
        questionsDB.forEach((value, index) => {
            questions.push(value.questions_name)
        })
        console.log(questions.length);
        console.log(questions);

        res.send(questions)

    } catch (err){
        console.error(err);
        done(err);
    }
})



module.exports = router;