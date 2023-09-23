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

export {
  index,
}