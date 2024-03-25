class WcTests {
  constructor() {
    //WcHTML
    this.testWcHTML(1, 5, 5);
    this.testWcHTML(0, 10, 11);
    this.testWcHTML(50, 52, 3);
    this.testWcHTML(-8, -5, 4);

    //WcFirstLastDates
    this.testWcFirstLastDates(2024, 2, 31);
    this.testWcFirstLastDates(2020, 1, 29);
    this.testWcFirstLastDates(2017, 1, 28);
    this.testWcFirstLastDates(2000, 1, 29);
    this.testWcFirstLastDates(1982, 10, 30);

    //WcDay
    this.testWcDay(5, 5);
    this.testWcDay('five', 0);
    this.testWcDay(true, 1);
    this.testWcDay(false, 0);
    this.testWcDay(undefined, 0);
    this.testWcDay(null, 0);
  }

  testWcHTML(firstDate, lastDate, expected) {
    const div = document.createElement('div');
    const wcHTML = new WcHTML(firstDate, lastDate, div);
    let warnFlag = false;

    if (div.querySelectorAll('div').length !== expected) {
      warnFlag = true;
      console.warn(
        `WcHTML: returns wrong number of children - ${
          div.querySelectorAll('div').length
        }, expected ${expected}`
      );
    }

    if (!warnFlag) {
      console.info(
        `WcHTML: returns correct number of children - ${
          div.querySelectorAll('div').length
        } of ${expected}`
      );
    }
  }

  testWcFirstLastDates(year, month, expected) {
    const wcFirstLastDates = new WcFirstLastDates(year, month);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let monthString = String('0' + (month + 1));
    monthString = monthString.substring(
      monthString.length - 2,
      monthString.length
    );
    let warnFlag = false;

    if (String(wcFirstLastDates.firstDate) !== '1') {
      warnFlag = true;
      console.warn(
        `WcFirstLastDates: returns wrong first date ${months[month]} ${year} - ${wcFirstLastDates.firstDate}`
      );
    }

    if (String(wcFirstLastDates.lastDate) !== `${expected}`) {
      warnFlag = true;
      console.warn(
        `WcFirstLastDates: returns wrong last date ${months[month]} ${year} - ${wcFirstLastDates.lastDate}`
      );
    }

    if (!warnFlag) {
      console.info(
        `WcFirstLastDates: returns ${wcFirstLastDates.firstDate}.${monthString}.${year} - ${wcFirstLastDates.lastDate}.${monthString}.${year}`
      );
    }
  }

  testWcDay(day, expected) {
    const wcDay = new WcDay(day);
    const dayNumber = isNaN(Number(day)) ? 0 : Number(day);
    let warnFlag = false;

    if (wcDay.div.tagName.toLowerCase() !== 'div') {
      warnFlag = true;
      console.warn(
        `WcDay: returns wrong tag - ${wcDay.div.tagName.toLowerCase()}`
      );
    }

    if (wcDay.div.className !== 'wc-day') {
      warnFlag = true;
      console.warn(`WcDay: returns wrong className - ${wcDay.div.className}`);
    }

    if (wcDay.div.textContent !== String(expected)) {
      warnFlag = true;
      console.warn(`WcDay: returns wrong content - ${wcDay.div.textContent}`);
    }

    if (isNaN(Number(wcDay.div.textContent))) {
      warnFlag = true;
      console.warn(`WcDay: returns not a number content`);
    }

    if (!warnFlag) {
      console.info(
        `WcDay: returns ${wcDay.div.tagName.toLowerCase()} with class ${
          wcDay.div.className
        } and number as content - ${wcDay.div.textContent} as ${day}.`
      );
    }
  }
}
