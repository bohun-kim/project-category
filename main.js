// 1.main.js파일이 실행되면 loadItems 함수를 실행
// loadItems함수가 data.json에 있는 데이터들을 읽고 난 후 exercise 전달
// data.json을 동적으로 읽어와야 하기 때문에 시간이 걸린다 그래서 promise를 사용하여 리턴하도록 만든다.

// data.json의 데이터 로드
function loadItems(){
    return fetch('data/data.json')
    .then(response => console.log(response))
}

// main
loadItems()
.then(exercise => {             //loadItems를 받아오고 나면 받아온것을 전달
    //displayExercise(exercise)   //전달받은 것을 나타내주는 함수
    //setEventListeners(exercise) //받아온 exercise들을 버튼을 누르면 필터링을 추가하는 함수
})
.catch(console.log)
