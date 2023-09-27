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

function deleteFood(req, res){
  //find food by id and delete
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
  //find the logged in user
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Food.findById(req.params.foodId)
    //find the id of the food they want to add
    .then(food => {
      //push food into their foods array
      profile.foods.push(food)
      console.log(`check food id added: ${food._id}`)
      console.log('profile with new food', profile.foods)
      // save their profile?
      profile.save()
      .then(() => {
        //redirect
        // console.log(`check food id added: ${food._id}`)
        res.redirect(`/profiles/${profile._id}`)

      })
    })
  })
}


// function deleteFromProfile(req, res){
//   Profile.findById(req.user.profile._id)
//   .then(profile => {
//     Food.findById(req.params.foodId)
//     .then(food => {
//       profile.foods.remove(req.params.foodId)
//       profile.save()
//       .then(() => {
//         res.redirect(`/profiles/${profile._id}`)
//       })
//     })
//   })
// }

function deleteFromProfile(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Food.findById(req.params.foodId)
    .then(food => {
      if (profile._id.equals(req.user.profile._id) && food.owner.equals(req.user.profile._id)){
        Food.findByIdAndDelete(req.params.foodId)
        .then(food => {
          res.redirect(`/profiles/${profile._id}`)
        })
      } else {
        console.log('ELSE TRIGGERED!')
        profile.foods.remove({_id: req.params.foodId})
        profile.save()
        .then(() => {
        res.redirect(`/profiles/${profile._id}`)
        })
      }
    })
  })
}
//profile._id.equals(user?.profile._id) && food.owner.equals(user?.profile._id)
//  Food.findByIdAndDelete(req.params.foodId)


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