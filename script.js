class WorkoutCalendar {
  constructor(container) {
    if (!container) return;

    this.wcContainer = container;
    this.current = new Date();
    this.current.setDate(1);

    this.init();
  }

  init() {
    this.createContainer();
    this.createHeaders();
    this.createBody();
    this.createDays();
  }

  createContainer() {
    this.wcContainer.classList.add('wc-container');
  }

  createHeaders() {
    const monthsArray = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    const daysArray = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    this.wcHeaders = document.createElement('div');
    this.wcHeaders.classList.add('wc-headers');
    this.wcContainer.appendChild(this.wcHeaders);

    //month
    this.wcMonth = document.createElement('div');
    this.wcMonth.classList.add('wc-month');
    this.wcMonth.textContent = `${
      monthsArray[this.current.getMonth()]
    } ${this.current.getFullYear()}`;
    this.wcHeaders.appendChild(this.wcMonth);

    //days
    this.wcDays = document.createElement('div');
    this.wcDays.classList.add('wc-days');
    this.wcDays.innerHTML = daysArray.map((d) => `<span>${d}</span>`).join('');
    this.wcHeaders.appendChild(this.wcDays);
  }

  createBody() {
    this.wcBody = document.createElement('div');
    this.wcBody.classList.add('wc-body');
    this.wcContainer.appendChild(this.wcBody);
  }

  createDays() {
    const wcFirstLastDates = new WcFirstLastDates(
      this.current.getFullYear(),
      this.current.getMonth()
    );

    let firstDateDay = new Date();
    firstDateDay.setDate(1);
    firstDateDay = firstDateDay.getDay();

    new WcHTML({
      firstDateDay: this.current.getDay(),
      firstDate: wcFirstLastDates.firstDate,
      lastDate: wcFirstLastDates.lastDate,
      body: this.wcBody,
    });
  }
}

class WcHTML {
  constructor({ firstDateDay, firstDate, lastDate, body }) {
    this.firstDateDay = firstDateDay;
    this.firstDate = firstDate;
    this.lastDate = lastDate;
    this.body = body;

    this.createHTML();
  }

  createHTML() {
    for (let day = this.firstDate; day <= this.lastDate; day++) {
      const div = new WcDay(day).div;

      if (day === this.firstDate) {
        div.style.gridColumnStart = this.firstDateDay;
      }

      this.body.appendChild(div);
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
