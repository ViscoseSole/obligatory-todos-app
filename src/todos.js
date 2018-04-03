/* TO ADD
-Animations
-Drag&Drop
  *todo's onto trash icon to remove
  *change order with other todos
-Copy to clipboard 
*/

$( document ).ready(function() {
  fetchTodos();renderTodos();
});

let todos = [];

const renderTodos = () => {
  $("#ul-todos").html("");
  $('#ul-todos').append(todos.map((item, index) => {
    return (
     '<li class="drag-item" id="' + item.id + '">' + 
     '<input type="checkbox">' +
     '<span>' + item.todo + '</span>' +
     '</li>'
    );
  }));
}

const appendTodo = () => {
  let liCount = todos.length;
  let value = document.getElementById("input-todo").value;
  
  if (value.replace(/\s/g, '').length == 0) {
    alert("You can't add an empty task..");
    return false;
  } else if (liCount >= 10) {
    alert("Sorry... you can only have 10 tasks! Gotta prioritize.");
    return false;
  };
  
  todos.unshift({id: liCount + 1, todo: value});
  renderTodos();
  
  storage.setItem('todos', JSON.stringify(todos));
  document.getElementById("input-todo").value = "";
};



/* LOCAL STORAGE */
const storage = window.localStorage;

const fetchTodos = () => {
  let data = storage.getItem('todos');
  data = JSON.parse(data);
  
  data.forEach(item => {
    todos.push(item);
  });
}



/* EVENT LISTENERS */
document.getElementById('input-todo').addEventListener('keyup', function (event) {
  if (event.which === 13) {appendTodo()};
});


$('#todos-box #trash').click(function (event) {
  
  let removals = [];
  $( "ul li" ).each(function() {
    let id = this.id;
    let idChecked = $('input', this).prop('checked');
    
    idChecked ? removals.push(id) : false;
  });
  
  let newTodos = [];
  todos.forEach((item, index) => {
    if (removals.indexOf(JSON.stringify(item.id)) === -1) {
      newTodos.push(item);
    }
  });
  
  todos = newTodos;
  storage.setItem('todos', JSON.stringify(todos));
  renderTodos();
});

$('#todos-box #resize').click(function () {
  if ($('.fa-arrow-left').attr("data-fa-transform") === "rotate-0") {
    $(".container").css("width", "80%");
    $('.fa-arrow-left').attr("data-fa-transform", "rotate-180");
  } else {
    $(".container").css("width", "40%");
    $('.fa-arrow-left').attr("data-fa-transform", "rotate-0");
  }
});

$('#ul-todos').on('click', 'li', function() {
  $('input', this).prop("checked") === false ? $('input', this).prop("checked", true) : $('input', this).prop("checked", false);
});
