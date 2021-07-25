const listt = document.getElementById('listId');
const todo = document.getElementById('insertTodo');
const update = document.getElementById('updateInfo')
const saveBtn = document.getElementById('save-btn');
const saveUpdate = document.getElementById('save-update');
const cancelUpdate = document.getElementById('cancel-update')
const addBtn = document.getElementById('btn-add');
const doneBtn = document.getElementById('done');
const editBtn = document.getElementById('edit');
const CancelButton = document.getElementById('cancel-btn')
let listUser = []
let user = { Name: "", checked: false };

if (localStorage.getItem("todoList") == null) {
    listUser = [];
} else {
    listUser = JSON.parse(localStorage.getItem("todoList"));
    displayTable()
}

addBtn.addEventListener('click', displayy);
saveBtn.addEventListener('click', addItems);
CancelButton.addEventListener('click', cancelAction)

cancelUpdate.addEventListener('click', function() {
    if (confirm('Are You Sure You Want To Cancel The Update?')) {
        const label = document.getElementById('nameTodoUpdate');
        label.value = "";
        setTimeout(function() { alert("<..>"); }, 100);
        setTimeout(function() {
            listt.style.display = "block";
            update.style.display = "none";
        }, 1000);
    } else {
        alert("PLA")
    }
});

function displayTable() {
    let Li = "";
    for (let i = 0; i < listUser.length; i++) {
        let input = `<input type="checkbox" id="chb${i}" class="chb" onclick="checkedBox(${i})" >`;
        let label = `<label for="chb ${i}" id="label${i}">${listUser[i].Name}</label>`;

        if (listUser[i].checked) {
            input = `<input type="checkbox" checked id="chb${i}" class="chb" onclick="checkedBox(${i})" >`;
            label = `<del for="chb ${i}"  id="label${i}">${listUser[i].Name}</del>`;
        }

        Li += `<ul class="ull">
                    <li class="listLi">
                        <div class="all">
                            <div id="input-check">
                                ${input}
                                ${label}
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
    }
    document.getElementById("unorder-list").innerHTML = Li;

}

function displayy() {
    listt.style.display = "none";
    todo.style.display = "block";
}

function cancelAction() {

    if (confirm('Are You Sure You Want To Cancel The Insertion?')) {
        let inputInsert = document.getElementById('name-of-todo');
        inputInsert.value = "";
        setTimeout(function() { alert("^_^"); }, 200);
        setTimeout(function() {
            listt.style.display = "block";
            todo.style.display = "none";
        }, 1000);
    } else {
        alert("PLA")
    }
}

function addItems() {
    let input = document.getElementById('name-of-todo');
    console.log(input.value);
    if (input.value === "") {
        alert("Enter A Todo to append it to the list");
        // setTimeout(function() { alert("Enter A Todo to append it to the list"); }, 9000);
    } else if (input.value != "") {
        if (confirm('Are you sure you want to save this information into the list?')) {
            // Save it!
            console.log('Thing was saved to the list.');
            user = { Name: input.value, checked: false };
            listUser.push(user)
            localStorage.setItem("todoList", JSON.stringify(listUser));
            input.value = ""; // reset
            listt.style.display = "block";
            todo.style.display = "none";
            displayTable();
        } else {
            // Do nothing!
            console.log('Thing was not saved to the list.');
        }
    }
}

function deleteItem(index) {
    if (confirm('Are you sure you want to delete this item ?')) {
        listUser.splice(index, 1);
        for (let i = 0; i < listUser.length; i++) {
            console.log(listUser[i].Name);
        }
        localStorage.setItem("todoList", JSON.stringify(listUser));
        displayTable();
        setTimeout(function() { alert("The Item Is Deleted"); }, 500);
        console.log('TThe Item Deleted.');
    }
    console.log('TThe Item Not Deleted.');


}


function editItemt(index) {
    listt.style.display = "none";
    update.style.display = "block";
    const label = document.getElementById('nameTodoUpdate');
    label.value = listUser[index].Name;
    if (label.value === null) {
        alert("Please enter a something to do!");
    } else {
        saveUpdate.addEventListener('click', function() {
            if (confirm('Are you sure you want to save this update ?')) {
                // Save it!
                console.log('Thing was saved to the list.');
                listUser[index].Name = label.value;
                localStorage.setItem("todoList", JSON.stringify(listUser));
                label.value = ""; // reset
                setTimeout(function() {
                    listt.style.display = "block";
                    update.style.display = "none";
                }, 1000);
            } else {
                // Do nothing!
                console.log('Thing was not saved to the list.');
            }
            displayTable();
        });
    }
}

function checkedBox(index) {
    const label11 = document.getElementById(`label${index}`);
    if (listUser[index].checked) {
        if (confirm(`Are you sure you want to mark --> ${listUser[index].Name} <-- as not done ?`)) {
            listUser[index].checked = false;
            label11.innerHTML = `<label for="chb ${index}" id="label">${listUser[index].Name}</label>`;
            console.log('Thing was marked as not done.');
        }
    } else {
        if (confirm(`Are you sure you want to mark --> ${listUser[index].Name} <-- as done ?`)) {
            label11.innerHTML = `<del for="chb ${index}" id="label${index}">${listUser[index].Name}</del>`;
            listUser[index].checked = true;
            console.log('Thing was marked as done.');
        }
    }
    localStorage.setItem("todoList", JSON.stringify(listUser));
    displayTable();
}

function doneItemt(index) {

    if (listUser[index].checked) {
        if (confirm(`Are you sure you want to mark --> ${listUser[index].Name} <-- as not done ?`)) {
            const label11 = document.getElementById(`label${index}`);

            label11.innerHTML = `<label for="chb ${index}" id="label${index}">${listUser[index].Name}</label>`;
            listUser[index].checked = false;
            document.getElementById(`chb${index}`).checked = false;
            console.log('Thing was marked as not done.');

        } else {
            console.log('Thing was marked as done.');
        }
    } else {
        if (confirm(`Are you sure you want to mark --> ${listUser[index].Name} <-- as done ?`)) {
            const label11 = document.getElementById(`label${index}`);
            label11.innerHTML = `<del for="chb ${index}" id="label${index}">${listUser[index].Name}</del>`;
            listUser[index].checked = true;
            document.getElementById(`chb${index}`).checked = true;
            console.log('Thing was marked as done.');
        } else {
            console.log('Thing was marked as not done.');
        }
    }
    localStorage.setItem("todoList", JSON.stringify(listUser));
    displayTable();
}
