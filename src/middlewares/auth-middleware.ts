// import {Request, Response, NextFunction} from "express";
//
// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1] ?? "";
//         //TODO:Auth Logic
//         return next();
//     } catch (e) {
//         return next(e)
//     }
// }