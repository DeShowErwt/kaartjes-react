// @ts-ignore
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter(props :{ from : number, to : number }) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const controls = animate(props.from, props.to, {
      duration: 1,
      onUpdate(value : number) {
        if(!ref.current) return;
        ref.current.textContent = value.toFixed(0);
      }
    });
    return () => controls.stop();
  }, [props.from, props.to]);

  return <span ref={ref} />;
}

export default function CounterComponent(props: {from: number, to: number}) {
  return <Counter from={props.from} to={props.to} />;
}