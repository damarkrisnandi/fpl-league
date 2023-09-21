import PlayerCard from "@/components/shared/playerCard";
import { getBootstrap, getManagerHistory, getManagerInfo, getPicksData } from "@/services";
import { urlImageAccess, urlTeamImage } from "@/utils";
import '../../../components/shared/playerCard.css'

export default async function Page(props: any) {
  const { params } = props;

  const manager: any = await getManagerInfo(props.params.slug)
  const bootstrap: any = await getBootstrap();
  const playerReferences: any = bootstrap.elements;
  
  const teams:any = bootstrap.teams;

  const phases = bootstrap.phases;
  const currentPhase = phases.filter((p: any) => p.start_event <= manager.current_event && manager.current_event <= p.stop_event);

  const history: any = await getManagerHistory(props.params.slug);

  const chipsUsed: any[] = history.chips;

  const phaseEvts = history.current.filter((h: any) => h.event >= currentPhase[1].start_event && h.event <= currentPhase[1].stop_event)

  const chipsMap: Map<string, string> = new Map<string, string>();
  chipsMap.set('bboost', 'Bench Boost Activated');
  chipsMap.set('3xc', 'Triple Captain Activated');
  chipsMap.set('freehit', 'Freehit Activated');
  chipsMap.set('wildcard', 'Wildcard Activated');
  
  return (
    <div className="h-screen w-full">
        <div className="flex flex-col justify-start items-center pt-16 pb-4 manager-page field-bg">
        <div className={`items-center w-11/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
            <h1 className="text-md text-center font-semibold text-white">
                { manager.name } ({ manager.player_first_name } { manager.player_last_name })
            </h1>
        </div>
        <div className="w-11/12">
            <div className={`items-center w-full m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                <h1 className="text-md text-center font-semibold text-white">
                    Recap: {currentPhase[1].name} ({manager.current_event - currentPhase[1].start_event + 1}/{currentPhase[1].stop_event - currentPhase[1].start_event + 1})
                </h1>
            </div>
            { phaseEvts.map((evt:any) => (
                <div className="w-full">
                    <div className="flex" key={evt.event}>
                        <div className={`items-center w-24 lg:w-1/6 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                            <h1 className="text-3xl text-center font-semibold text-white">
                            {evt.event}
                            </h1>
                            <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                                <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Gameweek</p>
                            </div>
                        </div>

                        <div className={`items-center w-32 lg:w-5/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                            <h1 className="text-3xl text-center font-semibold text-white">
                            {evt.points}
                            </h1>
                            <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                                <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Points</p>
                            </div>
                        </div>
                    
                        <div className={`items-center w-32 lg:w-5/12 m-0.5 mr-0 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                            <h1 className="text-3xl text-center font-semibold text-white">
                            {evt.event_transfers}({0 - evt.event_transfers_cost})
                            </h1>
                            <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                                <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Transfers</p>
                            </div>
                        </div>

                    </div>
                    {
                        chipsUsed.find(c => c.event === evt.event) ? (
                            <div className={`items-center w-full m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                                <h1 className="text-sm text-center text-white">
                                    GW{evt.event} {chipsMap.get(chipsUsed.find(c => c.event === evt.event))}
                                </h1>
                            </div>
                        ) : null
                    }
                </div>
            )) }

        </div>
        </div>
    </div>
  );
}
