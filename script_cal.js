// // TIMER
// let btnTimer = document.querySelector("#btn");
// let mess = document.querySelector("#message");
// let time = 0;
// let counter;

// let stopTimer = document.querySelector("#btnStop");

// btnTimer.onclick = function() {
// 	clearInterval(counter);
// 	time = document.querySelector("#input").value;
// 	// преобразуем строчный тип в числовой
// 	time = Number(time);
// 	// console.log("vveli " + time);
// 	// console.log(typeof(time));

// 	// проверка на число
// 	if(isNaN(time) || time <=0) {
// 		mess.innerText = "Введите кол-во секунд!";
// 	} else {
// 		// console.log("vveli korrektnoe chislo")
// 		// если число, то отображаем число и уменьшаем на 1 каждую секунду
// 		mess.innerText = time;
// 		counter = setInterval(timer, 1000);
// 	}
// } // end of btnTimer.onclick function

// function timer() {
// 	time--;
// 	//console.log("timer on, last = " + time);
// 	if (time > 0) {
		
// 		mess.innerText = time;
// 		//return time;
// 	} else {
// 		mess.innerText = "ВРЕМЯ ВЫШЛО!!!";
// 		clearInterval(counter);
// 	}
// }

// stopTimer.onclick = function(){
// 	clearInterval(counter);
// 	console.log("timer off, last = " + time);
// }




/*=======================================
	часы
=========================================*/
// setInterval(timeNow,1000); 
timeNow();
function timeNow() {
	// let date = new Date();
	// // console.log(+date); //дата в мс от 1970 года 01.01. 0:00:00
	// let year = date.getFullYear();
	// let month = date.getMonth();
	// let day = date.getDate();
	// let weekday = date.getDay();
	// console.log(year);
	// console.log(month);
	// console.log(day);
	// console.log(weekday);
	

	
// ===== форматирование и вывод дат ====================
	let options = {
		era: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	};
	// let mnth = date.toLocaleString("ru", options);
	// console.log("mnth=", mnth);
	// let up = mnth.toUpperCase();
	// console.log("up=", up);

	// С ОПЦИЯМИ ВЫБОРА
	// console.log(date.toLocaleString("ru", options).toUpperCase()); // верхний регистр
	// console.log(date.toLocaleString("en-US", options));

	// console.log(date.toString());	// дата целиком без опций
	// console.log(date.toDateString()); // только дата  без опций
//=====================================================================================

// -------------- РАБОЧИЕ ПРОБЫ ---------------------------
console.log("-------");

let selectedDate = 1,
	selectedMonth = 11,
	selectedYear = 2020;

//console.log("next 'myDate' определяем кол-во дней в месяце");

let myDate = new Date(selectedYear, selectedMonth, selectedDate);			// вводим любую дату
let iYear = myDate.getFullYear();		// год
let iMonth = myMonth = myDate.getMonth();	// месяц текущий и для сравнения
let iDay = 28;	// переменная для цикла
let numDays; 	// количество дней в текущем месяце в итоге

// определяем количество дней в текущем месяце
while (iMonth == myMonth) {
	iDay++;
	// let mm = new Date(iYear, myMonth, iDay);
	// iMonth = mm.getMonth();
	iMonth = (new Date(iYear, myMonth, iDay)).getMonth();
}
numDays = iDay - 1; // получаем количество дней в текущем месяце
console.log(myDate.toDateString());
console.log("всего в текущем Month дней = ", numDays);


let myWeekDay = myDate.getDay(); // заносим число дня недели 0-6
console.log("мой день недели = ", myWeekDay);

// получаем номер (0-6) 1-го дня недели в выбранном месяце
let firstDay = (new Date(selectedYear, selectedMonth, 1)).getDay();
console.log("номер 1го дня месяца = ", firstDay);
// !!! это же число и будет равно числу дней предыдущего месяца до 1-го числа выбранного месяца

// получаем номер последнего дня недели в выбранном месяце
let lastDay = (new Date(selectedYear, selectedMonth, numDays)).getDay();
console.log("номер последнего дня месяца = ", lastDay);



let dates = document.querySelector(".dates");
let i=1;
// ВЫВОДИМ ЯЧЕЙКУ предыдущего дня предыдущего месяца <div class="item disabled">дата</div>
while (i <= firstDay) {
	let prevDate = (new Date(selectedYear, selectedMonth, 1 - i)).getDate(); //получаем дату -1 дня
	let itemDay = document.createElement("div");
	itemDay.className = "item disabled";
	itemDay.innerText = prevDate;
	dates.insertAdjacentElement("afterBegin", itemDay);
	// dates.prepend(itemDay);
	i++;
	// console.log("i=", i);
}

// ВЫВОДИМ ЯЧЕЙКУ дня текущего месяца <div class="item">дата</div>
let j=1;
while (j <= numDays) {
	let iDate = (new Date(selectedYear, selectedMonth, j)).getDate(); //получаем дату -1 дня
	let itemDay = document.createElement("div");
	itemDay.className = "item";
	itemDay.innerText = iDate;
	// dates.insertAdjacentElement("afterBegin", itemDay);
	dates.appendChild(itemDay);
	j++;
}

// ВЫВОДИМ ЯЧЕЙКУ следущего дня следущего месяца <div class="item disabled">дата</div>
let diff = 6 - lastDay; // сколько надо добавить ячеек до конца недели
console.log("надо добавить diff=", diff);

let d = 1;
while (d <= diff) {
	
	let nextDate = (new Date(selectedYear, selectedMonth, numDays + d)).getDate(); //получаем дату next дня
	let itemDay = document.createElement("div");
	itemDay.className = "item disabled";
	itemDay.innerText = nextDate;
	dates.appendChild(itemDay);
	d++;
}

}

// ==================== ползунок =================================
function catchNumber() {
	
	let value = document.getElementById("nr").value;
	document.getElementById("hour").innerHTML = value;
};



	// let hours = date.getHours();
	// let minutes = date.getMinutes();
	// let seconds = date.getSeconds();

	// if (hours < 10) hours = "0" + hours;
	// if (minutes < 10) minutes = "0" + minutes;
	// if (seconds < 10) seconds = "0" + seconds;

	//document.querySelector("#time").innerText = hours + ":" + minutes + ":" + seconds;
