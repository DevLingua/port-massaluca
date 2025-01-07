document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const btnPersons = document.querySelector(".persons-btn"); // Button to toggle dropdown
  const dropDown = document.querySelector(".dropdown-box"); // Dropdown box for person selection
  const btnCta = document.querySelectorAll(".btn--cta"); // Increment and decrement buttons
  const inputArrival = document.querySelector("#arrival"); // Input field for arrival date
  const inputDeparture = document.querySelector("#departure"); // Input field for departure date
  const btnSearch = document.querySelector(".search-btn"); // Search button
  const select = document.querySelector(".select-category"); // Dropdown for category selection
  const btnCloseModal = document.querySelector(".btn--close"); // Close button for modal
  const modalContainer = document.querySelector(".booking-modal"); // Modal container
  const allInput = document.querySelectorAll("input"); // All input fields
  const allCounterValue = document.querySelectorAll(".counter-value"); // Counter value elements

  // Initial values
  let initialPersonsCount = 0;
  let initialBabiesCount = 0;
  let initialAdultCount = 0;
  let initialChildrenCount = 0;

  /**
   * Closes the modal and hides the dropdown.
   */
  function closeModal() {
    modalContainer.style.display = "none";
    dropDown.classList.add("hidden");
  }

  /**
   * Toggles the visibility of the dropdown.
   */
  function handlePersonButton() {
    btnPersons.addEventListener("click", (e) => {
      e.preventDefault();
      dropDown.classList.toggle("hidden");
    });
  }

  handlePersonButton();

  /**
   * Resets all values to their initial states.
   */
  function handleResetValues() {
    initialPersonsCount = 0;
    initialBabiesCount = 0;
    initialAdultCount = 0;
    initialChildrenCount = 0;

    // Reset input values and styles
    allInput.forEach((input) => {
      input.value = "";
      addBorderColor(input, "rgb(128, 128, 128)");
    });

    // Reset select dropdown
    select.value = "notSelected";
    addBorderColor(select, "rgb(128, 128, 128)");

    // Reset counters
    allCounterValue.forEach((counter) => {
      counter.textContent = 0;
    });

    btnPersons.textContent = `Persons (0)`;
    dropDown.classList.add("hidden");
  }

  /**
   * Updates the border color of an element.
   * @param {HTMLElement} element - The element to update.
   * @param {string} color - The border color.
   */
  function addBorderColor(element, color) {
    element.style.borderColor = color;
  }

  /**
   * Handles closing the modal through the button or Escape key.
   */
  function handleCloseModal() {
    // Close modal with close button
    btnCloseModal.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  handleCloseModal();

  /**
   * Provides user feedback by adding a red border if input/select is empty.
   */
  function addUserFeedback() {
    // Add red border for empty input fields
    allInput.forEach((input) => {
      input.addEventListener("blur", () => {
        addBorderColor(input, input.value ? "rgb(128, 128, 128)" : "#e4371e");
      });
    });

    // Add red border for empty select dropdown
    select.addEventListener("blur", () => {
      addBorderColor(select, select.value === "notSelected" ? "#e4371e" : "rgb(128, 128, 128)");
    });
  }

  addUserFeedback();

  /**
   * Handles increment and decrement of counters.
   * Updates the person count and text dynamically.
   */
  function handleIncrementAndDecrement(counterVal, clicked, sign, type) {
    if (clicked.classList.contains(`btn-adult-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
    } else if (clicked.classList.contains(`btn-children-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
    } else if (clicked.classList.contains(`btn-babies-${type}`)) {
      sign;
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
    }
  }

  // Increment and decrement buttons logic
  btnCta.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const clicked = e.target;
      const btnSrc = clicked.dataset.src; // Get the data-src value (adult, children, babies)
      const counterVal = document.querySelector(`.counter-value--${btnSrc}`); // Get the specific counter value
  
      // Parse the current counter value as an integer
      let currentValue = parseInt(counterVal.textContent) || 0;
  
      // Increment or decrement based on the button type
      if (clicked.classList.contains("btn--increment")) {
        currentValue++; // Increment the counter
        counterVal.textContent = currentValue;
  
        // Update specific counters
        if (btnSrc === "adult") initialAdultCount = currentValue;
        if (btnSrc === "children") initialChildrenCount = currentValue;
        if (btnSrc === "babies") initialBabiesCount = currentValue;
      } else if (clicked.classList.contains("btn--decrement")) {
        if (currentValue > 0) {
          currentValue--; // Decrement the counter
          counterVal.textContent = currentValue;
  
          // Update specific counters
          if (btnSrc === "adult") initialAdultCount = currentValue;
          if (btnSrc === "children") initialChildrenCount = currentValue;
          if (btnSrc === "babies") initialBabiesCount = currentValue;
        }
      }
  
      // Dynamically update total persons count
      initialPersonsCount = initialAdultCount + initialChildrenCount + initialBabiesCount;
  
      // Debugging logs to verify updates
      console.log("Adult Count:", initialAdultCount);
      console.log("Children Count:", initialChildrenCount);
      console.log("Babies Count:", initialBabiesCount);
      console.log("Total Persons:", initialPersonsCount);
  
      // Update the "Persons" button text
      btnPersons.textContent = `Persons (${initialPersonsCount})`;
    });
  });
  
  /**
   * Handles the search button click.
   * Validates inputs and opens a new URL with query parameters.
   */
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    // Validation: Ensure at least one of the counters is greater than 0
    if (
      select.value === "notSelected" ||
      inputArrival.value === "" ||
      inputDeparture.value === "" ||
      (initialAdultCount === 0 && initialChildrenCount === 0 && initialBabiesCount === 0)
    ) {
      alert("Please complete all fields and ensure at least one person is selected.");
    } else {
      // Prepare selected information
      const selectedInfos = {
        category: select.value,
        arrivalDate: inputArrival.value,
        departureDate: inputDeparture.value,
        totalGuests: initialPersonsCount,
      };

      // Use URLSearchParams to build query string
      const searchParams = new URLSearchParams({
        category: selectedInfos.category,
        arrival: selectedInfos.arrivalDate,
        departure: selectedInfos.departureDate,
        guests: JSON.stringify([
          { id: "adults", count: initialAdultCount },
          { id: "children", count: initialChildrenCount },
          { id: "babies", count: initialBabiesCount },
        ]),
      });

      // Construct final URL and open in new tab
      const baseUrl = "https://booking.camping.care/es/camping-port-massaluca/";
      const finalUrl = `${baseUrl}?${searchParams.toString()}`;
      window.open(finalUrl, "_blank");

      // Reset values after successful search
      handleResetValues();
    }
  });
});
