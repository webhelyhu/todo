let todos = getSavedTodos()
const filters= {
    searchText: '',
    hideCompleted: false
}


// There is a clear button inside the filter field. If user clicks, the field clears, but the filter stays active
// ---> add listener on it, and clear the filter also!

// can define something visual, when filter is active. for example, filter field background is yellow or whatever.


document.querySelector('#searcher').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    refreshAlcim(filters)
    renderTodos (todos, filters)
})


document.getElementById("new-form").addEventListener('submit', function(e){
    e.preventDefault()  // not to execute the default submit

    const newTodoText = e.target.newTodoText.value.trim()

    // check if there is anything inside the todo field
    if (newTodoText) {
        // yes, there is text in it.
        // console.log ("new todo: '"+ newTodoText + "'  '" + e.target.newTodoText.value + "'")
        todos.push({
            id: uuidv4(),
            text: newTodoText,
            completed: false
        })
        saveTodos(todos)
        renderTodos (todos, filters)
    }
    // clear the input field
    e.target.newTodoText.value= ''
})


document.getElementById("hide-completed").addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    refreshAlcim(filters)
    renderTodos(todos, filters)
})


// initialize
console.log("elindultunk", uuidv4())
renderTodos(todos, filters)




// <input id="new-todo" placeholder="Ide gépelj új jegyzetet" type="text">
// <p>Az alábbi gombbal majd új intéznivalót vehetsz fel:</p>
// <button id="add-todo">Add todo</button>

// ez volt a régi megjelenítő
// todos.forEach ( function (todo) {
    //     const p = document.createElement ('p')
//     p.textContent = todo.text
//     if (todo.completed) {
//         p.textContent += " [completed]"
//     } 
//     document.querySelector('body').appendChild(p)
// })


// document.querySelector('#add-todo').addEventListener('click', function(e) {
//     // gomb megnyomásakor
//     console.log("CLICK")
// })