import { populate } from "dotenv";
import { Food } from "../models/food.js";
import { Profile } from "../models/profile.js";

function index(req, res){
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
  if (req.body.vitamins) {
    req.body.vitamins = req.body.vitamins.split(', ')
	Food.create(req.body)
	.then(food => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.foods.push(food)
      profile.save()
      .then(() =>{
        res.redirect('/foods')
      })
      .catch (err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch (err => {
      console.log(err)
      res.redirect('/')
    })
	})
  .catch (err => {
    console.log(err)
    res.redirect('/')
  })
}
}

function show(req, res){
  Food.findById(req.params.foodId)
  .populate('owner')
  .populate('reactions.owner')
  .then(food => {
    res.render('foods/show', {
      food,
      title: `${food.name} Details`
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/foods')
  })
}

function edit(req, res){
  Food.findById(req.params.foodId)
  .then(food => {
    res.render('foods/edit', {
      title: `Edit ${food.name} Information`,
      food,
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect(`/foods/${food._id}`)
  })
}

function update(req, res){  
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  if (req.body.vitamins) {
    req.body.vitamins = req.body.vitamins.split(', ')
  }
  Food.findByIdAndUpdate(req.params.foodId, req.body, {new:true})
  .then(food => {
    res.redirect (`/foods/${food._id}`)
  })
  .catch (err => {
  console.log(err)
  res.redirect('/foods')
  })
}

function deleteFood(req, res){
  Food.findByIdAndDelete(req.params.foodId)
  .then(food => {
    res.redirect('/foods')
  })
  .catch (err => {
    console.log(err)
    res.redirect('/')
  })
} 

function createReaction(req, res){
  Food.findById(req.params.foodId)
  .then(food => {
    req.body.owner = req.user.profile._id
    food.reactions.push(req.body)
    food.save()
    .then(()=>{
      res.redirect(`/foods/${food._id}`)
    })
    .catch (err => {
      console.log(err)
      res.redirect('/foods')
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/foods')
  })
}

function deleteReaction(req, res){
  Food.findById(req.params.foodId)
  .then(food => {
    food.reactions.id(req.params.reactionId).deleteOne()
    food.save()
    .then(() => {
      res.redirect(`/foods/${food._id}`)
    })
    .catch (err => {
      console.log(err)
      res.redirect('/foods')
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/foods')
  })
}

function addToProfile(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Food.findById(req.params.foodId)
    .then(food => {
      profile.foods.push(food)
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${profile._id}`)
      })
      .catch (err => {
        console.log(err)
        res.redirect('/profiles')
      })
    })
    .catch (err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function deleteFromProfile(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Food.findById(req.params.foodId)
    .then(food => {
      if (profile._id.equals(req.user.profile._id) && food.owner.equals(req.user.profile._id)) {
        Food.findByIdAndDelete(req.params.foodId)  
        .then(() => {
          res.redirect(`/profiles/${profile._id}`)
        })
        .catch (err => {
          console.log(err)
          res.redirect('/profiles')
        })
      } else {
        profile.foods.remove(req.params.foodId)
        profile.save()
        .then(() => {
          res.redirect(`/profiles/${profile._id}`)
        })
        .catch (err => {
          console.log(err)
          res.redirect('/profiles')
        })
      }
    })
    .catch (err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteFood as delete,
  createReaction,
  deleteReaction,
  addToProfile,
  deleteFromProfile,
}