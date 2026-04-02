package com.restaurante.bricio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Role role = Role.CLIENTE;

    private String googleId;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidos;

    public enum Role {
        ADMIN, CLIENTE
    }
}