class WorkoutCalendar {
  constructor(container) {
    if (!container) return;

    this.wcContainer = container;
    this.wcContainer.classList.add('wc-container');

    this.wcBody = document.createElement('div');
    this.wcBody.classList.add('wc-body');
    this.wcContainer.appendChild(this.wcBody);

    const wcFirstLastDates = new WcFirstLastDates(
      new Date().getFullYear(),
      new Date().getMonth()
    );

    new WcHTML(
      wcFirstLastDates.firstDate,
      wcFirstLastDates.lastDate,
      this.wcBody
    );
  }
}

class WcHTML {
  constructor(firstDate, lastDate, body) {
    this.firstDate = firstDate;
    this.lastDate = lastDate;
    this.body = body;
    this.createHTML();
  }

  createHTML() {
    for (let day = this.firstDate; day <= this.lastDate; day++) {
      this.body.appendChild(new WcDay(day).div);
    }
  }
}

class WcFirstLastDates {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.createDate();
    this.getFirst();
    this.getLast();
  }

  createDate() {
    this.date = new Date();
    this.date.setFullYear(this.year);
    this.date.setMonth(this.month);
  }

  getFirst() {
    this.firstDate = '1';
  }

  getLast() {
    const nextMonth = new Date();
    nextMonth.setFullYear(this.year);
    nextMonth.setMonth(this.month + 1);
    nextMonth.setDate(0);
    this.lastDate = nextMonth.getDate();
  }
}

class WcDay {
  constructor(day) {
    this.day = isNaN(Number(day)) ? 0 : Number(day);
    this.createDiv();
  }

  createDiv() {
    this.div = document.createElement('div');
    this.div.className = 'wc-day';
    this.div.textContent = this.day;
  }
}

window.addEventListener('load', () => {
  new WorkoutCalendar(document.querySelector('.my-calendar'));
});
