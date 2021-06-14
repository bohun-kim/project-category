// data.json의 데이터 로드
function loadItems() {
  return fetch("data/data.json")
    .then(response => response.json())
    .then(json => json.exercise); //data.json안에 exercise만 추출
}

const container = document.querySelector(".select_exercise-list");

//json데이터를 string형식의 데이터로 변환 후 화면에 송출
function displayExercise(exercise) {
  container.innerHTML = exercise
    .map(exercise => createHTMLString(exercise))
    .join("");
}

function createHTMLString(exercise) {
  return `
        <li class="seclect_exercise">
        ${exercise.name}
        </li> 
        `;
}

//카테고리 변수 설정
const drop = document.querySelector(".dropdown"); //div
const categoryContainer = document.querySelector(".select_categories"); //ul
const toggleBtn = document.querySelector(".select_dropdown"); //button
const selectBtn = document.querySelectorAll(".select-btn"); //ul>li>button
const next = document.querySelector(".last-button_exercise");

drop.addEventListener("mousedown", e => {
  const target = e.target;
  //드롭다운 클릭
  if (target.classList.contains("select_dropdown")) {
    dropMenu();
    //카테고리 클릭
  } else if (target.classList.contains("select-btn")) {
    selectCategory(target);
  }
  return;
});

//드롭다운
function dropMenu() {
  categoryContainer.classList.toggle("show");
}

function selectCategory(category) {
  const toggleBtn = document.querySelector(".select_dropdown");
  toggleBtn.innerHTML = category.innerHTML;
  toggleBtn.classList.add("selected");
}

//블러 효과
toggleBtn.addEventListener("blur", () => {
  categoryContainer.classList.remove("show");
});

//클릭시 리스트 이벤트
function setEventListeners(exercise) {
  const logo = document.querySelector(".main-container_title");
  logo.addEventListener("click", () => displayExercise(exercise));
  categoryContainer.addEventListener("click", event =>
    onButtonClick(event, exercise)
  );
}

//필터링 효과
function onButtonClick(event, exercise) {
  const dataset = event.target.dataset; //버튼을 눌렀을 때 type 설정하면 hand
  const key = dataset.key;
  const value = dataset.value;
  const filtered = exercise.filter(e => e[key] === value);
  displayExercise(filtered);
}

//메뉴 선택시 버튼 활성황
container.addEventListener("click", x => {
  const target = x.target;
  next.removeAttribute("disabled");
});

//메인
loadItems().then(exercise => {
  displayExercise(exercise);
  setEventListeners(exercise);
});
