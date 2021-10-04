document.addEventListener("mouseup", mouseUp, true);
var workRect = document.getElementById('workarea').getBoundingClientRect();

WS_OVERLAPPEDWINDOW = 5;
var offsetX = 0;
var offsetY = 0;
var theTarget = null;
var preview = false;

/* These functions are adapted from: https://gist.github.com/akirattii/9165836 */
/* And also from: http://stackoverflow.com/a/41698549/5039027 */
function startDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    theTarget = e.target.parentElement;
    theTarget.style.transition = "opacity 0.3s linear 0s";
    theTarget.style.opacity = 0.8;

    offsetX = e.clientX - document.getElementById("notepad").offsetLeft;
    offsetY = e.clientY - document.getElementById("notepad").offsetTop;

    document.addEventListener('mousemove', popupMove, true);
}

function popupMove(e) {
    theTarget.style.top = (e.clientY - offsetY) +'px';
    theTarget.style.left = (e.clientX - offsetX) +'px';

    if(e.clientY < workRect.top) previewSnap(e);
    else if(e.clientX == workRect.right-1) previewSnap(e);
    else if(e.clientX < 1) previewSnap(e);
    else if(preview == true && (e.clientY > workRect.top || e.clientX < workRect.right-1 || e.clientX > 1)) {
        removeWindow("prediv");
        preview = false;
    }
}

function mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    if(theTarget) {
        theTarget.style.transition = "opacity 0.3s linear 0s";
        theTarget.style.opacity = 1.0;
    }

    document.removeEventListener('mousemove', popupMove, true);
}

function removeWindow(wId) {
    document.getElementById('workarea').removeChild(document.getElementById(wId));
}

function previewSnap(e) {
    var preDiv = document.createElement("div");
    preDiv.id = "prediv";

    if(e.clientY < workRect.top) {
        preDiv.style.width = "100%";
        preDiv.style.left = "0px";
        preDiv.style.right = "0px";
        preDiv.style.bottom = "0px";
    } else if(e.clientX == workRect.right-1) {
        preDiv.style.width = "50%";
        preDiv.style.right = "0px";
    } else if(e.clientX < 1) {
        preDiv.style.width = "50%";
        preDiv.style.left = "0px";
    }

    document.getElementById("workarea").appendChild(preDiv);
    preview = true;
}
