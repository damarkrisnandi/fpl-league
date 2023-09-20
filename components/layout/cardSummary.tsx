'use client'
import Image from "next/image";
import Chevron from "./chevron";
import Link from 'next/link'

export default function CardSummary(props: any) {
    const { league, position, last_rank, team, manager, points, imgUrl, id, color, league_url} = props;
    return (
        
        <Link href={`${ league_url }`} className={`flex flex-col items-center justify-between ${ color || 'bg-white' } border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex justify-around items-center w-full p-6 ${ color || 'bg-white dark:bg-gray-800' } border border-gray-200 rounded-lg shadow hover:bg-gray-100  dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
                <div className='mr-10'>
                    <StandingList />
                    <div className="flex w-full justify-between items-center">
                    <p className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">{ league }</p>
                    <p className="ml-2 mb-2 text-xl tracking-tight text-gray-900 dark:text-white">{ `#` }{ position }  </p>
                    <Chevron rank={position} last_rank={last_rank}/>
                    <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{ Math.abs(position - last_rank) }</p>
                    </div>
                <p className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{ team }</p>
                <p className="mb-2 tracking-tight text-gray-900 dark:text-white">{ manager }</p>
                </div>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{ points }</h5>
            </div>
        </Link>

    )
}

function StandingList() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
    )
}
