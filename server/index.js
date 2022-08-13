const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User, Detail } = require(path.resolve(__dirname, '../models', 'models.js'));//"./models/models.js");

const username = "admin";
const password = "fEqagyZ09y4zln1T";
const cluster = "cluster0.yiqa6";
const dbname = "secretGarageDB";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const PORT = process.env.PORT || 3001;

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/users", async (request, response) => {
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
});

// TODO: need to remove it it's just for testing
app.get("/createUser", async (request, response) => {
    const user = new User({
        "name": "Andrii",
        "age": "28"
    });
    console.log(user);
    try {
        await user.save();
        response.send(user);
      } catch (error) {
        response.status(500).send(error);
      }
});

app.get("/details", async (request, response) => {
    const details = await Detail.find({}).limit(request.query.take)
        .skip(request.query.skip);
    const total = await Detail.count();
  
    try {
      response.send({ details: details, total: total });
    } catch (error) {
      response.status(500).send(error);
    }
});

app.delete("/details", async (request, response) => {
    try {
        console.log(request.query.id);
      await Detail.deleteOne({ _id: request.query.id });
  
      response.send("Detail was successsssfully deleted.");
    } catch (error) {
      response.status(500).send(error);
    }
});

app.post("/add_detail", async (request, response) => {
    console.log(request.body);
    const detail = new Detail(request.body);
  
    try {
        await detail.save();
        response.send(detail);
    } catch (error) {
        response.status(500).send(error);
    } 
});

app.post("/add_user", async (request, response) => {
    const user = new User(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is listening port ${PORT}`);
})