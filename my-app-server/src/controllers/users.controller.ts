import { User, saveUser, getUserData, MongoResponse } from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'

const ROUNDS: number = 10;

// interface UserReceived {
//     name: string,
//     password?: string,
//     email?: string,
//     friends?: string[]
// }

interface UserRequest<T> extends Request {
    body: T
}

export async function httpRegisterUser(req: UserRequest<User>, res: Response) {
    try {
        const user: User = req.body;
        const foundDb: MongoResponse = await getUserData(user.name);
        const salt = await bcrypt.genSalt(ROUNDS);

        if (foundDb.found === false && user.password !== '') {
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const userDb: User = {
                name: user.name,
                password: hashedPassword,
                email: user.email,
                friends: []
            }
            await saveUser(userDb);
            return res.status(200).json({
                name: userDb.name,
                friends: userDb.friends,
                authorized: true
            });
        }

        return res.status(401).json({
            authorized: false,
            error: 'A user with that name already exists or your password is empty'
        });
    } catch (error) {
        console.error(error)
    }
}

export async function httpLoginUser(req: UserRequest<User>, res: Response) {
    try {
        const user: User = req.body;
        const userFound: MongoResponse = await getUserData(user.name);

        if (userFound.found === true) {
            const passwordMatch: boolean = await bcrypt.compare(user.password, userFound.user.password);
            if (passwordMatch) {
                return res.status(200).json({
                    name: user.name,
                    friends: userFound.user.friends,
                    authorized: true
                });
            }
            else return res.status(401).json({
                authorized: false,
                error: 'This username and password combination does not exist'
            });
        }
        else return res.status(401).json({
            authorized: false,
            error: 'This username is not registered in our database'
        });
    } catch (error) {
        console.error(error);
    }
}

export async function httpSaveUser(req: UserRequest<User>, res: Response) {
    const user: User = req.body;
    await saveUser(user);
}