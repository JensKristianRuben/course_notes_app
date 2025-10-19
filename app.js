import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { readAndParseMarkdownFiles } from "./util/markdown.js";
import { readAndParseMarkdownFile } from "./util/markdown.js";


const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 




//=========================================MARKDOWN FILES=============================

const markdownHtmlFiles = readAndParseMarkdownFiles();
const readmeHtml =  readAndParseMarkdownFile();



// ========================================PAGES========================================
const indexPagePath = path.join(__dirname, "public", "index.html");
let indexPage = fs.readFileSync(indexPagePath).toString();

const fourZeroFourPagePath = path.join(__dirname, `public`, "404.html");
const fourZeroFourPage = fs.readFileSync(fourZeroFourPagePath).toString();

app.get("/markdown/:file", (req, res) => {
  const fileName = req.params.file;
  const htmlToSend = markdownHtmlFiles[fileName]  

  if (!fs.existsSync(path.join(__dirname, "markdown/", `${fileName}`))) {
    return res.status(404).send(fourZeroFourPage)
  }

  const indexPageToSend = indexPage
    .replace("$$MARKDOWNCONTENT$$", htmlToSend)
    .replace("$$TITLE$$", `Course_notes_app | ${fileName}`);

  res.send(indexPageToSend);
});


app.get("/", (req, res) => {

  const indexPageToSend = indexPage
  .replace("$$MARKDOWNCONTENT$$", readmeHtml)
  .replace("$$TITLE$$", "Course_notes_app")

  res.send(indexPageToSend);
});


// app.use() skal ligge under "/" endpointet - ellers læser express index filen før den muteres
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "images")));


// ========================================CONFIG========================================
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log("Server is running on: ", PORT);
});
