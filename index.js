var httpRequest;

function startMenu() {
    if (document.getElementById("menu-outer-border").style.display != "block") {
        document.getElementById("menu-outer-border").style.display = "block";
    } else {
        document.getElementById("menu-outer-border").style.display = "none"; }
}

function desktopBackground() {
    if (document.getElementById("menu-outer-border").style.display == "block") {
        document.getElementById("menu-outer-border").style.display = "none";
    } else {  }
}

function desktopMenu() {
    //window.location.href='https://www.upwork.com/freelancers/~01569c2ebdc359b1b6';

    var desktopMenuDiv = document.createElement("div");
    desktopMenuDiv.id = "desktopmenu";

    return false;
}

function stopMenu() {
    // TODO: Remove conditional to reduce overhead?
    if (document.getElementById("menu-outer-border").style.display == "block") {
        document.getElementById("menu-outer-border").style.display = "none";
    }
}

function startApp(appName, appStyle, appIcon, appCursor) {
    createWindow(appName, WS_OVERLAPPEDWINDOW);
    stopMenu();
}

function createWindow(wTitle, wStyle, wIcon, wCursor,
                      wY, wX, y, x) {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert("Couldn't create window; Network or server is down.");
        return false;
    }

    httpRequest.onreadystatechange = showWindow;
    httpRequest.open('GET', "apps/"+ wTitle +".xhtml");
    httpRequest.setRequestHeader('Content-Type', 'text/html');
    httpRequest.send();
}

function showWindow() {
    if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
            document.getElementById("workarea").innerHTML += httpRequest.responseText;
        } else {
            alert('There was a problem displying the window.');
        }
    }
}
