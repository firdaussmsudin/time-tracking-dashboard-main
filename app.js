fetchData();

// menu function
menu = document.getElementById("bottom-navbar").children;
menuArray = Array.from(menu);

menuArray.forEach((element) => {
  element.addEventListener("click", () => {
    current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    element.classList.add("active");
    fetchData();
  });
});
// end menu function

// fetch data from local json
function fetchData() {
  currentPage = document
    .getElementsByClassName("active")[0]
    .innerHTML.toLowerCase();

  currentString =
    currentPage == "daily"
      ? "Last Day - "
      : currentPage == "weekly"
      ? "Last Week - "
      : "Last Month - ";

  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i < 6; i++) {
        currentTime =  data[i]["timeframes"][currentPage]["current"];
        displayCurrent = currentTime > 1? currentTime+'hrs': currentTime+'hr';
        previousTime = data[i]["timeframes"][currentPage]["previous"];
        displayPrevious = previousTime > 1? previousTime+'hrs': previousTime+'hr';
        document.getElementsByClassName("activity-duration")[i].innerHTML = displayCurrent;
        document.getElementsByClassName("activity-last")[i].innerHTML =
          currentString + displayPrevious;
      }
    });
}

// end fetch data
