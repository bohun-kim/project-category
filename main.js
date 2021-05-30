// 1.main.js파일이 실행되면 loadItems 함수를 실행
// loadItems함수가 data.json에 있는 데이터들을 읽고 난 후 exercise 전달
// data.json을 동적으로 읽어와야 하기 때문에 시간이 걸린다 그래서 promise를 사용하여 리턴하도록 만든다.

// data.json의 데이터 로드
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.exercise);   //json전체를 리턴하는 것이 아니기 때문에 exercise만 리턴
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

// 필터링 효과
function onButtonClick(event,exercise){
        const dataset = event.target.dataset //버튼을 눌렀을 때 type 설정하면 hand
        const key = dataset.key; 
        const value = dataset.value;

        if(key == null || value == null){
            return;
        }
        const filtered = exercise.filter( x => x[key] === value);
        displayExercise(filtered)
        console.log(filtered)
        console.log(dataset)
    }


    function setEventListeners(exercise){
        const logo = document.querySelector('.main-container_title');
        const button = document.querySelector('.choice-exercise');
        logo.addEventListener('click', () => displayExercise(exercise));
        button.addEventListener('click', event => onButtonClick(event, exercise));
    }

// main
loadItems()
.then(exercise => {
    displayExercise(exercise)        //전달받은 것을 나타내주는 함수
    setEventListeners(exercise)    //받아온 exercise들을 버튼을 누르면 필터링을 추가하는 함수
})
