// The timer function to make clock
function updateTime() {
    var timeToDisplay = new Date().toLocaleString();
    var timeDisplay = document.querySelector("#timeDisplay");
    timeDisplay.innerHTML = timeToDisplay;
}

setInterval(updateTime, 1000);



// Window opening and closing logic (generic: works for every .window)
function openWindow(element) {
    element.style.display = "flex"; // matches the .window class's default layout, so nothing shifts
}

function closeWindow(element) {
    element.style.display = "none";
}

// Any element with class "open-btn" and a data-target opens the matching window
document.querySelectorAll(".open-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        var target = document.getElementById(btn.dataset.target);
        if (target) {
            openWindow(target);
        }
    });
});

// Every close button closes whichever window it lives inside
document.querySelectorAll(".close-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        var win = btn.closest(".window");
        if (win) {
            closeWindow(win);
        }
    });
});



// Draggable window function (from W3 schools), applied to every window on the page
document.querySelectorAll(".window").forEach(function(win) {
    dragElement(win);
});

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "hd") || document.getElementById(element.id + "header")) {
    var handle = document.getElementById(element.id + "hd") || document.getElementById(element.id + "header");
    // Step 4: If present, assign the `startDragging` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header/handle.
    handle.onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`stopDragging`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
    // Once dragged, position by top/left directly rather than the centering transform
    element.style.transform = "none";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}