// backend/routes/pedidos.js
import mercadopago from 'mercadopago';

mercadopago.configure({ access_token: 'APP_USR-2340588140879621-040114-b213ead52ad6bcb0363d98b7ea33f909-118203676' });

router.post('/criar-pedido', async (req, res) => {
  const { itens, userId } = req.body;
  const total = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  // Cria pedido no banco
  const pedido = await prisma.pedido.create({
    data: { userId, total, status: 'AGUARDANDO_PAGAMENTO' }
  });

  // Gera QR Code PIX via Mercado Pago
  const payment = await mercadopago.payment.create({
    transaction_amount: total,
    description: `Pedido ${pedido.id}`,
    payment_method_id: 'pix',
    payer: { email: 'cliente@email.com' }
  });

  await prisma.pedido.update({
    where: { id: pedido.id },
    data: { pixQrCode: payment.point_of_interaction.transaction_data.qr_code }
  });

  res.json({ qrCode: payment.point_of_interaction.transaction_data.qr_code });
});