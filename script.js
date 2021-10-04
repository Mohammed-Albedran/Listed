var editButtons = document.querySelector(".editButtons");
var editButtonsCondition = "closed";
function openEditButtons(){
    if(editButtonsCondition == "closed"){
        editButtons.style.display = "flex";
        editButtonsCondition = "opend";
    }else if(editButtonsCondition = "opend"){
        editButtons.style.display = "none";
        editButtonsCondition = "closed";
    }
    
}

var addNewTask = document.querySelector(".addNewTask");

function openAddNewTask(condition){
    if(condition == "openDiv"){
        addNewTask.style.display = "block";
        editButtons.style.display = "none";
        editButtonsCondition = "closed";
    }else if(condition == "closeDiv"){
        addNewTask.style.display = "none";
    }
    
}

function selectTaskColor(color){
    if(color == "blue"){
        localStorage.setItem("taskColor","#75a9f9")
    }else if(color == "pink"){
        localStorage.setItem("taskColor","#fc5c9c")
    }else if(color == "green"){
        localStorage.setItem("taskColor","#17b978")
    }else if(color == "red"){
        localStorage.setItem("taskColor","#e74c3c")
    }else if(color == "purple"){
        localStorage.setItem("taskColor","#bf5caa")
    }else if(color == "orange"){
        localStorage.setItem("taskColor","#ff9f43")
    }
}
var selectElement2 = document.querySelector(".selectElement");
//ADDING TASKS SECTION
var tasksArray = [];
var tasksArrayChecked = [];
var tasksArrayUnchecked = [];
function addToTaskMain(){
    var textValue = document.getElementById("textValue");
    var timeValue = document.getElementById("timeValue");
    var mainTasks = document.querySelector(".mainTasks");
    if(textValue.value == "" || textValue.value == " "){
        
    }else{
        var borderTask = "#86a6df";
    if(localStorage.getItem("taskColor") == null){
        borderTask = "#86a6df";
    }else{
        borderTask = localStorage.getItem("taskColor");
    }
    mainTasks.innerHTML += '<div class="task" style="border-left: 10px solid ' + borderTask + ';" draggable="true"><input type="checkbox" onclick="str(this)" class="checkBox"><h2>' + textValue.value + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + timeValue.value + '</h5></div>';
    textValue.value = "";
    timeValue.value = "";
    controlingTaskArray();
    openAddNewTask("closeDiv");
    dragFunction();
    darkLocal();
    if(localStorage.getItem("currentLang") == "ar"){
        arLang.checked = "true";
        activateLang();
    }
    
    }
    
}
function justMainTesting(){
    var textValue = document.getElementById("textValue");
    var timeValue = document.getElementById("timeValue");
    var mainTasks = document.querySelector(".mainTasks");
    if(textValue.value == "" || textValue.value == " "){

    }else{
        var borderTask = "#86a6df";
    if(localStorage.getItem("taskColor") == null){
        borderTask = "#86a6df";
    }else{
        borderTask = localStorage.getItem("taskColor");
    }
    var tsk = document.querySelectorAll(".task");
    var tskLength = tsk.length + 1;
    mainTasks.innerHTML += '<div class="task" style="border-left: 10px solid ' + borderTask + ';" draggable="true"><input type="checkbox" onclick="str(this)" class="checkBox"><h2>' + textValue.value + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + timeValue.value + '</h5><p>'+ tskLength +'</p></div>';
    textValue.value = "";
    timeValue.value = "";
    justTesting();
    openAddNewTask("closeDiv");
    dragFunction();
    darkLocal();
    if(localStorage.getItem("currentLang") == "ar"){
        arLang.checked = "true";
        activateLang();
    }
    }
}


// var buttonOfAddingTask = querySelector(".addNewTaskButton");
function addingTheNewTask(){
    var selectNew = document.querySelector(".selectElement");
    if(selectNew.value == "all"){
        addToTaskMain();
        emptyTaskAll();
        countingTasks();
    }else if(selectNew.value == "checked" || selectNew.value == "unchecked"){
        justMainTesting();
        if(selectElement.value == "checked"){
            emptyTaskCheck();
        }else if(selectElement.value == "unchecked"){
            emptyTaskUncheck();
        }
    }
}
// function tetetete(){
//     if(selectElement2.value == "all"){
//         controlingTaskArray();
//     }else if(selectElement2.value == "checked" || selectElement2.value == "unchecked"){
//         justTesting();
//     }
// }
textValue.onkeydown = ()=>{
    if(event.key == "Enter"){
        addingTheNewTask();
    }
}
function controlingTaskArray(){
    var tasks = document.querySelectorAll(".task");
    tasksArray = [];
    for(var i = 0;i<tasks.length;i++){
        var tasksObject = {};
        var taskNewTitle = tasks[i].children[1].innerHTML;
        if(tasks[i].children[0].checked){
            taskNewTitle = tasks[i].children[1].children[0].innerHTML;
         }else{
              
         }
         var taskNewColor = tasks[i].getAttribute("style").replace("right","left");
        tasksObject.counter = i;
        tasksObject.color = taskNewColor;
        tasksObject.title = taskNewTitle;
        tasksObject.checkBox = tasks[i].children[0].checked;
        tasksObject.time = tasks[i].children[3].innerHTML;
        tasksArray.push(tasksObject);
        
    }
    tasksArrayUnchecked = [];
    tasksArrayChecked = [];
    for(var j = 0;j<tasksArray.length;j++){
        var justTesting = tasksArray[j].checkBox;
    if(justTesting == true){
        tasksArrayChecked.push(tasksArray[j]);
    }else{
        tasksArrayUnchecked.push(tasksArray[j]);
    }
    // console.log(tasksArrayChecked[0] + tasksArrayUnchecked[0]);
    
}
finalArray();
    localStorage.setItem("tasksStorage",JSON.stringify(tasksArray));
    checkAlert();
}

