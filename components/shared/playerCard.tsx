'use client'
import Image from "next/image";
import "./playerCard.css"
import { useEffect, useState } from "react";

export default function PlayerCard(props: any) {
    const [show, setShow] = useState(false);
    const { name, position, points, imgUrl, isCaptain, isViceCaptain, multiplier, team, urlTeamImage, delay } = props;
    const posMap = (position: number) => {
        if (position === 1) {
            return 'GKP'
        } else if (position === 2) {
            return 'DEF'
        } else if (position === 3) {
            return 'MID'
        } else if (position === 4) {
            return 'FWD'
        } 
        return '';
    }
    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                setShow(true);
            }, !delay ? 500 : delay * 120)

        }
    })
    return (
        <div>
            
            <div className={`items-center w-16 lg:w-32 m-0.5 p-0.5  pt-2 bg-gradient-to-br from-blue-500 to-purple-700 rounded-md first-letter first-letter transition-all ease-in-out duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'} `}>
                {isCaptain ? (
                    <span className="absolute bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-1 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">C</span>
                ) : (<></>)}
                {urlTeamImage ? (
                    <span className="absolute text-xs font-medium right-0 px-1 py-0.5 rounded">
                        <Image className="w-full h-full p-0 pb-0 rounded-t-lg md:rounded-none md:rounded-l-lg -z-10" src={urlTeamImage} alt="" width={16} height={20}/>
                    </span>
                ) : null}
                <Image className="w-full h-full p-0 pb-0 rounded-t-lg md:rounded-none md:rounded-l-lg z-10" src={imgUrl} alt="" width={150} height={150}/>
                <div className={`p-1 flex flex-col justify-center items-center ${isCaptain ? 'bg-yellow-100' : 'bg-white'} border border-gray-200 shadow rounded-t-none rounded-b-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                    <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">{ name }</p>
                    <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">{ points * (isCaptain ? (multiplier === 3 ? 3 : 2) : 1) }</h5>
                    
                </div>
            </div>
        </div>
    )
}