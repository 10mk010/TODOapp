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

const inputText = document.getElementById("inputText");
const radioBtn = document.querySelectorAll(".radio");
const radioH = document.getElementById("radioH");
const radioM = document.getElementById("radioM");
const radioL = document.getElementById("radioL");
const submit = document.getElementById("submit");

let list = JSON.parse(localStorage.getItem("list")) || [];

function updateStorage(){
    localStorage.setItem("list", JSON.stringify(list));
}
function checkedBtn(){
    if(radioH.checked){
        return "High";
    } else if(radioM.checked){
        return "Medium";
    } else if(radioL.checked){
        return "Low";
    }
}
function createTable(element){
    const tr = document.createElement("tr");
    const tdTask = document.createElement("td");
    const tdPriority = document.createElement("td");
    tdTask.innerText = element.task;
    tdPriority = element.priority;
    tr.append(tdTask, tdPriority);
    return tr;
}
submit.addEventListener("click", () => {
    const newTask = {
        task: inputText.value,
        priority: checkedBtn(),
    }
    list.push(newTask);
    updateStorage();
    
})