function finalArray(){
    var newArrays = [];
    var newnewArrays = [];
    for(var i = 0;i<tasksArrayChecked.length;i++){
        newArrays.push(tasksArrayChecked[i])
    }
    for(var i = 0;i<tasksArrayUnchecked.length;i++){
        newArrays.push(tasksArrayUnchecked[i])
    }
    newArrays.sort((a, b) => {
        return a.counter - b.counter;
    });
    newArrays.forEach((e) => {
        var newObjects = {};
        newObjects.counter = e.counter;
        newObjects.color = e.color;
        newObjects.title = e.title;
        newObjects.checkBox = e.checkBox;
        newObjects.time = e.time;
        newnewArrays.push(newObjects);
    
    });
    tasksArray = newnewArrays;
    console.log(newnewArrays);
}

function remove(el) {
    var selectElement = document.querySelector(".selectElement");
      if(selectElement.value == "checked" || selectElement.value == "unchecked"){
          var element = el;
        element.remove();
        justTesting();
        if(selectElement.value == "checked"){
            emptyTaskCheck();
        }else if(selectElement.value == "unchecked"){
            emptyTaskUncheck();
        }
      }else{
          var element = el;
          element.style.opacity = "0.2";
          element.style.width = "0px";
          setTimeout(()=>{
              element.remove();
        controlingTaskArray();
        emptyTaskAll();
        countingTasks();
          },300)
      }
      
  }

  function str(el) {
      var selectElement = document.querySelector(".selectElement");
      if(selectElement.value == "checked" || selectElement.value == "unchecked"){
          var checkingStatus = false;
    var checkBox = el;
    var parent1 = el.parentElement.children;
    if(checkBox.checked){
    checkingStatus = true;
    checkBox.setAttribute("checked", "true");
    ghgh = parent1[1].innerHTML;
    parent1[1].innerHTML = "<s>" + parent1[1].innerHTML + "</s>";
    parent1[1].children[0].style.color = "gray";
    justTesting();
    darkLocal();
    }else{
        parent1[1].innerHTML = parent1[1].children[0].innerHTML;
        parent1[1].style.color = "black";
        checkBox.checked = false;
        checkBox.removeAttribute("checked");
        justTesting();
        darkLocal();
    }
      }else{
          var checkingStatus = false;
    var checkBox = el;
    var parent1 = el.parentElement.children;
    if(checkBox.checked){
    checkingStatus = true;
    checkBox.setAttribute("checked", "true");
    ghgh = parent1[1].innerHTML;
    parent1[1].innerHTML = "<s>" + parent1[1].innerHTML + "</s>";
    parent1[1].children[0].style.color = "gray";
    controlingTaskArray();
    }else{
        parent1[1].innerHTML = parent1[1].children[0].innerHTML;
        if(localStorage.getItem("darkMode") == null){
            parent1[1].style.color = "black";
        }else{
            parent1[1].style.color = "white";
        }
        
        checkBox.checked = false;
        checkBox.removeAttribute("checked");
        controlingTaskArray();
        darkLocal();
    }
      }
    
    
  }
  function justTesting(){
      var task = document.querySelectorAll(".task");
      tasksArray = [];
      for(var i = 0;i<task.length;i++){
          var objectNew = {};
          var titling = task[i].children[1].innerHTML;
          if(task[i].children[0].checked){
            titling = task[i].children[1].children[0].innerHTML;
          }else{

          }
          var taskNewColor = task[i].getAttribute("style").replace("right","left");
          objectNew.counter = parseInt(task[i].children[4].innerHTML);
          objectNew.color = taskNewColor;
          objectNew.title = titling;
          objectNew.checkBox = task[i].children[0].checked;
          objectNew.time = task[i].children[3].innerHTML;
          tasksArray.push(objectNew);
      }
      tasksArrayChecked = [];
      tasksArrayUnchecked = [];
      for(var j = 0;j<tasksArray.length;j++){
        var justTesting = tasksArray[j].checkBox;
        if(justTesting == true){
            tasksArrayChecked.push(tasksArray[j]);
        }else{
            tasksArrayUnchecked.push(tasksArray[j]);
        }
      }
      var nArray = [];
      var nnArray = [];
      for(var i = 0;i<tasksArrayUnchecked.length;i++){
          nArray.push(tasksArrayUnchecked[i]);
      }
      nArray.sort((a, b) => {
        return a.counter - b.counter;
    });
    nArray.forEach((e) => {
        var newObjects = {};
        newObjects.counter = e.counter;
        newObjects.color = e.color;
        newObjects.title = e.title;
        newObjects.checkBox = e.checkBox;
        newObjects.time = e.time;
        nnArray.push(newObjects);
    });
    tasksArrayUnchecked = nnArray;
      finalArray();
    localStorage.setItem("tasksStorage",JSON.stringify(tasksArray));
  }
  if(localStorage.getItem("tasksStorage") == null || localStorage.getItem("tasksStorage") == '[]'){
    // if(document.querySelectorAll(".alert").length <= 0){
    //     document.querySelector(".mainAlerts").innerHTML = '<div class="emptyAlerts"><ion-icon class="emptyIcon" name="file-tray-outline"></ion-icon><br><h3>' + "You don't have any alerts"+'</h3></div>';
    // }
}else{
    var taskLocal = JSON.parse(localStorage.getItem('tasksStorage'));
    var mainTasks = document.querySelector(".mainTasks");
    mainTasks.innerHTML = "";
    
    for(var i = 0;i<taskLocal.length;i++){
        var checkBoxCondition = taskLocal[i].checkBox;
        var titleValue = taskLocal[i].title;
        if(checkBoxCondition == true){
            checkBoxCondition = "checked='true'";
            titleValue = "<s style='color: gray;'>" + titleValue + "</s>";
        }else if(checkBoxCondition == false){
            checkBoxCondition = "";
            titleValue = titleValue;
        }
           mainTasks.innerHTML += '<div class="task" style="' + taskLocal[i].color + '" draggable="true"><input type="checkbox" onclick="str(this)" class="checkBox" '+ checkBoxCondition +'><h2>' + titleValue + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + taskLocal[i].time + '</h5></div>';
    }
    controlingTaskArray();
    finalArray();
}


