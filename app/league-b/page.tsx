import { getCurrentLeague, leagueHistory } from '@/services'
import { urlImageAccess } from '@/utils';
import LeagueStandings from '@/components/layout/LeagueStandings';

export default async function LeagueB() {
  const currentLeague: any = getCurrentLeague(leagueHistory)
  const leagueId = currentLeague.leagueB;
  
  return ( <LeagueStandings leagueId={ leagueId } topSize={ 5 } /> )
}