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

    return (
        <div className="grid grid-cols-3 gap-10">
            <img className="col-span-2" src={props.image} alt="Map" />
            <div>
                <h1 className="text-center mb-8">{ props.header } (ca. <Counter from={previousYear} to={props.year} />)</h1> 
                <p>{ props.description }</p>
            </div>
        </div>
    )
  }