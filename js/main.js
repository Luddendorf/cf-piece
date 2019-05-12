document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded");

    var taskList = new Array();
     
    var sortOrder = 'desc';

    var tableMainContainer = document.getElementById('table__main');

    var currentTask = {
      taskId: null,
      taskName: "",
      date: "",
      desc: "",
      wasEdited: false,
      status: "pending"
      };

  //   (function() {
  // document.querySelector('#list__status--button').addEventListener('click', function() {
  //   this.parentNode.parentNode.classList.toggle('closed')
  // }, false);
  // })();

  // (function() {
  // document.querySelector('.table__status--button').addEventListener('click', function() {
  //  const statusButton = this;
  //   statusButton.parentNode.parentNode.classList.toggle('closed')

  //   var triangle = document.querySelector('.triangle');
  //   if(triangle.textContent == "▼") {
  //    triangle.textContent = "▲";
  //    console.log('Set to up');
  //   } else {
  //    triangle.textContent = "▼";
  //   }


  // }, false);
  // })();
  (function() {
    document.querySelector('#table__main').addEventListener('click', function(event) {
        
     if(event.target.classList.contains("status__choose--container")) {
      const acceptor = event.target;
      acceptor.classList.add("u-invisible");

      generateStatusDropdown(acceptor);

      var currentDropdown = document.querySelector('.list__task--dropdown');

      currentDropdown.addEventListener('click', function(event) {
        var myTarget = event.target;

        if(myTarget.classList.contains("status__pending")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #f44336;");
          acceptor.textContent = "Pending ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "pending");
          }

        } else if(myTarget.classList.contains("status__ongoing")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #fbc02d");
          acceptor.textContent = "Ongoing ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "ongoing");
          }

        } else if(myTarget.classList.contains("status__complete")) {
          acceptor.classList.toggle("u-invisible");
          acceptor.setAttribute("style", "background-color: #55c57a");
          acceptor.textContent = "Complete ▼";
          currentDropdown.parentNode.removeChild(currentDropdown);

          let rowIndex = acceptor.parentNode.parentNode.className.substring(25);
          if(taskList.length >= 1) {
            changeProperty(rowIndex, "status", "complete");
          }

        } else {
          return;
        }
      }, false);

     } else {
      return;
     }
    }, false);
  })();

  (function() {
    document.querySelector('#table__main').addEventListener('dblclick', function(event) {
      if(event.target.parentNode.classList.contains('table__content--main')) {
        createTableCell(event);
      }

      if(event.target.classList.contains("table__input--editable")) {
        processEditableTextField(event);
      }

  }, false);
  })();

  //  (function() {
  //   document.querySelector('#table__main').addEventListener('click', function(event) {
     
  //   }, false);
  // })();

  (function() {
    document.querySelector('#table__main').addEventListener('keypress', function(event) {
      let pressedKey = event.key || event.code;
      if(pressedKey == 'Enter') {
        processEditableTextField(event);
      } else { return; }
  }, false);
  })();
  
  (function() {
    document.querySelector('.form__button').addEventListener('click', function(event) {
     event.preventDefault();

     // var localStore = [];

     var localTask = {
      taskId: null,
      taskName: "",
      date: "",
      desc: "",
      wasEdited: false,
      status: "pending"
      };

     inputNameValue = document.getElementById("name").value;
     inputDateValue = document.getElementById("date").value;
     inputDescValue = document.getElementById("story").value;

     localTask.taskName = inputNameValue;
     localTask.date = inputDateValue;
     localTask.desc = inputDescValue;
     localTask.wasEdited = false;
     localTask.status = "pending";
     localTask.taskId = taskList.length + 1;

     localTaskCopy = Object.assign({}, localTask);

     taskList.push(localTaskCopy);

     // localStore.push(localTask);

     renderTable(taskList); 

    });
  })();

     
  (function() {
     document.getElementById('table__main').addEventListener('click', function(event) {
         
       if(event.target.classList.contains("table__column--name-h") ) {
          
          toggleSortOrder();  
          taskList.sort(compareStrings('taskName', sortOrder));
          renderTable(taskList);
       } else if (event.target.classList.contains("table__column--desc-h")) {
         
         toggleSortOrder();  
         taskList.sort(compareStrings('desc', sortOrder));
         renderTable(taskList);
       } else if (event.target.classList.contains("table__column--status-h")) {
         
         toggleSortOrder();
         taskList.sort(compareStrings('status', sortOrder));
         renderTable(taskList);
       } else if(event.target.classList.contains("table__column--edited-h")) {
         
         toggleSortOrder(); 
         taskList.sort(compareBooleans('wasEdited', sortOrder));
         renderTable(taskList);
       //  taskList = [...taskList];
       } else if(event.target.classList.contains("table__column--date-h")) {

         toggleSortOrder();
         taskList.sort(compareDates('date', sortOrder));
         renderTable(taskList);
       }
       // console.log(taskList);
         
     }, false); 
  })();

