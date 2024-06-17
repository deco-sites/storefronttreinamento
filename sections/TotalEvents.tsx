import { ReviewTotal } from "../loaders/reviews/reviewsAll.ts";

export interface Props {
    reviews: ReviewTotal
}

const classes = "flex justify-center flex-col items-center rounded p-8 bg-black text-white md:w-[700px] mx-auto my-8";

export default function TotalEvents({ reviews }: Props) {
    return (
        <div class={classes}>
            Total of saves in Site: {reviews.total}
        </div>
    )
}

export function LoadingFallback() {
    return <div class={classes}>carregando...</div>
}