function deleteAllTasks(){
    var selectEl = document.querySelector(".selectElement");
    var checkedTasks = document.querySelector(".checkedTasks");
    var uncheckedTasks = document.querySelector(".uncheckedTasks");
    var tasks = document.querySelectorAll(".task");
    if(selectEl.value == "all"){
        for(var i = 0;i<tasks.length;i++){
            tasks[i].remove();
        }
        controlingTaskArray();
        countingTasks();
        emptyTaskAll();
    }else if(selectEl.value == "checked"){
        var chTasks = checkedTasks.querySelectorAll(".task");
        for(var i = 0;i<chTasks.length;i++){
            chTasks[i].remove();
            justTesting();
            emptyTaskCheck();
        }
        }else if(selectEl.value == "unchecked"){
            var unTasks = uncheckedTasks.querySelectorAll(".task");
            for(var i = 0;i<unTasks.length;i++){
                unTasks[i].remove();
                justTesting();
                emptyTaskUncheck();
            }
        }
        
    }
    


var selectElement = document.querySelector(".selectElement");
var mainTasks = document.querySelector(".mainTasks");
        var checkedTasks = document.querySelector(".checkedTasks");
        var uncheckedTasks = document.querySelector(".uncheckedTasks");
selectElement.onchange = ()=>{
    if(selectElement.value == "checked"){
        
        checkedTasks.style.display = "block";
        uncheckedTasks.style.display = "none";
        mainTasks.style.display = "none";
        mainTasks.innerHTML = '';
        checkedTasks.innerHTML = "";
        uncheckedTasks.innerHTML = "";
        emptyTaskCheck();
        for(var i = 0;i<tasksArrayUnchecked.length;i++){
            mainTasks.innerHTML += '<div class="task" style="' + tasksArrayUnchecked[i].color + '"><input type="checkbox" onclick="str(this)" class="checkBox" ><h2>' + tasksArrayUnchecked[i].title + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + tasksArrayUnchecked[i].time + '</h5><p>'+ tasksArrayUnchecked[i].counter +'</p></div>';
        }
        for(var i = 0;i<tasksArrayChecked.length;i++){
            var checkBoxCondition = tasksArrayChecked[i].checkBox;
            var titleValue = tasksArrayChecked[i].title;
            checkBoxCondition = "checked='true'";
            titleValue = "<s style='color: gray;'>" + titleValue + "</s>";
            checkedTasks.innerHTML += '<div class="task" style="' + tasksArrayChecked[i].color + '"><input type="checkbox" onclick="str(this)" class="checkBox" '+ checkBoxCondition +'><h2>' + titleValue + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + tasksArrayChecked[i].time + '</h5><p>'+ tasksArrayChecked[i].counter +'</p></div>';
        }
    }else if(selectElement.value == "all"){
        checkedTasks.style.display = "none";
        uncheckedTasks.style.display = "none";
        mainTasks.style.display = "block";
        mainTasks.innerHTML = '';
        checkedTasks.innerHTML = "";
        uncheckedTasks.innerHTML = "";
        emptyTaskAll();
        for(var i = 0;i<tasksArray.length;i++){
            var checkBoxCondition = tasksArray[i].checkBox;
            var titleValue = tasksArray[i].title;
            if(checkBoxCondition == true){
                checkBoxCondition = "checked='true'";
                titleValue = "<s style='color: gray;'>" + titleValue + "</s>";
            }else if(checkBoxCondition == false){
                checkBoxCondition = "";
                titleValue = titleValue;
            }
               mainTasks.innerHTML += '<div class="task" style="' + tasksArray[i].color + '" draggable="true"><input type="checkbox" onclick="str(this)" class="checkBox" '+ checkBoxCondition +'><h2>' + titleValue + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + tasksArray[i].time + '</h5></div>';;
        }
    }else if(selectElement.value == "unchecked"){
        checkedTasks.style.display = "none";
        uncheckedTasks.style.display = "block";
        mainTasks.style.display = "none";
        mainTasks.innerHTML = '';
        checkedTasks.innerHTML = "";
        uncheckedTasks.innerHTML = "";
        emptyTaskUncheck();
        for(var i = 0;i<tasksArrayChecked.length;i++){
            var checkCondition = tasksArrayChecked[i].checkBox;
            var titleValue2 = tasksArrayChecked[i].title;
            checkCondition = "checked='true'";
            titleValue2 = "<s style='color: gray;'>" + titleValue2 + "</s>";
            mainTasks.innerHTML += '<div class="task" style="' + tasksArrayChecked[i].color + '"><input type="checkbox" onclick="str(this)" class="checkBox" '+ checkCondition +'><h2>' + titleValue2 + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + tasksArrayChecked[i].time + '</h5><p>'+ tasksArrayChecked[i].counter +'</p></div>';;
        }
        for(var j = 0;j<tasksArrayUnchecked.length;j++){
            var checkCondition2 = tasksArrayUnchecked[j].checkBox;
            checkCondition2 = ""; 
            uncheckedTasks.innerHTML += '<div class="task" style="' + tasksArrayUnchecked[j].color + '"><input type="checkbox" onclick="str(this)" class="checkBox" '+ checkCondition2 +'><h2>' + tasksArrayUnchecked[j].title + '</h2><ion-icon class="deleteTaskIcon" onclick="remove(this.parentElement)" name="trash-outline">'+'</ion-icon><h5 class="taskTime">' + tasksArrayUnchecked[j].time + '</h5><p>'+ tasksArrayUnchecked[j].counter +'</p></div>';;
        }
    }
    dragFunction();
    darkLocal();
    emptyTaskAll();
    emptyTaskCheck();
    emptyTaskUncheck();
}


