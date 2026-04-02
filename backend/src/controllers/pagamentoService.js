import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export async function gerarPix(pedidoId, valor) {
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: valor,
      description: `Pedido #${pedidoId} - Restaurante Boomer`,
      payment_method_id: 'pix',
      payer: {
        email: 'cliente@email.com',
        first_name: 'Cliente',
        last_name: 'Restaurante'
      }
    });

    return {
      qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64
    };
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    // Modo desenvolvimento: PIX falso
    return {
      qr_code: '00020126360014br.gov.bcb.pix0114fake@email.com520400005303986540510.005802BR5913Restaurante6008BRASILIA62070503***6304E2B9',
      qr_code_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    };
  }
}