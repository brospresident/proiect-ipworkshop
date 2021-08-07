import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Router, Request, Response } from 'express';

const PEOPLE_URL: string = 'https://api.namefake.com';
const peopleRouter: Router = Router();

interface Person {
    name: string,
    dateOfBirth: string,
    height: number
}

peopleRouter.get('/randompeople', async (req: Request, res: Response) => {
    let selectedPeople: Person[] = [];
    for (let i = 0; i < 5; ++i) {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: PEOPLE_URL,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        const resp: AxiosResponse = await axios(options);
        const newPerson: Person = {
            name: resp.data.name,
            dateOfBirth: resp.data.birth_data,
            height: resp.data.height
        }
        selectedPeople.push(newPerson);
    }

    return res.status(200).json(selectedPeople);
});

export default peopleRouter;