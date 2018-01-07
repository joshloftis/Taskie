var taskie = {
  init() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  cacheDom() {
    this.$curUserTask = $('#myTasks');
    this.$curUserPickedUp = $('#pickedUp');
    this.$otherUserTasks = $('#allTasks');
    this.pickUp = $('<button class="btn btn-sm btn-add-task pickUp">Pick Up</button>');
    this.addForm = $('#addTaskForm');
    this.createTaskText = $('#createNewTask');
    this.$welcomeText = $('#welcomeText');
    this.$myCompletedTasks = $('#completed');
    this.descriptions = $('');
    this.$myCurrentTasks = $('#myCurrentTasks');
    this.$myAssignedTasks = $('#myAssignedTasks');
    this.$myCompletedTasks = $('#myCompletedTasks');
  },
  bindEvents() {
    this.createTaskText.on('click', this.showTaskForm.bind(this));
  },
  render() {
    taskie.$curUserTask.empty();
    taskie.$curUserPickedUp.empty();
    taskie.$otherUserTasks.empty();
    taskie.$myCompletedTasks.empty();
    this.currUser();
    this.usersTasks();
    this.currUserAssignments();
    this.allMyCompletedTasks();
    this.addForm.hide();
    $('.task-details-row').hide();
  },
  currUser() {
    $.ajax({
      url: '/profile/api/curr_user',
      method: 'GET',
    }).done((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status == false && response[i].Assignment == null) {
          const p =
            $(`<div class="row task-space">
                <div class="col-12 middle-this">
                  <p class="indent-text">
                    <span class="dot-unassigned"></span>
                    ${response[i].description}
                  </p>
                </div>
              </div>`);
          taskie.$curUserTask.append(p);
        } else if (response[i].status == false) {
          const p =
            $(`<div class="row task-space">
                <div class="col-5 middle-this">
                  <p class="indent-text">
                    <span class="dot"></span>
                    ${response[i].description}
                  </p>
                </div>
                <div class="col-7 middle-this">
                  <p>
                    picked up by: ${response[i].Assignment.User.firstName} ${response[i].Assignment.User.lastName}
                  </p>
                </div>
              </div>`);
          taskie.$curUserTask.append(p);
        }
      }
    });
  },
  usersTasks() {
    $.ajax({
      url: 'profile/api/other/tasks',
      method: 'GET',
    }).done((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].Assignment == null) {
          const p =
            $(`<div class="row task-space">
              <div class="col-5 middle-this">
                <p class="indent-text">
                  ${response[i].description}
                </p>
              </div>
              <div class="col-4 middle-this">
                <p>
                  for: ${response[i].User.firstName} ${response[i].User.lastName}
                </p>
              </div>
              <div class="col-3">
                <button class="btn btn-sm btn-grab-task btn-task pickUp" data-id="${response[i].id}">Pick Up</button>
              </div>
            </div>`);
          taskie.$otherUserTasks.append(p);
        }
      }
    });
  },
  currUserAssignments() {
    $.ajax({
      url: '/profile/api/curr_user/assignments',
      method: 'GET',
    }).done((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].Task.status == false) {
          const p =
            $(`<div class="task-space">
                <div id="Task_ID${response[i].Task.id}" class="row task-description-row">
                  <div class="col-5 middle-this">
                    <p class="indent-text">
                      ${response[i].Task.description}
                    </p>
                  </div>
                  <div class="col-4 middle-this">
                    <p>
                      for: ${response[i].Task.User.firstName} ${response[i].Task.User.lastName}
                    </p>
                  </div>
                  <div class="col-3">
                    <button class="btn btn-sm btn-grab-task btn-task done" data-id="${response[i].Task.id}">Done</button>
                  </div>
                </div>
                <div class="row task-details-row">
                  <p class="col-12">${response[i].Task.details}</p>
                </div>
              </div>`);
          taskie.$curUserPickedUp.append(p);
        }
      }
    });
  },
  allMyCompletedTasks() {
    $.ajax({
      url: '/profile/api/curr_user',
      method: 'GET',
    }).done((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status == true && response[i].reward == false) {
          const p =
            $(`<div class="task-space">
                <div class="row task-description-row">
                  <div class="col-5 middle-this">
                    <p class="indent-text">
                      <span class="dot"></span>
                      ${response[i].description}
                    </p>
                  </div>
                  <div class="col-7 middle-this">
                    <p class="">
                      ${response[i].Assignment.User.firstName} ${response[i].Assignment.User.lastName}
                    </p>
                  </div>
                </div>
              <div class="row task-details-row">
                <form>
                  <input id="message-title${response[i].id}" type="text" class="form-control task-form" placeholder="Subject" maxlength="50">
                  <textarea id="message-details${response[i].id}" class="form-control task-text-area" placeholder="Type a message here..." maxlength="250"></textarea>
                  <button class="btn btn-sm btn-grab-task btn-task reward" data-taskid="${response[i].id}" data-rewardid="${response[i].Assignment.User.id}">Reward</button>
                </form>
              </div>
            </div>`);
          taskie.$myCompletedTasks.append(p);
        } else if (response[i].status == true && response[i].reward == true) {
          const p =
            $(`<div class="task-space">
                <div class="row task-description-row">
                  <div class="col-5 middle-this">
                    <p class="strikethrough indent-text">
                      <span class="dot"></span>
                      ${response[i].description}
                    </p>
                  </div>
                  <div class="col-7 middle-this">
                    <p class="strikethrough">
                      ${response[i].Assignment.User.firstName} ${response[i].Assignment.User.lastName}
                    </p>
                  </div>
                </div>
              <div class="row task-details-row">
                <h5>Yay! You've already rewarded this user!</h5>
              </div>
            </div>`);
          taskie.$myCompletedTasks.append(p);
        }
      }
    });
  },
  showTaskForm() {
    this.addForm.toggle(300);
  },
};

taskie.init();

$(document).on('click', '.pickUp', function () {
  const taskId = $(this).data('id');
  $.ajax({
    url: `/profile/api/grab/task/${taskId}`,
    method: 'POST',
  }).then((response) => {
    taskie.render();
  });
});

$(document).on('click', '.done', function () {
  const taskId = $(this).data('id');
  $.ajax({
    url: `/profile/api/complete/task/${taskId}`,
    method: 'PUT',
  }).then((response) => {
    taskie.render();
  });
});

$(document).on('click', '.task-description-row', function () {
  $(this).toggleClass('task-description-row-background');
  $(this).parent().find('.task-details-row').toggle(200);
});

$(document).on('click', '.reward', function (event) {
  event.preventDefault();
  $(this).parent().find('.task-details-row').toggle(200);
  const _UserId = $(this).data('rewardid');
  const _TaskId = $(this).data('taskid');
  const description = $(`#message-title${_TaskId}`).val();
  const details = $(`#message-details${_TaskId}`).val();
  const data = {
    description,
    details,
  };

  $.ajax({
    url: `/rewards/api/curr_user/${_UserId}/${_TaskId}`,
    method: 'POST',
    data,
  }).then((response) => {
    location.reload();
  });
});
