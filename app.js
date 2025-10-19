import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
// import hljs from "highlight.js";
// import { JSDOM } from "jsdom";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//=========================================MARKDOWN FILES=============================

  const htmlFiles = {};
  const markdownPath = path.join(__dirname, "markdown");
  const markdownFileNames = fs.readdirSync(markdownPath);

  markdownFileNames.forEach(file => {
  const markdownFileString = fs.readFileSync(path.join(markdownPath, file)).toString();

  const markdownFileStringToHTML = marked.parse(markdownFileString);
  htmlFiles[file] = markdownFileStringToHTML;
});

  const readmePath = path.join(__dirname, "README.md");
  const readmeFileString = fs.readFileSync(readmePath, "utf-8");
  const readmeFileStringToHtml = marked.parse(readmeFileString);

// function highlightHtml(htmlString) {
//   const dom = new JSDOM(htmlString);
//   const codes = dom.window.document.querySelectorAll("pre code");

//   codes.forEach((codeElement) => {
//     const langClass = codeElement.className || "";
//     const lang = langClass.replace("language-", "") || undefined;

//     let highlighted;

//     if (lang && hljs.getLanguage(lang)) {
//       highlighted = hljs.highlight(codeElement.textContent, {
//         language: lang,
//         ignoreIllegals: true,
//       }).value;
//     } else {
//       highlighted = hljs.highlightAuto(codeElement.textContent).value;
//     }

//     codeElement.innerHTML = highlighted;
//     if (!codeElement.classList.contains("hljs"))
//       codeElement.classList.add("hljs");
//   });

//   return dom.serialize();
// }

// ========================================PAGES========================================

const indexPagePath = path.join(__dirname, "public", "index.html");
const fourZeroFourPagePath = path.join(__dirname, "public", "404.html");

const indexPage = fs.readFileSync(indexPagePath, "utf-8");
const fourZeroFourPage = fs.readFileSync(fourZeroFourPagePath, "utf-8");

app.get("/markdown/:file", (req, res) => {
  const fileName = req.params.file;
  const htmlToSend = htmlFiles[fileName];

  if (!fs.existsSync(path.join(__dirname, "markdown", fileName))) {
    return res.status(404).send(fourZeroFourPage);
  }

  // const testHtmltoSend = highlightHtml(htmlToSend)
  const indexPageToSend = indexPage
    .replace("$$MARKDOWNCONTENT$$", htmlToSend)
    .replace("$$TITLE$$", `Course_notes_app | ${fileName}`);

  res.send(indexPageToSend);
});

app.get("/", (req, res) => {


  // const testFileToSend = highlightHtml(readmeFileStringToHtml);
  const indexPageToSend = indexPage
    .replace("$$MARKDOWNCONTENT$$", readmeFileStringToHtml)
    .replace("$$TITLE$$", "Course_notes_app");

  res.send(indexPageToSend);
});

// app.use() skal ligge under "/" endpointet - ellers læser express index filen før den muteres
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "images")));

// ========================================CONFIG========================================
const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`🚀🚀🚀🚀🚀🚀🚀🚀 Server is running on port ${PORT} 🚀🚀🚀🚀🚀🚀🚀🚀`);
});
