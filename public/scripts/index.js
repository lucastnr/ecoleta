const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

console.log(modal)

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})

document.addEventListener('keyup', (event) => {
    if (event.keyCode == 27) {
        modal.classList.add("hide")
} })