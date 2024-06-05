import type { Temperature } from "apps/weather/loaders/temperature.ts"

interface Props {
    /**
    * @description The code of coupon.
    */
    temperature?: Temperature | null;
    /**
    * @description Descreva sobre o lugar
    */
   /** @format textarea */
    text?: string;
}

export default function Lugar({ temperature, text }: Props) {
    return (
        <div class="flex justify-center flex-col items-center rounded p-8 bg-[#366612] text-white md:w-[900px] mx-auto my-8">
            <p class="mb-6 text-6xl"><b>{temperature?.celsius}º</b></p>
            <p>{text}</p>
        </div>
    )
}
