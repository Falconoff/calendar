
let showDatePrev = document.querySelector(".showDatePrev"); //  над календарём дата предыдущего месяца
let showDateNow = document.querySelector(".showDateNow"); //  над календарём дата текщего месяца
let showDateNext = document.querySelector(".showDateNext"); //  над календарём дата следующего месяца

let months = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let week;
 // = document.querySelector(".month__week"); // строка для названий дней недели


let btnPrev  = document.querySelector(".month-prev");   // кнопка перехода на предыдущий месяц
let btnNext  = document.querySelector(".month-next");   // кнопка перехода на следущий месяц

let monthNow = document.querySelector(".month-current__dates");  // поле календаря для ячеек с датами
let monthPrev = document.querySelector(".month-prev__dates"); // даты предыдущего месяца
let monthNext = document.querySelector(".month-next__dates"); // даты следующего месяца

let btnToday  = document.querySelector(".btn-today");    // кнопка перехода на текущий месяц 

let selectedYear, yearToday;
let selectedMonth, monthToday;
let selectedDate, dateToday;

let value = document.getElementById("nr").value; // значение цвета по HSL, по ползунку


// ================= отображаем текущий месяц в календаре ===========================
showCurrentMonth();


// ==================== ползунок =================================
function catchNumber() {
	value = document.getElementById("nr").value;
	checkDisplayToday();
	btnToday.style.color = "hsl("+value+", 100%, 50%)";
	showDateNow.style.color = "hsl("+value+", 100%, 50%)";
	showDatePrev.style.color = "hsl("+value+", 100%, 50%)";
	showDateNext.style.color = "hsl("+value+", 100%, 50%)";
};


// ================= вычисляем сегодняшнюю дату и отображаем 3 месяца

function showCurrentMonth() {
	let today = new Date(); // определяем текущую дату
	selectedYear = yearToday = today.getFullYear();
	selectedMonth = monthToday = today.getMonth();
	selectedDate = dateToday = today.getDate();
	showSelectedMonth(yearToday, monthToday, dateToday, monthNow, showDateNow); // текущий месяц 
	showSelectedMonth(yearToday, monthToday-1, dateToday, monthPrev, showDatePrev); // предыдущий месяц 
	showSelectedMonth(yearToday, monthToday+1, dateToday, monthNext, showDateNext); // следующий месяц 
	checkDisplayToday();
}



// ============ клик на кнопку ПРЕДЫДУЩИЙ месяц ================
btnPrev.onclick = function() {
	selectedMonth--;
	showAnotherMonth();
}

// ============ клик на кнопку СЛЕДУЮЩИЙ месяц ================
btnNext.onclick = function() {
	selectedMonth++;
	showAnotherMonth();
}

function showAnotherMonth() {
	showSelectedMonth(selectedYear, selectedMonth, selectedDate, monthNow, showDateNow); // текущий месяц 
	showSelectedMonth(selectedYear, selectedMonth-1, selectedDate, monthPrev, showDatePrev); // предыдущий 
	showSelectedMonth(selectedYear, selectedMonth+1, selectedDate, monthNext, showDateNext); // следующий 
	checkDisplayToday();
}


// ============ клик на кнопку перехода на текущий месяц ================
btnToday.onclick = function() {
	showCurrentMonth();
}




// ================ задаём цвет сегодняшнего числа, если оно отображается в одном из месяцев ===========
function checkDisplayToday() {
	let dayToday  = document.querySelector(".today"); 	// число сегодня на календаре
	if (dayToday != null) {
		dayToday.style.color = "hsl("+value+", 100%, 50%)";
	}
}



// ================== отображаем выбранный месяц в календаре  =================================== //

