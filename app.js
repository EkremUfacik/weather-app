const submit = document.querySelector(".btn");
const input = document.querySelector("#input");
const message = document.querySelector(".message");
const countries = document.querySelector(".countries");
let countryList = [];

submit.addEventListener("click", () => {
  if (!input.value) {
    message.innerHTML = "Please enter a city !";
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value},tr&appid=d8e60708295ee802e9cf04a5be1e1143&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong !");
        } else if (countryList.includes(input.value.toLowerCase())) {
          throw new Error(
            `You already enter ${
              input.value.charAt(0).toUpperCase() +
              input.value.slice(1).toLowerCase()
            } !`
          );
        }
        return res.json();
      })

      .then((data) => updateDom(data))
      .catch((error) => {
        message.innerHTML = error;
        input.value = "";
      });
  }
});

function updateDom(d) {
  const {
    main: { temp },
    weather,
  } = d;
  countries.innerHTML += `
  <div class="cards">
    <h5>${
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase()
    }</h5>
    <p class="temp">${Math.round(temp)}<span>°C</span></p>
    <img src="./img/${weather[0].description}.png" width="80px" alt="">
    <p class="w-desc">${weather[0].description.toUpperCase()}</p>
  </div>
  `;
  countryList.push(input.value.toLowerCase());
  input.value = "";
  message.innerHTML = "";
}

input.addEventListener("keydown", (e) => {
  e.code === "Enter" && submit.click();
});
