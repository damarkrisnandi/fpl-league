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

  const currentEvt = history.current.find((c: any) => c.event === manager.current_event);

  const phaseEvts = history.current.filter((h: any) => h.event >= currentPhase[1].start_event && h.event <= currentPhase[1].stop_event)
  
  return (
    <div className="h-screen w-full">
        <div className="flex flex-col justify-start items-center pt-16 pb-4 manager-page field-bg">
        <div className={`items-center w-11/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
            <h1 className="text-md text-center font-semibold text-white">
                { manager.name } ({ manager.player_first_name } { manager.player_last_name })
            </h1>
        </div>
        <div className={`items-center w-11/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
            <h1 className="text-md text-center font-semibold text-white">
                Recap: {currentPhase[1].name} ({manager.current_event - currentPhase[1].start_event + 1}/{currentPhase[1].stop_event - currentPhase[1].start_event + 1})
            </h1>
        </div>
        { phaseEvts.map((evt:any) => (
            <div className="flex">
                <div className={`items-center w-24 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                    <h1 className="text-3xl text-center font-semibold text-white">
                    {evt.event}
                    </h1>
                    <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                        <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Gameweek</p>
                    </div>
                </div>

                <div className={`items-center w-24 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                    <h1 className="text-3xl text-center font-semibold text-white">
                    {evt.points}
                    </h1>
                    <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                        <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Points</p>
                    </div>
                </div>
            
                <div className={`items-center w-24 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                    <h1 className="text-3xl text-center font-semibold text-white">
                    {evt.event_transfers}({0 - evt.event_transfers_cost})
                    </h1>
                    <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                        <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Transfers</p>
                    </div>
                </div>
            </div>
        )) }
        </div>
    </div>
  );
}
