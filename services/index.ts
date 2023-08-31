const api_url = 'http://localhost:3000/api';
const managerInfoApi = `${api_url}/entry`;
const headers = {'Content-Type': 'application/json'};

const getResult = (url: string) => {
    const result = new Promise((resolve, reject) => {
        fetch(url, {})
        .then(data => {
            data.json().then(json => {
                resolve(json)
            })
        })
        // .catch(() => {
        //     reject('error call axios')
        // })
    })
    
    return result
}

export const getBootstrap = async () => await getResult(`${api_url}/bootstrap-static/`);
export const getFixtures = async () => await getResult(`${api_url}/fixtures/`);
export const getElementSummary = async (id: string) => await getResult(`${api_url}/element-summary/${id}/`);
export const getManagerInfo = async (id: string) => await getResult(`${managerInfoApi}/${id}/`);
export const getManagerHistory = async (id: string) => await getResult(`${managerInfoApi}/${id}/history/`);
export const getPicksData = async (eid: string, gw: string) => await getResult(`${managerInfoApi}/${eid}/event/${gw}/picks/`);
export const getLeagueData = async (leagueId: string, page: string) => await getResult(`https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page_standings=${page}`);

export const leagueHistory = [
    {
        seasonFrom: 2023,
        seasonUntil: 2024,
        leagueA: '633893',
        leagueB: '633913',
        leagueSuper: '633869'
    },
    {
        seasonFrom: 2024,
        seasonUntil: 2025,
        leagueA: '',
        leagueB: '',
        leagueSuper: ''
    },
]