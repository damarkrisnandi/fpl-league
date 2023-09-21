import PlayerCard from "@/components/shared/playerCard";
import { getBootstrap, getManagerHistory, getManagerInfo, getPicksData } from "@/services";
import { urlImageAccess, urlTeamImage } from "@/utils";

export default async function Page(props: any) {
  const { params } = props;

  const manager: any = await getManagerInfo(props.params.slug)
  const bootstrap: any = await getBootstrap();
  const playerReferences: any = bootstrap.elements;
  const picksData: any = await getPicksData(props.params.slug, `${manager.current_event}`);
  const picksFullData: any[] = [
    ...picksData.picks.map(
      (obj: any) => { return {...playerReferences.find(
        (ref:any) => obj.element === ref.id
      ), ...obj}}
    )
  ];
  const teams:any = bootstrap.teams;
  //manager.current_event
  let currentPts = 0;
  picksFullData.map(
    (o: any) => o.event_points * (o.multiplier)
  ).forEach((n: any) => {
    currentPts += n;
  })

  const positions = [1, 2, 3, 4]

  const history: any = await getManagerHistory(props.params.slug);

  const currentEvt = history.current.find((c: any) => c.event === manager.current_event);

  const chipsUsed: any[] = history.chips;

  const chipsMap: Map<string, string> = new Map<string, string>();
  chipsMap.set('bboost', 'Bench Boost Activated');
  chipsMap.set('3xc', 'Triple Captain Activated');
  chipsMap.set('freehit', 'Freehit Activated');
  chipsMap.set('wildcard', 'Wildcard Activated');

  console.log(chipsUsed.find(c => c.event === currentEvt.event));
  
  return (
    <div className="flex flex-col justify-center items-center pt-16 pb-4 manager-page">
      <div className={`items-center w-11/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
          <h1 className="text-md text-center font-semibold text-white">
            { manager.name } ({ manager.player_first_name } { manager.player_last_name })
          </h1>
      </div>
      <div className="absolute left-1 lg:left-28 top-28">
        <div className={`items-center w-24 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
            <h1 className="text-3xl text-center font-semibold text-white">
              {currentPts}
            </h1>
            <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Current Pts</p>
            </div>
        </div>
      
      </div>
      <div className="absolute right-1 lg:right-28 top-28">
        <div className={`items-center w-24 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
            <h1 className="text-3xl text-center font-semibold text-white">
              {currentEvt.event_transfers}({0 - currentEvt.event_transfers_cost})
            </h1>
            <div className={`p-1 flex flex-col justify-center items-center bg-white border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">Transfers</p>
            </div>
        </div>
      
      </div>
      <div className="flex flex-col justify-center items-center pt-4 field-bg w-full">
        {positions.map((position: any) => (
          <div key={position} className='w-11/12 -m-1 flex flex-row items-center justify-center'>
          {
            picksFullData
            .slice(0, 11)
            .filter((data: any) => data.element_type === position)
            .map((data, idx) => (
              
                <PlayerCard 
                  key={data.id}
                  name={data.web_name}
                  imgUrl={urlImageAccess(data.photo)}
                  points={data.event_points}
                  position={data.element_type}
                  isCaptain={data.is_captain}
                  isViceCaptain={data.is_vice_captain}
                  multiplier={data.multiplier}
                  urlTeamImage={urlTeamImage(data.team_code)}
                  delay={data.position}
                />
              
            ))
          }
          </div>
        ))}
        <div  className={`p-2 mt-2 flex items-center justify-center  border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
        {
          [11, 12, 13, 14]
          .map((i: number) => (
            <PlayerCard
              key={i} 
              name={picksFullData[i].web_name}
              imgUrl={urlImageAccess(picksFullData[i].photo)}
              points={picksFullData[i].event_points}
              position={picksFullData[i].element_type}
              isCaptain={picksFullData[i].is_captain}
              isViceCaptain={picksFullData[i].is_vice_captain}
              urlTeamImage={urlTeamImage(picksFullData[i].team_code)}
              delay={picksFullData[i].position}
            />
          ))
        }
          
        
        </div>
      </div>
      {
        chipsUsed.find(c => c.event === currentEvt.event) ? (
            <div className={`items-center w-11/12 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter`}>
                <h1 className="text-sm text-center text-white">
                    { chipsMap.get(chipsUsed.find(c => c.event === currentEvt.event).name) }
                </h1>
            </div>
        ) : null
      }
    </div>
  );
}
