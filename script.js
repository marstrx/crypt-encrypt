//variables
const inputText = document.getElementById("inputText");
const crypt = document.getElementById("crypt");
const encrypt = document.getElementById("encrypt");
const outputText = document.getElementById("outputText");

const originalAlphabet = "abcdefghijklmnopqrstuvwxyz";
const convertedAlphabet = "qwertyuiopasdfghjklzxcvbnm";


const randomNamber = () => {
  return Math.floor(Math.random() * 12) + 1;
  
};



crypt.addEventListener("click", () => {
  let result = "";
  let text = inputText.value.toLowerCase();
  for (let char of text) {
    let index = originalAlphabet.indexOf(char);
    if (index !== -1) {
      result += convertedAlphabet[index] + randomNamber();
    }else{
        result += char;
    }

  }
  outputText.value=result;
});


encrypt.addEventListener("click",function(){
    let result ="";
    let filtredText = inputText.value.replace(/[0-9]/g,"");
    for(char of filtredText){
      let index = convertedAlphabet.indexOf(char);
      

       if(index !== -1){
          result += originalAlphabet[index]
       }else{
        result += char;
       }
    }
    
    outputText.value=result;
});