import { Router } from 'express';

const router = Router();

function getRandomFoodEmoji() {
  const foodEmojis = ["🍔", "🍕", "🥗", "🍝", "🍜", "🍲", "🌮", "🍱", "🥪", "🍛", "🍣", "🍦", "🍩", "🍪", "🥤"];
  return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
}

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page', randomFoodEmoji: getRandomFoodEmoji() });
});

export { router, getRandomFoodEmoji };
