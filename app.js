import express from "express";
import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { readAndParseMarkdownFiles, readAndParseMarkdownFile } from "./util/markdown.js";


const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 


//=========================================MARKDOWN FILES=============================


let markdownHtmlFiles = {};
let readmeHtml = "";
let indexPage = "";
let fourZeroFourPage = "";


async function init() {
  try {
    const indexPagePath = path.join(__dirname, "public", "index.html");
    const fourZeroFourPagePath = path.join(__dirname, "public", "404.html");

    indexPage = await fs.readFile(indexPagePath, "utf-8");
    fourZeroFourPage = await fs.readFile(fourZeroFourPagePath, "utf-8");


    markdownHtmlFiles = await readAndParseMarkdownFiles();
    readmeHtml = await readAndParseMarkdownFile();

    console.log("✅ Markdown files and templates loaded successfully");
  } catch (err) {
    console.error("❌ Initialization failed:", err);
    process.exit(1);
  }
}
// ========================================PAGES========================================

app.get("/markdown/:file", async (req, res) => {
  const fileName = req.params.file;
  const htmlToSend = markdownHtmlFiles[fileName]  

  try {
    await fs.access(path.join(__dirname, "markdown", fileName)); // tjekker om filen eksisterer
  } catch {
  return res.status(404).send(fourZeroFourPage);
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


init().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀🚀🚀🚀 Server is running on port ${PORT} 🚀🚀🚀🚀🚀🚀🚀🚀`);
  });
});