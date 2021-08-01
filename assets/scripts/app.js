const todoList = document.getElementById('listTodoId');
const inserTask = document.getElementById('insertTaskId');
const updateTask = document.getElementById('updateTaskId')
const saveBtn = document.getElementById('newSaveBtn');
const CancelButton = document.getElementById('newCancelBtn')
const saveUpdate = document.getElementById('updateSaveBtn');
const cancelUpdate = document.getElementById('updateCancelBtn')
const addTaskBtn = document.getElementById('btnAdd');
const warnningForm = document.getElementById('forms');
const deleteForm = document.getElementById('formsConfirm');
let ListToDo = []
let todo = { taskName: "", checked: false, createdAt: "", completedAt: "", priority: 0, tag: "" };

if (localStorage.getItem("ToDo") == null) {
    ListToDo = [];
    displayTable();
} else {
    ListToDo = JSON.parse(localStorage.getItem("ToDo"));
    displayTable()
}

addTaskBtn.addEventListener('click', function() {
    todoList.style.display = "none";
    inserTask.style.display = "block";
});
saveBtn.addEventListener('click', addTask);
CancelButton.addEventListener('click', cancelTask);
cancelUpdate.addEventListener('click', cancelTask);

function show() {
    warnningForm.style.display = "none";
}

function show1() {
    deleteForm.style.display = "none";
}

function displayTable() {
    let Li = "";
    Li += ` <table id="tableList" class="Table">
                        <tr>
                            <th class="col1">checked</th>
                            <th class="col2">Task</th>
                            <th class="col3">CreatedAt</th>
                            <th class="col4">CompletedAt</th>
                            <th class="col5">Priority</th>
                            <th class="col6">Tag</th>
                            <th class="col7">Controls</th>
                        </tr> `
    for (let i = 0; i < ListToDo.length; i++) {
        let input = `<td><input type="checkbox" id="chb(${i})" class="chb" onclick="checkedBox(${i})"></td>`
        let row = `<tr id="row(${i})" draggable="true" class="dragrop"  ondragstart="dragit(event)"   ondragover="dragover(event)">
                    ${input}                    
                    <td id="label${i}" class="labelForChb">${ListToDo[i].taskName}</td>
                    <td>${ListToDo[i].createdAt}</td>
                    <td>${ListToDo[i].completedAt}</td>
                    <td>${ListToDo[i].priority}</td>
                    <td>${ListToDo[i].tag}</td>
                    <td>
                        <div class="icons">
                            <button id="done" class="Done" onclick="doneItemt(${i})"><i class="fa fa-check " aria-hidden="true "></i></button>
                            <button id="edit" onclick="editItemt(${i})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button id="delete" onclick="deleteItem(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </td>
                </tr>`
        if (ListToDo[i].checked) {
            input = `<td><input type="checkbox" checked id="chb${i}" class="chb" onclick="checkedBox(${i})" ></td>`;
            row = `<tr id="row(${i})" style="background-color: #eee;" draggable="true" class="dragrop"  ondragstart="dragit(event)"   ondragover="dragover(event)">
                    ${input}                    
                    <td id="label${i}" class="labelForChb" style="color: black">${ListToDo[i].taskName}</td>
                    <td style="color: black">${ListToDo[i].createdAt}</td>
                    <td style="color: black">${ListToDo[i].completedAt}</td>
                    <td style="color: black">${ListToDo[i].priority}</td>
                    <td style="color: black">${ListToDo[i].tag}</td>
                    <td style="color: black">
                        <div class="icons">
                            <button id="done" class="Done" onclick="doneItemt(${i})"><i class="fa fa-check " aria-hidden="true "></i></button>
                            <button id="edit" onclick="editItemt(${i})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button id="delete" onclick="deleteItem(${i})"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </td>
                </tr>`;
        }
        Li += `${row}`;
        // console.log(ListToDo[i]);
    }
    Li += `</table>`;
    console.log(ListToDo);
    document.getElementById("tabelId").innerHTML = Li;
}

function addTask() {

    let input = document.getElementById('insertTask');
    let select = document.getElementById('priority')
    if (input.value === "") {
        warnningForm.style.display = "block";
    } else if (input.value != "") {
        if (select.options[select.selectedIndex].value === "none") {
            warnningForm.style.display = "block";
        } else {
            let today = new Date();
            const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log(date);
            // let select = document.getElementById('priority');
            const text = select.options[select.selectedIndex].text;
            console.log(text);
            let tag = document.getElementById('tag');
            const textTag = tag.value;
            console.log(textTag);

            // Save it!
            console.log('Thing was saved to the list.');
            todo = { taskName: input.value, checked: false, createdAt: date, completedAt: "", priority: text, tag: textTag };
            ListToDo.push(todo)
            localStorage.setItem("ToDo", JSON.stringify(ListToDo));
            setTimeout(function() {
                input.value = ""; // reset
                tag.value = ""
                text.selectedIndex = 0;
                todoList.style.display = "block";
                inserTask.style.display = "none";
            }, 500);
        }
    }
    displayTable();
}

