const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

const port = 5000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  fs.readdir('./files', function(err,filenames){
    // console.log(filenames);
    if(err){
      console.log(err);
      return res.status(500).send(`Internal Server Error: ${err.message}`)
    }

    const filesWithoutExtension = filenames.map(file => file.split('.')[0].split('_').join(' '));
    //passing the second filesNames just to ease the redirection process upon clicking "Read More"
    res.render("index",{fileTitles: filesWithoutExtension , fileNames: filenames});
  })
});

app.get('/files/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"utf-8", (err,data)=>{
    if(err){
      console.log(err)
    }
    res.render('content', {title: req.params.filename.split('.')[0].split('_').join(' ') , content: data})
  })
})

app.get('/edit/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"utf-8", (err,data)=>{
    if(err){
      console.log(err)
    }
    res.render('edit', {title: req.params.filename.split('.')[0].split('_').join(' ') , content: data})
  })
})

app.post('/create', (req, res) => {
  console.log(req.body.title);
  console.log(req.body.details);
  if(req.body.title !== ''){
    fs.writeFile(`./files/${req.body.title.trim().split(' ').join('_')}.txt`,req.body.details, (err)=>{
      if(err){
        console.log(err)
      }
    })
  }
  res.redirect('/')
})

// app.post('/edit',(req,res)=>{
//   console.log(req.body.content)
//   fs.writeFile(`./files/${req.body.content.trim().split(' ').join('_')}.txt`,req.body.content, (err)=>{
//     if(err){
//       console.log(err)
//     }
//   })
//   console.log(`updated ${req.body.content.trim().split(' ').join('_')}.txt`)
//   res.redirect('/')
// })
app.listen(port, ()=>{
  console.log(`listening on ${port}`)
});