/* || event.target.classList.contains("table__column--desc-h") || event.target.classList.contains("table__column--edited-h") ||  event.target.classList.contains("table__column--status-h")     */
     
     

  function generateHTML() {
  return `
    <ul class="list__task--dropdown">
       <li class="status__pending"><a href="#1" class="table__status--button">Pending<span class="triangle">▼</span></a></li>
       <li class="status__ongoing">Ongoing</li>
       <li class="status__complete">Complete</li>
       </ul>`
   };

   function generateTableRow(index, name, date, desc, wasEdited, status) {

    this.id = index;
    this.name = name;
    this.date = date;
    this.desc = desc;
    this.wasEdited = wasEdited;
    this.status = status;

    //var parentContainer = document.getElementById('table__main');

    // var mainContainer = document.getElementById('table__rows--container');

    var mainContainer = document.createElement('div');
    mainContainer.className = `table__content--main row-${this.id}`;

    var cellName = document.createElement('div');
    cellName.className = "table__column--name-c u-center";
    cellName.innerHTML = this.name;
    
    var cellDate = document.createElement('div');
    cellDate.className = "table__column--date-c u-center";
    cellDate.innerHTML = this.date;

    var cellDesc = document.createElement('div');
    cellDesc.className = "table__column--desc-c u-center";
    cellDesc.innerHTML = this.desc;

    var cellWasEdited = document.createElement('div');
    cellWasEdited.className = "table__column--edited-c u-center";
    if(this.wasEdited) {
      cellWasEdited.innerHTML = "Yes";
    } else {
      cellWasEdited.innerHTML = "No";
    }
    

    var cellStatus = document.createElement('div');
    cellStatus.className = "table__column--status-c";

    var cellStatusInnerContainer = document.createElement('div');

    if(this.status == "pending") {
      cellStatusInnerContainer.className = "status__choose--container u-red";
    } else if (this.status == "ongoing") {
      cellStatusInnerContainer.className = "status__choose--container u-yellow";
    } else if (this.status == "complete") {
      cellStatusInnerContainer.className = "status__choose--container u-green";
    }
    
    cellStatusInnerContainer.innerHTML = this.status.charAt(0).toUpperCase() + this.status.substr(1) + " ▼";
    

    // final steps:
    cellStatus.appendChild(cellStatusInnerContainer);
    mainContainer.appendChild(cellName);
    mainContainer.appendChild(cellDate);
    mainContainer.appendChild(cellDesc);
    mainContainer.appendChild(cellWasEdited);
    mainContainer.appendChild(cellStatus);

    tableMainContainer.appendChild(mainContainer);
   };

   function generateStatusDropdown(context) {

      const acceptor = context;

      var newUL = document.createElement('ul');
      newUL.className = "list__task--dropdown";

      var statusPending = document.createElement('li');
      statusPending.className = "status__pending";
      
      // innerBlock:
      var tableStatusButton = document.createElement('a');
      tableStatusButton.className = "table__status--button";
      tableStatusButton.innerHTML = "Pending";
      tableStatusButton.setAttribute("href", "#1");
      var triangle = document.createElement('span');
      triangle.className = "triangle";
      triangle.innerHTML = "▼";
      // end of innerBlock
      // we append it to the parent:
      statusPending.appendChild(tableStatusButton);
      statusPending.appendChild(triangle);

      var statusOngoing = document.createElement('li');
      statusOngoing.className = "status__ongoing";
      statusOngoing.innerHTML = "Ongoing";
      var statusComplete = document.createElement('li');
      statusComplete.className = "status__complete";
      statusComplete.innerHTML = "Complete";

      newUL.appendChild(statusPending);
      newUL.appendChild(statusOngoing);
      newUL.appendChild(statusComplete);

      acceptor.parentNode.appendChild(newUL);
   };

   function createHeaders() {
    var mainHeaderContainer = document.createElement('div');
    mainHeaderContainer.className = "table__header--main";
    
    var mainHeader = document.createElement('h2');
    mainHeader.innerHTML = "All tasks";

    mainHeaderContainer.appendChild(mainHeader);

    var mainContainer = document.createElement('div');
    mainContainer.className = "table__content--main";

    var headerName = document.createElement('div');
    headerName.className = "table__column--name-h u-center";
    headerName.innerHTML = "Task Name";

    var headerDate = document.createElement('div');
    headerDate.className = "table__column--date-h u-center";
    headerDate.innerHTML = "Starting Date";

    var headerDesc = document.createElement('div');
    headerDesc.className = "table__column--desc-h u-center";
    headerDesc.innerHTML = "Task Description";

    var headerWasEdited = document.createElement('div');
    headerWasEdited.className = "table__column--edited-h u-center";
    headerWasEdited.innerHTML = "Was Edited";

    var headerStatus = document.createElement('div');
    headerStatus.className = "table__column--status-h u-center";
    headerStatus.innerHTML = "Status";

    mainContainer.appendChild(headerName);
    mainContainer.appendChild(headerDate);
    mainContainer.appendChild(headerDesc);
    mainContainer.appendChild(headerWasEdited);
    mainContainer.appendChild(headerStatus);

    tableMainContainer.appendChild(mainHeaderContainer);
    tableMainContainer.appendChild(mainContainer);
   };

