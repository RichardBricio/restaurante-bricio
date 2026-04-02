package com.restaurante.bricio.service;

import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.resources.payment.Payment;
import org.springframework.stereotype.Service;

@Service
public class PagamentoPixService {

    public Payment criarPagamentoPix(Double valor, String emailCliente, String descricao) {
        try {
            PaymentClient client = new PaymentClient();

            PaymentCreateRequest request = PaymentCreateRequest.builder()
                    .transactionAmount(valor)
                    .description(descricao)
                    .paymentMethodId("pix")
                    .payer(PaymentPayerRequest.builder()
                            .email(emailCliente)
                            .build())
                    .build();

            Payment payment = client.create(request);
            return payment;

        } catch (MPApiException e) {
            System.err.println("Erro ao criar pagamento PIX: " + e.getMessage());
            return null;
        }
    }
}