// function for when the password or passphrase button is clicked
window.onload = function () {
  document.querySelector(".bt").addEventListener("click", function () {
    console.log("button clicked");
    exampleGenerator();
  });
  document.querySelector(".bt2").addEventListener("click", function () {
    console.log("button clicked");
    getWordsFromAPI();
  });
};

//called by the makePassPhrase function at the bottom of file
function createPassword(Arr, Length) {
  var arr = Arr;
  var pwd = "";

  for (var i = 0; i < Length; i++) {
    pwd += arr[Math.floor(Math.random() * arr.length)];
  }

  return pwd;
}

//security so there is not HTML or javascript injection
function scriptHTMLEntity(input) {
  var newInput = input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return newInput;
}
//checking the length requested by the user
function checkLength() {
  var input = document.getElementById("length").value;
  var length = scriptHTMLEntity(input);
  var goodLength = true;
  if (length < 8) {
    goodLength = false;
  }
  return goodLength;
}
//check to see if the all the checkbox are empty/not checked
function emptyCheckBox() {
  var markedUncheckbox = document.getElementsByName("pl");
  var uncheckBox = true;

  //loop to check if all the checkbox is unchecked
  for (var checkbox of markedUncheckbox) {
    if (checkbox.checked) {
      uncheckBox = false;
      break;
    } else {
      uncheckBox = true;
    }
  }
  return uncheckBox;
}

//this function creates the passWORD
function exampleGenerator() {
  //variable for password functionality
  var length = document.getElementById("length").value;
  var number = "0123456789";
  var symbol = "~`!@#$%^&*-+|_=[]<>?/,.;";
  var lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
  var upperCaseLetter = lowerCaseLetter.toUpperCase();
  var randomPassword = "";
  var passwordCharArray = [];

  //variable for checkbox
  var symbolCheckbox = document.getElementById("symbolCheck");
  var numberCheckbox = document.getElementById("numberCheck");
  var lowercaseCheckbox = document.getElementById("lowercaseCheck");
  var uppercaseCheckbox = document.getElementById("uppercaseCheck");

  //check to see if user click on one of the options
  if (emptyCheckBox() == true) {
    var msg = "Please select one of the option";
    document.getElementById("generatedPwd2").innerText = msg;
    return msg;
  } else {
    if (symbolCheckbox.checked) {
      passwordCharArray += symbol;
    }
    if (numberCheckbox.checked) {
      passwordCharArray += number;
    }
    if (lowercaseCheckbox.checked) {
      passwordCharArray += lowerCaseLetter;
    }
    if (uppercaseCheckbox.checked) {
      passwordCharArray += upperCaseLetter;
    }

    //Set the password length to user specifications
    for (var i = 1; i <= length; i++) {
      //Build password string by randomly selecting characters from the character array
      var pwCharacters = Math.floor(Math.random() * passwordCharArray.length);
      randomPassword += passwordCharArray.charAt(pwCharacters);
    }

    //print the password
    document.getElementById("generatedPwd2").innerText = randomPassword;
    return randomPassword;
  }
}

// gets random words from seperate api
//passes ones that are not too long to the makePassPHRASE function
function getWordsFromAPI() {
  console.log("requested api");
  fetch(`https://random-word-api.herokuapp.com/word?number=100`)
    .then(function (response) {
      return response.json(); //using the json method returns a new Promise so we call then method again
    })
    .then(function (data) {
      let fouror5letterwords = [];

      for (word in data) {
        let element = String(data[word]);

        if (element.length == 4 || element.length == 5) {
          fouror5letterwords.push(element);
        }
      }
      makePassPHRASE(fouror5letterwords);
    });
}
//makes the passPHRASE
function makePassPHRASE(arrayOfRandomWords) {
  //uses the createPassword method written by (placeholder for name)
  let password = createPassword(arrayOfRandomWords, 2);
  let num = Math.random() * 3;
  let arr = "~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,,[,],{,},<,>,?,/,.,;".split(",");
  password += createPassword(arr, num);

  //add code here to check if checkboxes are clicked
  document.getElementById("generatedPwd").innerText = password;
}