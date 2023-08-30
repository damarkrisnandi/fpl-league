import PlayerCard from "@/components/shared/playerCard";
import { getBootstrap, getManagerInfo, getPicksData } from "@/services";
import { urlImageAccess } from "@/utils";

export default async function Page(props: any) {
  const { params } = props;
  console.log(props.params.slug);

  const manager: any = await getManagerInfo(props.params.slug)
  console.log(manager);
  const bootstrap: any = await getBootstrap();
  const playerReferences: any = bootstrap.elements;
  const picksData: any = await getPicksData(props.params.slug, '38');
  const picksFullData: any[] = [
    ...picksData.picks.map(
      (obj: any) => { return {...playerReferences.find(
        (ref:any) => obj.element === ref.id
      ), ...obj}}
    )
  ];
  console.log(manager);
  //manager.current_event

  const positions = [1, 2, 3, 4]
  
  return (
    <div className="bg-green-700 flex flex-col justify-center items-center pt-24 pb-24">
      <a href="#" className="flex flex-col max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-10">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{manager.current_event}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">points</p>
      </a>
      {positions.map((position: any) => (
        <div  className='w-11/12 m-auto flex flex-row items-center justify-center'>
        {
          picksFullData
          .slice(0, 11)
          .filter((data: any) => data.element_type === position)
          .map(data => (
            
              <PlayerCard 
                name={data.web_name}
                imgUrl={urlImageAccess(data.photo)}
                points={data.event_points}
                position={data.element_type}
                isCaptain={data.is_captain}
                isViceCaptain={data.is_vice_captain}
              />
            
          ))
        }
        </div>
      ))}
      <span className="mt-20 bg-none text-center text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-white">bench</span>
      <div  className='w-11/12 m-auto flex flex-row items-center justify-center'>
      {
        [11, 12, 13, 14].map((i: number) => (
          <PlayerCard 
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
  );
}