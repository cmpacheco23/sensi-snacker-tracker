# Sensi Food Tracker

![Screenshot of the Home Page](images/index.png) 
![Screenshot of the Foods Page](images/foods.png) 
![Screenshot of the Foods Page](images/profiles.png) 

### Background:

Welcome to Sensi Tracker, your holistic food sensitivity companion and comprehensive CRUD (Create, Read, Update, Delete) application. Developed with a personal journey in mind, Sensi Tracker aims to simplify food management for individuals with sensitivities, just like the creator, who battles Hashimoto's disease.

Struggling to track what triggers your sensitivities? Sensi Tracker provides a user-friendly platform to manage and understand your dietary needs. It goes beyond data management, offering effortless food sensitivity management, catering to those on a journey towards a healthier lifestyle.


#### Click to view [planning materials](https://trello.com/invite/b/1kDFsFqH/ATTI419f20d6e1d089108174349a9a5048203BE558DA/unit-2-project-food-sensitivity)
***
### Getting Started:
Ready to embark on your food sensitivity journey with Sensi Tracker? 

### [Access Sensi Tracker](https://carla-minina-match-game.netlify.app/)


🎉 **Fun Facts:** 

🍕 Every time you refresh the home page, the app features "bullets" transform into new food emojis! 

```
function getRandomFoodEmoji() {
  const foodEmojis = ["🍔", "🍕", "🥗", "🍝", "🍜", "🍲", "🌮", "🍱", "🥪", "🍛", "🍣", "🍦", "🍩", "🍪", "🥤"];
  return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
}
```

🌀 When you hover over a profile avatar while viewing their profile, their avatar will spin.

```
.profile-avatar:hover {
  transform: rotate(360deg);
}
```


#### App Highlights:
__Discover the key features that make Sensi Tracker your go-to food sensitivity ally:__

1. Discover the key features that make Sensi Tracker your go-to food sensitivity ally:
After selecting your first card, choose another one.
2. Collaborative Food Database: Access a community-driven platform offering a wide range of food choices and dietary monitoring. Edit foods you've added to ensure accuracy
3. Personal Food Profile: Create, manage, and edit your food preferences and sensitivities effortlessly.
4. React and Comment: Share your experiences and insights with the community, contributing to the enhancement of the food database. Edit your contributions as needed.
5. Expand Your Food Horizons: Discover and add foods from other users to diversify your profile. Edit your added foods for accuracy.
6. Community Support: Gain access to valuable tips and knowledge from the Sensi Tracker community for a healthier lifestyle.


***
### Credits   /  Attributions: 🙌

* Favicon - food icon created by justicon -[Flaticon](https://www.flaticon.com/free-icons/food)
* Emojis / The Unicode Consortium
* Button design from [Get CSS Scan](https://getcssscan.com/css-buttons-examples?ref=beautifulboxshadow-bottom): Button #86 & #56
* Box shadow design from [Get CSS Scan](https://getcssscan.com/css-box-shadow-examples): #3
* Box shadow design from [Alvaro Trigo](https://alvarotrigo.com/shadow-gradients/)
* Generated CSS layout using [CSS Layout Generator](https://layout.bradwoods.io/)
* Noto Serif NP Hmong font from [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+NP+Hmong)
* Open Sans font from [Google Fonts](https://fonts.google.com/specimen/Open+Sans)


***
### Technologies Used 💾
* JavaScript
* HTML
* CSS
* EJS
* MongoDB Compass
* Mongoose
* Node.js
* Express
* Google OAuth Authentication

***
### Icebox: 🧊

* Search recipes from an API to enhance your food choices.
* Add a light mode for a personalized app experience.
* Toggle between light and dark mode to suit your preference.
* Easily filter through foods and sensitivities for quick access.
* Enhance food information by adding allergens and food conditions.

Stay tuned for these updates, and thank you for choosing Sensi Tracker as your food sensitivity ally! 🙌🍀