
function changeInputType(){
    var fname=document.getElementById("fname").value;
    var lname=document.getElementById("lname").value;
    var alpha=/^[a-zA-Z]+$/;
    if(alpha.test(fname && lname)){
        

    }
    else{
        alert("enter a valid name")
    }
    var input = document.getElementById('textInput').value;
    var emailpattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailpattern.test(input)){
        

    }
    else{
        alert("enter a valid email")
    }

    
    
  
}
function pwd(){
    var password= document.getElementById('text');
    var confirm=document.getElementById('text2');
      password.setAttribute('type','password')
      confirm.setAttribute('type','password')
}
function check(){
    var password=document.getElementById("text").value;
    var confirm=document.getElementById("text2").value;
    if(password.length<8){
       alert("password must be atleast 8 character")
      

    }
    else{
      if(password==confirm){
        alert("verified")
      }
      else{
        alert("password mismatch")
      }
    }
}
 function mobilenum(){
  var  mobile=document.getElementById("num")
  mobile=mobile.value.replace(/\D/g,'')
  if(mobile.length>9 && mobile.length<11){
    alert(" number verified")

  }
  else{
    alert ("enter a valid number")
  }


 } 
 function submit(){
  alert("thankyou for register")
 }
