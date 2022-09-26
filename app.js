let submit = document.querySelector(".btn");
let input = document.querySelector("#input");
let message = document.querySelector(".message");
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
        } else if (countryList.includes(input.value)) {
          console.log(input.value);
          throw new Error(
            `You already enter ${
              input.value.charAt(0).toUpperCase() + input.value.slice(1)
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
  const countries = document.querySelector(".countries");
  const {
    main: { temp },
    weather,
  } = d;
  countries.innerHTML += `
  <div class="cards">
    <h5>${input.value.charAt(0).toUpperCase() + input.value.slice(1)}</h5>
    <p class="temp">${Math.round(temp)}<span>°C</span></p>
    <img src="./img/${weather[0].description}.png" width="80px" alt="">
    <p class="w-desc">${weather[0].description.toUpperCase()}</p>
  </div>
  `;
  countryList.push(input.value);
  input.value = "";
  message.innerHTML = "";
}

input.addEventListener("keydown", (e) => {
  e.code === "Enter" && submit.click();
});
