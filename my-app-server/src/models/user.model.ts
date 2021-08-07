import userMongo from "./user.mongo";

export interface User {
    name: string,
    password?: string,
    email?: string,
    friends?: string[]
}

export interface MongoResponse {
    found: boolean,
    user?: User
}

export async function saveUser(user: User): Promise<void> {
    try {
        await userMongo.findOneAndUpdate({
            name: user.name
        },
        user,
        {
            upsert: true
        });
    } catch (error) {
        console.error(error)
    }
}

export async function getUserData(name: string): Promise<MongoResponse> {
    const resp = await userMongo.findOne({
        name: name
    });

    if (!resp) {
        const response: MongoResponse = {
            found: false
        }
        return response;
    }

    const response: MongoResponse = {
        found: true,
        user: resp
    }
    return response;
}