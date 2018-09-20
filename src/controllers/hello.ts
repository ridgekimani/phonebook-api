import { Router, Response } from "express"

const router: Router = Router()

router.get('/', (_req, res: Response) => {
    res.send("Hello world")
})

export const HelloController: Router = router