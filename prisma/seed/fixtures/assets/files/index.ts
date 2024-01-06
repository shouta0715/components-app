async function getJsonPlaceHolder() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const data = await response.json();

  return data;
}

async function init() {
  const button = document.querySelector(".button");
  const h1 = document.querySelector(".h1");

  if (!button || !h1) {
    console.log("not found", button, h1);

    const data = await getJsonPlaceHolder();

    console.log(data);
    return;
  }

  button.addEventListener("click", async () => {
    const data = await getJsonPlaceHolder();

    console.log(data);

    h1.textContent = data.title;
  });
}

init();
