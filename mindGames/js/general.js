/* setting user profile */
window.userManage = {
  allUsers: {},
  currentUser: null,
  getAllUsers: () => {
    //check if there are any users stored in local storage
    if (localStorage.getItem("allUsers")) {
      //load the users data from local storage
      userManage.allUsers = JSON.parse(localStorage.getItem("allUsers"));
      return userManage.allUsers;
    } else {
      //set a key and an empty object to the local storage
      localStorage.setItem("allUsers", JSON.stringify({}));
      return userManage.getAllUsers();
    }
  },
  setAllUsers: (key, val) => {
    userManage.allUsers[key] = val;
    localStorage.setItem("allUsers", JSON.stringify(userManage.allUsers));
  },
  getCurrentUser: () => {
    //Checks if there is a currently logged in user
    if (localStorage.getItem("currentUser")) {
      //load the current user data
      userManage.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return userManage.currentUser;
    }
  },
  setUserData: (key, val) => {
    userManage.currentUser[key] = val;
    localStorage.setItem("currentUser", JSON.stringify(userManage.currentUser));
    userManage.allUsers[userManage.currentUser.name][key] = val;
    localStorage.setItem("allUsers", JSON.stringify(userManage.allUsers));
  },
  setCurrentUser: userName => {
    userManage.currentUser = userManage.allUsers[userName];
    localStorage.setItem("currentUser", JSON.stringify(userManage.currentUser));
  },
  getMemoryRecord: () => {
    return Object.keys(userManage.allUsers).map((name) => [name, userManage.allUsers[name].memoryRecord])
      .sort((a, b) => b[1] - a[1])[0];//return the user wuth the highest score
  },
  showMessage: (message) => {
    let background = document.createElement("div");
    background.className = "messageBackground";
    let foreground = document.createElement("div");
    foreground.className = "messageForeground";
    let messageText = document.createElement("p");
    messageText.innerText = message;
    document.body.append(background);
    background.append(foreground);
    foreground.append(messageText);
  },
  hideMessage: ()=>{
    document.querySelector(".messageBackground").remove();
  }
};
//reset data
userManage.getAllUsers();
userManage.getCurrentUser();

//header
if(userManage.currentUser){
 document.getElementById('userMode').classList.add('showElement');
 document.getElementById('guestMode').classList.add('hideElement');
 document.getElementById('xpDisplay').innerHTML= userManage.currentUser.xp;
 document.getElementById('nameDisplay').innerHTML= userManage.currentUser.name;
}else{
  document.getElementById('userMode').classList.add('hideElement');
  document.getElementById('guestMode').classList.add('showElement');
}
function logout() {
  localStorage.removeItem('currentUser');
  window.location.assign("index.html"); //reload the page
}
document.getElementById('logout').addEventListener('click',logout);
let home = document.getElementById("home");
if(home){
  home.addEventListener("click",()=>window.location.assign("index.html"));
}

//example of user
// userManage.setAllUsers(userName.value, {
//   name: 'miriam',
//   password: '1234a',
//   email: 'email@',
//   xp: 346,
//   memoryLevels: 14,
//   memoryRecord: 10,
//   speedLevels: 9,
// }); 