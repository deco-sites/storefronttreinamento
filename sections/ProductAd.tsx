import { useId } from "../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import Save from "../islands/AddComments.tsx"

export interface Product {
    /** @description Imagem desktop */
    image: ImageWidget;
    /** @description Titulo do produto */
    title: string;
    /** @description Descrição do produto */
    /** @format textarea */
    description: string;
    /** @description Preço do produto */
    price: string;
    /** @description ID do produto */
    productID: string;
}

export interface Props {
    /**
    * @description Informaçoes do produto.
    */
    product?: Product;
    /**
    * @description Descricão do produto
    */
    /** @format textarea */
    adDescription?: string;

    /**
     * * @description Layout na vertical
    */
    vertical?: boolean;

    /**
    * * @description Zoom na imagem
   */
    animateImage?: boolean;
}

export default function ProductAd(props: Props) {
    const { product, adDescription, vertical, animateImage } = { ...props };

    const id = useId();

    return (
        <div id={id} class={`relative mx-auto flex flex-col ${vertical ? "md:flex-col max-w-[310px]" : "md:flex-row"} justify-between items-center border rounded p-2 bg-[#f5f5f5] w-full md:w-fit`}>
            <div class="overflow-hidden">
                <Image class={`rounded ${animateImage ? "hover:scale-[1.2] transition-[0.5s]" : ""}`} src={product?.image!} alt="produto" width={300} height={350} />
            </div>
            <div class="flex flex-col p-4">
                <div class="mb-2">
                    <h2 class="font-medium text-lg mb-2">{product?.title}</h2>
                    <p><small>{adDescription ?? product?.description}</small></p>
                    <Save productID={product?.productID} title={product?.title} image={product?.image} />
                </div>
                <div class="flex flex-col">
                    <div class="text-xl w-full  justify-center md:flex justify-end"><b>{product?.price}</b></div>
                    <div class={`flex flex-col justify-end gap-4 mt-2 ${vertical ? "md:flex-col" : "md:flex-row"}`}>
                        <a class="btn btn-accent btn-outline" href="#">Mais Detalhes</a>
                        <button class="btn btn-secondary text-white">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ErrorFallback({ error }: { error?: Error }) {
    return (
        <>
            <p>Erro: {error?.message} :/ </p>
            <div class="flex flex-col rounded p-2 bg-[#f5f5f5] w-full md:w-[400px] p-3 my-6">
                <img width={400} height={400} src="https://chegoudeminas.com.br/wp-content/uploads/2024/01/majestic-doce-de-leite-700x700.jpg" alt="produto" />
                <p>Doce de leite</p>
                <p><small>O Doce de Leite Majestic é um dos doces de leite mais tradicionais de Minas Gerais. Produzido na cidade de Alfenas há mais de 40 anos. O diferencial do doce Majestic é a sua cor clarinha e sua textura leve e cremosa.</small></p>
                <a class="btn" href="/culturas">Saber mais</a>
            </div>
        </>
    )
}


export function LoadingFallback() {
    return <ProductAd product={{ image: "https://placehold.co/300x300", title: "loading...", description: "loading...", price: "Loading", productID:"1" }} adDescription="loading..." />
}

