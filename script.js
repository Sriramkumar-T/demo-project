
function validation(){

  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var alpha = /^[a-zA-Z]+$/;
  var input = document.getElementById('textInput').value;
  var emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var password = document.getElementById("password1").value;
  var confirm = document.getElementById("text2").value;
  var  mobile = document.getElementById("num");
  mobile = mobile.value.replace(/\D/g,'');

  var dob = document.getElementById("birth").value;
  var checkbox = document.getElementById("check");
  var male = document.getElementById("male");
  var female = document.getElementById("female"); 
  var popup= document.querySelector(".popupbox")
  var alertmessage = document.querySelector(".message");
  var alertmessage1 = document.querySelector(".message1");
  var alertmessage2 = document.querySelector(".message2");
  var alertmessage3 = document.querySelector(".message3");
  var alertmessage4 = document.querySelector(".message4");
  var alertmessage5 = document.querySelector(".message5");
  var alertmessage6 = document.querySelector(".message6");
  var alertmessage7 = document.querySelector(".message7");
  var alertmessage8 = document.querySelector(".message8");
  var alertmessage9 = document.querySelector(".message9");
  

  if(!alpha.test(fname)){
    popup.style.display = "block"
     alertmessage.style.display = "block"
     alertmessage9.style.display = "none"
  }else if(!alpha.test(lname)){
     popup.style.display = "block"
     alertmessage.style.display = "none"
      alertmessage1.style.display = "block"
      alertmessage9.style.display = "none"
    }
  else if(!emailpattern.test(input)){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "block"
      alertmessage9.style.display = "none"
    }else if(password.length<8){ 
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "block"
      alertmessage9.style.display = "none"
    }else if(password != confirm){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "block"
      alertmessage9.style.display = "none"
    }else if( dob != null && dob.length > 10||dob.length < 10){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "none"
      alertmessage5.style.display = "block"
      alertmessage9.style.display = "none"
    }else if(mobile.length>10 || mobile.length<10){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "none"
      alertmessage5.style.display = "none"
      alertmessage6.style.display = "block"
      alertmessage9.style.display = "none"
    }else if(checkbox.checked != true){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "none"
      alertmessage5.style.display = "none"
      alertmessage6.style.display = "none"
      alertmessage7.style.display = "block"
      alertmessage9.style.display = "none"
    }else if(male.checked != true && female.checked != true ){
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "none"
      alertmessage5.style.display = "none"
      alertmessage6.style.display = "none"
      alertmessage7.style.display = "none"
      alertmessage8.style.display = "block"
      alertmessage9.style.display = "none"
    }else{
      popup.style.display = "block"
      alertmessage.style.display = "none"
      alertmessage1.style.display = "none"
      alertmessage2.style.display = "none"
      alertmessage3.style.display = "none"
      alertmessage4.style.display = "none"
      alertmessage5.style.display = "none"
      alertmessage6.style.display = "none"
      alertmessage7.style.display = "none"
      alertmessage8.style.display = "none"
      alertmessage9.style.display = "block"
    }
    var button = document.getElementById("btn1");
    button.addEventListener("click",function(){
      popup.style.display = "none"
     })

}
function mockpassword() {
  var pass = document.getElementById("password1");

  if(pass.type === "password"){
    pass.type = "text";
  }else{
    pass.type = "password";
  }
} 

function mockconfirmpassword() {
  var confirm = document.getElementById("text2");

  if(confirm.type === "password"){
    confirm.type = "text";
  }else{
    confirm.type = "password";
  }
} 