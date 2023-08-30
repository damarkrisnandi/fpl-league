import CardSecondary from '@/components/layout/carcSec';
import Card from '@/components/layout/card';
import DivisionBound from '@/components/layout/divisionBound';
import { getBootstrap, getLeagueData } from '@/services'
import { urlImageAccess } from '@/utils';

export default async function Home() {
  let page = 1;
  const leagueAId = '633893';
  let standingsA: any[] = [];
  const leagueBId = '633913';
  let standingsB: any[] = [];
  const leagueSuperId = '633869';
  let standingsSuper: any[] = [];

  const elements = (await getBootstrap() as any).elements;
  
  let leagueA: any = (await getLeagueData(leagueAId, `${page}`));
  standingsA = [...leagueA.standings.results];

  let leagueB: any = (await getLeagueData(leagueBId, `${page}`));
  standingsB = [...leagueB.standings.results];

  let leagueSuper: any = (await getLeagueData(leagueSuperId, `${page}`));
  standingsSuper = [...leagueSuper.standings.results];
  

  const dataA = standingsA.find(o => o.rank === 1);
  const dataB = standingsB.find(o => o.rank === 1);
  const dataSuper = standingsSuper.find(o => o.rank === 1);
  return (
    <main className='w-11/12 m-auto flex flex-col items-center pt-24 pb-24'>
      <h1 className="text-3xl font-semibold">FPLMGM&apos;s Summary</h1>
      
      <h2 className="text-2xl mt-3">League A Leader</h2>
      <Card 
          imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
          position={dataA.rank}
          last_rank={dataA.last_rank}
          team={dataA.entry_name}
          manager={dataA.player_name}
          points={dataA.total}
          id={dataA.entry}
        />

    <h2 className="text-2xl mt-3">League B Leader</h2>
    <Card 
        imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
        position={dataB.rank}
        last_rank={dataB.last_rank}
        team={dataB.entry_name}
        manager={dataB.player_name}
        points={dataB.total}
        id={dataB.entry}
      />
    <h2 className="text-2xl mt-3">League Super Leader</h2>
    <Card 
        imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
        position={dataSuper.rank}
        last_rank={dataSuper.last_rank}
        team={dataSuper.entry_name}
        manager={dataSuper.player_name}
        points={dataSuper.total}
        id={dataSuper.entry}
      />
    </main>
  )
}