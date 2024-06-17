import { useState, useEffect } from 'preact/hooks'
import { useSignal } from "@preact/signals"
import { invoke } from "../runtime.ts"

interface ProductReviews {
  product: number
  reviews: string[]
}

const classes = "flex justify-center flex-col items-center rounded p-8 bg-black text-white md:w-[700px] mx-auto my-8";

export default function ShowProductEvents() {
  const [value, setValue] = useState("");
  const totalVotes = useSignal<ProductReviews | null>(null);

  useEffect(() => {
    const interval = setTimeout(async () => {
      if (value) {
        const response: ProductReviews = await invoke.site.loaders.reviews.reviewsByProduct({
          productId: value
        });

        totalVotes.value = response;
      }

    }, 2000);

    return () => {
      clearTimeout(interval);
    }
  }, [value]);

  return (
    <div class={classes}>
      <input
        type="text"
        class="text-black"
        value={value}
        onInput={(e) => setValue(e.target.value)}
      />
      {totalVotes &&
        <>
          <p>
            Product: {value}
          </p>
          {totalVotes.value?.reviews.map(review =>
            <p>{review}</p>
          )}
          <p>
            Total: {totalVotes.value?.product} votes
          </p>
        </>
      }
    </div>
  )
}

export function LoadingFallback() {
  return <div class={classes}>carregando...</div>
}
