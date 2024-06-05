import Image from "apps/website/components/Image.tsx";
import Modal from "../components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
    productID: string;
    title: string;
    image: string;
}

export default function AddComments({ productID, title, image }: Props) {
    const open = useSignal(false);
    const publish = () => {
        console.log('publicado', productID);
    }
    return (
        <div id={productID}>
            <button class="bg-accent text-white block w-fit p-1.5 rounded-[50%] absolute right-5 top-5" onClick={() => open.value = true} >save new</button>
            <Modal
                loading="lazy"
                open={open.value}
                onClose={() => open.value = false}
            >
                <div class="flex justify-between max-md:flex-col items-center rounded p-8 bg-white md:w-[900px] mx-auto my-8">
                    <Image
                        src={image}
                        alt={""}
                        width={300}
                        height={300}
                        class="h-full w-auto max-w-[300px]"
                    />
                    <div class="w-full md:w-[500px] flex flex-col gap-4">
                        <h3 class="font-medium text-lg">{title}</h3>
                        <p>Observações:</p>
                        <textarea class="border h-[145px]" name="" id=""></textarea>
                        <div class="flex items-center justify-end">
                            <button onClick={() => open.value = false} class="btn btn-accent btn-outline mr-5">Cancelar</button>
                            <button onClick={() => publish()} class="btn btn-secondary text-white">Publicar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
