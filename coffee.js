'use strict';

let state ="waiting";
let cupImg = document.querySelector('.coffee-cup img');
let progressBar = document.querySelector('.progress-bar');
let balanceInput = document.querySelector("input[placeholder='Баланс']");

cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  if (state != "waiting") {
    return;//если машина не в ожидании, то новую кружку купить нельзя
  }

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
//----------------Купюры----------------------

let bills = document.querySelectorAll('.bills img');//массив 

for (let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney;//любое событие  по умолчанию в любую функцию передает первым параметр event, объект самого события. запись ниже в комментах равнозначна
  /*bills[i].onmousedown = function (event) {
    takemoney(event);
    }*/
}   
function takeMoney(event) {
 event.preventDefault(); //отключили стандартные настройки браузера - запреn перетаскивать купюры? n/ отключает события по умолчанию
  //console.log(this)
 let bill = event.target;
 
 bill.style.position = 'absolute';// чтоб перемещать можно, вытягивает из dom дерева 
 bill.style.transform = 'rotate(90deg)';// координаты  x и у отсчитываются от левого верхнего угла
 bill.style.margin = 0;
 
 let billCoords = bill.getBoundingClientRect();//получаем данные об объекте, координаты и ширина с высотой
 let billWidth = billCoords.width;
 let billHeight = billCoords.height;
// console.log(event.clientX, event.clientY);//позиция на реальном экране не включая полосы прокрутке, видимая область, Отображают положение курсора на экране по оси X и Y соответственно 
bill.style.top = event.clientY - billWidth/2 + 'px';//поправка на то, что купюра поворачивается, px прибавили, чтоб понятно было css,
bill.style.left = event.clientX - billHeight/2 + 'px';

window.onmousemove = function(event) {//отлавливает курсор по элементу, чтоб по всему окну ставим window, событие появляется тогда, когда нажали на купюру

  bill.style.top = event.clientY - billWidth/2 + 'px';//при движении срабатывает каждый раз и обновлется каждый раз
  bill.style.left = event.clientX - billHeight/2 + 'px';
    }
    
    
    bill.onmouseup = function() {
      window.onmousemove = null;// отжать мышь - купюра остается на месте
      if ( inAtm(bill) ) {
      let billCost = +bill.getAttribute('cost');
      balanceInput.value = +balanceInput.value + billCost;
      bill.remove();
      }
      
    }
}

function inAtm(bill) {
  let atm = document.querySelector('.atm img');
  
  let atmCoords = atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y}
  let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y};
 /* let billLeftBottomCorner = {"x" : billCoords.x, "y" : billCoords.y + billCoords.height/3 };*/
  
  
  let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y}
  let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y};
  let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3 };
  
if (billLeftTopCorner.x > atmLeftTopCorner.x
     && billRightTopCorner.x < atmRightTopCorner.x
     && billLeftTopCorner.y > atmLeftTopCorner.y
     && billLeftTopCorner.y < atmLeftBottomCorner.y
  ) {
  return true;
} else {
  return false;
}
  
}


//-------------Сдача-------------


let changeButton = document.querySelector(".change-btn");
/* changeButton.onclick = function () {
  takeChange();
} */

changeButton.onclick = function () {
  let changeBox = document.querySelector(".change-box");
  let coins = changeBox.querySelectorAll("img");
  if (coins.length == 0) {
     if(balanceInput.value == 0) {
    return;
     }
    changeButton.innerHTML = "Забрать сдачу";
    takeChange();
  } else {
 changeButton.innerHTML = "Сдача";
 for (let i = 0; i < coins.length; i++) {
    coins[i].remove();
    }
  }
}
function takeChange() {
  if(balanceInput.value == 0) {
    return;
  } 
  if (balanceInput.value >=10) {
    balanceInput.value -=10;
    tossCoin("10"); //именно строкой, не числом
    takeChange();
  } else if (balanceInput.value >=5) {
    balanceInput.value -=5;
    tossCoin("5"); 
    takeChange();
  }else if (balanceInput.value >=2) {
    balanceInput.value -=2;
    tossCoin("2"); 
    takeChange();
  } else {
    balanceInput.value -=1;
    tossCoin("1"); 
    takeChange();
  }
}

/*changeBox.innerHTML += `
 <img src="img/10rub.png" class="coin">
 `*внутреннее содержимое то что внутри тега inner HTML меняет в html внутреннее значение*/
//в обратные ковычки можно вписывать переменные через $ и они позволяют делать перенос



function tossCoin(cost) {
  let imgSrc = "";
  switch (cost) {
    case '10':
      imgSrc = "img/10rub.png";
      break;
    case '5':
      imgSrc = "img/5rub.png";
      break;
    case '2':
      imgSrc = "img/2rub.png";
      break;
    case '1':
      imgSrc = "img/1rub.png";
      break;//switch case используем чтобы упростить запись и не использовать множественное  if else

  }
  
  
  
  
  
  let changeBox = document.querySelector(".change-box");
  changeBox.style.position = "relative";
  
  let changeBoxCoords = changeBox.getBoundingClientRect();
  let randomWidth = getRandomInt(0,  changeBoxCoords.width - 50);
  let randomHeight = getRandomInt(0, changeBoxCoords.height - 50);
  
  let coin = document.createElement("img");// создает в html элемент по тегу и далее задали свойства элименту

  coin.setAttribute("src", imgSrc);
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";
  coin.style.top = randomHeight + 'px'; 
  coin.style.left = randomWidth +'px';
  changeBox.append(coin);
  
  coin.onclick = function() {//проверить сколько монеток остается в контейнере когда надпить 0 то нужно сменить название
    coin.remove()
  }
/*   */
  //append добовляет элемент в конец, в скобках указываем какой
/*  changeBox.before(coin)//перед 
  changeBox.after(coin) //после ;*/
  //changeBox.prepend(coin); добавляет вначало,
  }
/*  
changeBox.replaceWith(coin)// заменяет элемент, делает 1 раз, т.к. потом не станет changebox
*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}






/*changeBox.innerHTML = `
<img src="img/10rub.png" style="width:50px; height: 50px; position: absolute; top: ${randomHeight}px; left: ${randomWidth}px">
`;*/
