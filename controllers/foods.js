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
	Food.create(req.body)
	.then(food => {
    console.log('console FOOD', food)
    Profile.findById(req.user.profile._id)
    // console.log('console pID', req.user.profile._id)
    .then(profile => {
      console.log('console Profile', profile)
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
function show(req, res){
  Food.findById(req.params.foodId)
  .populate('owner')
  .populate('reactions.owner')
  
  //deep populate ref taco cat lecture
  .then(food => {
    console.log(food)
    res.render('foods/show', {
      food,
      title: 'Details'
    })
    console.log(`the food id issss!${food.reactions._id}`)

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
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
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

//original function
function deleteFood(req, res){
  Food.findByIdAndDelete(req.params.foodId)
  .then(food => {
    // redirect
    res.redirect('/foods')
  })
  .catch (err => {
    console.log(err)
    res.redirect('/')
    })
} 



function createReaction(req, res){
  //find food by id
  Food.findById(req.params.foodId)
  .then(food => {
    //push the reaction into the food array
    req.body.owner = req.user.profile._id
    food.reactions.push(req.body)
    // save the food
    food.save()
    .then(()=>{
      // redirect to foods/foodId
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
  //find the id of food that the reaction lives in
  Food.findById(req.params.foodId)
  .then(food => {
    //delete the reaction
    food.reactions.id(req.params.reactionId).deleteOne()
    //save the food
    food.save()
    //resolve promise
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
      //remove class
      profile.save()
      .then(() => {
        res.redirect(`/profiles/${profile._id}`)
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
  })
  .catch (err => {
    console.log(err)
    res.redirect('/foods')
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