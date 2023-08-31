import Image from "next/image";

export default function PlayerCard(props: any) {
    const { name, position, points, imgUrl, isCaptain, isViceCaptain } = props;
    return (
        <div>

            <div href="#" className="items-center w-16 m-0.5">
                <Image className="w-full h-full p-0 pb-0 rounded-t-lg md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/>
                <div className="p-0 flex flex-col justify-center items-center bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">{ name }</p>
                    <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">{ points * (isCaptain ? 2 : 1) }</h5>
                </div>
            </div>
        </div>
    )
}