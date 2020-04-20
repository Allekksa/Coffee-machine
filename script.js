"use strict"
// window.document.documentElement.body - если не нужен досуп в head window и documentElement опускают часто ? пишут просто document.body
//поиск элементов
// --------Устаревшие методы-----------
/*let coffeeMachine = document.getElementById("coffee"); //поиск по id
console.log(coffeeMachine);
let images = document.getElementsByTagName('img');//поиск по тэгу
console.log(images);
let coffeeItems = document.getElementsByClassName('coffee-item');//поиск по классу
console.log(coffeeItems);
let firstImage = coffeeItems[0].getElementsByTagName('img');
console.log(firstImage[0]);
*/
//-------------------------
//---------современные методы------
//   находим элементы
/*let coffeeMachine = document.querySelector('#coffee');
console.log(coffeeMachine);
let image = document.querySelector('img'); //если элементов несколько то jn найдет только первый,  ''по тегу поиск, # поиск по id, по классу поиск через . точку
console.log(image);
let coffeeItems = document.querySelectorAll('.coffee-item');//выбери все элементы с классом coffeeItem
console.log(coffeeItems);
let itemImages = document.querySelectorAll('.coffee-item img');// все  img которые внутри coffee-item 
console.log(itemImages);
let cupImages = document.querySelectorAll('.coffee-item img, .coffee-cup img');// вообще все кружки
console.log(cupImages);*/

//-------работа с элементами--------
// ------------изменение CSS свойств--------
/*let coffeeMachine = document.querySelector('.coffee-machine');
coffeeMachine.style.border = '10px solid yellow';// style свойство, методы это функция и с круглыми скобками
coffeeMachine.style.borderRadius = '25px';//nt сво-ва что в css свойство через дефис тут в верблюжей с большорй border-radius в js borderRadius
coffeeMachine.style.top = "15px"; //сдвинуть наверх
coffeeMachine.style.left = "150px"; //сдвинуть влево
let coffeeMachinetop = coffeeMachine.style.top;//dspdfkb само св-во без присваивания
console.log( parseInt(coffeeMachinetop) );*/// получили значение свойства без px, просто число
// ==--------изменение атрибутов 
/// src type
/*let balance = document.querySelector('input[type="text"]');
let balanceType = balance.getAttribute('type');//забрали атрибут
console.log(balanceType);
balance.setAttribute('type', 'date'); //set - устанавливаем атрибут, в скобках что меняем, на что меняем (get - получить), можно password


console.log (balance.hasAttribute('placeholder'));//проверяем есть и атрибут, для условий полезно,если есть то то, если нет, то то
balance.removeAttribute('aria-label');//удалили атрибут

//аттрибуты можно вызывать как свойства
balance.value = 500; //обратились к атрибуту .value как к свойству объекта баланс == balance.setAttibute('value', 500) изменили значение в поле бадланс и зделали его равным 500
console.log(balance.value);//.value свой-ство объекта балланс == getattribut('value') это метод. Так можно обращаться к стандартным атрибутам, которые уже заложены в html
*/
// ------------Изменение классов----- удобно при использовании bootstrap, можо использовать с ccs классами
/*let changeButton = document.querySelector('.btn');
console.log(changeButton.classList);//  classList - L большая объект у него есть метод remove
changeButton.classList.remove('btn-primary'); //primary -красит кнопку, btn делает форму/ Сейчас кнопка стала прозрачной
changeButton.classList.add('btn-success');*/
//change.Button.classList.toggle('ml-5')//если такой класса нет то добавит, если есть то уберет. как вкл вкл

// ------ Изменение содержимого элементов-------
/*let displayText = document.querySelector('.display-text');
console.log( displayText.innerHTML );//получили внутреннее содержимое тега p
console.log( displayText.innerText );//получили внутреннее содержимое тега p
displayText.innerHTML = '<b>Готовим кофе!</b>';*/
//displayText.innerText = '<b>Готовим кофе</b>';//

// ----- События и слушатели событий------

//Мышь - click mouserover mouseup mousedown
// ключевое слово this
// this возвращает объект к которому обращено св-во или обращен метод
//если console.log(this); возвращает window то кудато не туда this вписали
//<div class="coffee-item" onclick="buyCoffee('Американо', 50, this)">
//тоже самое, что
/*let elem = document.querySelectorAll('coffee-item');
elem[1].onclick = function (){
  buyCoffee('Американо', 50, this);
  }*/

//----------Планирование------------

//-----timeout-------------
// задается в миллисикундах, если не указывается обратное
/*setTimeout(function() {
    alert('Таймаут отработал');
}, 5000); *///алерт появится через 5 секунд
//нам нужен не вызов функции а само тело поэтому пишем
/*setTimeout(paintBody, 5000, 'aqua');*/// после объявления задержки можно установить аргументы через зяпятую 
/*setTimeout(function () {
  paintBody('aqua');
  }, 5000);*/


/*
let timeout = setTimeout(paintBody, 5000, 'aqua');
let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearTimeout(timeout); //нажатие на кнопку сдача сбрасывает таймаут
}

function paintBody(color){
  document.body.style.background =  color;//если рядом с название функции стят () сразу пытается выполнить
}
*/



/*setInterval(trashConsole, 1000);//установим интервал*/
let interval = setInterval(trashConsole, 1000);

let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearInterval(interval);
}

function trashConsole() {
  console.log(Math.random());
}








































