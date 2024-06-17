export interface ReviewTotal {
  total: number;
}

const reviewsAll = async (
  _props: unknown,
  _req: Request,
  _ctx: unknown,
): Promise<ReviewTotal> => {
  const response = await fetch(`https://camp-api.deco.cx/events`, {
    headers: {
      "x-api-key": "storefronttreinamento",
    },
  })
    .then((res) => res.json());

  return {
    total: response.total,
  };
};

export default reviewsAll;
