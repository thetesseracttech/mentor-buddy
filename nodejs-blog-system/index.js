const path = require("path");

const edge = require("edge.js");

const express = require("express");

const { config, engine } = require("express-edge");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

const connectFlash = require("connect-flash");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

const app = new express();

app.use(connectFlash());

app.use(
  expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

mongoose.connect("mongodb://localhost/node-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("Connected!!"))
  .on("error", (error) => {
    console.log("Your error", error);
  });

app.use(express.static("public"));

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

config({ cache: process.env.NODE_ENV === "production" });

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(fileUpload());

app.use("/posts/store", storePost);

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", redirectIfAuthenticated, logoutController);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
