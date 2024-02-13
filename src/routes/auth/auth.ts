import Router, {Response} from "express"
import {db} from "../../lib/db";
import bcrypt from "bcrypt"
import {removeKeys} from "../../lib/db";
import jwt from "jsonwebtoken";
import {User} from "@prisma/client";

const authRouter = Router()

authRouter.post("/auth/register", async (req, res, next) => {
    try {
        const {userName, email, password, repeatPassword, name, profileImage} = req.body

        if (!userName || !email || !password || !repeatPassword || !name) {
            res.status(400)
            return next(Error("Data missing"))
        }

        if (password !== repeatPassword) {
            res.status(400)
            return next(Error("Passwords did not match"))
        }

        const userData = {
            userName,
            email,
            password: bcrypt.hashSync(password, 10),
            name,
            profileImage: profileImage ?? "https://picsum.photos/200/200"
        }

        const user = await db.user.create({
            data: userData,
        })
        return res.status(200).json(removeKeys(user, ['password']))
    } catch (e) {
        return next(e)
    }
})


authRouter.post("/auth/login", async (req, res, next) => {
    try {
        const {userName, password} = req.body;

        if (!userName || !password) {
            res.status(400)
            return next(Error("Data missing"))
        }

        const user = await db.user.findUnique({
            where: {
                userName
            }
        })

        if (!user) {
            res.status(404)
            return next(Error("User not found"))
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            res.status(400)
            return next(Error("Wrong password"))
        }

        const {accessToken, refreshToken} = generateTokens(user)

        if (!accessToken || !refreshToken) {
            res.status(401)
            return next(Error("Failed to generate tokens"))
        }

        await storeRefreshToken(refreshToken, user.id)
        setRefreshCookie(res, refreshToken)
        return res.status(200).json({access_token: accessToken, user: removeKeys(user, ['password'])})
    } catch (e) {
        return next(e)
    }
})

const setRefreshCookie = (res: Response, token: string) => {
    res.cookie('refresh_token', token, {
        httpOnly: true,
    })
}

const storeRefreshToken = async (token: string, userId: string) => {
    try {
        await db.refreshToken.create({
            data: {
                token,
                userId,
            }
        })
    } catch (e) {
    }
}

const generateTokens = (user: User) => {
    const accessSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!accessSecretKey) {
        return {}
    }
    const accessToken = jwt.sign({userId: user.id}, accessSecretKey, {
        expiresIn: '10m'
    })

    const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
    if (!refreshSecretKey) {
        return {}
    }

    const refreshToken = jwt.sign({userId: user.id}, refreshSecretKey, {
        expiresIn: '4h'
    })

    return {accessToken, refreshToken}
}


export default authRouter