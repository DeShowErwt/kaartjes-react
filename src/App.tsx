import { useState } from 'react'
import Map from './components/Map.tsx'
import config from '../config.json'
import clsx from 'clsx'
import styles from './App.module.css'

export default function App() {
    const maps = config.maps
    const [mapValue, setMapValue] = useState(0)
    const [previousMapValue, setPreviousMapValue] = useState(0)
    const [outsideSquare, setOutsideSquare] = useState(true)

    function handleClick(index: number) {
        setPreviousMapValue(mapValue)
        setMapValue(index)
    }


    return (
        <>
            <button onClick={() => setOutsideSquare(!outsideSquare)} className="absolute top-2 left-[100px] bg-[#213547] text-[rgba(255,255,255,0.87)] p-2">Verschillende square opties</button> 
            <Map header={maps[mapValue].header} year={parseInt(maps[mapValue].year)} description={maps[mapValue].description} image={maps[mapValue].image} previousMap={previousMapValue} /> 
            <div className="flex self-center text-center w-full my-4 h-12 border-2 border-black bg-[rgba(255,255,255,0.95)]">
                {maps.map((map, index) => {
                    return (
                        <button 
                            key={index} 
                            data-year={map.year}
                            onClick={() => handleClick(index)} 
                            className={clsx(
                                "col-span-1 border-r-2 border-black px-4 w-[20%]",
                                styles.square,
                                index <= mapValue ? 'bg-[#213547] text-[rgba(255,255,255,0.87)]' : '', 
                                index === maps.length - 1 ? 'border-r-0' : ''
                            )}
                        >
                            <p className={
                                outsideSquare ? "translate-y-[150%] text-[#213547]" : ''
                            }> 
                                { map.year }
                            </p>
                        </button>
                    )
                })}
            </div>
        </>
    )
}