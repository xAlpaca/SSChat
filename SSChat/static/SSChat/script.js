


const roomName = JSON.parse(document.getElementById('room-name').textContent);

let getmess_name = "/" + roomName + "/get/"
let postmess_name = "/" + roomName + "/post/"
let delmess_name = "/" + roomName + "/delete/"



function del_msg(message) {

    var data = {"seed": message.getAttribute("seed")}
    data["csrfmiddlewaretoken"] = csrf

    $.ajax({url: delmess_name, type: 'POST', data: data}).done(function(response) {})

}


document.getElementById('send-message-button').onclick = function () {

    const messageInputDom = document.querySelector('#text_message');

    var today = new Date();



    let _data = new FormData();
    _data.append("text", messageInputDom.value);
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

function update() {


    if (document.getElementById("amount_of_messages").value !== document.getElementById("amount_of_messages").max) {
        getmess_name = "/" + roomName + "/get/" + document.getElementById("amount_of_messages").value;
    }

    $.ajax({url: getmess_name, type: 'GET', dataType: 'json',}).done(function (response) {
        console.log(Object.keys(response).length);

        if (Object.keys(response).length === document.getElementById("chatbox").children.length){
            //   Checking if seeds are the same ( in case of 1 message was deleted and 1 appended)
            for (let i =0; i < document.getElementById("chatbox").children.length; i += 1){
                let current_message_seed = document.getElementById("chatbox").children[i].children[0].children[2].getAttribute("seed")
                if (current_message_seed !== response[i][3]){
                    break;
                }
            }
            console.log("No new messages");
            return;
        }

        let chatbox_parent = document.getElementById("chatbox");

        images = document.getElementsByClassName("a__image")



        chatbox_parent.innerHTML = "";

        for (let i in response) {
            append_message(chatbox_parent, response[i])

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


setInterval(update, 5000)

document.getElementById("amount_of_messages").oninput = function () {
    document.getElementById("aof_label").innerHTML = "Messages to load: " + document.getElementById("amount_of_messages").value;
}

function append_message(parent, data, image_state) {

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