///////////////////////////DRAG AND DROP TASKS//////////////////////////

function dragFunction(){
    const draggables = document.querySelectorAll('.task')
    const containers = document.querySelectorAll('.container')
    
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })
    
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        controlingTaskArray();
      })
    })
    
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    })
    
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')]
    
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element
    }
}

onload = ()=>{
    dragFunction();
}



//Alerts
var alertContainer = document.querySelector(".alertContainer");
function checkAlert(){
    var time1 = new Date();
    var tHours = time1.getHours();
    var tMinutes = time1.getMinutes();
    var fullTime = tHours + ":" + tMinutes;
    if(localStorage.getItem("alertDisabled") == null){
        for(var i = 0;i<tasksArrayUnchecked.length;i++){
        if(tasksArrayUnchecked[i].time == fullTime){
            console.log("testing")
            var alTitle = "You have a task to do";
            if(localStorage.getItem("currentLang") == "ar"){
                alTitle = "لديك مهمة لأنجازها";
            }else{
                alTitle = "You have a task to do";
            }
            alertContainer.style.display = "block";
            alertContainer.innerHTML += '<div class="alert" style="'+ tasksArrayUnchecked[i].color +'border-left-width: 7px;">' + '<article class="content"><h3>'+ alTitle +'</h3><h4>' + tasksArrayUnchecked[i].title + '</h4></article>' + '<span class="deleteAlert"><a onclick="remove2(this.parentElement.parentElement)">&times;</a></span></div>';
        }
    }
    }
    
}


var theInterval = setInterval(checkAlert,55000);




/////////////////////////////////    NOTES SECTION    /////////////////////////////////////

var editButtons2 = document.querySelector(".editButtons2");
var editButtonsCondition2 = "closed";
function openEditButtons2(){
    if(editButtonsCondition2 == "closed"){
        editButtons2.style.display = "flex";
        editButtonsCondition2 = "opend";
    }else if(editButtonsCondition2 = "opend"){
        editButtons2.style.display = "none";
        editButtonsCondition2 = "closed";
    }
    
}


var addNewNote = document.querySelector(".addNewNote");

function openAddNewNote(condition){
    if(condition == "openDiv"){
        addNewNote.style.display = "block";
        editButtons2.style.display = "none";
        editButtonsCondition2 = "closed";
    }else if(condition == "closeDiv"){
        addNewNote.style.display = "none";
    }
    
}


function selectNoteColor(color){
    if(color == "red"){
        localStorage.setItem("noteColor","#ffb3ba")
    }else if(color == "yellow"){
        localStorage.setItem("noteColor","#ffffab")
    }else if(color == "blue"){
        localStorage.setItem("noteColor","#bae1ff")
    }else if(color == "green"){
        localStorage.setItem("noteColor","#baffc9")
    }else if(color == "orange"){
        localStorage.setItem("noteColor","#ffdfba")
    }
}


