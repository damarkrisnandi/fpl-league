import Chevron from "./chevron";

export default function CardSecondary(props: any) {
    const { position, last_rank, team, manager, points, id, color} = props;
    return (
        <a href={`/manager/${id}`} className={`flex justify-between items-center w-full p-6 mb-2 ${ color || 'bg-white'} border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
            {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
            <div className='mr-10'>
              <p className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{ position } <Chevron rank={position} last_rank={last_rank}/></p>
              <p className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{ team }</p>
              <p className="mb-2 tracking-tight text-gray-900 dark:text-white">{ manager }</p>
            </div>
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{ points }</h5>
        </a>
    )
}