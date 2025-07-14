package com.zealthy.onboarding.controller;

import com.zealthy.onboarding.model.OnboardingConfig;
import com.zealthy.onboarding.repository.OnboardingConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ConfigController {

    private final OnboardingConfigRepository configRepository;

    /* ---------- read ---------- */
    @GetMapping
    public OnboardingConfig getConfig() {
        return configRepository.findById(1L)
                .orElseGet(() -> {
                    OnboardingConfig def = new OnboardingConfig(
                            1L,
                            List.of("aboutMe", "birthdate"),
                            List.of("address")
                    );
                    return configRepository.save(def);
                });
    }

    /* ---------- create / update ---------- */
    @PostMapping
    public ResponseEntity<OnboardingConfig> saveConfig(@RequestBody OnboardingConfigDto dto) {

        OnboardingConfig cfg = new OnboardingConfig();
        cfg.setId(1L);                       // single-row table
        cfg.setPage1Components(normalise(dto.page1Components()));
        cfg.setPage2Components(normalise(dto.page2Components()));

        return ResponseEntity.ok(configRepository.save(cfg));
    }

    /* ---------- helpers ---------- */
    private List<String> normalise(Object o) {
        // Supports both ["a","b"] and "a,b"
        if (o == null) return List.of();
        if (o instanceof List<?> list) {
            return list.stream().map(String::valueOf).toList();
        }
        return Arrays.stream(String.valueOf(o).split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();
    }

    /* ---------- DTO ---------- */
    private record OnboardingConfigDto(
            Object page1Components,
            Object page2Components
    ) {}
}

