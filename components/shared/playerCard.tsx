import Image from "next/image";
import "./playerCard.css"

export default function PlayerCard(props: any) {
    const { name, position, points, imgUrl, isCaptain, isViceCaptain, multiplier } = props;
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
    return (
        <div>
            <div className="fut-player-card">
                <div className="player-card-top">
                    <div className="player-master-info">
                        {/* <div className="player-rating">
                            <span>97</span>
                        </div> */}
                        <div className="player-position">
                            <span>{posMap(position)}</span>
                        </div>
                        {isCaptain ? (
                            <div className="player-position">
                            <span>[C]</span>
                        </div>
                        ) : null}
                    </div>
                    <div className="player-picture">
                    <Image className="w-full h-full rounded-t-lg md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150} priority/>
                        {/* <div className="player-extra">
                            <span>4*SM</span>
                            <span>4*WF</span>
                        </div> */}
                    </div>
                </div>
                <div className="player-card-bottom">
                    <div className="player-info">

                        <div className="player-name">
                            <span>{ name }</span>
                        </div>

                        <div className="player-features">
                            <div className="player-features-col">
                                <span>
                                    <div className="player-feature-value">{ points * (isCaptain ? (multiplier === 3 ? 3 : 2) : 1) }</div>
                                    <div className="player-feature-title">Pts</div>
                                </span>
                                
                            </div>
                            {/* <div className="player-features-col">
                                <span>
                                    <div className="player-feature-value">97</div>
                                    <div className="player-feature-title">PAC</div>
                                </span>
                                <span>
                                    <div className="player-feature-value">95</div>
                                    <div className="player-feature-title">SHO</div>
                                </span>
                                <span>
                                    <div className="player-feature-value">94</div>
                                    <div className="player-feature-title">PAS</div>
                                </span>
                            </div>
                            <div className="player-features-col">
                                <span>
                                    <div className="player-feature-value">99</div>
                                    <div className="player-feature-title">DRI</div>
                                </span>
                                <span>
                                    <div className="player-feature-value">35</div>
                                    <div className="player-feature-title">DEF</div>
                                </span>
                                <span>
                                    <div className="player-feature-value">68</div>
                                    <div className="player-feature-title">PHY</div>
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="items-center w-16 m-0.5">
                {isCaptain ? (
                    <span className="absolute bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-1 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">C</span>
                ) : (<></>)}
                <Image className="w-full h-full p-0 pb-0 rounded-t-lg md:rounded-none md:rounded-l-lg" src={imgUrl} alt="" width={150} height={150}/>
                <div className={`p-1 flex flex-col justify-center items-center ${isCaptain ? 'bg-yellow-100' : 'bg-white'} border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                    <p className="text-xs font-light tracking-tight text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden w-full text-center">{ name }</p>
                    <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">{ points * (isCaptain ? (multiplier === 3 ? 3 : 2) : 1) }</h5>
                    
                </div>
            </div> */}
        </div>
    )
}