const listt = document.getElementById('list-id');
const todo = document.getElementById('insert-todo');
const saveBtn = document.getElementById('save-btn');
const addBtn = document.getElementById('btn-add');
//const deleteBtn = document.getElementById('delete');
const doneBtn = document.getElementById('done');
const editBtn = document.getElementById('edit');
const CancelButton = document.getElementById('cancel-btn')
let listUser = []
let user = { Name: "" };



addBtn.addEventListener('click', displayy);
saveBtn.addEventListener('click', addItems);
CancelButton.addEventListener('click', displayyUser)
    //deleteBtn.addEventListener('click', deleteItem)


function displayy() {
    listt.style.display = "none";
    todo.style.display = "block";
}

function displayyUser() {
    listt.style.display = "block";
    todo.style.display = "none";
}

function addItems() {
    let input = document.getElementById('name-of-todo');
    console.log(input.value);
    user = { Name: input.value };
    listUser.push(user)
    localStorage.setItem("todoList", JSON.stringify(listUser));
    // console.log(listUser[0].Name);
    displayyUser();
    displayTable();
    input.value = ""; // reset
}

function deleteItem(index) {
    alert("yara");
    // delete one object element from products array
    listUser.splice(index, 1);
    for (let i = 0; i < listUser.length; i++) {
        console.log(listUser[i].Name);
    }
    localStorage.setItem("todoList", JSON.stringify(listUser));
    displayTable();

}


function editItemt(index) {
    let userInput = prompt(listUser[index].Name);
    listUser[index].Name = userInput;
    displayTable();
}

function checkedBox(index) {
    if (document.getElementById('chb1').checked) {
        const label11 = document.getElementById("label1");
        label11.innerHTML = `<del for="chb1" id="label1">${listUser[index].Name}</del>`;
    } else {
        const label11 = document.getElementById("label1");
        label11.innerHTML = `<label for="chb1" id="label1">${listUser[index].Name}</label>`;
    }
}

function doneItemt(index) {

    const label11 = document.getElementById("label1");
    label11.innerHTML = `<del for="chb1" id="label1">${listUser[index].Name}</del>`;
    //  displayTable();
}


function displayTable() {
    let Li = "";
    for (let i = 0; i < listUser.length; i++) {
        Li += `<ul class="ull">
                    <li class="listLi">
                        <div class="all">
                            <div id="input-check">
                                <input type="checkbox" id="chb1" class="Done" onclick="checkedBox(${i})">
                                <label for="chb1" id="label1">${listUser[i].Name}</label>
                            </div>
                            <div class="icons">
                                <button id="done" class="Done" onclick="doneItemt(${i})"><i class="fa fa-check " aria-hidden="true "></i></button>
                                <button id="edit" onclick="editItemt(${i})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                <button id="delete" onclick="deleteItem(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </li> 
                    <hr>
                </ul>`
        console.log(listUser[i].Name);
        document.getElementById("unorder-list").innerHTML = Li;
    }
}