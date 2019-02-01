let currentDate = document.getElementById("current-date");
let currentMonth = document.getElementById("current-month");
let currentYear = document.getElementById("current-year");
let currentWeekday = document.getElementById("current-weekday");

let date = new Date();
let currentdate = date.getDate();
let currentmonth = date.getMonth();
let currentyear = date.getUTCFullYear();
let currentweekday = date.getDay();

let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


currentDate.textContent = (currentdate < 10 ? `0${currentdate}` : `${currentdate}`);
currentMonth.firstChild.textContent = months[currentmonth];
currentYear.textContent = currentyear;
currentWeekday.textContent = weekdays[currentweekday];

let form = document.querySelector("form");
let input = document.getElementById("input");
let btn = document.querySelector("#add-task-btn");
btn.addEventListener('click', (e) => {
    if (btn.className === "minus-btn") {
        form.className = 'hide-form';
        btn.innerHTML = '&plus;';
        btn.className = 'add-btn';
    } else if (btn.className === "add-btn") {
        form.className = 'show-form';
        btn.innerHTML = '&minus;';
        btn.className = 'minus-btn';
    }
});

form.addEventListener('submit', (e) => {
    if (input.value == false) {

    } else {
        let newtask = document.createElement("li");
        newtask.innerHTML =
            ` <h4>${input.value}</h4>
            <span class="done"></span>`;
        document.querySelector(".todo-list").firstElementChild.appendChild(newtask);

        //ADD TO LS
        ((task = input.value, done = false) => {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            todos.push({
                todo: task,
                done: false
            });
            localStorage.setItem("todos", JSON.stringify(todos));
        })();
    }
    input.value = '';
    e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
        let newtask = document.createElement("li");

        if (todo.done === true) {
            newtask.innerHTML =
                ` <h4 style="color:#c7cad2">${todo.todo}</h4>
            <span class="delete"></span>`;
            document.querySelector(".todo-list").firstElementChild.appendChild(newtask);
        } else {
            newtask.innerHTML =
                ` <h4>${todo.todo}</h4>
            <span class="done"></span>`;
            document.querySelector(".todo-list").firstElementChild.appendChild(newtask);
        }
    });
});

document.body.addEventListener("click", (e) => {
    if (e.target.className == "done") {
        e.target.parentElement.firstElementChild.style.color = "#c7cad2";
        e.target.style.backgroundColor = "c";
        e.target.style.border = "1px solid transparent";
        e.target.className = "delete";
        ((todoItem = e.target.parentElement.firstElementChild.textContent) => {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            todos.forEach((todo, index) => {
                if (todoItem == todo.todo) {
                    todo.done = true;
                }
            });
            localStorage.setItem("todos", JSON.stringify(todos));

        })();
    } else if (e.target.classList.contains("delete")) {
        //REMOVE FROM LS
        ((todoItem = e.target.parentElement.firstElementChild.textContent) => {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            todos.forEach((todo, index) => {
                if (todoItem == todo.todo) {
                    todos.splice(index, 1);
                }
            });
            localStorage.setItem("todos", JSON.stringify(todos));
            e.target.parentElement.remove();
        })();
    }
});