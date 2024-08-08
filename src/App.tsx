import { useLayoutEffect, useRef, useState } from 'react'
import Map from './components/Map.tsx'
import config from '../config.json'
import clsx from 'clsx'
import styles from './App.module.css'

export default function App() {
    const maps = config.maps
    const [mapValue, setMapValue] = useState(0)
    const [previousMapValue, setPreviousMapValue] = useState(0)

    function handleClick(index: number) {
        setPreviousMapValue(mapValue)
        setMapValue(index)
    }

    const barRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    const handleWindowResize = () => {
        if (barRef.current && progressRef.current) {
            progressRef.current.classList.add(styles.notransition)
            progressRef.current.style.width = ((barRef.current.clientWidth/5) * (mapValue + 1)) + 'px'
            // Random read to force reflow
            progressRef.current.offsetHeight
            progressRef.current.classList.remove(styles.notransition)
        }
    }

    useLayoutEffect(() => {
        if (barRef.current && progressRef.current) {
            progressRef.current.style.width = ((barRef.current.clientWidth/5) * (mapValue + 1)) + 'px'
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
                                "col-span-1 border-r-2 z-10 border-black px-4 w-[20%]",
                                styles.square, 
                                index === maps.length - 1 ? 'border-r-0' : ''
                            )}
                        >
                            <p className="translate-y-[150%] text-[#213547]"> 
                                { map.year }
                            </p>
                        </button>
                    )
                })}
                <div className={clsx("absolute h-12 bg-[#213547] border-2 border-black border-r-0 duration-1000 ease-out -top-0.5 -left-0.5")} ref={progressRef} />  
            </div>
        </>
    )
}