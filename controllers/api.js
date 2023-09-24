import mongoose from "mongoose"
import { populate } from "dotenv";

function index(res, req){
  fetch(`https://api.edamam.com/api/recipes/v2?app_id=${process.env.EDAMAM_APP_KEY}&app_key${process.env.EDAMAN_API_KEY}`)
  .then(apiResponse => {
    apiResponse.json()
    console.log(apiData)
    res.render('recipes', {
      recipes: apiData
    })
  })
}
export {
  index
}