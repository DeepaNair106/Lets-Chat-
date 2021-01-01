// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5nIX-xXc-Q2j9NuJ_Q4L8YqL3ibgyDIo",
    authDomain: "lets-chat-b324e.firebaseapp.com",
    databaseURL: "https://lets-chat-b324e-default-rtdb.firebaseio.com",
    projectId: "lets-chat-b324e",
    storageBucket: "lets-chat-b324e.appspot.com",
    messagingSenderId: "389666343189",
    appId: "1:389666343189:web:b21843934b1726750e811c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  user_name = localStorage.getItem("userName");
room_name = localStorage.getItem("room_name");

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
          childKey = childSnapshot.key;
          childData = childSnapshot.val();
          if (childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
            console.log(message_data)
            name = message_data['name'];
            message = message_data['message'];
            like = message_data['like'];

            name_tag = "<h4>" +name + "<img class ='user_tick' src='tick.png'> </h4>";
            message_tag = "<h4 class = 'message_h4'> " + message +"</h4>";
            button_tag = "<button class = 'btm btn-warning' id =" + firebase_message_id +" value=" +like + " onclick= 'updateLike(this.id)'>";
            span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like : " +like +"</span></button><hr>";
            row = name_tag + message_tag + button_tag + span_tag;
            document.getElementById("output").innerHTML +=row;
          }
        });
      });
    }

    function updateLike(message_id) {

      likes = document.getElementById(message_id).value;
      updated_likes = Number(likes) +1;
       firebase.database().ref(room_name).child(message_id).update({
         like: updated_likes
       });

    }

    

    function logout() {

      localStorage.removeItem("userName");
      localStorage.removeItem("room_name");
      window.location = "Lets Chat.html";
    }
    getData();

    function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({

        name: user_name,
        message: msg,
        like: 0
      });
      document.getElementById("msg").value = "";
}