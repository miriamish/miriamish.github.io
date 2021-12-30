function init() {
  /* sign up */
  let signUpConfirm = document.getElementById("signUpConfirm");
  let userName = document.getElementById("name");
  let password = document.getElementById("password");
  let email = document.getElementById("email");

  //functions that check validation of inputs
  let validPassword = () => {
    let vpassword = password.value;
    let message = document.getElementById("wrongPassword");
    if (vpassword.search(/[0-9]/) === -1) {
      message.innerHTML = "password should include at least one digit";
      return false;
    }
    if (vpassword.search(/[a-z]/i) === -1) {
      message.innerHTML = "password should include at least one letter";
      return false;
    }
    if (vpassword.length < 5) {
      message.innerHTML = "password should include at least 5 chars";
      return false;
    }
    message.innerHTML = "";
    return true;
  };
  let vaildUserName = () => {
    let vuserName = userName.value;
    let message = document.getElementById("wrongName");
    if (vuserName.search(/\b[a-z]/i) === -1) {
      message.innerHTML = "user name should start with a letter";
      return false;
    }
    if (vuserName.length < 4) {
      message.innerHTML = "user name should include at least four chars";
      return false;
    }
    message.innerHTML = "";
    return true;
  };
  let validEmail = () => {
    let vemail = email.value;
    let message = document.getElementById("wrongEmail");
    if (vemail.search(/@/) === -1) {
      message.innerHTML = "your email address is wrong";
      return false;
    }
    message.innerHTML = "";
    return true;
  };
  let confirmPressed = function () //executed when the sign up button is pressed
  {
    //check if the user name already exists
    if (userManage.allUsers.hasOwnProperty(userName.value)) {
      document.getElementById("wrongName").innerHTML =
        "user name already in use";
    } else if (validPassword() && vaildUserName() && validEmail()) {
      //create a new user
      userManage.setAllUsers(userName.value, {
        name: userName.value,
        password: password.value,
        email: email.value,
        xp: 0,
        memoryLevels: 0,
        memoryRecord: 0,
        speedLevels: 0,
      });
      userManage.setCurrentUser(userName.value);
      //return back to homepage
      window.location.assign("./index.html");
    }
  };
  signUpConfirm.addEventListener("click", confirmPressed);
  password.addEventListener("focusout", validPassword);
  userName.addEventListener("focusout", vaildUserName);
  email.addEventListener("focusout", validEmail);
  //return back to homepage
  let signUpCancle = document.getElementById("cancleSignUp");
  signUpCancle.addEventListener("click", () =>
    window.location.assign("./index.html")
  );
}
init();
