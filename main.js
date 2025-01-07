document.addEventListener("DOMContentLoaded", () => {
  const btnPersons = document.querySelector(".persons-btn");
  const dropDown = document.querySelector(".dropdown-box");
  const btnCta = document.querySelectorAll(".btn--cta");
  const inputArrival = document.querySelector("#arrival");
  const inputDeparture = document.querySelector("#departure");
  const btnSearch = document.querySelector(".search-btn");
  const select = document.querySelector(".select-category");
  const input = document.querySelectorAll("input");

  let initialPersonsCount = 0;
  let initialBabiesCount = 0;
  let initialAdultCount = 0;
  let initialChildrenCount = 0;

  function handleIncrementAndDecrement(counterVal, clicked, sign, type, adult, children, babies) {
    console.log(counterVal);
    if (clicked.classList.contains(`btn-adult-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
      adult;
    } else if (clicked.classList.contains(`btn-children-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
      children;
    } else if (clicked.classList.contains(`btn-babies-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
      babies;
    }
  }

  btnPersons.addEventListener("click", (e) => {
    e.preventDefault();
    dropDown.classList.toggle("hidden");
  });

  // Handle increment and decrement buttons
  btnCta.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const clicked = e.target;
      const btnSrc = clicked.dataset.src;
      const counterVal = document.querySelector(`.counter-value--${btnSrc}`);

      if (clicked.classList.contains("btn--increment")) {
        counterVal.textContent++;
        handleIncrementAndDecrement(counterVal, clicked, initialPersonsCount++, "increment", initialAdultCount++, initialChildrenCount++, initialBabiesCount++);
      } else {
        if (counterVal.textContent <= 0) return;
        counterVal.textContent--;
        handleIncrementAndDecrement(counterVal, clicked, initialPersonsCount--, "decrement", initialAdultCount--, initialChildrenCount--, initialBabiesCount--);
      }
    });
  });

  // Handle search button
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    if (select.value === "notSelected" || inputArrival.value === "" || inputDeparture.value === "" || initialAdultCount === 0 || initialChildrenCount === 0 || initialBabiesCount === 0) {
      alert("Please complete all fields before searching.");
    } else {
      const selectedInfos = {
        category: select.value,
        arrivalDate: inputArrival.value,
        departureDate: inputDeparture.value,
        totalGuests: initialPersonsCount
      };

      // Using URLSearchParams to build the query string
      const searchParams = new URLSearchParams({
        category: selectedInfos.category,
        arrival: selectedInfos.arrivalDate,
        departure: selectedInfos.departureDate,
        guests: JSON.stringify([
          { id: "adults", count: initialAdultCount },
          { id: "children", count: initialChildrenCount },
          { id: "babies", count: initialBabiesCount }
        ])
      });

      const baseUrl = 'http://127.0.0.1:5500/index.html/';
      const finalUrl = `${baseUrl}?${searchParams.toString()}`;
      window.open(finalUrl, '_blank');
      console.log(finalUrl);  // Open this URL or trigger the window.open
    }
  });

});
