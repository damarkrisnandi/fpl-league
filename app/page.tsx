
import CardSummary from '@/components/layout/cardSummary';
import MotwCard from '@/components/layout/MotwCard';
import MotmCard from '@/components/layout/MotmCard';
import GameWeek from '@/components/shared/GameWeek';
import GwDeadline from '@/components/shared/GwDeadline';
import { getBootstrap, getLeagueData, getFixtures, getCurrentLeague, leagueHistory, getLeagueDataPerPhase } from '@/services'
import { urlImageAccess } from '@/utils';

export default async function Home() {
  const currentLeague: any = getCurrentLeague(leagueHistory)
  let page = 1;
  const leagueAId = currentLeague.leagueA;
  let standingsA: any[] = [];
  let standingsAPhase: any[] = [];
  const leagueBId = currentLeague.leagueB;
  let standingsB: any[] = [];
  let standingsBPhase: any[] = [];
  const leagueSuperId = currentLeague.leagueSuper;
  let standingsSuper: any[] = [];
  let standingsSuperPhase: any[] = [];

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

  const phases = bootstrap.phases;
  const currentPhase = phases.filter((p: any) => p.start_event <= gameweek && gameweek <= p.stop_event);
  const previousPhase = phases.filter((p: any) => p.start_event <= (gameweek-1) && (gameweek-1) <= p.stop_event);
  
  let leagueAPhase: any = (await getLeagueDataPerPhase(leagueAId, `${previousPhase[1].id}`,`${page}`));
  standingsAPhase = [...leagueAPhase.standings.results];
  let leagueBPhase: any = (await getLeagueDataPerPhase(leagueBId, `${previousPhase[1].id}`,`${page}`));
  standingsBPhase = [...leagueBPhase.standings.results];
  let leagueSuperPhase: any = (await getLeagueDataPerPhase(leagueSuperId, `${previousPhase[1].id}`,`${page}`));
  standingsSuperPhase = [...leagueSuperPhase.standings.results];

  const dataA = standingsA && standingsA.length > 0 && standingsA.find(o => o.rank === 1);
  const dataB = standingsB && standingsB.length > 0 && standingsB.find(o => o.rank === 1);
  const dataSuper = standingsSuper && standingsSuper.length > 0 && standingsSuper.find(o => o.rank === 1);
  const dataMotwA = standingsA && standingsA.length > 0 && standingsA.find(o => o.event_total === Math.max(...standingsA.map(a => a.event_total)));
  const dataMotmA = standingsAPhase && standingsAPhase.length > 0 && standingsAPhase.find(o => o.rank === 1);
  const dataMotmB = standingsBPhase && standingsBPhase.length > 0 && standingsBPhase.find(o => o.rank === 1);
  const dataMotmSuper = standingsSuperPhase && standingsSuperPhase.length > 0 && standingsSuperPhase.find(o => o.rank === 1);

  const nextGameweek = (bootstrap.events.find((data: any) => data.is_next)) || (bootstrap.events.find((data: any) => data.is_next));

  const nextGameweekId = nextGameweek.id;
  const nextGameweekDeadline = nextGameweek.deadline_time;

  return (
    <main className='w-11/12 m-auto flex flex-col items-center pt-24 pb-24'>
      <GameWeek
        gameweek={gameweek}
        percentage={percentage}
        currentFixtures={currentFixtures}
        finishedMatch={finishedMatch}
      ></GameWeek>
      <GwDeadline 
        nextGameweekId={nextGameweekId}
        nextGameweekDeadline={nextGameweekDeadline}
      />
      { percentage === 100 ? (
        <div>
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
          <MotmCard
            league={dataMotmA.entry == dataMotmSuper.entry ? 'League A & Super League' : 'League A'}
            month={previousPhase[1].name}
            gameweek={gameweek}
            position={1}
            last_rank={dataMotmA ? dataMotmA.last_rank : 1}
            team={dataMotmA ? dataMotmA.entry_name : 'N/A'}
            manager={dataMotmA ? dataMotmA.player_name : 'N/A'}
            points={dataMotmA ? dataMotmA.total : 0}
            id={dataMotmA ? dataMotmA.entry : 'N/A'}
          />
          <MotmCard
            league={dataMotmB.entry == dataMotmSuper.entry ? 'League B & Super League' : 'League B'}
            month={previousPhase[1].name}
            gameweek={gameweek}
            position={1}
            last_rank={dataMotmB ? dataMotmB.last_rank : 1}
            team={dataMotmB ? dataMotmB.entry_name : 'N/A'}
            manager={dataMotmB ? dataMotmB.player_name : 'N/A'}
            points={dataMotmB ? dataMotmB.total : 0}
            id={dataMotmB ? dataMotmB.entry : 'N/A'}
          />
        </div>
        ) : null}
      <CardSummary
          // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
          league_url='/league-a'
          league='League A'
          position={dataA ? dataA.rank : 1}
          last_rank={dataA ? dataA.last_rank : 1}
          team={dataA ? dataA.entry_name : 'N/A'}
          manager={dataA ? dataA.player_name : 'N/A'}
          points={dataA ? dataA.total : 0}
          id={dataA ? dataA.entry : 'N/A'}
        />
    <CardSummary 
        // imgUrl={urlImageAccess(elements[Math.floor(Math.random() * 500)].photo)}
        league_url='/league-b'
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
        league_url='/league-super'
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
