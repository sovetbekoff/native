var addButton = document.getElementById("btnCreate");
var modal = document.querySelector(".main-modal");
var saveButton = document.getElementById("btnSave");
var cardUl = document.getElementById("cardUl");

addButton.addEventListener("click", function () {
  modal.style.display = "flex";
});
let btnClose = document.querySelector("#btnClose");
btnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

saveButton.addEventListener("click", function () {
  var imageLink = document.getElementById("inpImage").value;
  var studentName = document.getElementById("inpName").value;
  var profession = document.getElementById("inpProfession").value;

  var studentData = {
    image: imageLink,
    name: studentName,
    profession: profession,
  };

  var students = JSON.parse(localStorage.getItem("students")) || [];
  var editIndex = saveButton.getAttribute("data-edit-index");

  if (editIndex !== null) {
    students[editIndex] = studentData;
    saveButton.removeAttribute("data-edit-index");
    updateCard(editIndex, studentData);
  } else {
    students.push(studentData);
    createCard(studentData, students.length - 1);
  }

  localStorage.setItem("students", JSON.stringify(students));

  modal.style.display = "none";
  clearFormFields();
});

window.addEventListener("load", function () {
  var students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach(function (student, index) {
    createCard(student, index);
  });
});

function createCard(data, index) {
  var newCard = document.createElement("li");
  newCard.classList.add("card");

  var cardContent = `
    <div class="img">
      <img src="${data.image}" alt="" />
      <h3 class="card-name">${data.name}</h3>
      <div class="card-profession">${data.profession}</div>
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
    </div>
  `;

  newCard.innerHTML = cardContent;
  cardUl.appendChild(newCard);

  attachCardButtonsEvents(newCard, index);
}

function updateCard(index, data) {
  var cardToUpdate = cardUl.children[index];

  var updatedCardContent = `
    <div class="img">
      <img src="${data.image}" alt="" />
      <h3 class="card-name">${data.name}</h3>
      <div class="card-profession">${data.profession}</div>
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
    </div>
  `;

  cardToUpdate.innerHTML = updatedCardContent;
  attachCardButtonsEvents(cardToUpdate, index);
}

function attachCardButtonsEvents(card, index) {
  var editButton = card.querySelector(".edit-button");
  var deleteButton = card.querySelector(".delete-button");

  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    var students = JSON.parse(localStorage.getItem("students")) || [];
    var student = students[index];

    document.getElementById("inpImage").value = student.image;
    document.getElementById("inpName").value = student.name;
    document.getElementById("inpProfession").value = student.profession;

    saveButton.setAttribute("data-edit-index", index);
    modal.style.display = "flex";
  });

  deleteButton.addEventListener("click", function (event) {
    event.preventDefault();
    var students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    card.remove();
  });
}

function clearFormFields() {
  document.getElementById("inpImage").value = "";
  document.getElementById("inpName").value = "";
  document.getElementById("inpProfession").value = "";
}

// /

//
// /

//
//
//
//

const addStudentBtn = document.getElementById("addStudentBtn");
const inputContainer = document.getElementById("inputContainer");
const studentInput = document.getElementById("studentInput");
const saveStudentBtn = document.getElementById("saveStudentBtn");
const studentsList = document.getElementById("studentsList");

let studentCounter = 1;

const savedFacts = JSON.parse(localStorage.getItem("studentFacts")) || [];
savedFacts.forEach((fact) => {
  const newFact = document.createElement("p");
  newFact.classList.add("itsText");
  newFact.textContent = `${studentCounter}. ${fact}`;
  studentsList.appendChild(newFact);
  studentCounter++;
});

addStudentBtn.addEventListener("click", () => {
  inputContainer.style.display = "block";
});
document.querySelector(".closeStudentBtn").addEventListener("click", () => {
  inputContainer.style.display = "none";
});

saveStudentBtn.addEventListener("click", () => {
  const inputValue = studentInput.value.trim();
  if (inputValue !== "") {
    const newFact = document.createElement("p");
    newFact.classList.add("itsText");
    newFact.textContent = `${studentCounter}. ${inputValue}`;
    studentsList.appendChild(newFact);

    savedFacts.push(inputValue);
    localStorage.setItem("studentFacts", JSON.stringify(savedFacts));

    studentInput.value = "";
    studentCounter++;
  }

  inputContainer.style.display = "none";
});

const lastBtn = document.querySelector(".lastBtn");

lastBtn.addEventListener("click", () => {
  const newCard = document.createElement("div");
  newCard.classList.add("lastElements");

  const newNumber = document.createElement("div");
  newNumber.classList.add("lastNumber");
  newNumber.textContent = (
    "0" +
    (document.querySelectorAll(".lastElements").length + 1)
  ).slice(-2);

  const newThemeInput = document.createElement("input");
  newThemeInput.setAttribute("type", "text");
  newThemeInput.setAttribute("placeholder", "Введите тему");
  newThemeInput.setAttribute("id", "studentInput");

  const newFactInput = document.createElement("input");
  newFactInput.setAttribute("type", "text");
  newFactInput.setAttribute("placeholder", "Введите факт");
  newFactInput.setAttribute("id", "studentInput");

  const saveButton = document.createElement("button");
  saveButton.textContent = "Сохранить";
  saveButton.setAttribute("id", "saveStudentBtn1");

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("closeButton");

  closeButton.addEventListener("click", () => {
    newCard.parentNode.removeChild(newCard);
  });

  saveButton.addEventListener("click", () => {
    const themeValue = newThemeInput.value.trim();
    const factValue = newFactInput.value.trim();

    if (themeValue !== "" && factValue !== "") {
      const newCardContent = document.createElement("div");
      newCardContent.classList.add("lastTheme");
      newCardContent.textContent = themeValue;

      const newFactContent = document.createElement("div");
      newFactContent.classList.add("lastFact");
      newFactContent.textContent = factValue;

      newCard.appendChild(newNumber);
      newCard.appendChild(newCardContent);
      newCard.appendChild(newFactContent);

      const cardsContainer = document.querySelector(".preventElements");
      cardsContainer.appendChild(newCard);

      const cardData = JSON.parse(localStorage.getItem("cards")) || [];
      cardData.push({ theme: themeValue, fact: factValue });
      localStorage.setItem("cards", JSON.stringify(cardData));

      newThemeInput.value = "";
      newFactInput.value = "";
      newCard.removeChild(newThemeInput);
      newCard.removeChild(newFactInput);
      newCard.removeChild(saveButton);
      newCard.removeChild(closeButton);
    } else {
      alert("Заполните все поля");
    }
  });

  newCard.appendChild(newNumber);
  newCard.appendChild(newThemeInput);
  newCard.appendChild(newFactInput);
  newCard.appendChild(saveButton);
  newCard.appendChild(closeButton); // Добавляем кнопку закрытия

  const cardsContainer = document.querySelector(".preventElements");
  cardsContainer.appendChild(newCard);
});
