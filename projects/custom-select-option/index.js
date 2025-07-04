// DOM elements
const arrowBtn = document.getElementById("arrow");
const options = document.getElementsByClassName("option");

// Functions
const handleComputeOptions = () => {
  Array.from(options)
    .slice(1)
    .forEach((opt) => {
      if (opt.style.display === "" || opt.style.display === "none") {
        opt.style.display = "block";
        arrowBtn.style.transform = "rotate(270deg)";
      } else {
        opt.style.display = "none";
        arrowBtn.style.transform = "rotate(90deg)";
      }

      opt.addEventListener("click", () => {
        Array.from(options)
          .slice(1)
          .forEach((opt2) => {
            opt2.style.display = "none";
            arrowBtn.style.transform = "rotate(90deg)";
          });

        // Get value from li
        const value = opt.textContent;
        options[0].textContent = value;
      });

      // Re add thr first li
      Array.from(options).push(
        (options[0].textContent = "Sélectionnez un pays")
      );
    });
};

// Events
arrowBtn.addEventListener("click", handleComputeOptions);
