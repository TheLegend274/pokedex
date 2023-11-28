// Get the input element with the ID "search-input"
const inputElement = document.querySelector("#search-input");

// Get the element with the ID "search-close-icon"
const search_icon = document.querySelector("#search-close-icon");

// Get the element with the class "sort-wrapper"
const sort_wrapper = document.querySelector(".sort-wrapper");

// Add an event listener for the "input" event on the input element
inputElement.addEventListener("input", () => {
  // Call the handleInputChange function when the input event is triggered
  handleInputChange(inputElement);
});

// Add an event listener for the "click" event on the search icon element
search_icon.addEventListener("click", handleSearchCloseOnClick);

// Add an event listener for the "click" event on the sort wrapper element
sort_wrapper.addEventListener("click", handleSortIconOnClick);

// Function to handle changes in the input element value
function handleInputChange(inputElement) {
  // Get the current value of the input element
  const inputValue = inputElement.value;

  // Check if the input value is not empty
  if (inputValue !== "") {
    // Add the class "search-close-icon-visible" to the search icon element
    document.querySelector("#search-close-icon").classList.add("search-close-icon-visible");
  } else {
    // Remove the class "search-close-icon-visible" from the search icon element
    document.querySelector("#search-close-icon").classList.remove("search-close-icon-visible");
  }
}

// Function to handle the "click" event on the search icon
function handleSearchCloseOnClick() {
  // Set the value of the input element to an empty string
  document.querySelector("#search-input").value = "";
  
  // Remove the class "search-close-icon-visible" from the search icon element
  document.querySelector("#search-close-icon").classList.remove("search-close-icon-visible");
}

// Function to handle the "click" event on the sort icon
function handleSortIconOnClick() {
  // Toggle the class "filter-wrapper-open" on the element with the class "filter-wrapper"
  document.querySelector(".filter-wrapper").classList.toggle("filter-wrapper-open");
  
  // Toggle the class "filter-wrapper-overlay" on the body element
  document.querySelector("body").classList.toggle("filter-wrapper-overlay");
}
