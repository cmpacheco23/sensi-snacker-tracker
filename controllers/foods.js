import { Food } from "../models/food.js";

function index(req, res){
  console.log('fooooodssss!')
  Food.find({})
  .then(foods => {
    res.render('foods/index', {
      foods,
      title: 'Explore All Foods',
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
}