function cancelTask() {
    let input = document.getElementById('insertTask');
    let text = document.getElementById('priority')
    let tag = document.getElementById('tag');
    input.value = ""; // reset
    tag.value = ""
    text.selectedIndex = 0;
    todoList.style.display = "block";
    inserTask.style.display = "none";
    updateTask.style.display = "none";


}

function deleteItem(index) {
    deleteForm.style.display = "block";
    const okBtn1 = document.getElementById('okkk');
    okBtn1.addEventListener('click', function() {
        ListToDo.splice(index, 1);
        for (let i = 0; i < ListToDo.length; i++) {
            console.log(ListToDo[i].Name);
        }
        localStorage.setItem("ToDo", JSON.stringify(ListToDo));
        show1();
        displayTable();
        console.log('TThe Item Deleted.');
    })

}




function editItemt(index) {
    todoList.style.display = "none";
    updateTask.style.display = "block";
    const label = document.getElementById('updateTask');
    label.value = ListToDo[index].taskName;
    const dateCreated = document.getElementById("createdAt");
    dateCreated.value = ListToDo[index].createdAt.toString();
    dateCreated.disabled = true;
    const dateCompleted = document.getElementById("completedAt");
    dateCompleted.value = ListToDo[index].completedAt;
    dateCompleted.disabled = true;
    const select = document.getElementById('priorityUpdate');
    select.options[select.selectedIndex].text = ListToDo[index].priority;
    const tag = document.getElementById('tagUpdate');
    tag.value = ListToDo[index].tag;
    saveUpdate.addEventListener('click', function() {
        if (label.value === "") {
            warnningForm.style.display = "block";
        } else if (label.value != "") {
            if (select.options[select.selectedIndex].value === "none") {
                warnningForm.style.display = "block";
            } else {
                // Save it!
                console.log('Thing was saved to the list.');
                ListToDo[index].taskName = label.value;
                let today = new Date();
                const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                ListToDo[index].createdAt = date;
                ListToDo[index].completedAt = dateCompleted.value;
                ListToDo[index].priority = select.options[select.selectedIndex].text;;
                ListToDo[index].tag = tag.value;
                localStorage.setItem("ToDo", JSON.stringify(ListToDo));

                setTimeout(function() {
                    label.value = ""; // reset
                    tag.value = ""
                    select.selectedIndex = 0;
                    todoList.style.display = "block";
                    updateTask.style.display = "none";
                }, 500);
            }
        }
        displayTable();
    });
}

function checkedBox(index) {
    if (ListToDo[index].checked) {
        ListToDo[index].checked = false;
        ListToDo[index].completedAt = "";
        console.log('Thing was marked as not done.');
    } else {
        let today = new Date()
        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        ListToDo[index].checked = true;
        ListToDo[index].completedAt = date
        console.log('Thing was marked as done.');
    }
    localStorage.setItem("ToDo", JSON.stringify(ListToDo));
    displayTable();
}

function doneItemt(index) {
    if (ListToDo[index].checked) {
        ListToDo[index].checked = false;
        ListToDo[index].completedAt = "";
        console.log('Thing was marked as not done.');
    } else {
        let today = new Date()
        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        ListToDo[index].checked = true;
        ListToDo[index].completedAt = date
        console.log('Thing was marked as done.');
    }
    localStorage.setItem("ToDo", JSON.stringify(ListToDo));
    displayTable();
}
//sort
var getCellValue = function(tr, idx) { return tr.children[idx].innerText || tr.children[idx].textContent; }

var comparer = function(idx, asc) {
    return function(a, b) {
        return function(v1, v2) {
            return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
        }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
    }
};

// do the work...
Array.from(document.querySelectorAll('th')).forEach(function(th) {
    th.addEventListener('click', function() {
        var table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(function(tr) { table.appendChild(tr) });
    })
});

//Drag And Drop
let shadow

function dragit(event) {
    shadow = event.target;
}

function dragover(e) {
    let children = Array.from(e.target.parentNode.parentNode.children);
    if (children.indexOf(e.target.parentNode) > children.indexOf(shadow))
        e.target.parentNode.after(shadow);
    else e.target.parentNode.before(shadow);
}
