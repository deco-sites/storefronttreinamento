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

export default function Coupon({ code, description }: Props) {
  return (
    <div class="flex justify-center flex-col items-center p-8 bg-[#f5f5f5]">
      <p>Código do cupom: <b>{code}</b> </p>
      <p>benefícios do Cupom: <b>{description}</b></p>
    </div>
  )
}
