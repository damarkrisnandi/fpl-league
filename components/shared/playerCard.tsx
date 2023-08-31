import Image from "next/image";

export default function PlayerCard(props: any) {
    const { name, position, points, imgUrl, isCaptain, isViceCaptain, multiplier } = props;
    return (
        <div>
            
            <div className="items-center w-16 m-0.5">
                {isCaptain ? (
                    <span className="absolute bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-1 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">C</span>
                ) : (<></>)}
                <Image className="w-full h-full p-0 pb-0 rounded-t-lg md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/>
                <div className={`p-2 flex flex-col justify-center items-center ${isCaptain ? 'bg-yellow-100' : 'bg-white'} border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                    <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">{ name }</p>
                    <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">{ points * (isCaptain ? (multiplier === 3 ? 3 : 2) : 1) }</h5>
                    
                </div>
            </div>
        </div>
    )
}