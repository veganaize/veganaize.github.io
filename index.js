function createWindow(wTitle, wStyle, wIcon, wCursor,
                      wY, wX, y, x) {
    var httpRequest = new XMLHttpRequest()

    if(!httpRequest) {
        alert("Couldn't create window; Network or server is down.")
        return false
    }

    httpRequest.onreadystatechange = showWindow
    httpRequest.open('GET', "apps/"+ wTitle +".xhtml")
    httpRequest.setRequestHeader('Content-Type', 'text/html')
    httpRequest.send()

    function showWindow() {
        if(httpRequest.readyState === 4) {
            if(httpRequest.status === 200) {
                document.getElementById("workarea").innerHTML +=
                        httpRequest.responseText
            } else { alert('There was a problem displying the window.') }
        }
    }
}


function desktopBackground() {
    var menu_style = document.getElementById("menu-outer-border").style
    if (menu_style.display == "block") { menu_style.display = "none" }
}


function desktopMenu(event) {
    //window.location.href='https://www.upwork.com/freelancers/~01569c2ebdc359b1b6'

    //var desktopMenuDiv = document.createElement("div")
    //desktopMenuDiv.id = "desktopmenu"

    return false
}


function startApp(appName, appStyle, appIcon, appCursor) {
    createWindow(appName, WS_OVERLAPPEDWINDOW);
    stopMenu();
}


function startMenu() {
    var menu_style = document.getElementById("menu-outer-border").style
    if (menu_style.display != "block") { menu_style.display = "block" }
    else { menu_style.display = "none" }
}


function stopMenu() {
    // TODO: Remove conditional to reduce overhead?
    var menu_style = document.getElementById("menu-outer-border").style
    if (menu_style.display == "block") { menu_style.display = "none" }
}
