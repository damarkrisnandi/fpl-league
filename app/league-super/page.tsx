import { getCurrentLeague, leagueHistory } from '@/services'
import { urlImageAccess } from '@/utils';
import LeagueStandings from '@/components/layout/LeagueStandings';

export default async function LeagueSuper() {
  const currentLeague: any = getCurrentLeague(leagueHistory)
  const leagueId = currentLeague.leagueSuper;
  
  return ( <LeagueStandings leagueId={ leagueId } /> )
}