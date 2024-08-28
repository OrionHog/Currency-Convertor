New! Keyboard shortcuts … Drive keyboard shortcuts have been updated to give you first-letters navigation
// const BASE_URL =
//   "http://free.currencyconverterapi.com/api/v3/convert?q='&compact=ultra";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === " " || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  const URL = "http://free.currencyconverterapi.com/api/v3/convert?q=' . $from_Currency . '_' . $to_Currency . '&compact=ultra"
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amount * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
