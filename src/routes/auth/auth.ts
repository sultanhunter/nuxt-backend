import Router from "express"

const authRouter = Router()

authRouter.post("/auth/register", async (req, res, next) => {
    try {
        const {userName, email, password, repeatPassword, name} = req.body

        if (!userName || !email || !password || !repeatPassword || !name) {
            res.status(400)
            return next(Error("Data missing"))
        }
        return res.status(200).json({body: ""})
    } catch (e) {
        return next(e)
    }
})


export default authRouter