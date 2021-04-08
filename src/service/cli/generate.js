'use strict';

const fs = require(`fs`);
const {getRandomNumber, shuffle} = require(`../../utils`);

const TITLLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const DESCRIPTIONS = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const COUNT_DEFAULT = 1;
const MAX_ELEMENTS = 1000;

const sumRange = {
  MIN_SUM: 1000,
  MAX_SUM: 100000
};

const adType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const CATEGORY = [
  `Разное`,
  `Книги`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => {

    const types = Object.values(adType);
    return {
      title: TITLLES[getRandomNumber(0, TITLLES.length - 1)],
      picture: `item${getRandomNumber(0, 16)}.jpg`,
      description: shuffle(DESCRIPTIONS).slice(0, 4).join(` `),
      type: types[getRandomNumber(0, types.length - 1)],
      sum: getRandomNumber(sumRange.MIN_SUM, sumRange.MAX_SUM),
      catefory: shuffle(CATEGORY).slice(0, getRandomNumber(0, CATEGORY.length - 1))
    };
  });
};

module.exports = {
  name: `--generate`,
  run([count]) {
    const countChecked = Number.parseInt(count, 10) || COUNT_DEFAULT;

    if (countChecked > MAX_ELEMENTS) {
      console.log(`Не больше 1000 объявлений`);
      return;
    }

    const content = JSON.stringify(generateOffers(countChecked), null, 2);

    fs.writeFile(`mocks.json`, content, (err) => {
      if (err) {
        return process.exit(1);
      }

      return process.exit(0);
    });
  }
};
