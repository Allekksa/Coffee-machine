'use strict';

let state ="waiting";
let cupImg = document.querySelector('.coffee-cup img');
let progressBar = document.querySelector('.progress-bar');
cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  if (state != "waiting") {
    return;//если машина не в ожидании, то новую кружку купить нельзя
  }
    let balanceInput = document.querySelector("input[placeholder='Баланс']");
    
 if (+balanceInput.value < price) {
   changeDisplayText('Недостаточно средств!');
   balanceInput.style.border = "2px solid red";
 } else {
   balanceInput.value -= price;
   balanceInput.style.border = "";//если вписать пустую строку то вернет на начальное значение
   state = "cooking";
   cookCoffee(name, element);
 }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится!");
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
  /*let cupImg = document.querySelector('.coffee-cup img'); убрали потому что в процессе сделали ее глобальной*/
  
  cupImg.setAttribute('src', cupSrc);//переложили аттрибут у одного src в другой подложив картинку
 cupImg.classList.remove("d-none");
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%";//width: 10%
    cupImg.style.opacity = i + "%";//проявление кружки, меняет прозрачность
    if (i == 110) {
      clearInterval(interval);
      changeDisplayText("Ваш " + name + " готов!");
      cupImg.style.cursor = "pointer";
      state = 'ready';
      }
  },100)
}

function takeCoffee() {
  if (state != 'ready') {
    return;
  }
  state = "waiting";
  cupImg.style.opacity = 0;
  cupImg.style.cursor = "";//пустые ковычки возвращают начальное значение
  cupImg.classList.add('d-none');
  changeDisplayText('Выберите кофе!');
  progressBar.style.width = 0;
  }

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}