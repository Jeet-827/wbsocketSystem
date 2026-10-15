import {serachUser} from '../controller/Searchuser.controller.js'
import {Router} from 'express'

const searchRoute = Router()

searchRoute.get('/search',serachUser)

export default searchRoute