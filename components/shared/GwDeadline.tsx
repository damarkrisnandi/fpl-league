"use client";
import { useState, useEffect } from "react"
import {Observable, timer} from 'rxjs';
import {map, takeUntil} from "rxjs/operators";

export default function GwDeadline(props: any) {
    const [time, setTime] = useState(new Date());
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [width, setWidth] = useState(0);
    const { nextGameweekId, nextGameweekDeadline, prevGameweekDeadline } = props;

    const getTimer = (time: number) => {
        let distance =  time - 1000;
      
        return timer(0, 1000).pipe(
          takeUntil(timer(distance)),
          map(() => {
            distance -= 1000;
            return distance;
          })
        );
    };
    
    useEffect(() => {
        const deadline = (new Date(nextGameweekDeadline).getTime() - new Date().getTime());
        const duration = (new Date(nextGameweekDeadline).getTime() - new Date(prevGameweekDeadline).getTime());

        let subscription = getTimer(deadline).subscribe((val) => {
            setDay(Math.floor(val / (1000 * 60 * 60 * 24)));
            setHour(Math.floor((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinute(Math.floor((val % (1000 * 60 * 60)) / (1000 * 60)));
            setSecond(Math.floor((val % (1000 * 60)) / 1000));
            setWidth(((duration - val)*100)/duration)
        })
        return () => { 
            subscription.unsubscribe() 
        }
    })

    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Deadline: Gameweek {nextGameweekId}</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-green-700 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full transition-all duration-700 
                ease-out truncate" style={{width: `${width}%`}}>{ day } d { hour } h { minute } m { second } s</div>
                </div>
                </div>
            </div>
        </div>

    )
}