/*
<div class="table__header--main">
    <h2>All tasks</h2>
  </div>
  <div class="table__content--main">
   <div class="table__column--name-h u-center">Task Name</div>
   <div class="table__column--date-h u-center">Starting Date</div>
   <div class="table__column--desc-h u-center">Task Description</div>
   <div class="table__column--edited-h u-center">Was Edited</div>
   <div class="table__column--status-h u-center">Status</div>
  </div> */


   function clearTable() {
    tableMainContainer.innerHTML = "";

     // for(let i = 2; i <= tableMainContainer.children.length - 1; i++) {
     //   console.log(tableMainContainer.children);
     //     tableMainContainer.children[i].remove();
     // }
   };
     
   function compareStrings(key, order = 'asc') {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
          
       const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
       const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
          
       let comparison = 0;
       if(varA > varB) {
           comparison = 1;
       } else if (varA < varB) {
           comparison = -1;
       }
       return((order == 'desc') ? (comparison * -1) : comparison);
      }
   };
     
   function compareBooleans(key, order = 'asc') {
       return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
           
       if(typeof a[key] === 'boolean') {
          const varA = a[key]; 
        }
       if(typeof b[key] === 'boolean') {
          const varB = b[key];
        }
           
      let comparison = 0;
      if(varA === varB) {
          comparison = 0;
      } else if(varA == false) {
          comparison = -1;
      } else {
          comparison = 1;
      }
      return((order == 'desc') ? (comparison * -1) : comparison);
       }
   };
     
  function compareDates(key, order = 'asc') {
    return function(a, b) {
        
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        
    const varA = (typeof a[key] === 'string') ? a[key] : "No date";
    const varB = (typeof b[key] === 'string') ? b[key] : "No date";
          
    let comparison = 0;
        //2019-04-10
    let aYear = varA.substring(0, 4);
    let aMonth = varA.substring(5, 7);
    let aDay = varA.substring(8);
    var aDate = new Date(aYear, aMonth, aDay);
        
    let bYear = varB.substring(0, 4);
    let bMonth = varB.substring(5, 7);
    let bDay = varB.substring(8);
    var bDate = new Date(bYear, bMonth, bDay);
    

    if(aDate.getTime() == bDate.getTime()) {
          comparison = 0;
      } else if(aDate.getTime() > bDate.getTime()) {
          comparison = 1;
      } else if(aDate.getTime() < bDate.getTime()) {
          comparison = -1;
      }
      return((order == 'desc') ? (comparison * -1) : comparison);
       }

    };
     
  function toggleSortOrder() {
    if(sortOrder == 'asc') {
        sortOrder = 'desc';
    } else {
        sortOrder = 'asc';
    }
  };

  function renderTable(taskList) {

    this.taskList = taskList;
    clearTable();
    createHeaders();
    taskList.forEach(function(el) {
      generateTableRow(el.taskId, el.taskName, el.date, el.desc, el.wasEdited, el.status);
     });
  };

  function changeProperty(index, propertyName, propertyValue) {
    this.index = index;
    this.propertyName = propertyName;
    this.propertyValue = propertyValue;

    const soughtIndex = taskList.findIndex(task => task.taskId == this.index);
    
    if(typeof taskList[soughtIndex] !== 'undefined' && taskList[soughtIndex] != -1) {
       taskList[soughtIndex][this.propertyName] = this.propertyValue;
    }
   
  };

  function createTableCell(event) {

    this.cell = event.target;
    this.rowIndex = this.cell.parentNode.className.substring(25);
    this.value = this.cell.textContent;

    if(this.cell.classList.contains("table__column--name-c")) {
      createEditableTextField(this.cell, this.rowIndex, "taskName", this.value);
    }
  };

  function createEditableTextField(context, index, propName, value) {

    let acceptor = context;
    this.propName = propName;
    this.index = index;
    this.value = value;

    let inputField = document.createElement('input');
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", this.value);
    inputField.setAttribute("data-index", `${this.index}`);
    inputField.setAttribute("data-propname", `${this.propName}`);
    inputField.className = "table__input--editable";

    acceptor.appendChild(inputField);
  };

  function processEditableTextField(event) {
    this.cell = event.target;

    if(this.cell.classList.contains("table__input--editable")) {
      this.index = this.cell.dataset.index;
      this.propName = this.cell.dataset.propname;
      this.value = this.cell.value;
      console.log(this.index, this.propName, this.value);

      changeProperty(this.index, this.propName, this.value);
      changeProperty(this.index, "wasEdited", true);
      this.cell.parentNode.parentNode.children[3].innerHTML = "Yes";
      this.cell.parentNode.removeChild(this.cell);
      console.log(taskList);
      } else { return; }
  };


  // SLIDER ///////////////////
  const sliderElem = document.getElementById('slider');
  const thumbElem = sliderElem.children[0];

  thumbElem.onmousedown = function(e) {
    var thumbCoords = getCoords(thumbElem);

    var shiftX = e.pageX - thumbCoords.left;

    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function(e) {

      var newLeft = e.pageX - shiftX - sliderCoords.left;

      if(newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;

      if(newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumbElem.style.left = newLeft + 'px';
    }

    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    return false; // disable selection start (cursor change)
  };

  thumbElem.ondragstart = function() {
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };


  // Immutable.js /////////////////

  const GAME_SIZE = 500;
  const TILE_SIZE = 50;

function draw_body(context, body) {
  const x = body.get("x")*TILE_SIZE, y = body.get("y")*TILE_SIZE;
  const src_x = body.get("imageX"), src_y = body.get("imageY");
  const src_h = body.get("imageH"), src_w = body.get("imageW");
  context.drawImage(body.get("image"), src_x, src_y, src_w, src_h, x, y, TILE_SIZE, TILE_SIZE);


};

function update_game(bodies, left, right, up, down) {
  const hero = bodies.get(0); // our hero is always the first :)
  const x = hero.get("x"),
        y = hero.get("y");
  let new_x = x,
      new_y = y;
  
  if (left) {
    new_x = Math.max(x - 1, 0);
  } else if (right) {
    new_x = Math.min(x + 1, GAME_SIZE/TILE_SIZE - 1);
  }

  if (up) {
    new_y = Math.max(y - 1, 0);
  } else if (down) {
    new_y = Math.min(y + 1, GAME_SIZE/TILE_SIZE - 1);
  }

  const enemy = bodies.rest() // skip the hero
    .find((body) => body.get("x") === new_x && body.get("y") === new_y);
  
  let hero_updated = hero
      bodies_updated = bodies;

  if (enemy !== undefined) {
    // don't step over enemies
    new_x = x;
    new_y = y;

    const [hero_attacked, enemy_updated] = attack(hero, enemy);
    hero_updated = hero_attacked;
    if (enemy_updated.get("health") <= 0) {
      bodies_updated = bodies.delete(bodies.indexOf(enemy));
    } else {
      bodies_updated = bodies.set(bodies.indexOf(enemy), enemy_updated);
    }
  }

  hero_updated = hero_updated.set("x", new_x).set("y", new_y);

  return bodies_updated.set(0, hero_updated);
};

function attack(hero, enemy) {
  const damage = hero.getIn(["weapon", "damage"], 20); // default damage is 20
  const enemy_updated = enemy.update("health", (health) => health - damage);
  const hero_updated = hero.update("health", (health) => {
    if (enemy_updated.get("health") > 0) {
      const enemy_damage = enemy.getIn(["weapon", "damage"], 20);
      return health - enemy_damage;
    }
    return health; // dead enemies don't fight back
  });
  return [hero_updated, enemy_updated];
};

  let bodies = undefined;

  let leftPressed = false,
      rightPressed = false,
      upPressed = false,
      downPressed = false;

  function keyDownHandler(event) {
    if(event.code == 'ArrowRight') {
      rightPressed = true;
    } else if (event.code == 'ArrowLeft') {
      leftPressed = true;
    } else if (event.code == 'ArrowDown') {
      downPressed = true;
    } else if (event.code == 'ArrowUp') {
      upPressed = true;
    }
  }

  function keyUpHandler(event) {
    if(event.code == 'ArrowRight') {
      rightPressed = false;
    } else if (event.code == 'ArrowLeft') {
      leftPressed = false;
    } else if (event.code == 'ArrowDown') {
      downPressed = false;
    } else if (event.code == 'ArrowUp') {
      upPressed = false;
    }
  }

  function render_loop(ctx, health_tag) {
    // redraw bodies:
    ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
    bodies.forEach((body) => draw_body(ctx, body));

    // update UI
    health_tag.innerHTML = bodies.getIn([0, "health"], 0);

    // loop
    window.requestAnimationFrame(() => render_loop(ctx, health_tag));
  }
  
  function init() {

    const { List, fromJS } = window.Immutable;

    const canvas_bg = document.getElementById('game__background');
    const ctx_bg = canvas_bg.getContext('2d');
    const canvas_fg = document.getElementById('game__foreground');
    const ctx_fg = canvas_fg.getContext('2d');

    const health_tag = document.getElementById('game__health');

    const img_hero = document.getElementById('game__hero');
    const img_snake = document.getElementById('game__snake');
    const img_soldier = document.getElementById('game__soldier');

    const hero = fromJS({
      name: "Leo",
      health: 100,
      weapon: {
        type: 'sword',
        damage: 80
      },
      x: 5,
      y: 9,
      image: img_hero,
      imageX: 0,
      imageY: 0,
      imageH: 50,
      imageW: 50
    });

    const snake1 = fromJS({
      health: 50,
      weapon: {
        type: 'bite',
        damage: 10
      },
      x: 2,
      y: 4,
      image: img_snake,
      imageX: 0,
      imageY: 0,
      imageH: 50,
      imageW: 50
    });

    const snake2 = fromJS({
      health: 50,
      weapon: {
        type: 'bite',
        damage: 10
      },
      x: 7,
      y: 6,
      image: img_snake,
      imageX: 0,
      imageY: 0,
      imageH: 50,
      imageW: 50
    });

    const soldier = fromJS({
      health: 120,
      weapon: {
        type: 'club',
        damage: 70
      },
      x: 4,
      y: 2,
      image: img_soldier,
      imageX: 0,
      imageY: 0,
      imageH: 50,
      imageW: 50
    });

  bodies = List.of(hero, snake1, snake2, soldier);

  // handle input:
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  // fill the background:
  ctx_bg.fillStyle = 'green';
  ctx_bg.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

  window.setInterval(() => {
    bodies = update_game(bodies, leftPressed, rightPressed,
      upPressed, downPressed);
  }, 200);
  window.requestAnimationFrame(() => render_loop(ctx_fg, health_tag));
  }

  (function() {
    init();
  })();
  // 


});


  /*  var soughtIndex;
    this.soughtIndex = index;
    this.status = status;

    var taskWithStatus = taskList.filter(soughtElement => {
      return soughtElement.taskId == this.index;
    });
    // var foundTask = taskList.findIndex(project => project.taskId == this.index);


    function checkingFunction(element, index, array) {
      if(element.taskId == this.soughtIndex) {
        
      }
    }

    var myIndex = taskList.findIndex(taskWithStatus.taskId);
    console.log(myIndex);
    // taskWithStatus.status = this.status; */



