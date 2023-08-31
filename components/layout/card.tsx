import Image from "next/image";
import Chevron from "./chevron";

export default function Card(props: any) {
    const { position, last_rank, team, manager, points, imgUrl, id, color} = props;
    return (
        
        <a href={`/manager/${id}`} className={`flex flex-col items-center justify-between ${ color || 'bg-white dark:bg-gray-800' } border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex justify-around items-center w-full p-6 ${ color || 'bg-white' } border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
                <div className='mr-10'>
                <p className="mb-2 text-7xl font-bold tracking-tight text-gray-900 dark:text-white">{ position }  <Chevron rank={position} last_rank={last_rank}/></p>
                <p className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{ team }</p>
                <p className="mb-2 tracking-tight text-gray-900 dark:text-white">{ manager }</p>
                </div>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{ points }</h5>
            </div>
        </a>

    )
}