const todos = [];
const RENDER_EVENT = 'render-todo';
// saat ivent load selesai dapatkan sumitForm lalu tambahkan fungsi ketika submit
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form')
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        addTodo()
    })


    function addTodo() {
        const textTdo = document.getElementById('title').value
        const timestamp = document.getElementById('date').value

        const generateID = generateId()
        const todoObject = generateTodoObject(generateID, textTdo, timestamp, false)
        todos.push(todoObject)

        document.dispatchEvent(new Event(RENDER_EVENT))
    }


    function generateId() {
        return +new Date()
    }

    function generateTodoObject(id, task, timestamp, isComplate) {
        return {
            id,
            task,
            timestamp,
            isComplate
        }
    }


    document.addEventListener(RENDER_EVENT, function () {
        console.log(todos);
        const uncompletedTODOList = document.getElementById('todos');
        uncompletedTODOList.innerHTML = '';

        for (const todoItem of todos) {
            const todoElement = makeTodo(todoItem);
            if(!todoItem.isComplate){
                uncompletedTODOList.append(todoElement);
            }
        }
    });


    function makeTodo(todoObject) {
        const textTitle = document.createElement('h2');
        textTitle.innerText = todoObject.task;

        const textTimestamp = document.createElement('p');
        textTimestamp.innerText = todoObject.timestamp;

        const textContainer = document.createElement('div');
        textContainer.classList.add('inner');
        textContainer.append(textTitle, textTimestamp);

        const container = document.createElement('div');
        container.classList.add('item', 'shadow');
        container.append(textContainer);
        container.setAttribute('id', `todo-${todoObject.id}`);

        if(todoObject.isComplate){
            const undoButton = document.createElement('button')
            undoButton.classList.add('undo-button')

            undoButton.addEventListener('click',function(){
                undoTaskFromComplated(todoObject.id)
            })

            const trashButton = document.createElement('button')
            trashButton.classList.add('trash-button')

            trashButton.addEventListener('click',function(){
                removeTaskFromComplated(todoObject.id)
            })

            container.append(undoButton, trashButton)
        }else{
            const checkButton = document.createElement('button')
            checkButton.classList.add('check-button')

            checkButton.addEventListener("click",function(){
                adTaskToComplated(todoObject.id)
            })

            container.append(checkButton)
        }

        return container;
    }


    function adTaskToComplated(todoId){
        const todoTarget = findTodo(todoId)

        if(todoTarget == null) return

        todoTarget.isComplate = true
        document.dispatchEvent(new Event(RENDER_EVENT))
    }


    function findTodo(todoId){
        for(const todoItem of todos){
            if(todoItem.id === todoId){
                return todoItem
            }
        }
        return null
    }
})
