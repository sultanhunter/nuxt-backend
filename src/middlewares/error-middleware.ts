import {NextFunction, Response, Request} from "express";

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("error middleware", error);
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({error: "Token Expired"});
    }
    const statusCodePassed = res.statusCode !== 200
    return res.status(statusCodePassed ? res.statusCode : 500).json({error: error.message ?? "Internal Error"});
};
