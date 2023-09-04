import { getCurrentLeague, leagueHistory } from '@/services'
import { urlImageAccess } from '@/utils';
import LeagueStandings from '@/components/layout/LeagueStandings';

export default async function LeagueA() {
  const currentLeague: any = getCurrentLeague(leagueHistory)
  const leagueId = currentLeague.leagueA;
  
  return ( <LeagueStandings leagueId={ leagueId } bottomSize={ 5 } /> )
}