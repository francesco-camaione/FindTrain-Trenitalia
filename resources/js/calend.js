var calendar = document.getElementById("tableContainer");
var gridTable = document.getElementById("tableBody");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;

function createCalendar(date, side) {
  var currentDate = date;
  var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  var yearTitle = document.getElementById("year-name");
  var monthTitle = document.getElementById("month-name");

  var monthName = currentDate.toLocaleString("ita-IT", {
    month: "short"
  });
  var yearNum = currentDate.toLocaleString("ita-IT", {
    year: "numeric"
  });
  yearTitle.innerHTML = `${yearNum}`;
  monthTitle.innerHTML = `${monthName[0].toUpperCase() + monthName.substring(1)}`;

  if (side == "left") {
    gridTable.className = "animated fadeOutRight";
  } else {
    gridTable.className = "animated fadeOutLeft";
  }

  gridTable.innerHTML = "";

  var newTr = document.createElement("div");
  newTr.className = "row";
  var currentTr = gridTable.appendChild(newTr);

  for (let i = 1; i < startDate.getDay(); i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  }

  var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  lastDay = lastDay.getDate();

  for (let i = 1; i <= lastDay; i++) {
    if (currentTr.getElementsByTagName("div").length >= 7) {
      currentTr = gridTable.appendChild(addNewRow());
    }
    let currentDay = document.createElement("div");
    currentDay.className = "col"; // div giorno della settimana
    if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
      selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

      document.getElementById("selectedDay").innerHTML = selectedDate.toLocaleString("it", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      selectedDayBlock = currentDay;
      setTimeout(() => {
        currentDay.classList.add("activeDay");
        currentDay.classList.add("dayHover");
      }, 900);
    }
    currentDay.innerHTML = i;
    currentTr.appendChild(currentDay);
  }

  for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  }

  setTimeout(() => {
    if (side == "left") {
      gridTable.className = "animated fadeInLeft";
    } else if (side == "right") {
      gridTable.className = "animated fadeInRight";
    } else {
      gridTable.className = "animated fadeIn";
    }
  }, 270);

  function addNewRow() {
    let node = document.createElement("div");
    node.className = "row";
    return node;
  }
}

createCalendar(currentDate);

var prevMonthButton = document.getElementById("prevMonth");
var nextMonthButton = document.getElementById("nextMonth");

var prevYearButton = document.getElementById("prevYear");
var nextYearButton = document.getElementById("nextYear");

prevMonthButton.onclick = changeMonthPrev;
nextMonthButton.onclick = changeMonthNext;

prevYearButton.onclick = changeYearPrev;
nextYearButton.onclick = changeYearNext;

function changeMonthPrev() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  createCalendar(currentDate, "left");
}

function changeMonthNext() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  createCalendar(currentDate, "right");
}

function changeYearPrev() {
  var year_selected = document.getElementById('year-name').innerText;
  var currentYear = new Date().getFullYear();
  if (parseInt(year_selected) > currentYear) {
    currentDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
    createCalendar(currentDate, "down");
  }
}

function changeYearNext() {
  var year_selected = document.getElementById('year-name').innerText;
  var currentYear = new Date().getFullYear();
  if (year_selected == currentYear) {
    currentDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth());
    createCalendar(currentDate, "up");
  }
}

gridTable.onclick = function (e) {

  if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
    return;
  }

  if (selectedDayBlock) {
    if (selectedDayBlock.classList.contains("activeDay") && selectedDayBlock.classList.contains("dayHover")) {
      selectedDayBlock.classList.remove("activeDay");
      selectedDayBlock.classList.remove("dayHover");
    }
  }
  selectedDayBlock = e.target;
  selectedDayBlock.classList.add("activeDay");
  selectedDayBlock.classList.add("dayHover");

  selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));
}

function countUp() {
  var a = document.getElementById("n_adult_passeng").innerHTML
  if (a < 7) {
    a = parseInt(a) + 1
    document.getElementById("n_adult_passeng").innerHTML = a
  }
}

function countUp2() {
  var a = document.getElementById("n_baby_passeng").innerHTML
  if (a < 6) {
    a = parseInt(a) + 1
    document.getElementById("n_baby_passeng").innerHTML = a
  }
}

function countDown() {
  var a = document.getElementById("n_adult_passeng").innerHTML;
  if (parseInt(a) > 1) {
    a = parseInt(a) - 1;
    document.getElementById("n_adult_passeng").innerHTML = a;
  }
}

function countDown2() {
  var a = document.getElementById("n_baby_passeng").innerHTML;
  if (parseInt(a) > 0) {
    a = parseInt(a) - 1;
    document.getElementById("n_baby_passeng").innerHTML = a;
  }
}

let n = 0;
function swapStations() {
  var from_stat = document.getElementById("origin").value;
  var to_stat = document.getElementById("destination").value;
  n += 180;
  document.getElementById("swap_img").style.transform = `rotate(${n}deg)`;
  document.getElementById("swap_img").style.transition = "0.18s linear";
  document.getElementById("origin").value = to_stat;
  document.getElementById("destination").value = from_stat;
}