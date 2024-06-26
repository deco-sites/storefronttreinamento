import Image from "apps/website/components/Image.tsx";
import Modal from "../components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";

import { invoke } from "../runtime.ts";
import { sendEvent } from "../sdk/analytics.tsx";
import { useRef } from 'preact/hooks'

import Toastify from "toastify-js";

export interface Props {
    productID: string;
    title: string;
    image: string;
}

export default function AddComments({ productID, title, image }: Props) {
    const open = useSignal(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const publish = async () => {
        if (textAreaRef.current?.value) {
            await invoke.site.actions.reviews.addReviews({
                productId: productID,
                comment: textAreaRef.current?.value
            })

          
            sendEvent<any>({
                name: "post_score",
                params: {
                    score: 1,
                    level: 1,
                    character: "user",
                },
            });

            Toastify({
                text: "Review enviado :)",
                duration: 1000,
                position: "center",
                gravity: "bottom",
                style: {
                    background: "#96c93d",
                    zIndex: "9999",
                    position: "fixed",
                    bottom: "10%",
                    left: "45%",
                    padding: "15px"
                },
            }).showToast();
        }
    }

    return (
        <div id={productID}>
            <button class="bg-accent text-secondary block w-fit p-1.5 rounded-[15%] absolute right-5 top-5" onClick={() => open.value = true} >save</button>
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
                        <textarea ref={textAreaRef} class="border h-[145px] p-4"></textarea>
                        <div class="flex items-center justify-end">
                            <button onClick={() => open.value = false} class="btn btn-accent btn-outline hover:text-white mr-5">Cancelar</button>
                            <button onClick={publish} class="btn btn-secondary text-white">Publicar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
