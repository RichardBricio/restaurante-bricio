package com.restaurante.bricio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class ImagemService {

    @Value("${unsplash.access.key}")
    private String unsplashKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String buscarImagemProduto(String nome, String categoria) {
        String termoBusca = nome + " " + categoria + " comida";
        String url = String.format(
                "https://api.unsplash.com/search/photos?query=%s&per_page=1&client_id=%s",
                termoBusca, unsplashKey
        );

        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response != null && response.has("results") && response.get("results").size() > 0) {
                return response.get("results").get(0).get("urls").get("regular").asText();
            }
        } catch (Exception e) {
            System.err.println("Erro ao buscar imagem: " + e.getMessage());
        }

        // Fallback por categoria
        return switch (categoria) {
            case "Bebidas" -> "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600";
            case "Pizzas" -> "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600";
            case "Sobremesas" -> "https://images.unsplash.com/photo-1481391032059-5b41e7c6f5aa?w=600";
            default -> "https://placehold.co/600x400/png?text=🍕";
        };
    }
}