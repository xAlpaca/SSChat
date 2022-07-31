

const roomName = JSON.parse(document.getElementById('room-name').textContent);

let getmess_name = "/" + roomName + "/get/"
let postmess_name = "/" + roomName + "/post/"
let delmess_name = "/" + roomName + "/delete/"
let delmess_all = "/" + roomName + "/delete_all/"


function del_msg(message) {
    var data = {"seed": message.getAttribute("seed")}


    $.ajax({url: delmess_name, type: 'POST', data: data}).done(function(response) {})

}

function del_msg_all() {

    var data = {}

    $.ajax({url: delmess_all, type: 'POST', data: data}).done(function(response) {})

}




document.getElementById('send-message-button').onclick = function () {

    const messageInputDom = document.getElementById('text_message');

    var today = new Date();



    let _data = new FormData();


    let text = messageInputDom.value;
     if (document.getElementById("modeSwitch").checked === true) {
        text = "user@SSChat " + messageInputDom.value;
    }

    _data.append("text", text);
    _data.append("csrfmiddlewaretoken", csrf);
    _data.append("seed", today.getTime());
    _data.append("room", roomName);
    _data.append("time", today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())
    _data.append("yr", today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate())
    _data.append("file", fileupload.files[0])


    $.ajax({
        url: postmess_name,
        type: 'POST',
        contentType: false,
        mimeType: "multipart/form-data",
        data: _data,
        processData: false,
    })
    messageInputDom.value = '';

    update();

};

function update(cls_mode, force_update) {
    console.log("Update");

    if (document.getElementById("amount_of_messages").value !== document.getElementById("amount_of_messages").max) {
        getmess_name = "/" + roomName + "/get/" + document.getElementById("amount_of_messages").value;
    }

    $.ajax({url: getmess_name, type: 'GET', dataType: 'json',}).done(function (response) {
        if (Object.keys(response).length === document.getElementById("chatbox").children.length){
            //   Checking if seeds are the same ( in case of 1 message was deleted and 1 appended)

            for (let i =0; i < document.getElementById("chatbox").children.length; i += 1){
                let current_message_seed = document.getElementById("chatbox").children[i].children[0].children[2].getAttribute("seed")
                if (current_message_seed !== response[i][3]){
                    break;
                }
            }
            console.log("No new messages");
            if (force_update !== true){
                return;
            }
        }

        let chatbox_parent = document.getElementById("chatbox");

        images = document.getElementsByClassName("a__image")



        chatbox_parent.innerHTML = "";

        for (let i in response) {

            if (cls_mode === true) {
                append_message_console(chatbox_parent, response[i])
            }
            else {
                append_message(chatbox_parent, response[i])
            }
        }

        new_images = document.getElementsByClassName("a__image");


        for (let image of images) {
            image.addEventListener("click", function(){
                this.classList.toggle("smol");
            });
            image.onerror = function () {
                this.style.display = "none";
            }
        }
    })
}

let k = setInterval(funk=update, delay=5000)

function append_message(parent, data) {

    var p1 = document.createElement("div");
    p1.className = "message";

    var p2 = document.createElement("div");
    p2.className = "message__outer";

    var p3 = document.createElement("div");
    p3.className = "message__info";

    var p4 = document.createElement("p");

    p4.textContent = data[1] + " " + data[2];

    var p5 = document.createElement("div");

    p5.className = "message__bubble";

    var p6 = document.createElement("p");
    p6.textContent = data[0];

    var p7 = document.createElement("img");

    p7.className = "a__image";
    p7.setAttribute("seed", data[3]);

    p7.src = "/media/" + data[4];

    var p8 = document.createElement("span");

    p8.setAttribute("seed", data[3]);
    p8.setAttribute("onclick", "del_msg(this)");
    p8.className = "message__del";
    p8.innerHTML = "&times";

    p1.appendChild(p2)

    p2.appendChild(p3)
    p2.appendChild(p5)
    p2.appendChild(p8)

    p3.appendChild(p4)

    p5.appendChild(p6)
    p5.appendChild(p7)

    parent.appendChild(p1)

}

function append_message_console(parent, data) {
    var p1 = document.createElement("div");
    p1.className = "noborder"

    var p2 = document.createElement("div");
    p2.className = "noborder"

    var p3 = document.createElement("div");
    p3.className = "noborder"


    var p7 = document.createElement("p")
    p7.style.display="none";
    p7.setAttribute("seed", data[3]);

    var p5 = document.createElement("div");

    p5.className = "noborder";
    var p6 = document.createElement("p");
    p6.textContent = data[0];

    p6.className = "noborder"
    p6.style.whiteSpace = "pre-line";


    p1.appendChild(p2)

    p2.appendChild(p3)
    p2.appendChild(p5)
    p2.appendChild(p7)



    p5.appendChild(p6)

    parent.appendChild(p1)
}


document.getElementById("amount_of_messages").oninput = function () {
    document.getElementById("aof_label").innerHTML = "Messages to load: " + document.getElementById("amount_of_messages").value;
}

document.getElementById("modeSwitch").oninput = function () {

    let message_form = document.getElementById("send_form");
    if (this.checked) {
        let cb = document.getElementById("chatbox");
        cb.style.width = "80%";
        cb.style.height = "auto";
        cb.style.backgroundColor = "black";
        cb.style.color = "green";
        cb.style.fontFamily = "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace"
        cb.style.color = "#919191"

        parent = document.querySelector("body");

        parent.appendChild(message_form);

        let message_del = document.querySelectorAll(".message__del");

        for (let i = 0; i < message_del.length; i += 1) {

            message_del[i].style.display = "none";
        }
        clearInterval(k)
        k = setInterval(function() {update(true, false)}, delay=5000)

        update(true, true);
        console.log("console mode");
    }
    else {
        let cb = document.getElementById("chatbox");
        cb.style.width = "600px";
        cb.style.backgroundColor = "#A5C9CA";
        cb.style.color = "#395B64";

        let settings = document.getElementById("settings");
        settings.appendChild(message_form);

        let message_del = document.querySelectorAll(".message__del");

        for (let i = 0; i < message_del.length; i += 1) {

            message_del[i].style.display = "inline";
        }

        clearInterval(k);

        k = setInterval(function() {update(false, false)}, delay=5000);

        update(false, true);
    }
}

document.getElementById("delbtn").onclick = function () {
    if (confirm("Are you sure you want to delete all messages?")) {
        del_msg_all();
    }
    else {
        alert("Cancelled, no messages deleted.");
    }
}

