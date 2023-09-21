
  const uname = document.getElementById("uname")
  const pin = document.getElementById("pin")
  const lpin = document.getElementById("secPin")

  const logname = document.getElementById("lname")
  const logpin = document.getElementById("lpin")

  //for Adding details
  const ttitle = document.getElementById("title");
  const ddescription = document.getElementById("description");
  const ddate = document.getElementById("date");

  //Done - Validating
 function isVal() {
  if(ttitle.value === "" || ddescription.value === "" || ddate.value === "") { 
      window.alert("Please leave no field incomplete."); 
      return false;
  } else { return true; }
}
function isCorrect() {
  if(logname.value === "" || logpin.value === "") { 
      window.alert("Please leave no field incomplete."); return false;
  } else { return true; }
}
//Done - Perform Validation
function isValid() {
  if(uname.value === "" || pin.value === "" || lpin.value === "") { 
      window.alert("Please leave no field incomplete."); return false;
  } else if (pin.value !== lpin.value) { alert("Passwords DO NOT match"); return false; } 
  else { return true; }
}

//Reading all the data stored
function PerformDelete (index) { 
  var todoList;
  if(localStorage.getItem("todoList") == null) {
      todoList = []; //Creating an array object for capture of values to be entered.
  } else { 
      todoList = JSON.parse(localStorage.getItem("todoList"))
  }

  todoList.splice(index, 1)
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
  //Refresh page everytime the data is updated.
  document.onload = PerformRead();

}

//Done - Create Account
function PerformC() { 
  
  if (isValid() == true) {
    //var date = document.getElementById("date").value;

    var usersList;
    if(localStorage.getItem("usersList") == null) {
	    usersList = [];
    } else { 
      usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    //more like pushing data inserting it into the database (localStorage)
    usersList.push({
      name:uname.value,
      pin:pin.value,
    });

    localStorage.setItem("usersList", JSON.stringify(usersList));
    
    //Alert user if data was successfully stored or not
    window.alert("Yeyy! user added..")
    window.location.href = "http://127.0.0.1:5500/PerformLogin.html";
  }
}

//Done - Add Information/Data
function PerformAdd() {

  //here, the code is to disable the dates that have passed and enables the current
  //and those in future

  //application starts
  if (isVal() ==true) {

    var todoList;
    if(localStorage.getItem("todoList") == null) {
	    todoList = [];
    } else { 
	    todoList = JSON.parse(localStorage.getItem("todoList"))
    }

    //more like pushing data inserting it into the database (localStorage)
    todoList.push({
      ttitle:ttitle.value,
      Description:ddescription.value,
      Date:ddate.value,
    });
    //Convert object into string for easy capture, avoiding errors.
    window.localStorage.setItem("todoList", JSON.stringify(todoList));

    //Alert user if data was successfully stored or not
    window.alert("Yeyyy! successfully stored in..")
    location.reload();

  //Refresh page everytime the data is updated.
  document.onload = PerformRead();  
}
}

//Done - Loggin feature
function PerformLogin(){

  //comparing to the info saved oin the localStorage
  let readname = localStorage.getItem("uname");
  let readpin = localStorage.getItem("pin");

  if (isCorrect() ==true) {
    let user_records =new Array();
    user_records=JSON.parse(localStorage.getItem("usersList"))?JSON.parse(localStorage.getItem("usersList")):[]

    if(user_records.some((v) => { return v.logname == readname && v.logpin ==readpin}))
    {
      alert("Welcome back,"); 
      location.reload();
      // let current_user = user_records.filter((v)=>{return v.logname==logname && v.logpin==logpin})[0]
      // localStorage.setItem('name',current_user.readname);
      location.href="http://127.0.0.1:5500/PerformReadAll.html"
    } else { alert('Sign in failed..'); }
    }
}

function PerformRead () {
  var todoList;
  if(localStorage.getItem("todoList") == null) {
      todoList = []; //Creating an array object for capture of values to be entered.
  } else { 
      todoList = JSON.parse(localStorage.getItem("todoList"))
  }
  
  var information = "";
  var addcounnt = 1;
  
  //Display all the information in the localStorage.
  todoList.forEach(function (element, index){ 
  information += "<tr>";
  information += "<td>" + addcounnt + "<td>";
  information += "<td>" + element.ttitle + "<td>";
  information += "<td >" + element.ddescription + "<td>";
  information += "<td>" + element.ddate + "<td>";
  
  information += '<td><a style="text-decoration: none; color: red;" onclick="PerformDelete('+
    index +') " > del</a>&nbsp;<a id="btnInnerAlter" style="text-decoration: none; color: blue;" onclick="PerformAlter('+
    index +')" > update</a>&nbsp;<a style="text-decoration: none; color: green;" onclick="PerformView('+
    index +')" > view</a></td>'
  information += "</tr>";

  //to keep adding count
  addcounnt++;
  });

  //And update on the table displaying data.
  document.querySelector("#performviewing tbody").innerHTML = information;
}
  //Refresh page everytime the data is updated.
  document.onload = PerformRead();

function PerformAlter(index){

  document.getElementById("btnAlterData").style.display = "block";
  document.getElementById("btnReset").style.display = "none";
  document.getElementById("btnAdd").style.display = "none";

    var todoList;
    if(localStorage.getItem("todoList") == null) {
	    todoList = [];
    } else { 
	    todoList = JSON.parse(localStorage.getItem("todoList"))
    }

    //This code here, allows you to retrieve info to text fields for view and editing
    document.getElementById("title").value = todoList[index].ttitle;
    document.getElementById("description").value = todoList[index].ddescription;
    document.getElementById("date").value = todoList[index].ddate;

    //This finctiokn is respoinsible for data update should user wish to do that
    document.querySelector("#btnAlterData").onclick = function() {
      if(isVal() == true) { //validate if none of the fields are empty
        
        //to assign any changes to database already-stored information
        todoList[index].ttitle = document.getElementById("title").value;
        todoList[index].ddescription = document.getElementById("description").value;
        todoList[index].ddate = document.getElementById("date").value;
        
        //and update tot he DATABASE finally/eventually..
        localStorage.setItem("todoList", JSON.stringify(todoList))

        //And empty the fields becos theres gonna be a shift of buttons that werent displaying when update was in display
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("date").value = "";

        //and refresh right after
        PerformRead();

        //Switvh the buttons back
        document.getElementById("btnAlterData").style.display = "none";
        document.getElementById("btnReset").style.display = "block";
        document.getElementById("btnAdd").style.display = "block";

      }
    }
    
    //Refresh page everytime the data is updated.
    document.onload = PerformRead();            
}


function PerformView(index) {
  //Opening and converting databased information to be accessible
  //by JSON.parse()'sing it
  var todoList;
  if(localStorage.getItem("todoList") == null) {
	    todoList = [];
  } else { 
	    todoList = JSON.parse(localStorage.getItem("todoList"))
  }

    //This code here, allows you to retrieve info to text fields for view and editing
    document.getElementById("title").value = todoList[index].ttitle;
    document.getElementById("description").value = todoList[index].ddescription;
    document.getElementById("date").value = todoList[index].ddate;
    
    //disabled fields when in view mode
    ttitle.setAttribute("disabled", "disabled");
    ddescription.setAttribute("disabled", "disabled");
    ddate.setAttribute("disabled", "disabled");

    //Refresh page everytime the data is updated.
    document.onload = PerformRead(); 
}





