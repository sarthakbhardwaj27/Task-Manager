const express = require("express");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const taskModel = require("./models/task");

const port = 5000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  // const tasks = await taskModel.find();
  // console.log(tasks)
  // // fs.readdir('./files', function(err,filenames){
  // //   // console.log(filenames);
  // //   if(err){
  // //     console.log(err);
  // //     return res.status(500).send(`Internal Server Error: ${err.message}`)
  // //   }

  // //   const filesWithoutExtension = filenames.map(file => file.split('.')[0].split('_').join(' '));
  // //   //passing the second filesNames just to ease the redirection process upon clicking "Read More"
  //   res.render("index",{fileTitles: tasks.title , fileNames: tasks.details});
  try {
    const tasks = await taskModel.find();
  //  console.log(tasks);

    // Check if tasks is an array and has elements
    if (Array.isArray(tasks) && tasks.length > 0) {
      const fileTitles = tasks.map((task) => task.title);
      const fileNames = tasks.map((task) => task.details);

      // Pass the correct variables to the template
      res.render("index", { fileTitles, fileNames });
    } else {
      // Handle the case where no tasks are found
      res.render("index", { fileTitles: [], fileNames: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("content", {
      title: req.params.filename.split(".")[0].split("_").join(" "),
      content: data,
    });
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("edit", {
      title: req.params.filename.split(".")[0].split("_").join(" "),
      content: data,
    });
  });
});

app.post("/create", async (req, res) => {
  console.log(req.body.title);
  console.log(req.body.details);
  let { title, details } = req.body;
  if (req.body.title !== "") {
    // fs.writeFile(`./files/${req.body.title.trim().split(' ').join('_')}.txt`,req.body.details, (err)=>{
    //   if(err){
    //     console.log(err)
    //   }
    let createdTask = await taskModel.create({
      title,
      details,
    });
    console.log(createdTask);
  }
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  // console.log(req.body)
  const filename = req.body.taskname.split(" ").join("_") + ".txt";
  // console.log(filename)
  fs.writeFile(`./files/${filename}`, req.body.content, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(`updated ${filename}`);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
