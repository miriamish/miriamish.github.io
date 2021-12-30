function init() {
  /* log in */
  let loginConfirm = document.getElementById("loginConfirm");
  let userName = document.getElementById("name");
  let password = document.getElementById("password");
  let confirmPressed = () => {
    if (userManage.allUsers.hasOwnProperty(userName.value)) //chack that user name exists
    {
      if (userManage.allUsers[userName.value].password === password.value) //chack that the password is right
      {
        userManage.setCurrentUser(userName.value); //set current user
        location.reload(); //reload the page
      } else {
        document.getElementById("wrongLogin").innerHTML =
          "wrong user name or password";
      }
    } else {
      document.getElementById("wrongLogin").innerHTML =
        "wrong user name or password";
    }
  };
  //function for the buttons
  loginConfirm.addEventListener('click', confirmPressed);

  function openLogin() {
    document.getElementById("login").classList.replace("hideElement", "showElement");
  }
  document.getElementById('startLogin').addEventListener('click', openLogin);

  function closeLogin() {
    document.getElementById("login").classList.replace("showElement", "hideElement");
  }
  document.getElementById('cancleLogin').addEventListener('click', closeLogin);

  
  function speed(){
    if(userManage.currentUser){
      window.location.assign("./speedMenu.html");
    }else{
      window.alert("יש להרשם למערכת על מנת לשחק")
    }
  }
  document.getElementById("speed").addEventListener("click",speed);
  function memory(){
    if(userManage.currentUser){
      window.location.assign("./memoryMenu.html");
    }else{
      window.alert("יש להרשם למערכת על מנת לשחק")
    }
  }
  document.getElementById("memory").addEventListener("click",memory);
  function mind(){
    if(userManage.currentUser){
      window.location.assign("./mindMenu.html");
    }else{
      window.alert("יש להרשם למערכת על מנת לשחק")
    }
  }
  document.getElementById("mind").addEventListener("click",mind);
};
init();