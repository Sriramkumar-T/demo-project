function submit() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var alpha = /^[a-zA-Z]+$/;
    var input = document.getElementById('textInput').value;
    var emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var password = document.getElementById("text").value;
    var confirm = document.getElementById("text2").value;
    var mobile = document.getElementById("num");
    mobile = mobile.value.replace(/\D/g, '');

    var dob = document.getElementById("birth").value;
    var checkbox = document.getElementById("check");
    var male = document.getElementById("male");
    var female = document.getElementById("female");

    if (!alpha.test(fname && lname)) {
        alert("enter a valid name");
    } else if (!emailpattern.test(input)) {
        alert("enter a valid email");
    } else if (password.length < 8) {
        alert("password must be atleast 8 character")
    } else if (password != confirm) {
        alert("password mismatch");
    } else if (mobile.length > 10 || mobile.length < 10) {
        alert("enter a valid number");
    } else if (dob != 'null' && dob.length > 10 || dob.length < 10) {
        alert("enter a  valid date");
    } else if (checkbox.checked != true) {
        alert(" plese verify the check box");
    } else if (male.checked != true && female.checked != true) {
        alert("plese select gender");
    } else if (male.checked == true && female.checked == true) {
        alert("select a gender");
    } else {
        alert("thank you for register");
    }
}

function myFunction() {
    var pass = document.getElementById("text");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function confirmpassword() {
    var confirm = document.getElementById("text2");
    if (confirm.type === "password") {
        confirm.type = "text";
    } else {
        confirm.type = "password";
    }
}