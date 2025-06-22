$(document).ready(function () {
  // Global tasks array
  var tasks = [];

  // Load tasks from localStorage (stored as JSON)
  function loadTasks() {
    var tasksStorage = localStorage.getItem("tasks");
    if (tasksStorage) {
      try {
        tasks = JSON.parse(tasksStorage);
      } catch (e) {
        tasks = [];
      }
    }
  }

  // Save tasks array to localStorage as a JSON string
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render the tasks in the DOM
  function renderTasks() {
    var taskList = $("#taskList");
    taskList.empty();

    tasks.forEach(function (task) {
      var taskItem = $("<li>")
        .addClass("list-group-item d-flex justify-content-between align-items-center task-item")
        .attr("data-id", task.id);

      // Left section: checkbox and task text
      var leftDiv = $("<div>").addClass("d-flex align-items-center");
      var checkbox = $("<input>")
        .attr("type", "checkbox")
        .addClass("mr-2 mark-complete")
        .prop("checked", task.completed);
      var taskTextSpan = $("<span>")
        .addClass("task-text")
        .text(task.text);
      if (task.completed) {
        taskTextSpan.addClass("completed");
      }
      leftDiv.append(checkbox, taskTextSpan);

      // Right section: Edit and Delete buttons
      var rightDiv = $("<div>");
      var editBtn = $("<button>")
        .addClass("btn btn-sm btn-info edit-task mr-2")
        .text("Edit");
      var deleteBtn = $("<button>")
        .addClass("btn btn-sm btn-danger delete-task")
        .text("Delete");
      rightDiv.append(editBtn, deleteBtn);

      taskItem.append(leftDiv).append(rightDiv);
      taskList.append(taskItem);
    });
  }

  // Initial load/render of tasks
  loadTasks();
  renderTasks();

  // Create a new task on form submission
  $("#taskForm").submit(function (e) {
    e.preventDefault();
    var taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      var newTask = {
        id: new Date().getTime(), // Unique ID based on timestamp
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      $("#taskInput").val(""); // Clear input after adding
    }
  });

  // Delete task event
  $("#taskList").on("click", ".delete-task", function () {
    var taskId = $(this).closest(".task-item").data("id");
    tasks = tasks.filter(function (task) {
      return task.id != taskId;
    });
    saveTasks();
    renderTasks();
  });

  // Toggle task completed status
  $("#taskList").on("change", ".mark-complete", function () {
    var taskId = $(this).closest(".task-item").data("id");
    tasks.forEach(function (task) {
      if (task.id == taskId) {
        task.completed = !task.completed;
      }
    });
    saveTasks();
    renderTasks();
  });

  // In-line edit task event: replace task text with an input field
  $("#taskList").on("click", ".edit-task", function () {
    var li = $(this).closest(".task-item");
    var taskId = li.data("id");
    var currentText = li.find(".task-text").text();

    // Create an input field pre-filled with current task text
    var inputField = $("<input>")
      .attr("type", "text")
      .addClass("form-control form-control-sm edit-input")
      .val(currentText);

    li.find(".task-text").replaceWith(inputField);
    inputField.focus();

    // Save updated text on Enter key press or blur event
    inputField.on("keypress", function (e) {
      if (e.which === 13) {
        updateTask(taskId, inputField.val());
      }
    });
    inputField.on("blur", function () {
      updateTask(taskId, inputField.val());
    });
  });

  // Update task text based on user edit
  function updateTask(taskId, newText) {
    newText = newText.trim();
    if (newText === "") {
      // If no text is entered, delete the task
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
