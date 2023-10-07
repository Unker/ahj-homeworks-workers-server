const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET',
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Генерация случайных новостей
function generateNewsList(count) {
  const newsList = [];
  for (let i = 0; i < count; i++) {
    const news = {
      id: faker.string.uuid(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      posted: Math.floor(faker.date.past().getTime() / 1000), // Время в секундах
    };
    newsList.push(news);
  }
  return newsList;
}

app.get('/news', (req, res) => {
  const count = req.query.count || 1;

  // Эмуляция задержки
  setTimeout(() => {
    const response = {
      status: 'ok',
      timestamp: Math.floor(Date.now() / 1000), // Текущее время в секундах
      newsList: generateNewsList(count),
    };

    res.json(response);
  }, 5000);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
