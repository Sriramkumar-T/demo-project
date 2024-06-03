
 function submit(){
  
  var fname=document.getElementById("fname").value;
  var lname=document.getElementById("lname").value;
  var alpha=/^[a-zA-Z]+$/;
  if(!alpha.test(fname && lname)){
    alert("enter a valid name")

  }
 
  var input = document.getElementById('textInput').value;
  var emailpattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailpattern.test(input)){
    alert("enter a valid email")

  }
 
 

  var password=document.getElementById("text").value;
    var confirm=document.getElementById("text2").value;
    if(password.length<8){
       alert("password must be atleast 8 character")
      

    }
    else{
      if(password!=confirm){
        alert("password mismatch")
      }
    }
  var  mobile=document.getElementById("num");
  mobile=mobile.value.replace(/\D/g,'')
  if(mobile.length>10 || mobile.length<10){
    alert ("enter a valid number")

  }
 

 var dob=document.getElementById("birth").value;
 if( dob!='null' && dob.length>10||dob.length<10){
  alert("enter a  valid date")
}

    var checkbox= document.getElementById("check");
    
    if(checkbox.checked!=true){
      alert(" plese verify the check box")

    }
   
    
    

 
 }
 function myFunction() {
  var pass= document.getElementById("text");
  if (pass.type === "password") {
    pass.type= "text";
  } else {
    pass.type = "password";
  }
}
  function confirmpassword() {
  var confirm=document.getElementById("text2")
  if(confirm.type === "password"){
    confirm.type="text";

  }else{
    confirm.type="password";
  }
}

 
 