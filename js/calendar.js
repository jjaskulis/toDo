'use strict'

var today = new Date(),
    year_id = document.getElementById("year"),
    month_id = document.getElementById("month"),
    days_id = document.getElementById("days");

var calendar = {
        year: today.getFullYear(),
        month: today.getMonth(),
        thismonth: today.getMonth(),
        day: today.getDate(),
        monthLen: function () {
            return new Date(this.year, this.month + 1, 0).getDate();
        },
        monthIncrement: function (inc) {
            if (inc === "next") {
                if (this.month === 11) {
                    this.year += 1
                    this.month = 0;
                }
                this.month += 1;
            } else {
                if (this.month === 0) {
                    this.year -= 1
                    this.month = 11;
                }
                this.month -= 1;
            }
            drawCal();
        }
    }
    //takes month input from 0, return name of month in english
function monthName(month) {
    var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return names[month];
}

//draws new calendar according data in calendar object
function drawCal() {
    var x,
        len = calendar.monthLen(),
        html = "";
    year_id.innerHTML = calendar.year;
    month_id.innerHTML = monthName(calendar.month);
    for (x = 1; x <= len; x++) {
        if (x === calendar.day && calendar.thismonth === calendar.month) {
            html += "<span class='day clickable color-focus'>" + x + "</span>";
        } else {
            html += "<span class='day clickable'>" + x + "</span>";
        }
        days_id.innerHTML = html;
    }
}
drawCal();

$('#calendar>span').on("click", function () {
    calendar.monthIncrement($(this).attr('class').split(' ')[0]);
})

$(document).on('click', '.day', function () {
    $(this).text();
})