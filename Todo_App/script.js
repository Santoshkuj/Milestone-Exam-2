const inputBox = document.getElementById("input-Box");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const h1 = document.querySelector('h1')

let editTodo = null;

let array = []
function addTodo() {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Please write something");
    return false;
  } else {
    h1.innerText = ''
    array.push(inputText)
    const li = document.createElement("li");
    let count = array.length;
    li.innerHTML = `<div class="todo"><span>${count}</span><span>. ${inputText}</span></div>
                  <div class="status"><span>Status :</span><span> Pending</span></div>
                  <button class="editBtn">Update Status</button>
                  <button class="deleteBtn">Remove</button>`

    todoList.appendChild(li);
    inputBox.value = "";
  }
}

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    if(todoList.innerText === ''){
      h1.innerHTML = "Your todo list is empty"
      }
      } else if (e.target.innerHTML === "Update Status") {
    if(e.target.parentElement.children[1].children[1].innerHTML == ' Pending'){
      e.target.previousElementSibling.children[1].innerHTML = ' Completed'
    }else{
      e.target.parentElement.children[1].children[1].innerHTML = ' Pending'
    }
  }
};


addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
