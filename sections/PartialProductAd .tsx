import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

//import type { Section } from "deco/blocks/section.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ProductAd, { Props } from "./ProductAd.tsx";


export interface PropsPartial {
    productAds: Props[];

    /** @description Messagem */
    message?: string;

    /** @description Imagem */
    image?: ImageWidget;


    /** @description Titulo do botao */
    buttonTitle?: string;

    currentIndex?: number;
}



export default function PartialProductAd({ image, message, buttonTitle, currentIndex, productAds }: PropsPartial) {

    return (
        <div class="container group md:w-fit bg-neutral-content flex flex-col md:flex-row items-center border rounded py-8 md:p-5 gap-5 my-9">
            <div>
                {productAds && productAds.length > 0 && <ProductAd  {...productAds[currentIndex ?? 0]} />}
            </div>
            <div class="grid gap-4 text-white">
                {message && <p>{message}</p>}
                {image && <Image class="m-auto group-hover:scale-[1.2] duration-[0.5s]" src={image!} alt="produto" width={50} height={50} />}
                {buttonTitle && <button  {...usePartialSection({ props: { currentIndex: (currentIndex ?? 0) + 1 } })} class="btn btn-secondary text-white">{buttonTitle}</button>}
            </div>
        </div>
    )
}


