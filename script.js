document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill-amount");
  const errorMessage = document.getElementById("people-error");
  const tipButtons = document.querySelectorAll(".tip-button");
  const numberOfPeople = document.getElementById("people-count");
  const customTipInput = document.querySelector(".custom-tip-input");
  const tipAmountPerPerson = document.querySelector("#tip-amount");
  const totalAmountPerPerson = document.querySelector("#total-amount");
  const resetButton = document.querySelector("#reset-btn");
  const errorInput = document.querySelector(".error-input");
  let currentBillInput = 0;
  let currentPeople = 0;
  let currentTipPercentage = 0;

  // Performing event handliers
  // Handle bill inputs

  const handleBillInput = (e) => {
    currentBillInput = parseFloat(e.target.value || 0);
    calculateTotal();
    toggleResetButton();
  };

  //   handle custom tip
  const handleCustomTip = (e) => {
    const value = parseFloat(e.target.value || 0);
    currentTipPercentage = value / 100;
    calculateTotal();
    toggleResetButton();
    clearActiveButton();
  };

  tipButtons.forEach((tipButton) => {
    tipButton.addEventListener("click", () => {
      currentTipPercentage =
        parseFloat(tipButton.textContent.replace("%", "")) / 100;
      updateActiveButtons(tipButton);
      calculateTotal();
    });
  });

  // handle People Input
  const handlePeopleInputs = (e) => {
    const value = parseFloat(e.target.value);
    if (value === 0) {
      e.target.classList.add("error");
      //   errorMessage.style.display = "block";
      errorMessage.classList.add("visible");
      errorInput.classList.add("visible");
    } else {
      e.target.classList.remove("error");
      errorMessage.classList.remove("visible");
      errorInput.classList.remove("visible");
      //   errorMessage.style.display = "none";
      currentPeople = value;
      calculateTotal();
    }

    toggleResetButton();
  };

  const calculateTotal = () => {
    if (currentBillInput > 0 && currentPeople > 0) {
      const tipAmount = currentBillInput * currentTipPercentage;
      const totalAmount = currentBillInput + tipAmount;

      const tipAmountPerPerson = tipAmount / currentPeople;
      const totalAmountPerPerson = totalAmount / currentPeople;

      updateResult(tipAmountPerPerson, totalAmountPerPerson);
    }
  };

  const updateResult = (tipAmount = 0, totalAmount = 0) => {
    tipAmountPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
  };

  const clearActiveButton = () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
  };

  const updateActiveButtons = (selectedButtons) => {
    clearActiveButton();
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    selectedButtons.classList.add("active");
    customTipInput.value = "";
  };

  const handleResetButton = () => {
    currentBillInput = 0;
    currentPeople = 0;
    currentTipPercentage = 0;

    billInput.value = "";
    numberOfPeople.value = "";
    customTipInput.value = "";
    updateResult();

    clearActiveButton();
    numberOfPeople.classList.remove("error");
    errorMessage.style.display = "none";
    resetButton.disabled = true;
  };

  const toggleResetButton = () => {
    const billFilled = billInput.value.trim() !== "";
    const tipFilled = customTipInput.value.trim() !== "";
    const peopleFilled = numberOfPeople.value.trim() !== "";

    if (billFilled || tipFilled || peopleFilled) {
      resetButton.disabled = false;
    } else {
      resetButton.disabled = true;
    }
  };

  numberOfPeople.addEventListener("input", handlePeopleInputs);
  customTipInput.addEventListener("input", handleCustomTip);
  billInput.addEventListener("input", handleBillInput);
  resetButton.addEventListener("click", handleResetButton);
});
