import express, { Response, Request, NextFunction } from 'express'
const router = express.Router()

export interface AuthRequest extends Request {
  token?: string
}

export interface BasicRequest<T> extends Request {
  body:T
}

const auth = (req:AuthRequest, res:Response, next:NextFunction) => {
  const auth = req.headers.authorization
  let token: string | undefined
  if (auth && auth.includes('Bearer')) {
    token = auth.replace('Bearer ', '')
  } else {
    token = req.query.token?.toString()
  }
  console.log(token)
  if (token && token !== '') {
    if (token === 'tokenSecret') {
      next()
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
}

router.post('/login', (req:BasicRequest<{username:string, password:string}>, res:Response) => {
  try {
    const username = req.body.username
    const password = req.body.password
    if (username === 'user' && password === 'parola') {
      const token = 'tokenSecret'
      res.send(token)
    }
  } catch (error) {
    console.error(error)
    res.status(500).sendStatus(500)
  }
})
router.use(auth)
router.get('/data/:param', (req:Request, res:Response) => {
  try {
    console.log(req.params.param)
    res.status(200).send('AM PRIMIT REQUEST-UL')
  } catch (error) {
    console.error(error)
    res.status(500).sendStatus(500)
  }
})

export default router
