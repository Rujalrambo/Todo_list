const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://rujalshrsth:masterrujal@cluster0.7ra0dql.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

// Create a Mongoose model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

// // Create a new todo item
// const itemOne = new Todo({ item: 'run bro! run!' });

// // Save the new todo item to the database
// itemOne.save()
//     .then(result => {
//         console.log('Item stored:', result);
//     })
//     .catch(err => {
//         console.error('Error storing item:', err);
//     })
//     .finally(() => {
//         // Close the MongoDB connection when done
//         mongoose.connection.close();
//     });

// //for data interactions
//  var data= [{item:'help'},{item:'runn'}]

// parser for condition in post/delete in todo-list operations
var urlencodedParser = bodyParser.urlencoded({extended: false})

//main connection with app.js
module.exports = function(app){

//fetch data from todo.ejs
app.get('/todo', (req, res) => {
    // Fetch all todo items from the database
    Todo.find({}).exec()
    .then(data => {
        res.render('todo', { todos: data });
    })
    .catch(err => {
        console.error('Error fetching todos:', err);
        res.status(500).send('Internal Server Error');
    });

});

//post operation: todo-list 
app.post('/todo', urlencodedParser, (req, res) => {
    //get data from the view and add it to mongodb
    var newTodo = new Todo(req.body);
    newTodo.save() // Remove the callback
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error('Error saving todo:', err);
            res.status(500).send('Internal Server Error');
        });
});

//delete operation: todo-list
app.delete('/todo/:item', (req, res) => {
    //delete the requested data to be deleted from mongodb
    Todo.findOneAndDelete({ item: req.params.item.replace(/\-/g, " ") }) // Use findOneAndRemove
        .exec() // Execute the query
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error('Error deleting todo:', err);
            res.status(500).send('Internal Server Error');
        });
});
};