//ADDING NOTE SECTION
var notesArray = [];
var textValue2 = document.getElementById("textValue2");
var notesMain = document.querySelector(".notesMain");
function addToNoteMain(){
    var textValue2 = document.getElementById("textValue2");
    var notesMain = document.querySelector(".notesMain");
    var noteBackColor = "#ffffab";
    if(localStorage.getItem("noteColor") == null){
        noteBackColor = "#ffffab";
    }else{
        noteBackColor = localStorage.getItem("noteColor");
    }
    notesMain.innerHTML += '<div  class="note" style="background-color: '+ noteBackColor +';"><h4>'+ textValue2.value +'</h4><ion-icon class="deleteNoteIcon" name="close-circle-outline" onclick="remove2(this.parentElement)"></ion-icon></div>';
    textValue2.value = "";
    controlingNoteArray();
    openAddNewNote("closeDiv");
    darkNotes();
    emptyNote();
}
textValue2.onkeydown = ()=>{
    if(event.key == "Enter"){
        addToNoteMain();
    }
}

function controlingNoteArray(){
    var note = document.querySelectorAll(".note");
    notesArray = [];
    for(var i = 0;i<note.length;i++){
        var notesObject = {};
        notesObject.color = note[i].getAttribute("style");
        notesObject.title = note[i].children[0].innerHTML;
        notesArray.push(notesObject);
    }
    localStorage.setItem("notesStorage",JSON.stringify(notesArray));
}


if(localStorage.getItem("notesStorage") == null || localStorage.getItem("notesStorage") == '[]'){

}else{
    var noteLocal = JSON.parse(localStorage.getItem("notesStorage"));
    notesMain.innerHTML = "";
    for(var i = 0;i<noteLocal.length;i++){
        notesMain.innerHTML += '<div class="note" style="'+ noteLocal[i].color +'"><h4>'+ noteLocal[i].title +'</h4><ion-icon class="deleteNoteIcon" name="close-circle-outline" onclick="remove2(this.parentElement)"></ion-icon></div>';
    }
    controlingNoteArray();
}

function deleteAllNotes(){
    var notes = document.querySelectorAll(".note");
for(var i = 0;i<notes.length;i++){
    notes[i].remove();
}
controlingNoteArray();
emptyNote();
}

function remove2(el){
    var element = el;
    element.style.width = "0";
    element.style.opacity = "0.2";
    setTimeout(()=>{
       element.remove();
    controlingNoteArray();
    emptyNote();
    },300)
    var alert = document.querySelectorAll(".alert");
    var alertContainer = document.querySelector(".alertContainer");
    if(alert.length <= 1){
        alertContainer.style.display = "none";
    }
    
}









///////////////////////Settings/////////////////////

var settingsDiv = document.querySelector(".settings");
var settingsSituation = "close";
function openSettings(){
    if(settingsSituation == "close"){
        settingsDiv.style.height = "320px";
        settingsDiv.style.display = "block";
        settingsSituation = "open";
    }else if(settingsSituation == "open"){
        settingsDiv.style.height = "0";
        setTimeout(()=>{
        settingsDiv.style.display = "none";
        settingsSituation = "close";
        },300);
        
    }
}

//Settings buttons

var newButton = document.querySelectorAll(".newButton");
function activateButton(el){
    var element = el;
    if(element.classList.contains("activateB")){
        element.classList.remove("activateB");
    }else{
        element.classList.add("activateB");
    }
   
 }

///////////Dark mode////////////
var body = document.body;
var theTasks = document.querySelector(".tasks");
var theNotes = document.querySelector(".notes");
var oneTask = document.querySelectorAll(".task");
var oneNote = document.querySelectorAll(".note");
var settings1 = document.querySelector(".settings");
var editButtons1 = document.querySelector(".editButtons");
var editButtons1 = document.querySelector(".editButtons");
var editButtons12 = document.querySelector(".editButtons2");
var addNewTask1 = document.querySelector(".addNewTask");
var addNewNote1 = document.querySelector(".addNewNote");
var alertContainer1 = document.querySelector(".alertContainer");
var noteColorButtons = document.querySelectorAll(".noteColorButtons");
 function addDarkMode(){
     body.classList.add("bodyDark");
     theTasks.classList.add("tasksDark");
     alertContainer1.classList.add("alertContainerDark");
     theNotes.classList.add("notesDark");
     addNewTask1.classList.add("addNewTaskDark");
     addNewNote1.classList.add("addNewNoteDark");
     editButtons1.classList.add("editButtonsDark");
     editButtons12.classList.add("editButtonsDark");
     for(var i = 0;i<oneNote.length;i++){
         if(oneNote[i].getAttribute("style") == 'background-color: #ffb3ba;'){
             oneNote[i].classList.add("noteColor1");
         }else if(oneNote[i].getAttribute("style") == 'background-color: #ffffab;'){
             oneNote[i].classList.add("noteColor2");
         }else if(oneNote[i].getAttribute("style") == 'background-color: #bae1ff;'){
            oneNote[i].classList.add("noteColor3");
        }else if(oneNote[i].getAttribute("style") == 'background-color: #baffc9;'){
            oneNote[i].classList.add("noteColor4");
        }else if(oneNote[i].getAttribute("style") == 'background-color: #ffdfba;'){
            oneNote[i].classList.add("noteColor5");
        }
     }

     settings1.classList.add("settingsDark");

 }

