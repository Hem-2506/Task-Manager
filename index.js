const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const generateNewCard = (taskData) =>  `
    <div class="col-md-6 col-lg-4 ${taskData.id}">
    <div class="card ">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button"  class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i></button>
<button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-dumpster-fire" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
      </div>
      <div class="card_image p-4"><img src="${taskData.imageUrl}" class="card-img-top" alt="..."></div>
      <div class="card-body">
        <h5 class="card-title">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
      <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end rounded-pill" id=${taskData.id} onclick="saveEditchanges.apply(this, arguments)">Open Task</button>
      </div>
    </div></div>`;

const loadInitialCardData = () => {
// local storage to get tasky
const getCardData = localStorage.getItem("tasky");


// convert from string to normal object
const {cards} = JSON.parse(getCardData);

// loop over those array of task object to create HTML card, inject it
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  // Update our global store
  globalStore.push(cardObject);

});
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const saveChanges = () => {
    const taskData = {
        id:  `${Date.now()}`, // Unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };


    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) =>{
  event = window.event;

  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // match the id of the element with the id inside the globalStore
  // if match found remove
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  // contact parent
  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);}
    else{
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
  };


const editCard = (event) =>{
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

 
  

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];



   taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute(
    "onclick",
    "saveEditchanges.apply(this, arguments)"
  );
  submitButton.innerHTML = "Save Changes";
  };

  const saveEditchanges = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;
  
  
    if (tagname === "BUTTON") {
      parentElement = event.target.parentNode.parentNode;
    } else {
      parentElement = event.target.parentNode.parentNode.parentNode;
    }
  
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
  
    const updatedData = {
      taskTitle: taskTitle.innerHTML,
      taskType: taskType.innerHTML,
      taskDescription: taskDescription.innerHTML,
    };
  
//     console.log(taskTitle);
// console.log(taskDescription);
// console.log(taskType);

// console.log( {updatedData});

    globalStore = globalStore.map((task) => {
      if (task.id === targetID) {
        return {
          id: task.id,
          imageUrl: task.imageUrl,
          taskTitle: updatedData.taskTitle,
          taskType: updatedData.taskType,
          taskDescription: updatedData.taskDescription,
        };
      }
      return task; // Important
    });
  // console.log(globalStore);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
     taskTitle.setAttribute("contenteditable", "false");
     taskDescription.setAttribute("contenteditable", "false");
     taskType.setAttribute("contenteditable", "false");
      submitButton.removeAttribute("onclick");
      submitButton.innerHTML ="Open Task";
  };

  const openCard = (event) => {

  }