package com.restaurante.bricio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private Double preco;

    private Boolean temEstoque = true;
    private Integer quantidade;

    @Column(length = 1000)
    private String imagemUrl;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
}