var noteColor1 = document.querySelectorAll(".noteColor1");
var noteColor2 = document.querySelectorAll(".noteColor2");
var noteColor3 = document.querySelectorAll(".noteColor3");
var noteColor4 = document.querySelectorAll(".noteColor4");
var noteColor5 = document.querySelectorAll(".noteColor5");
 function removeDarkMode(){
    body.classList.remove("bodyDark");
    theTasks.classList.remove("tasksDark");
    alertContainer1.classList.remove("alertContainerDark");
    theNotes.classList.remove("notesDark");
    addNewTask1.classList.remove("addNewTaskDark");
    addNewNote1.classList.remove("addNewNoteDark");
    editButtons1.classList.remove("editButtonsDark");
    editButtons12.classList.remove("editButtonsDark");
    settings1.classList.remove("settingsDark");
 }
var darkButton = document.querySelector(".darkButton");
function activateDarkMode(){
    
    if(darkButton.classList.contains("activateB")){
        darkButton.classList.remove("activateB");
        removeDarkMode();
        localStorage.removeItem("darkMode");
    }else{
        darkButton.classList.add("activateB");
        addDarkMode();
        localStorage.setItem("darkMode","activated");
    }
    
}

darkButton.onclick = ()=>{
    activateDarkMode();
}
var noting = document.querySelectorAll(".note");
function darkNotes(){
    var oneNote = document.querySelectorAll(".note");//for(var i = 0;i<oneNote.length;i++){oneNote[i].classList.add("noteColor3")}
    for(var i = 0;i<oneNote.length;i++){
        if(oneNote[i].getAttribute("style") == 'background-color: #ffb3ba;'){
            oneNote[i].classList.add("noteColor1");
        }else if(oneNote[i].getAttribute("style") == 'background-color: #ffffab;'){
            oneNote[i].classList.add("noteColor2");
        }else if(oneNote[i].getAttribute("style") == 'background-color: #bae1ff;'){
            oneNote[i].classList.add("noteColor3");
       }else if(oneNote[i].getAttribute("style") == 'background-color: #baffc9;'){
        oneNote[i].classList.add("noteColor4");
       }else if(oneNote[i].getAttribute("style") == 'background-color: #ffdfba;'){
        oneNote[i].classList.add("noteColor5");
       }
    }
}

onload = ()=>{
    darkLocal();
    dragFunction();
    if(localStorage.getItem("currentLang") == "ar"){
        arLang.checked = "true";
        activateLang();
    }else if(localStorage.getItem("currentLang") == "en" || localStorage.getItem("currentLang") == null){
        enLang.checked = "true";
    }
    if(navigator.language.includes("ar") && localStorage.getItem("currentLang") == null){
        arLang.checked = "true";
        activateLang();
    }
    if(localStorage.getItem("alertDisabled") == "true"){
        alertButton.classList.remove("activateB");
    }
    if(screen.width < 477 && screen.width > 431){
        theTextValue.setAttribute("maxlength",30);
     }else if(screen.width >477){
         theTextValue.setAttribute("maxlength",35);
     }else if(screen.width <431){
         theTextValue.setAttribute("maxlength",25);
     }if(screen.width <327){
         theTextValue.setAttribute("maxlength",23);
     }
    countingTasks();
}
function darkLocal(){
    if(localStorage.getItem("darkMode") == null){

    }else{
        darkButton.classList.add("activateB");
        addDarkMode();
    }
}



///////////////////   ARABIC LANGUAGE    /////////////


