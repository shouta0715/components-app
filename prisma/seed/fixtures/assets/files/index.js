const h1 = document.querySelector("h1");
const button = document.querySelector("button");
console.log("Script loaded", h1, button);
if (button) {
  button.addEventListener("click", () => {
    console.log("Button clicked");
    h1.innerHTML = "Hello World!";
  });
}
