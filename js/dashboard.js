$(document).ready(function () {
  // Function: Load tasks from localStorage (stored as JSON)
  function loadTasks() {
    var tasks = [];
    var tasksStorage = localStorage.getItem("tasks");
    if (tasksStorage) {
      try {
        tasks = JSON.parse(tasksStorage);
      } catch (e) {
        tasks = [];
      }
    }
    return tasks;
  }

  // Get tasks and calculate metrics
  var tasks = loadTasks();
  var totalTasks = tasks.length;
  var completedTasks = tasks.filter(function (task) { return task.completed; }).length;
  var pendingTasks = totalTasks - completedTasks;
  var completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Update metric cards
  $("#totalTasks").text(totalTasks);
  $("#completedTasks").text(completedTasks);
  $("#pendingTasks").text(pendingTasks);

  // Update progress bar
  $("#completionBar").css("width", completionPercent + "%")
                     .attr("aria-valuenow", completionPercent)
                     .text(completionPercent + "%");

  // Populate tasks table
  var tbody = $("#tasksTable tbody");
  tbody.empty();
  if (totalTasks > 0) {
    tasks.forEach(function (task) {
      var statusText = task.completed ? "Completed" : "Pending";
      var row = $("<tr>");
      row.append($("<td>").text(task.id));
      row.append($("<td>").text(task.text));
      row.append($("<td>").text(statusText));
      tbody.append(row);
    });
  } else {
    var row = $("<tr>");
    row.append($("<td colspan='3' class='text-center'>").text("No tasks available"));
    tbody.append(row);
  }
});
