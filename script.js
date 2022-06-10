var socket = io();

            
var form = document.getElementById('form');
var input = document.getElementById('input');
var nameExist = sessionStorage.getItem("userName");
let arrOfcolor = ['#94B49F','#06283D','#06283D','#5B4B8A','#A25B5B','#92B4EC','#187498','#557B83','#E6739F','#A5BDFD','#A28F70','#674F04','#DCB5FF','#77529E','#B6CDBD']

function randomColor(){
    let n = Math.floor(Math.random()*arrOfcolor.length);
    // console.log(arrOfcolor[n])
    return arrOfcolor[n];
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    msgdata = {username:nameExist,message:input.value,color:randomColor()}
    socket.emit('chat message', msgdata);
    socket.emit('send-nickname',nameExist)
    input.value = '';
    }
});


socket.on('chat message' ,function(msg) {
    var item = document.getElementById("messages");
    item.innerHTML += '<li class="message mb-3" style="background-color:'+msg.color+'"><div class="container msgcontainer h-100 p-3"><h6 class="username">'+msg.username+'</h6><p class="msgcontent">'+msg.message+'</p></div><li>'
    // item.textContent = msg.username + " " + msg.message;
    // messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});




let formname = document.getElementById("formname");
let msgform = document.getElementById("msgform");


function callme(){
    var name = document.getElementById('tbName').value;
    if(name!= ' ' ){

        sessionStorage.setItem('userName', name);
    }
  
}
function checkSession(){
    console.log("hey " + nameExist)
    if(nameExist){
        formname.classList.add('d-none');
        msgform.classList.remove('d-none');
        console.log('exist')
    }else{
        msgform.classList.add('d-none');
        formname.classList.remove('d-none');

        console.log('notexist')

    }
}
window.onload = checkSession();