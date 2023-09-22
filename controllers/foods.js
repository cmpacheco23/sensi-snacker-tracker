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

function create(req, res) {
  req.body.owner = req.user.profile._id
  Food.create(req.body)
  .then(food => {
    res.redirect('/foods')
  })
  .catch (err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){
  Food.findById(req.params.foodId)
  .then(food => {
    res.render('foods/show', {
      food,
      title: 'Details'
    })
  })
}

export {
  index,
  create,
  show,
}