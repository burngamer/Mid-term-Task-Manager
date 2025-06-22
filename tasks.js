// Helper functions to manage cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


// Global tasks array
var tasks = [];

// Load tasks from cookie (if any)
function loadTasks() {
  let tasksCookie = getCookie("tasks");
  if (tasksCookie) {
    try {
      tasks = JSON.parse(tasksCookie);
    } catch (e) {
      tasks = [];
    }
  }
}

// Save tasks array to cookie (expires in 7 days)
function saveTasks() {
  setCookie("tasks", JSON.stringify(tasks), 7);
}

// Render tasks in the DOM
function renderTasks() {
  let taskList = $("#taskList");
  taskList.empty();

  tasks.forEach(function (task) {
    let taskItem = $("<li>")
      .addClass("list-group-item d-flex justify-content-between align-items-center task-item")
      .attr("data-id", task.id);

    // Left section: checkbox and task text
    let leftDiv = $("<div>").addClass("d-flex align-items-center");
    let checkbox = $("<input>")
      .attr("type", "checkbox")
      .addClass("mr-2 mark-complete")
      .prop("checked", task.completed);
    let taskTextSpan = $("<span>")
      .addClass("task-text")
      .text(task.text);
    if (task.completed) {
      taskTextSpan.addClass("completed");
    }
    leftDiv.append(checkbox, taskTextSpan);

    // Right section: Edit and Delete buttons
    let rightDiv = $("<div>");
    let editBtn = $("<button>")
      .addClass("btn btn-sm btn-info edit-task mr-2")
      .text("Edit");
    let deleteBtn = $("<button>")
      .addClass("btn btn-sm btn-danger delete-task")
      .text("Delete");
    rightDiv.append(editBtn, deleteBtn);

    taskItem.append(leftDiv).append(rightDiv);
    taskList.append(taskItem);
  });
}

$(document).ready(function () {
  // Load tasks from cookies and render them
  loadTasks();
  renderTasks();

  // Add new task
  $("#taskForm").submit(function (e) {
    e.preventDefault();
    let taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      let newTask = {
        id: new Date().getTime(), // unique ID based on timestamp
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      $("#taskInput").val(""); // clear input
    }
  });

  // Delete task event
  $("#taskList").on("click", ".delete-task", function () {
    let taskId = $(this).closest(".task-item").data("id");
    tasks = tasks.filter(function (task) {
      return task.id != taskId;
    });
    saveTasks();
    renderTasks();
  });

  // Toggle task completed status
  $("#taskList").on("change", ".mark-complete", function () {
    let taskId = $(this).closest(".task-item").data("id");
    tasks.forEach(function (task) {
      if (task.id == taskId) {
        task.completed = !task.completed;
      }
    });
    saveTasks();
    renderTasks();
  });

  // Edit task event: Replace task text with an input field for in-line editing
  $("#taskList").on("click", ".edit-task", function () {
    let li = $(this).closest(".task-item");
    let taskId = li.data("id");
    let currentText = li.find(".task-text").text();

    // Create input field pre-filled with the current task text
    let inputField = $("<input>")
      .attr("type", "text")
      .addClass("form-control form-control-sm edit-input")
      .val(currentText);

    li.find(".task-text").replaceWith(inputField);
    inputField.focus();

    // Save updated text on Enter key press or on losing focus
    inputField.on("keypress", function (e) {
      if (e.which === 13) {
        updateTask(taskId, inputField.val());
      }
    });
    inputField.on("blur", function () {
      updateTask(taskId, inputField.val());
    });
  });

  // Update task function
  function updateTask(taskId, newText) {
    newText = newText.trim();
    if (newText === "") {
      // If no text entered, delete the task
      tasks = tasks.filter(function (task) {
        return task.id != taskId;
      });
    } else {
      tasks.forEach(function (task) {
        if (task.id == taskId) {
          task.text = newText;
        }
      });
    }
    saveTasks();
    renderTasks();
  }
});
