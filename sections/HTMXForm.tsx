import type { SectionProps } from "deco/types.ts";
import { useSection } from "deco/hooks/useSection.ts";


export interface Props {
    /*** @hide */
    reminders?: string[];
}

export const loader = async (
    props: Props,
    req: Request
) => {
    const { reminders = [] } = props

    const type = req.headers.get("content-type")

    if (type !== "application/x-www-form-urlencoded") return props

    const form = await req.formData()

    const reminder = form.get("reminder")?.toString()

    if (reminder) reminders.push(reminder)

    return { reminders }
}

export default function HTMXForm({
    reminders = []
}: SectionProps<typeof loader>) {
    console.log("reminders", reminders);

    return (
        <div class="w-full md:w-[700px] mx-auto my-7">
            <h2>Adicione seus Lembretes:</h2>
            <form
                class="w-full"
                hx-post={useSection({
                    props: {
                        reminders,
                    }
                })}
                hx-swap="outerHTML"
                hx-target="closest section"
                hx-trigger="submit"
            >
                <div class="form-control">
                    <textarea
                        name="reminder"
                        class="p-4 border border-solid border-black my-2 h-30"
                        required
                        placeholder="Digite um lembrete"
                        minLength={5}
                    />
                </div>
                <button
                    class="btn bg-black text-white mt-2"
                    type="submit"
                >
                    <div class="hidden [.htmx-request_&]:inline loading loading-md loading-spinner" />
                    <div class="[.htmx-request_&]:hidden inline">Adicionar</div>
                </button>
            </form>
            <div class="mt-5">
                <h2>Seus Lembretes:</h2>
                <ul class="flex flex-col mt-2 [&>*:nth-child(odd)]:bg-gray-200" id="reminders">
                    {
                        reminders?.map((reminder, index) => (
                            <li class="p-3" key={index}>
                                {reminder}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}