/*  switch(monthDigits) {
          case '01': return 0; break;
          case '02': return 1; break;
          case '03': return 2; break;
          case '04': return 3; break;
          case '05': return 4; break;
          case '06': return 5; break;
          case '07': return 6; break;
          case '08': return 7; break;
          case '09': return 8; break;
          case '10': return 9; break;
          case '11': return 10; break;
          case '12': return 11; break;
          default: console.log('Invalid month value');
        }      */

/*
  <div class="table__content--main">
		<div class="table__column--name-c u-center">Drawing</div>
		<div class="table__column--date-c u-center">15.02.2005</div>
		<div class="table__column--desc-c u-center">We are going to mix some colors.</div>
		<div class="table__column--edited-c u-center">Yes</div>
		<div class="table__column--status-c">
			<li class="status__choose--container">Pending  <span class="triangle">  ▼</span>
			</li>
		</div>  */


 //    function generateHTML([h, v]) {
	// return `
 //    <div class="item h${h} v${v}">
 //      <img src="img/${randomNumber(12)}.jpg">
 //      <div class="item__overlay">
 //        <button>View →</button>
 //      </div>
 //    </div>
	// `;
 //   }
/*
 const digits = Array.from({ length: 50 }, () => 
	[randomNumber(4), randomNumber(4)]).concat([[1, 1],
	[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],
	[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],
	[1, 1]
	]);

const html = digits.map(generateHTML).join('');

gallery.innerHTML = html; */

   /*   const injector = generateHTML();
      const myLocalHTML = injector;

      acceptor.innerHTML = myLocalHTML; */