function showSelectedMonth(year, month, date, dates, showDateBlock) {

	dates.innerHTML = ""; // очищаем календарь от предыдущего кода

	let myDate = new Date(year, month, date);	// вводим любую дату
	let myYear = myDate.getFullYear();			// год
	let iMonth = myMonth = myDate.getMonth();	// месяц текущий и для сравнения

	// выводим сообщение и сегодняшнюю дату в кнопке возврата
	btnToday.innerText = "Go on Today: "+dateToday+" "+months[monthToday]+" "+yearToday; 
	// название месяца и год над календарем
	showDateBlock.innerText = months[myMonth]+" "+myYear; 


/*
	// ====== выводим названия дней недели из массива =======
	console.log(week);
	if (week != undefined) {week.remove();}
	
	week = document.createElement("div");
	week.className = "month__week";
	showDateBlock.after(week);

	// названия дней недели <div class="month__week-day">
	for (var dn = 0; dn < 7; dn++) {
	 	
		let weekDay = document.createElement("div");
		if (dn == 0 || dn == 6) {
			weekDay.className = "month__week-day holiday";
		} else {
			weekDay.className = "month__week-day";
		}
		weekDay.innerText = dayName[dn];
		week.append(weekDay);
	}
*/




	// =========== определяем количество дней в текущем месяце ===========
	let iDay = 28;	// переменная для цикла
	let numDays; 	// количество дней в текущем месяце в итоге
	while (iMonth == myMonth) {
		iDay++;
		iMonth = (new Date(myYear, myMonth, iDay)).getMonth();
	}
	numDays = iDay - 1; // получаем количество дней в текущем месяце
	// console.log("всего в текущем Month дней = ", numDays);

	// ========  получаем номер (0-6) 1-го дня недели в выбранном месяце
	let firstDay = (new Date(year, month, 1)).getDay();
	// console.log("номер 1го дня месяца = ", firstDay);
	// !!! это же число и будет равно числу дней предыдущего месяца до 1-го числа выбранного месяца


	// =========  получаем номер последнего дня недели в выбранном месяце
	let lastDay = (new Date(year, month, numDays)).getDay();
	// console.log("номер последнего дня месяца = ", lastDay);

	let i=1;
	// ВЫВОДИМ ЯЧЕЙКУ предыдущего дня предыдущего месяца <div class="month__day disabled">дата</div>
	while (i <= firstDay) {
		let prevDate = (new Date(year, month, 1 - i)).getDate(); //получаем дату -1 дня
		let itemDay = document.createElement("div");
		itemDay.className = "month__day disabled";
		itemDay.innerText = prevDate;
		dates.prepend(itemDay);
		i++;
	}

	// ВЫВОДИМ ЯЧЕЙКИ дней текущего месяца <div class="month__day">дата</div>
	let j=1;
	while (j <= numDays) {
		let itemDay = document.createElement("div");
		// находим совпадение с сегодняшней датой
		if (myYear == yearToday && myMonth == monthToday && j == dateToday) {
			itemDay.className = "month__day today";
		} else {
			itemDay.className = "month__day";
		}
		itemDay.innerText = j;
		dates.append(itemDay);
		j++;
	}

	// ВЫВОДИМ ЯЧЕЙКУ следущего дня следущего месяца <div class="month__day disabled">дата</div>
	let diff = 6 - lastDay; // сколько надо добавить ячеек до конца недели
	let d = 1;
	while (d <= diff) {
		let itemDay = document.createElement("div");
		itemDay.className = "month__day disabled";
		itemDay.innerText = d;
		dates.append(itemDay);
		d++;
	}
	// dayToday.style.color = "hsl("+value+", 100%, 50%)";

}




// это если захочется время выводить:
	// let hours = date.getHours();
	// let minutes = date.getMinutes();
	// let seconds = date.getSeconds();

	// if (hours < 10) hours = "0" + hours;
	// if (minutes < 10) minutes = "0" + minutes;
	// if (seconds < 10) seconds = "0" + seconds;

	//document.querySelector("#time").innerText = hours + ":" + minutes + ":" + seconds;
