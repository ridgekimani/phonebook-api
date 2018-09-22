import { Router, Response } from "express"
import User from "../models/User";

const router: Router = Router()

router.get('/', (_req, res: Response) => {
    const user = new User({name: 'bob', age: 99});
    user.save()
    console.log(user)

    res.send("Hello world")
})

export const HelloController: Router = router