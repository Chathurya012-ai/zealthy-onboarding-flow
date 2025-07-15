package com.zealthy.onboarding.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "onboarding_config")
public class OnboardingConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "page2_components", joinColumns = @JoinColumn(name = "config_id"))
    @Column(name = "component")
    private List<String> page2Components;

    @ElementCollection
    @CollectionTable(name = "page3_components", joinColumns = @JoinColumn(name = "config_id"))
    @Column(name = "component")
    private List<String> page3Components;
}
