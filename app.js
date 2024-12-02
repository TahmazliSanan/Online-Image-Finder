const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".image-list-wrapper");

runEventListener();

function runEventListener() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function search(e) {
  const value = searchInput.value.trim();
  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID yYopRtd67mIb7ijWvQBw5Zt2OatPZKYLpkyMCK_pi2s",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      Array.from(data.results).forEach((image) =>
        addImageToUI(image.urls.small)
      );
    })
    .catch((error) => console.log(error));
  e.preventDefault();
}

function clear() {
  searchInput.value = "";
  imageListWrapper.innerHTML = "";
  // Array.from(imageListWrapper.children).forEach((card) => card.remove());
}

function addImageToUI(url) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.className = "card";
  img.setAttribute("src", url);
  img.width = 350;
  img.height = 350;
  div.appendChild(img);
  imageListWrapper.appendChild(div);
}
