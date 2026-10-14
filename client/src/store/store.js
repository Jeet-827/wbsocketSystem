import { configureStore } from '@reduxjs/toolkit'
import userReduser from './sclices/userSclice.js'

export const store = configureStore({
    reducer:{
        userData:userReduser,
    }
})    