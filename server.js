/**
 * Created by bapaydin on 21.03.2017.
 */


var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var user = process.env.MODULUS_USER || 'bapaydin67';
var password = process.env.MODULUS_PASSWORD || '3239966bb';

console.log(user);
console.log(password);

mongoose.connect('mongodb://' + user + ':' + password + '@olympia.modulusmongo.net:27017/ividE2go');

app.use(express.static(__dirname + '/public')); //set the static files location
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json); //parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));//parse application/vnd.api+json as json
app.use(methodOverride());


var Todo = mongoose.model('Todo', {
    text: String
});

app.get('/api/todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
    });
});


app.post('/api/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) res.send(err);

        Todo.find(function (err, todos) {
            if (err) res.send(err);

            res.json(todos);
        });
    });
});


app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err) res.send(err);
        Todo.find(function (err, todos) {
            if (err) res.send(err1);

            res.json(todos);
        });
    });
});


app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("Listening on port 8080");