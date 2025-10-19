// import fs from "fs";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import { marked } from "marked";
// import hljs from "highlight.js";
// import { JSDOM } from "jsdom";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export function readAndParseMarkdownFiles() {
//   const htmlFiles = {};
//   const markdownPath = path.join(__dirname, "../markdown");
//   const markdownFileNames = fs.readdirSync(markdownPath);

//   for (const file of markdownFileNames) {
//     const markdownFileString = fs.readFileSync(path.join(markdownPath, file),"utf-8");
//     const markdownFileStringToHTML = marked.parse(markdownFileString);
//     const highlightedHtmlFiles = highlightHtml(markdownFileStringToHTML);
//     htmlFiles[file] = highlightedHtmlFiles;
//   }


//   return htmlFiles;
// }

// export function readAndParseMarkdownFile() {
//   const readmePath = path.join(__dirname, "../README.md");
//   const readmeFileString = fs.readFileSync(readmePath, "utf-8");
//   const readmeFileStringToHtml = marked.parse(readmeFileString);

//   const highlightedHtml = highlightHtml(readmeFileStringToHtml);

//   return highlightedHtml;
// }

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
