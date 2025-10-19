import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 


export function readAndParseMarkdownFiles() {
    const htmlFiles = {};
    const markdownPath = path.join(__dirname, "../markdown");
    const markdownFileNames = fs.readdirSync(markdownPath);
    
    markdownFileNames.forEach(file => {
      const markdownFileString = fs.readFileSync(path.join(markdownPath, file)).toString()
      const markdownFileStringToHTML = marked.parse(markdownFileString);
      
      htmlFiles[file] = markdownFileStringToHTML; // Jeg undrer mig lidt over den her syntaks, og hvorfor man ikke kan brug dot syntaksen
    });

    return htmlFiles;
}

export function readAndParseMarkdownFile() {
    const readmePath = path.join(__dirname, "../README")
    const readmeFileString = fs.readFileSync(readmePath).toString();
    const readmeFileStringToHtml = marked.parse(readmeFileString);

    return readmeFileStringToHtml;
}