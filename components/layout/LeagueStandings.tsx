import CardSecondary from '@/components/layout/carcSec';
import Card from '@/components/layout/card';
import DivisionBound from '@/components/layout/divisionBound';
import { getBootstrap, getLeagueData } from '@/services'
import { urlImageAccess } from '@/utils';

export default async function LeagueStandings(props: any) {
    const { leagueId, topSize, bottomSize } = props
    let page = 1;
    let standings: any[] = [];

    const elements = (await getBootstrap() as any).elements;
    
    let league: any = (await getLeagueData(leagueId, `${page}`));
    standings = [...league.standings.results];

    const setColor = (standings: any[], data: any) => {
        let color = '';
        if (topSize) {
            color+=data.rank <= topSize  ? 'bg-green-200 dark:bg-green-700 ' : (topSize && data.rank == topSize + 1 ? 'bg-yellow-200 dark:bg-yellow-700 ' : 'bg-white dark:bg-gray-700 ')
        }

        if (bottomSize) {
            color+=data.rank > (standings.length - bottomSize) ? 'bg-red-200 dark:bg-red-700 ' : (bottomSize && data.rank == standings.length - bottomSize ? 'bg-yellow-200 dark:bg-yellow-700 ' : 'bg-white dark:bg-gray-800 ');
        }
        return color;
    }
    
    while (league.standings.has_next) {
        page++;
        league = (await getLeagueData(leagueId, `${page}`));
        standings = [...standings, ...league.standings.results];
    }

    return (
        <main className='w-11/12 m-auto flex flex-col items-center pt-24 pb-24'>
            {
            standings && standings.length > 0 && standings.map((data: any) => 
            data.rank_sort === 1 ? (
            <Card 
                // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
                position={data.rank}
                last_rank={data.last_rank}
                team={data.entry_name}
                manager={data.player_name}
                points={data.total}
                id={data.entry}
                key={data.entry}
                color={topSize ? 'bg-green-200 dark:bg-green-700' : ''}
            />
            ) : (
            <CardSecondary 
                team={data.entry_name}
                position={data.rank}
                last_rank={data.last_rank}
                manager={data.player_name}
                points={data.total}
                id={data.entry}
                key={data.entry}
                color={setColor(standings, data)}
            />
            ) 
        )        
        }
        </main>
    )
}