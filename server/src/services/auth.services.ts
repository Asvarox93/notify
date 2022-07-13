import  jwt  from 'jsonwebtoken';
import { NextFunction,Request, Response } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  
  if (token == null) return res.status(401).send({status:401, message:"Unable to authenticate"})

  
  jwt.verify(token, process.env.TOKEN_SECRET, (err: any)  => { 
    if(err) return res.status(403)
     console.log("Tu jestem2")
    next()
  })
}
 
export default authenticate