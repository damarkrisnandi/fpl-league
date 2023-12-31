import { API_URL } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
    console.log(req.url);
    fetch(`${API_URL}${location.pathname}`, { next: { revalidate: 900 } }).then(data => {
        data.json().then(data => {
            res.json({ status: 'ok', data });
        })
    })
    
}
