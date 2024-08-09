import { useLayoutEffect, useRef } from 'react'
import config from '../../config.json'
import Counter from './Counter'

type MapProps = {
    header: string,
    description: string,
    image: string,
    year: number,
    previousMap: number
}

export default function MapComponent(props: MapProps) {
    const maps = config.maps
    const previousYear = parseInt(maps[props.previousMap].year)

    const contentRef = useRef<HTMLDivElement>(null)

    const returnDiv = document.createElement('div')

    function parseEnters(base : string) {
        returnDiv.innerHTML = ''
        const paragraphArray = base.split('{./.}')
        for (let i = 0; i < paragraphArray.length; i++) {
            const paragraph = paragraphArray[i]
            returnDiv.innerHTML += `${paragraph}<br>`
        }
        if(contentRef.current){
            contentRef.current.innerHTML = returnDiv.innerHTML
        }
    }

    useLayoutEffect(() => {
        parseEnters(props.description)
    })

    return (
        <div className="grid grid-cols-3 gap-10">
            <img className="col-span-2" src={props.image} alt="Map" />
            <div>
                <h1 className="text-center mb-8">{ props.header } (ca. <Counter from={previousYear} to={props.year} />)</h1> 
                <p ref={contentRef} />
            </div>
        </div>
    )
  }