function addArabicLang(){
    var tasks = document.querySelector(".tasks");
    var notes = document.querySelector(".notes");
    var addTask = document.querySelector(".addNewTask");
    var addNote = document.querySelector(".addNewNote");
    var settings = document.querySelector(".settings");
    var alertCont = document.querySelector(".alertContainer");

    var tasksTitle = document.querySelector(".tasksTitle");

    tasks.classList.add("tasksAr");
    alertCont.classList.add("alertContainerAr");
    notes.classList.add("notesAr");
    addTask.classList.add("addNewTaskAr");
    addNote.classList.add("addNewNoteAr");
    settings.classList.add("settingsAr");
    tasksTitle.innerHTML = '<ion-icon class="icons" name="settings" onclick="openSettings()"></ion-icon>لديك <bdi class="tasksNumber">5</bdi> مهام</h1>';

    notes.getElementsByTagName("header")[0].getElementsByTagName("h1")[0].innerHTML = "الملاحظات";


    //select//
    var allS = document.querySelector(".allS");
    var checkS = document.querySelector(".checkS");
    var uncheckS = document.querySelector(".uncheckS");

    allS.innerHTML = "كل المهام";
    checkS.innerHTML = "المهام المنجزة";
    uncheckS.innerHTML = "المهام الغير المنجزة";

    //add task//
    addTask.getElementsByTagName("h3")[0].innerHTML = "اضافة مهمة";
    addTask.getElementsByTagName("legend")[0].innerHTML = "المهمة";
    addTask.getElementsByTagName("legend")[1].innerHTML = "الوقت";
    addTask.getElementsByTagName("button")[6].innerHTML = "اضافة المهمة";
    //add note//
    addNote.getElementsByTagName("h3")[0].innerHTML = "اضافة ملاحظة";
    addNote.getElementsByTagName("legend")[0].innerHTML = "الملاحظة";
    addNote.getElementsByTagName("button")[5].innerHTML = "اضافة الملاحظة";

    //settings//
    settings.getElementsByTagName("h2")[0].innerHTML = "الاعدادات";
    settings.getElementsByTagName("h3")[0].innerHTML = "الوضع المظلم";
    settings.getElementsByTagName("h3")[1].innerHTML = "التنبيهات";
    settings.getElementsByTagName("h3")[2].innerHTML = "اللغة";
    settings.getElementsByTagName("h4")[0].innerHTML = "الأنجليزية";
    settings.getElementsByTagName("h4")[1].innerHTML = "العربية";

    //editButtons//
    var edit = document.querySelector(".editButtons");
    var edit2 = document.querySelector(".editButtons2");

    edit2.getElementsByTagName("p")[0].innerHTML = "اضافة";
    edit2.getElementsByTagName("p")[1].innerHTML = "حذف الكل";
    edit.getElementsByTagName("p")[0].innerHTML = "اضافة";
    edit.getElementsByTagName("p")[1].innerHTML = "حذف الكل";


    var task5 = document.querySelectorAll(".task");
    for(var i = 0;i<task5.length;i++){
        var att = task5[i].getAttribute("style");
        var newAtt = att.replace("left","right");
        task5[i].setAttribute("style",newAtt);
    }
}



function removeArabicLang(){
    var tasks = document.querySelector(".tasks");
    var notes = document.querySelector(".notes");
    var addTask = document.querySelector(".addNewTask");
    var addNote = document.querySelector(".addNewNote");
    var settings = document.querySelector(".settings");
    var alertCont = document.querySelector(".alertContainer");


    var tasksTitle = document.querySelector(".tasksTitle");

    tasks.classList.remove("tasksAr");
    alertCont.classList.remove("alertContainerAr");
    notes.classList.remove("notesAr");
    addTask.classList.remove("addNewTaskAr");
    addNote.classList.remove("addNewNoteAr");
    settings.classList.remove("settingsAr");
    tasksTitle.innerHTML = '<ion-icon class="icons" name="settings" onclick="openSettings()"></ion-icon>You have <bdi class="tasksNumber">5</bdi> tasks</h1>';

    notes.getElementsByTagName("header")[0].getElementsByTagName("h1")[0].innerHTML = "Sticky notes";


    //select//
    var allS = document.querySelector(".allS");
    var checkS = document.querySelector(".checkS");
    var uncheckS = document.querySelector(".uncheckS");

    allS.innerHTML = "All Tasks";
    checkS.innerHTML = "Checked Tasks";
    uncheckS.innerHTML = "Unchecked Tasks";

    //add task//
    addTask.getElementsByTagName("h3")[0].innerHTML = "Add new task";
    addTask.getElementsByTagName("legend")[0].innerHTML = "The task";
    addTask.getElementsByTagName("legend")[1].innerHTML = "The Time";
    addTask.getElementsByTagName("button")[6].innerHTML = "Create a task";
    //add note//
    addNote.getElementsByTagName("h3")[0].innerHTML = "Add new note";
    addNote.getElementsByTagName("legend")[0].innerHTML = "The note";
    addNote.getElementsByTagName("button")[5].innerHTML = "Create a note";

    //settings//
    settings.getElementsByTagName("h2")[0].innerHTML = "Settings";
    settings.getElementsByTagName("h3")[0].innerHTML = "Dark theme";
    settings.getElementsByTagName("h3")[1].innerHTML = "Alerts";
    settings.getElementsByTagName("h3")[2].innerHTML = "Language";
    settings.getElementsByTagName("h4")[0].innerHTML = "English";
    settings.getElementsByTagName("h4")[1].innerHTML = "Arabic";

    //editButtons//
    var edit = document.querySelector(".editButtons");
    var edit2 = document.querySelector(".editButtons2");

    edit2.getElementsByTagName("p")[0].innerHTML = "Add";
    edit2.getElementsByTagName("p")[1].innerHTML = "Delete All";
    edit.getElementsByTagName("p")[0].innerHTML = "Add";
    edit.getElementsByTagName("p")[1].innerHTML = "Delete All";


    var task5 = document.querySelectorAll(".task");
    for(var i = 0;i<task5.length;i++){
        var att = task5[i].getAttribute("style");
        var newAtt = att.replace("right","left");
        task5[i].setAttribute("style",newAtt);
    }
}

var enLang = document.getElementById("enLang");
var arLang = document.getElementById("arLang");


function activateLang(){
    if(arLang.checked){
        addArabicLang();
    }else if(enLang.checked){
        removeArabicLang();
    }
}

enLang.onclick = ()=>{
    activateLang();
    localStorage.setItem("currentLang","en");
    emptyTaskUncheck();
    emptyTaskCheck();
    emptyTaskAll();
    emptyNote();
}

