import { useLayoutEffect, useRef, useState } from 'react'
import Map from './components/Map.tsx'
import config from '../config.json'
import clsx from 'clsx'
import styles from './App.module.css'

export default function App() {
    const maps = config.maps
    const [mapValue, setMapValue] = useState(0)
    const [previousMapValue, setPreviousMapValue] = useState(0)

    const barRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    function handleClick(index: number) {
        setPreviousMapValue(mapValue)
        setMapValue(index)
    }

    const handleWindowResize = () => {
        if (barRef.current && progressRef.current) {
            progressRef.current.classList.add(styles.notransition)
            progressRef.current.style.width = ((barRef.current.clientWidth/maps.length) * (mapValue + 1)) + 'px'
            // Random read to force reflow
            progressRef.current.offsetHeight
            progressRef.current.classList.remove(styles.notransition)
        }
    }

    useLayoutEffect(() => {
        if (barRef.current && progressRef.current) {
            progressRef.current.style.width = ((barRef.current.clientWidth/maps.length) * (mapValue + 1)) + 2 + 'px'
        }
        window.addEventListener('resize', handleWindowResize)
    }, [mapValue])

    return (
        <>
            <Map header={maps[mapValue].header} year={parseInt(maps[mapValue].year)} description={maps[mapValue].description} image={maps[mapValue].image} previousMap={previousMapValue} /> 
            <div ref={barRef} className="flex relative self-center text-center w-full my-4 h-12 border-2 border-black bg-[rgba(255,255,255,0.95)]">
                {maps.map((map, index) => {
                    return (
                        <button 
                            key={index} 
                            data-year={map.year}
                            onClick={() => handleClick(index)} 
                            className={clsx(
                                "col-span-1 z-10 border-black px-4 w-[10%]",
                                index !== maps.length - 1 ? 'border-r-2' : ''
                            )}
                        >
                            <p className="translate-y-[150%] translate-x-[65%] text-[#213547]"> 
                                { map.year }
                            </p>
                        </button>
                    )
                })}
                <div className={clsx("absolute h-12 bg-[#213547] border-2 border-black border-r-0 duration-1000 ease-out -top-[1.5px] -left-0.5")} ref={progressRef} />  
            </div>
        </>
    )
}