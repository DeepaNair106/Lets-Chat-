// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA5nIX-xXc-Q2j9NuJ_Q4L8YqL3ibgyDIo",
  authDomain: "lets-chat-b324e.firebaseapp.com",
  databaseURL: "https://lets-chat-b324e-default-rtdb.firebaseio.com/",
  projectId: "lets-chat-b324e",
  storageBucket: "lets-chat-b324e.appspot.com",
  messagingSenderId: "389666343189",
  appId: "1:389666343189:web:b21843934b1726750e811c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("userName");
document.getElementById("display").innerHTML = "Welcome " + user_name + "!";
  

function addRoom() {

  room_name = document.getElementById("roomName").value;

  firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "";



}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              Room_names = childKey;
              row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoom(this.id)'>#"+Room_names+"</div> <hr>";
               document.getElementById("output").innerHTML += row;     
              //End code
        });
  });
}
getData();

function redirectToRoom(name){

localStorage.setItem("room_name",name);
window.location = "Lets_chat_page.html";

}

function logout(){

localStorage.removeItem("userName");
localStorage.removeItem("room_name");
window.location = "Lets Chat.html";

}
  