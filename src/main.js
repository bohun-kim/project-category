// 1.main.js파일이 실행되면 loadItems 함수를 실행
// loadItems함수가 data.json에 있는 데이터들을 읽고 난 후 exercise 전달
// data.json을 동적으로 읽어와야 하기 때문에 시간이 걸린다 그래서 promise를 사용하여 리턴하도록 만든다.

// data.json의 데이터 로드
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.exercise); //data.json안에 exercise만 추출
}

// json데이터를 string형식의 데이터로 변환 후 화면에 송출
    function displayExercise(exercise){
        const container = document.querySelector('.select_exercise-list')
        container.innerHTML = exercise.map(exercise => createHTMLString(exercise)).join('');
    }

    function createHTMLString(exercise){
        return `
        <li class="seclect_exercise">
        ${exercise.name}
        </li> 
        `
    }

    //카테고리 변수 설정                           
    const drop = document.querySelector(".dropdown"); //div
    const categoryContainer = document.querySelector(".select_categories"); //ul
    const toggleBtn = document.querySelector(".select_dropdown"); //button
    const selectBtn = document.querySelector(".selet-btn"); //ul>li>button

    drop.addEventListener("mousedown", (e) => {
        const target = e.target
        if(target.classList.contains("select_dropdown")){
            dropMenu();
        } else if(target.classList.contains("selet-btn")){
            selectMenu(target);
        }
    })

    //드롭다운
    function dropMenu(){
        categoryContainer.classList.toggle("show");
    }

    //선택한 운동 버튼에 보이기
    function selectMenu(category){
        toggleBtn.innerHTML = category.innerHTML;
        toggleBtn.classList.add('selected')
    }

    //블러효과
    toggleBtn.addEventListener('blur', () => {
         categoryContainer.classList.remove('show')
    })

    //클릭시 리스트 이벤트
    function setEventListeners(exercise){
        const logo = document.querySelector('.main-container_title');
        
        logo.addEventListener('click', () => displayExercise(exercise));
        drop.addEventListener('click', event => onButtonClick(event, exercise));
    }

    
    // 필터링 효과
    function onButtonClick(event,exercise){
        const dataset = event.target.dataset //버튼을 눌렀을 때 type 설정하면 hand
        const key = dataset.key; 
        const value = dataset.value;
        console.log(value)
        const filtered = exercise.filter( x => x[key] === value);
        displayExercise(filtered)             //x[key] = "type : foot" === value = html 안에 있는 data-value
    }                                         //아이템 오브젝트안에  key에 해당하는 값이 원하는 value와 똑같은 아이들만 전달
    

// main
loadItems()
.then(exercise => {
    displayExercise(exercise)       //전달받은 것을 나타내주는 함수
    setEventListeners(exercise)    //받아온 exercise들을 버튼을 누르면 필터링을 추가하는 함수
})