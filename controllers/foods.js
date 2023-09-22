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
  .populate('owner')
  .then(food => {
    console.log(food)
    res.render('foods/show', {
      food,
      title: 'Details'
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res){
  //find the id of the food I want to edit
  Food.findById(req.params.foodId)
  .then(food => {
    //resolve promise
    res.render('foods/edit', {
      //render view of edit form
      title: `Edit ${food.name} Information`,
      food,

    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/foods')
  })
}

function update(req, res){  
  //if input is blank delete it so it retains the information currently in database
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key];
      
    }
  }
  //find food by id
  // ensure we only show the new changes
  Food.findByIdAndUpdate(req.params.foodId, req.body, {new:true})
  .then(food => {
    // redirect to foodId page
    res.redirect (`/foods/${food._id}`)
    })
  .catch (err => {
  console.log(err)
  res.redirect('/foods')
  })
  }

export {
  index,
  create,
  show,
  edit,
  update,
}