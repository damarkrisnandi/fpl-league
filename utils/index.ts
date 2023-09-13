import {parse, stringify, toJSON, fromJSON} from 'flatted';

export const API_URL = 'https://fantasy.premierleague.com';

export const urlImageAccess = (fileName: string) => `https://resources.premierleague.com/premierleague/photos/players/250x250/p${fileName.replace('.jpg', '.png')}`;

export const urlTeamImage = (team_code: any) => `https://resources.premierleague.com/premierleague/badges/70/t${team_code}.png`;

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Access-Control-Max-Age': 2592000
};

const headers = { 
    'Content-Type': 'application/json',
    ...cors
};

// const reqSplit = (req, pos) => req.url.split('/')[pos];

export const createResponseBody = (res: any, body: any) => {
    res.writeHead(200, headers);
    res.end(JSON.stringify(parse(stringify(body))))
}