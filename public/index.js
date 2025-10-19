addCopyHandlersForAllCodeSnippets();

function addCopyHandlersForAllCodeSnippets(){
    const codeSnippetsCodeTag = document.querySelectorAll("pre")
    

    codeSnippetsCodeTag.forEach(element => {
        element.addEventListener("click", () => {
            const codeToCopy = element.firstElementChild.innerText;
            navigator.clipboard.writeText(codeToCopy);
            element.style.border = "3px solid #339933"
            setTimeout(() => {
                element.style.border = "none";
            },2000)
        });
    });
}


// Skal lige ligges lidt smartere
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.navigation-bar');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});