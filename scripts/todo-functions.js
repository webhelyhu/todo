
function getSavedTodos () {
    let readtodos = localStorage.getItem('todos')

    try {
        return readtodos ? JSON.parse(readtodos) : []
    } catch (e) {
        return []
    }
}

function saveTodos (todos) {
    localStorage.setItem('todos',JSON.stringify(todos))
}

function removeTodo (id) {
    //megkeresni, hogy a todo tömb hányas indexű eleme rendelkezik az adott id-vel
    const toRemove = todos.findIndex(todo => todo.id === id)
    //splice-szal kivágni
    todos.splice(toRemove,1)
}

function toggleTodo (id) {
    // element.completed = !element.completed
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex !== undefined) {
        // todos[todoIndex].completed = !todos[todoIndex].completed
        // valójában a DOM-ból kéne kivadászni az adott checkbox értékét.
        // console.log(` .. a megtalált checkbox értéke: ${document.getElementById(id).checked}`)
        todos[todoIndex].completed = document.getElementById('cbox-'+id).checked
    }
}


const renderTodos = function (todos, filters) {
    const todosEl = document.getElementById('todos')
    let filteredTodos = todos.filter( function (e) {
        return ( e.text.toLowerCase().includes(filters.searchText.toLowerCase()) && !(e.completed && filters.hideCompleted ))
    })
    todosEl.innerHTML = ''
    
    // build up every todo
    if (filteredTodos.length > 0) {
        filteredTodos.forEach(element => {
            todosEl.appendChild(generateTodoDOM(element))
        })
    } else {
        const message = document.createElement('p')
        message.textContent = 'No to-dos to show'
        message.classList.add('empty-message')
        todosEl.appendChild(message)
    }
    
    generateSummaryDOM(todos, filteredTodos)    
}


const refreshAlcim = function (filters) {
    // document.querySelector('#alcim').textContent = 'Filter: '  + document.querySelector('#searcher').value + ((filters.hideCompleted) ? '': '')
    document.querySelector('#alcim').textContent = 'Filter: '  
}


function generateTodoDOM (element) {
    const cbox = document.createElement('input')
    const p = document.createElement('span')
    const ujElem = document.createElement('label')   // -> label, hogy a benne lévő chkboxot ne kelljen eltalálni
    const containerEl = document.createElement('div')
    const ujGomb = document.createElement('button')

    // ujElem (label)
    //   left: chkbox, text
    //   right: container pushed to the right
    //         in container: remove button

    // setup checkbox
    cbox.setAttribute('type', 'checkbox')
    cbox.setAttribute('id', 'cbox-'+element.id)
    if (element.completed) cbox.checked = true
        cbox.addEventListener('change', function() {
        toggleTodo(element.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // setup text
    p.textContent = element.text
    if (element.completed) p.textContent += ' [completed]'
    // else p.textContent += ' [__TODO__]'
    
    // setup button    
    ujGomb.textContent = 'Remove'
    ujGomb.addEventListener('click', function() {
        // in closure -> most elérhető az element objektum
        removeTodo(element.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // styles
    ujElem.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    ujGomb.classList.add('button', 'button--text')
    
    //build
    ujElem.appendChild(cbox)
    ujElem.appendChild(p)
    containerEl.appendChild(ujGomb)
    ujElem.appendChild(containerEl)
    return ujElem
    
}


function generateSummaryDOM (todos, filteredTodos) {
    // összesítő legalsó sor hozzáadása
    const incompleteTodos = filteredTodos.filter( todo => !todo.completed)
    const allIncompleteTodos = todos.filter( todo => !todo.completed)
    const summary = document.createElement('h2')
    if (allIncompleteTodos.length) {
        // we have some incomplete todos
        summary.textContent = `${incompleteTodos.length} not completed todo${(incompleteTodos.length === 1) ? '' : 's'} displayed (${allIncompleteTodos.length} total)`
    } else {
        summary.textContent = 'You have nothing to do! :)'
    }

    summary.classList.add('list-title')
    document.getElementById('todos').appendChild(summary)
}


