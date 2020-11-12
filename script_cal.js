
// timetoday();
// function timetoday() {
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
	// let options = {
	// 	era: 'long',
	// 	year: 'numeric',
	// 	month: 'long',
	// 	day: 'numeric',
	// 	weekday: 'long'
	// };
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

let showDatePrev = document.querySelector(".showDatePrev"); // отобразим над календарём дату предыдущего месяца
let showDateNow = document.querySelector(".showDateNow"); // отобразим над календарём дату текщего месяца
let showDateNext = document.querySelector(".showDateNext"); // отобразим над календарём дату следующего месяца

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let btnPrev  = document.querySelector(".arrow__prev");   // кнопка перехода на предыдущий месяц
let btnNext  = document.querySelector(".arrow__next");   // кнопка перехода на следущий месяц
let monthNow = document.querySelector(".month-current__dates");  // поле календаря для ячеек с датами
let monthPrev = document.querySelector(".month-prev__dates"); // даты предыдущего месяца
let monthNext = document.querySelector(".month-next__dates"); // даты следующего месяца
let btnToday  = document.querySelector(".btn-today");    // кнопка перехода на текущий месяц 

	let selectedYear, yearToday;
	let selectedMonth, monthToday;
	let selectedDate, dateToday;


// ================= отображаем текущий месяц в календаре ===========================
showCurrentMonth();

function showCurrentMonth() {
	let today = new Date(); // определяем текущую дату
	selectedYear = yearToday = today.getFullYear();
	selectedMonth = monthToday = today.getMonth();
	selectedDate = dateToday = today.getDate();

	showSelectedMonth(yearToday, monthToday, dateToday, monthNow, showDateNow); // отображаем текущий месяц в календаре
	// console.log("today is - ", today.toDateString());// отображаем текущий месяц 
	showSelectedMonth(yearToday, monthToday-1, dateToday, monthPrev, showDatePrev);
	showSelectedMonth(yearToday, monthToday+1, dateToday, monthNext, showDateNext);
}


/*
// ============ клик на кнопку ПРЕДЫДУЩИЙ месяц ================
btnPrev.onclick = function() {
	selectedMonth--;
	console.log("selectedMonth = ", selectedMonth);
	showSelectedMonth(selectedYear, selectedMonth, selectedDate); // отображаем предыдущий месяц в календаре
}

// ============ клик на кнопку СЛЕДУЮЩИЙ месяц ================
btnNext.onclick = function() {
	selectedMonth++;
	console.log("selectedMonth = ", selectedMonth);
	showSelectedMonth(selectedYear, selectedMonth, selectedDate); // отображаем следущий месяц в календаре
}
*/

// ============ клик на кнопку перехода на текущий месяц ================
btnToday.onclick = function() {
	showCurrentMonth();
}



// ================== отображаем выбранный месяц в календаре  =================================== //

function showSelectedMonth(year, month, date, dates, showDateBlock) {

	dates.innerHTML = ""; // очищаем календарь от предыдущего кода

	let myDate = new Date(year, month, date);	// вводим любую дату
	let myYear = myDate.getFullYear();			// год
	let iMonth = myMonth = myDate.getMonth();	// месяц текущий и для сравнения

	// console.log("выбран сейчас ", myDate.toDateString());
	console.log("выбран сейчас ", month, year);
	// showDateBlock.innerText = myDate.toDateString(); // вывод в хедере над календарем
	showDateBlock.innerText = months[month]+" "+year; // вывод в хедере над календарем


	// =========== определяем количество дней в текущем месяце ===========
	let iDay = 28;	// переменная для цикла
	let numDays; 	// количество дней в текущем месяце в итоге
	while (iMonth == myMonth) {
		iDay++;
		iMonth = (new Date(myYear, myMonth, iDay)).getMonth();
	}
	numDays = iDay - 1; // получаем количество дней в текущем месяце
	console.log("всего в текущем Month дней = ", numDays);


	// let myWeekDay = myDate.getDay(); // заносим число сегодняшнего дня недели 0-6
	// console.log("мой день недели = ", myWeekDay);


	// ========  получаем номер (0-6) 1-го дня недели в выбранном месяце
	let firstDay = (new Date(year, month, 1)).getDay();
	// console.log("номер 1го дня месяца = ", firstDay);
	// !!! это же число и будет равно числу дней предыдущего месяца до 1-го числа выбранного месяца


	// =========  получаем номер последнего дня недели в выбранном месяце
	let lastDay = (new Date(year, month, numDays)).getDay();
	// console.log("номер последнего дня месяца = ", lastDay);



	// let dates = document.querySelector(".month__dates");  объявлена выше
	let i=1;
	// ВЫВОДИМ ЯЧЕЙКУ предыдущего дня предыдущего месяца <div class="month__day disabled">дата</div>
	while (i <= firstDay) {
		let prevDate = (new Date(year, month, 1 - i)).getDate(); //получаем дату -1 дня
		let itemDay = document.createElement("div");
		itemDay.className = "month__day disabled";
		itemDay.innerText = prevDate;
		// dates.insertAdjacentElement("afterBegin", itemDay);
		dates.prepend(itemDay);
		i++;
		// console.log("i=", i);
	}

	// ВЫВОДИМ ЯЧЕЙКИ дней текущего месяца <div class="month__day">дата</div>
	let j=1;
	while (j <= numDays) {
		// let iDate = (new Date(year, month, j)).getDate(); //получаем дату j-го дня
		let itemDay = document.createElement("div");

		// находим совпадение с сегодняшней датой
		if (myYear == yearToday && myMonth == monthToday && j == dateToday) {
			itemDay.className = "month__day today";
		} else {
			itemDay.className = "month__day";
		}
		// itemDay.className = "month__day";
		// itemDay.innerText = iDate;
		itemDay.innerText = j;

		// dates.insertAdjacentElement("afterBegin", itemDay);
		dates.append(itemDay);
		j++;
	}

	// ВЫВОДИМ ЯЧЕЙКУ следущего дня следущего месяца <div class="month__day disabled">дата</div>
	let diff = 6 - lastDay; // сколько надо добавить ячеек до конца недели
	// console.log("надо добавить diff=", diff);

	let d = 1;
	while (d <= diff) {
		// let nextDate = (new Date(year, month, numDays + d)).getDate(); //получаем дату next дня
		let itemDay = document.createElement("div");
		itemDay.className = "month__day disabled";
		// itemDay.innerText = nextDate;
		itemDay.innerText = d;

		dates.append(itemDay);
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