arLang.onclick = ()=>{
    activateLang();
    localStorage.setItem("currentLang","ar");
    emptyTaskUncheck();
    emptyTaskCheck();
    emptyTaskAll();
    emptyNote();
}





//       ALERT BUTTON         //

var alertButton = document.querySelector(".alertButton");

function activateAlert(){
    if(alertButton.classList.contains("activateB")){
        alertButton.classList.remove("activateB");
        localStorage.setItem("alertDisabled","true");
    }else{
        alertButton.classList.add("activateB");
        localStorage.removeItem("alertDisabled");
    }
}

alertButton.onclick = ()=>{
    activateAlert();
}




function emptyTaskAll(){
    var allTasks = document.querySelector(".mainTasks");
    var allTask = allTasks.querySelectorAll(".task");
    var title = "you don't have any s";
    if(localStorage.getItem("currentLang") == "ar"){
        title = "<bdi style='color: black !important;'>ليس لديك اي مهام</bdi>";
    }else{
        title = "you don't have any tasks";
    }
    if(allTask.length <= 0){
        allTasks.innerHTML = '<div class="emptyAll"><ion-icon class="emptyIcon" name="file-tray-outline"></ion-icon><h1>' + title + '</h1></div>'
    }else if(allTask.length > 0){
        var emAll = document.querySelector(".emptyAll");
        if(emAll == undefined){
            
        }else{
            emAll.remove();
        }
    }
}
function emptyTaskCheck(){
    var checkTasks = document.querySelector(".checkedTasks");
    var checkTask = checkTasks.querySelectorAll(".task");
    var title = "you don't have any checked tasks";
    if(localStorage.getItem("currentLang") == "ar"){
        title = "<bdi style='color: black !important;font-family: 'Tajawal', sans-serif;'>ليس لديك مهام منجزة</bdi>";
    }else{
        title = "you don't have any checked tasks";
    }
    if(checkTask.length <= 0){
        checkTasks.innerHTML = '<div class="emptyCheck"><ion-icon class="emptyIcon" name="file-tray-outline"></ion-icon><h1>'+ title +'</div>'
    }else if(checkTask.length > 0){
        var emCheck = document.querySelector(".emptyCheck");
        if(emCheck == undefined){
            
        }else{
            emCheck.remove();
        }
    }
}
emptyTaskCheck();
function emptyTaskUncheck(){
    var uncheckTasks = document.querySelector(".uncheckedTasks");
    var uncheckTask = uncheckTasks.querySelectorAll(".task");
    var title = "you don't have any unchecked tasks";
    if(localStorage.getItem("currentLang") == "ar"){
        title = "<bdi style='color: black !important;font-family: 'Tajawal', sans-serif;'>ليس لديك مهام غير منجزة</bdi>";
    }else{
        title = "you don't have any unchecked tasks";
    }
    if(uncheckTask.length <= 0){
        uncheckTasks.innerHTML = '<div class="emptyUncheck"><ion-icon class="emptyIcon" name="file-tray-outline"></ion-icon><h1>'+ title +'</h1></div>';
    }else if(uncheckTask.length > 0){
        var emUncheck = document.querySelector(".emptyUncheck");
        if(emUncheck == undefined){
            
        }else{
            emUncheck.remove();
        }
    }
}

emptyTaskUncheck();
function emptyNote(){
    var notesMain = document.querySelector(".notesMain");
    var note1 = notesMain.querySelectorAll(".note");
    var title = "you don't have any notes";
    if(localStorage.getItem("currentLang") == "ar"){
        title = "<bdi style='color: black !important;'>ليس لديك اي ملاحظات</bdi>";
    }else{
        title = "you don't have any notes";
    }
    if(note1.length <= 0){
        notesMain.innerHTML = '<div class="emptyNote"><ion-icon class="emptyIcon" name="file-tray-outline"></ion-icon><h1>'+ title +'</h1></div>'
    }else if(note1.length > 0){
        var emNote = document.querySelector(".emptyNote");
        if(emNote == undefined){
            
        }else{
            emNote.remove();
        }
    }
}
emptyNote();
emptyTaskAll();



 function countingTasks(){
     var mainElement = document.querySelector(".mainTasks");
     var theNumber = document.querySelector(".tasksNumber");
     var theNTasks = mainElement.querySelectorAll(".task");
     theNumber.innerHTML = theNTasks.length;
 }
countingTasks();


var theTextValue = document.getElementById("textValue");

//task text input max length
addEventListener("resize",()=>{
    if(screen.width < 477 && screen.width > 431){
       theTextValue.setAttribute("maxlength",30);
    }else if(screen.width >477){
        theTextValue.setAttribute("maxlength",35);
    }else if(screen.width <431){
        theTextValue.setAttribute("maxlength",25);
    }if(screen.width <327){
        theTextValue.setAttribute("maxlength",23);
    }
})
// onload = ()=>{
//     if(screen.width < 477 && screen.width > 431){
//         theTextValue.setAttribute("maxlength",30);
//      }else if(screen.width >477){
//          theTextValue.setAttribute("maxlength",35);
//      }else if(screen.width <431){
//          theTextValue.setAttribute("maxlength",25);
//      }if(screen.width <327){
//          theTextValue.setAttribute("maxlength",23);
//      }
// }
