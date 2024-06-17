export interface Props {
  productId: string;
}

export interface ProductReviews {
  product: number;
  reviews: string[];
}

const reviewsByProduct = async (
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<ProductReviews> => {
  const response: ProductReviews = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": "storefronttreinamento",
      },
    },
  ).then((res) => res.json());

  const mapReviews = response.reviews.filter((review) => {
    return review.length >= 5;
  });

  return {
    product: response.product,
    reviews: mapReviews,
  };
};

export default reviewsByProduct;
