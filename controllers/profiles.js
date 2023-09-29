import { populate } from "dotenv";

import { Profile } from "../models/profile.js";

function index(req, res){

  Profile.find({})
  .then(profiles => {

    res.render('profiles/index', {
      profiles,
      title: 'View All Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){

  Profile.findById(req.params.profileId)
  .populate('foods')
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .populate('foods')
    .then(loggedinUserProfile => {
      const myFoods = loggedinUserProfile.foods
      const isSelf = profile._id.equals(req.user.profile._id)

      res.render('profiles/show', {

        title: `${profile.name}'s Profile`,
        profile,
        isSelf,
        myFoods

      })
    })

  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
  show,
}