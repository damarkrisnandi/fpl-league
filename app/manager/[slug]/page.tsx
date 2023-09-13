import PlayerCard from "@/components/shared/playerCard";
import { getBootstrap, getManagerInfo, getPicksData } from "@/services";
import { urlImageAccess } from "@/utils";

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
  //manager.current_event
  let currentPts = 0;
  picksFullData.map(
    (o: any) => o.event_points * (o.multiplier)
  ).forEach((n: any) => {
    currentPts += n;
  })

  const positions = [1, 2, 3, 4]
  
  return (
    <div className="flex flex-col justify-center items-center pt-16 pb-4 manager-page">
      <div className="absolute left-1 top-10">
      <PlayerCard 
        name={manager.name}
        imgUrl={"https://www.premierleague.com/resources/rebrand/v7.123.11/i/elements/pl-main-logo.png"}
        points={currentPts}
      />
        {/* <div className="fut-player-card">
          <div className="player-card-top flex justify-center">
            <h5 className="mb-1 text-xl font-bold tracking-tight text-center">{currentPts}</h5>
          </div>
          <div className="player-card-bottom flex justify-center">
            <p className="font-normal ">pts</p>
          </div>
        </div> */}
        {/* <a href="#" className="flex flex-col max-w-sm py-2 px-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5 mb-5">
          <h5 className="mb-1 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{currentPts}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">pts</p>
        </a> */}
      </div>
      <div className="flex flex-col justify-center items-center pt-4 field-bg w-full">
        {positions.map((position: any) => (
          <div key={position} className='w-11/12 -m-2 flex flex-row items-center justify-center'>
          {
            picksFullData
            .slice(0, 11)
            .filter((data: any) => data.element_type === position)
            .map(data => (
              
                <PlayerCard 
                  key={data.id}
                  name={data.web_name}
                  imgUrl={urlImageAccess(data.photo)}
                  points={data.event_points}
                  position={data.element_type}
                  isCaptain={data.is_captain}
                  isViceCaptain={data.is_vice_captain}
                  multiplier={data.multiplier}
                />
              
            ))
          }
          </div>
        ))}
        <div  className={`p-2 mt-2 flex items-center justify-center  border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
        {
          [11, 12, 13, 14].map((i: number) => (
            <PlayerCard
              key={i} 
              name={picksFullData[i].web_name}
              imgUrl={urlImageAccess(picksFullData[i].photo)}
              points={picksFullData[i].event_points}
              position={picksFullData[i].element_type}
              isCaptain={picksFullData[i].is_captain}
              isViceCaptain={picksFullData[i].is_vice_captain}
            />
          ))
        }
          
        
        </div>
      </div>
    </div>
  );
}
