// DOM elements
const subProgressBarEl = document.querySelector("[data-sub-progress-bar]");
const percentageEl = document.querySelector("[data-percentage]");
const formEl = document.querySelector("[data-form]");
const loaderEl = document.querySelector("[data-loader]");

// Event
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formEl);
  // const file = formData.get("file-upload");
  // console.log(file);

  // Send http request (XMLHttpRequest)
  const xhr = new XMLHttpRequest();

  // XHR events
  xhr.upload.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      loaderEl.style.display = "flex";
      loaderEl.style.animation = "flip 3s infinite";

      // Percentage
      const percentage = ((event.loaded / event.total) * 100).toFixed(0);

      subProgressBarEl.style.width = `${percentage}%`;
      percentageEl.textContent = `${percentage}%`;

      if (Number(percentage) >= 100) {
        formEl.reset();
        loaderEl.style.display = "none";
      }
    }
  });

  const API_URL = "http://localhost:8000";
  xhr.open("POST", API_URL);
  xhr.send(formData);
});
