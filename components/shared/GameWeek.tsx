import { getBootstrap, getFixtures } from '@/services'
export default async function GameWeek(props: any) {
    const { gameweek, percentage, currentFixtures, finishedMatch } = props;
    const bootstrap = (await getBootstrap() as any);
    const fixtures = (await getFixtures() as any);
    

    // const gameweek = (bootstrap.events.find((data: any) => data.is_current)).id;

    // const currentFixtures = Object.values(fixtures).filter((data: any) => data.event === gameweek);
    // const finishedMatch = currentFixtures.filter((data: any) => data.finished && data.finished_provisional)

    // const percentage = (finishedMatch.length / currentFixtures.length) * 100;
    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Gameweek {gameweek}</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-fuchsia-700 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full" style={{width: `${percentage <= 15 ? percentage : 8}%`}}>{percentage}%</div>
                </div>
                </div>
            </div>
        </div>
    )
}
