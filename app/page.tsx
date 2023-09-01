
import CardSummary from '@/components/layout/cardSummary';
import MotwCard from '@/components/layout/MotwCard';
import GameWeek from '@/components/shared/GameWeek';
import { getBootstrap, getLeagueData, getFixtures } from '@/services'
import { urlImageAccess } from '@/utils';

export default async function Home() {
  let page = 1;
  const leagueAId = '633893';
  let standingsA: any[] = [];
  const leagueBId = '633913';
  let standingsB: any[] = [];
  const leagueSuperId = '633869';
  let standingsSuper: any[] = [];

  const bootstrap = (await getBootstrap() as any)
  const fixtures = (await getFixtures() as any);

  const elements = bootstrap.elements;
  
  let leagueA: any = (await getLeagueData(leagueAId, `${page}`));
  standingsA = [...leagueA.standings.results];

  let leagueB: any = (await getLeagueData(leagueBId, `${page}`));
  standingsB = [...leagueB.standings.results];

  let leagueSuper: any = (await getLeagueData(leagueSuperId, `${page}`));
  standingsSuper = [...leagueSuper.standings.results];

  const gameweek = (bootstrap.events.find((data: any) => data.is_current)).id;

  const currentFixtures = Object.values(fixtures).filter((data: any) => data.event === gameweek);
  const finishedMatch = currentFixtures.filter((data: any) => data.finished && data.finished_provisional)

  const percentage = (finishedMatch.length / currentFixtures.length) * 100;
  

  const dataA = standingsA && standingsA.length > 0 && standingsA.find(o => o.rank === 1);
  const dataB = standingsB && standingsB.length > 0 && standingsB.find(o => o.rank === 1);
  const dataSuper = standingsSuper && standingsSuper.length > 0 && standingsSuper.find(o => o.rank === 1);
  const dataMotwA = standingsA && standingsA.length > 0 && standingsA.find(o => o.event_total === Math.max(...standingsA.map(a => a.event_total)));
  return (
    <main className='w-11/12 m-auto flex flex-col items-center pt-24 pb-24'>
      <GameWeek
        gameweek={gameweek}
        percentage={percentage}
        currentFixtures={currentFixtures}
        finishedMatch={finishedMatch}
      ></GameWeek>
      <CardSummary
          // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
          league='League A'
          position={dataA ? dataA.rank : 1}
          last_rank={dataA ? dataA.last_rank : 1}
          team={dataA ? dataA.entry_name : 'N/A'}
          manager={dataA ? dataA.player_name : 'N/A'}
          points={dataA ? dataA.total : 0}
          id={dataA ? dataA.entry : 'N/A'}
        />
      <MotwCard
          // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
          league='League A'
          gameweek={gameweek}
          position={1}
          last_rank={dataMotwA ? dataMotwA.last_rank : 1}
          team={dataMotwA ? dataMotwA.entry_name : 'N/A'}
          manager={dataMotwA ? dataMotwA.player_name : 'N/A'}
          points={dataMotwA ? dataMotwA.event_total : 0}
          id={dataMotwA ? dataMotwA.entry : 'N/A'}
        />
    <CardSummary 
        // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
        league='League B'
        position={dataB ? dataB.rank : 1}
        last_rank={dataB ? dataB.last_rank : 1}
        team={dataB ? dataB.entry_name : 'N/A'}
        manager={dataB ? dataB.player_name : 'N/A'}
        points={dataB ? dataB.total : 0}
        id={dataB ? dataB.entry : 'N/A'}
      />

    <CardSummary 
        // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
        league='Super League'
        position={dataSuper ? dataSuper.rank : 1}
        last_rank={dataSuper ? dataSuper.last_rank : 1}
        team={dataSuper ? dataSuper.entry_name : 'N/A'}
        manager={dataSuper ? dataSuper.player_name : 'N/A'}
        points={dataSuper ? dataSuper.total : 0}
        id={dataSuper ? dataSuper.entry : 'N/A'}
      />
    </main>
  )
}
