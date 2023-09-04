import CardSecondary from '@/components/layout/carcSec';
import Card from '@/components/layout/card';
import DivisionBound from '@/components/layout/divisionBound';
import { getBootstrap, getLeagueData, getCurrentLeague, leagueHistory } from '@/services'
import { urlImageAccess } from '@/utils';

export default async function Home() {
  const currentLeague = getCurrentLeague(leagueHistory)
  let page = 1;
  const leagueId = currentLeague.leagueA;
  let standings: any[] = [];

  const elements = (await getBootstrap() as any).elements;
  
  let league: any = (await getLeagueData(leagueId, `${page}`));
  standings = [...league.standings.results];
  
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
            color={data.rank > 25 ? 'bg-red-200 dark:bg-red-700' : (data.rank == 25 ? 'bg-yellow-200 dark:bg-yellow-700' : 'bg-white dark:bg-gray-800')}
          />
        ) 
      )        
    }
    </main>
  )
}