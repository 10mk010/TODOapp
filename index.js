'use strict';

/* 
    Sukurti TODO list aplikaciją.

1. HTML’e sukurti formą su input:

    a. task (text)

    b. priority (input’as select: high, medium, low)

2. Su JavaScript paimti vartotojo įvestas reikšmes, jas išsaugoti localStorage, 
   kad perkrovus puslapį informacija liktų, ir atvaizduoti duomenis puslapyje 
   lentelės pavidalu. 

3. Jei nėra užduočių- lentelės turi nesimatyti.

4. Jei užduotis atlikta, ją pažymėjus checkbox, stilius turi pasikeisti- 
   pvz.: papilkėti fonas ar nusibraukti tekstas.

5. Jei užduotis nereikalinga, turi būti mygtukas, skirtas ją ištrinti. 
   Paspaudus mygtuką, užduotis turi būti ištrinama iš puslapio jo neperkraunant, 
   duomenys taip pat turi būti ištrinti iš localStorage.
*/

'use strict';

const inputText = document.getElementById("inputText");
const radioBtn = document.querySelectorAll(".radio");
const radioH = document.getElementById("radioH");
const radioM = document.getElementById("radioM");
const radioL = document.getElementById("radioL");
const submit = document.getElementById("submit");
const taskList = document.getElementById("taskList");
const taskTable = document.getElementById("taskTable");

let list = JSON.parse(localStorage.getItem("list")) || [];

function updateStorage() {
    localStorage.setItem("list", JSON.stringify(list));
}

function checkedBtn() {
    if (radioH.checked) {
        return "High";
    } else if (radioM.checked) {
        return "Medium";
    } else if (radioL.checked) {
        return "Low";
    }
    return "Low"; 
}

function createTableRow(task, index) {
    const tr = document.createElement("tr");
    const tdTask = document.createElement("td");
    const tdPriority = document.createElement("td");
    const tdCompleted = document.createElement("td");
    const tdAction = document.createElement("td");

    tdTask.innerText = task.task;
    tdPriority.innerText = task.priority;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleCompletion(index));
    tdCompleted.appendChild(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));
    tdAction.appendChild(deleteButton);

    tr.append(tdTask, tdPriority, tdCompleted, tdAction);
    return tr;
}


function loadTasks() {
    taskList.innerHTML = ""; 

    if (list.length === 0) {
        taskTable.style.display = "none"; 
    } else {
        taskTable.style.display = "table"; 
        list.forEach((task, index) => {
            const row = createTableRow(task, index);
            taskList.appendChild(row);
        });
    }
}

submit.addEventListener("click", () => {
    if (inputText.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        task: inputText.value.trim(),
        priority: checkedBtn(),
        completed: false, 
    };

    list.push(newTask);
    updateStorage();
    inputText.value = ""; 
    loadTasks();
});
function toggleCompletion(index) {
    list[index].completed = !list[index].completed;
    updateStorage();
    loadTasks(); 
}
function deleteTask(index) {
    list.splice(index, 1); 
    updateStorage();
    loadTasks(); 
}


window.onload = loadTasks;
