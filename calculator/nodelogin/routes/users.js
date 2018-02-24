var express = require('express');
var router = express.Router();


var users = [
    {
        username: "Mike",
        password: "mike123"
    },
    {
        username: "Tom",
        password: "tom123"
    },
    {
        username: "John",
        password: "john123"
    },
    {
        username: "Mac",
        password: "mac123"
    }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    // Just checking if the username is in our user's array
    var theUser = users.filter(function(user){
        return user.username === reqUsername;
    });

    // Check the password
    if(theUser.length === 1){
        theUser[0].password === reqPassword &&
        res.status(201).json({message: "Login successful"}) ||
        res.status(401).json({message: "Login failed"});
    } else {
        res.status(401).json({message: "Login failed"});
    }


    // if(theUser.password === reqPassword){
    //     res.status(201).json({message: "Login successful"});
    // } else {
    //     res.status(401).json({message: "Login failed"});
    // }

});


router.post('/calc', function (req, res, next) {
    try {
        console.log('hi calc in server');
        var number1 = parseFloat(req.body.number1);
        var number2 = parseFloat(req.body.number2);
        var operator = req.body.op;
        console.log(operator);
        console.log(number1);

        var answer = 0;

        if (operator === '+') {
            answer = number1 + number2;
        }
        else if (operator === '-') {
            answer = number1 - number2;
        }
        else if (operator === '*') {
            answer = number1 * number2;
        }
        else if (operator === '/') {
            if(number2 !== 0) {
                answer = number1 / number2;
            }
            else {
                answer = 'ERROR'
            }
        }
        else {
            answer = "Please Enter Valid Operator."

        }
        console.log(answer);
        res.json({result: answer})
    }
    catch (error) {
        result = "Please enter valid Input."
        res.json({result: result.toString()})
    }
});

module.exports = router;
