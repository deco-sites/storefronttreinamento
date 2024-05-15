interface Props {
  /**
  * @description The code of coupon.
  */
  code?: string;
  /**
  * @description The description of coupon.
  */
  description?: string;
}

export default function Section({ code, description }: Props) {
  return (
    <div>
      <p>Código do cupom: {code}</p>
      <p>benefícios do Cupom: {description}</p>
    </div>
  )
}