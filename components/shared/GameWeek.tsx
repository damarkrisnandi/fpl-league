import { getBootstrap, getFixtures } from '@/services'
export default async function GameWeek() {
    const bootstrap: any[] = await getBootstrap();
    const fixtures: any[] = await getFixtures();
    

    const gameweek = (bootstrap.events.find(data => data.is_current)).id;

    const currentFixtures = Object.values(fixtures).filter(data => data.event === gameweek);
    const finishedMatch = currentFixtures.filter(data => data.finished && data.finished_provisional)

    const percentage = (finishedMatch.length / currentFixtures.length) * 100;
    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex justify-around items-center w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='mr-10'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Gameweek {gameweek}</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${percentage}`}}>{percentage}% {`( ${finishedMatch.length}/${currentFixtures.length} )`}</div>
                </div>
                </div>
            </div>
        </div>
    )
}