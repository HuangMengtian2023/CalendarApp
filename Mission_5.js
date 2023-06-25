const isLeapYear = (year) => {
    return(
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0)||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year)? 29 : 28;
};
let calendar = document.querySelector(".calendar");
const month_names = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
];
let month_picker = document.querySelector("#month-picker");
// console.log(month_picker);
const dayTextFormat = document.querySelector(".day-text-format");
const timeFormat = document.querySelector(".time-format");
const dateFormat = document.querySelector(".date-format");

month_picker.onclick = ()=>{
    month_list.classList.remove("hideonce");
    month_list.classList.remove("hide");
    month_list.classList.add("show");
    dayTextFormat.classList.remove("showTime");
    dayTextFormat.classList.add("hideTime");
    timeFormat.classList.remove("showTime");
    timeFormat.classList.add("hideTime");
    dateFormat.classList.remove("showTime");
    dateFormat.classList.add("hideTime");
};

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector(".calendar-days");
    calendar_days.innerHTML = '';
    let calendar_head_year = document.querySelector("#year");
    let days_of_month =[
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    let currentDate = new Date();
    month_picker.innerHTML = month_names[month];
    calendar_head_year.innerHTML = year;
    let first_day = new Date(year, month);

    for (let i=0; i<=days_of_month[month] + first_day.getDay()-1;i++){
        let day = document.createElement("div");
        if(i>=first_day.getDay()){
            day.innerHTML = i - first_day.getDay()+1;
            if(i-first_day.getDay()+1===currentDate.getDay()&&year===currentDate.getFullYear()&&month===currentDate.getMonth()){
                day.classList.add("current-date");
            }
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector(".month-list");
month_names.forEach((e,index)=>{
    let month = document.createElement("div");
    month.innerHTML='<div>'+e+'</div>';
    month_list.append(month);
    month.onclick=()=>{
        currentMonth.value=index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace("show", "hide");
        dayTextFormat.classList.remove("hideTime");
        dayTextFormat.classList.add("showTime");
        timeFormat.classList.remove("hideTime");
        timeFormat.classList.add("showTime");
        dateFormat.classList.remove("hideTime");
        dateFormat.classList.add("showTime");        
    }
});

(function(){
    month_list.classList.add("hideonce");
})();
document.querySelector("#pre-year").onclick=()=>{
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector("#next-year").onclick=()=>{
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};


let currentDate = new Date();
let currentMonth = {value:currentDate.getMonth()};
let currentYear = {value:currentDate.getFullYear()};
generateCalendar(currentMonth.value, currentYear.value);

const currshowDate = new Date();
const showCurrentDateOption =  {
    year:"numeric",
    month:"long",
    day:"numeric",
    weekday:"long",
};

const todayShowTime = document.querySelector(".time-format");
const todayShowDate = document.querySelector(".date-format");
const currentDateFormat = new Intl.DateTimeFormat(
    "en-US",
    showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormat;
// setInterval

