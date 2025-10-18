function copyCommand(button) {
    const command = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(command).then(() => {
        button.style.backgroundColor = "#339933";
        setTimeout(() => (button.style.backgroundColor = "#f3f4f6"), 1500);
    });
}

function navigateClassTopics(topic) {

    const currentActive = document.querySelector('.subjects.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    const subject = document.querySelector(`[data-topic="${topic}"]`);
    console.log(subject);

    subject.classList.add('active');

}

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