import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "images")));
// ========================================API========================================


//=========================================MARKDOWN FILES=============================

const htmlFiles = {};

const markdownPath = path.join(__dirname, "markdown");
const markdownFileNames = fs.readdirSync(markdownPath);

markdownFileNames.forEach(file => {
  const markdownFileString = fs.readFileSync(path.join(markdownPath, file)).toString()
  const markdownFileStringToHTML = marked.parse(markdownFileString);
  
  htmlFiles[file] = markdownFileStringToHTML; // Jeg undrer mig lidt over den her syntaks, og hvorfor man ikke kan brug dot syntaksen
});




// ========================================PAGES========================================
const indexPagePath = path.join(__dirname, "public", "index.html");
let indexPage = fs.readFileSync(indexPagePath).toString();

const fourZeroFourPagePath = path.join(__dirname, `public`, "404.html");
const fourZeroFourPage = fs.readFileSync(fourZeroFourPagePath).toString();

app.get("/markdown/:file", (req, res) => {
  const fileName = req.params.file;
  const htmlToSend = htmlFiles[fileName]  

  if (!fs.existsSync(path.join(__dirname, "markdown/", `${fileName}`))) {
    res.status(404).send(fourZeroFourPage)
  }

  const indexPageToSend = indexPage
    .replace("$$MARKDOWNCONTENT$$", htmlToSend)
    .replace("$$TITLE$$", `Fullstack node.js notes - ${fileName}`);

  res.send(indexPageToSend);
});


app.get("/", (req, res) => {
  res.send(indexPage);
});

// ========================================CONFIG========================================
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log("Server is running on: ", PORT);
});
