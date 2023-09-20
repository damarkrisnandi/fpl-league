"use client";
import Image from "next/image";
import Chevron from "./chevron";
import Link from 'next/link'

export default function MotmCard(props: any) {
    const { gameweek, month, league, position, last_rank, team, manager, points, imgUrl, id, color} = props;
    return (
        <Link href={`/manager-by-phase/${id}`} className={`flex flex-col items-center justify-between ${ color || 'bg-white dark:bg-gray-800' } border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            {/* <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/> */}
            
            <div className={`flex justify-around items-center w-full p-6 ${ color || 'bg-white' } border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
                <div className='mr-10'>
                    <Trophy/>
                    <p className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white"> MOTM: {month} </p>
                    <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white inline-block w-44">{ league }</p>
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ team }</p>
                    <p className="mb-2 tracking-tight text-gray-900 dark:text-white">{ manager }</p>
                </div>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">+{ points }</h5>
            </div>
        </Link>

    )
}

function Trophy() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-2">
            <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
        </svg>
    )
}