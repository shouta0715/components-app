const h1 = document.querySelector("h1");
const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    h1.innerHTML = "Hello World!";
  });
}
