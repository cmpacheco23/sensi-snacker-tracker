import { populate } from "dotenv";

import { Profile } from "../models/profile.js";

function index(req, res){
  //find all profiles
  Profile.find({})
  .then(profiles => {
    //render view
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
  //find the profile by id
  Profile.findById(req.params.profileId)
  .populate('foods')
  .then(profile => {
    // create isSelf constant
    const isSelf = profile._id.equals(req.user.profile._id)
    // resolve promise
    res.render('profiles/show', {
      // render show page
      title: `${profile.name}'s Profile`,
      profile,
      isSelf
        // title
        // profile
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