function readImage(inputElement) {
    var deferred = $.Deferred();

    var files = inputElement.get(0).files;
    if (files && files[0]) {
        var fr= new FileReader();
        fr.onload = function(e) {
            deferred.resolve(e.target.result);
        };
        fr.readAsDataURL( files[0] );
    } else {
        deferred.resolve(undefined);
    }

    return deferred.promise();
}








const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    let chatbox = document.getElementById('chatbox')
    append_message(chatbox, data);

};



chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};


document.getElementById('send-message-button').onclick = function(e) {

    const message = document.getElementById('text_message').value;
    var today = new Date();


    let _data = new FormData();
    _data.append("text", message);
    _data.append("csrfmiddlewaretoken", csrf);
    _data.append("room", roomName);
    _data.append("time", today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())
    _data.append("yr", today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate())
    _data.append("file", fileupload.files[0])

    var inputElement = $("#fileupload");
        readImage(inputElement).done(function(base64Data){
        console.log(base64Data);
    });

    for (let i of _data.values()){
        console.log(i);
    }



    chatSocket.send(_data);

    document.getElementById('text_message').value = '';
};

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
