package com.zealthy.onboarding.controller;
import com.zealthy.onboarding.dto.OnboardingConfigDto;


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

    /* ---------- GET /api/config ---------- */
    @GetMapping
    public OnboardingConfig getConfig() {
        return configRepository.findById(1L)
                .orElseGet(() -> {
                    OnboardingConfig def = new OnboardingConfig(
                            1L,
                            List.of("aboutMe", "birthdate"),  // page2Components
                            List.of("address")               // page3Components
                    );
                    return configRepository.save(def);
                });
    }

    /* ---------- POST /api/config ---------- */
    @PostMapping
    public ResponseEntity<OnboardingConfig> saveConfig(@RequestBody OnboardingConfigDto dto) {
        System.out.println("👉 Received POST /api/config");
        System.out.println("page2: " + dto.getPage2Components());
        System.out.println("page3: " + dto.getPage3Components());

        OnboardingConfig cfg = new OnboardingConfig();
        cfg.setId(1L);  // ensure it's a single-row config
        cfg.setPage2Components(normalise(dto.getPage2Components()));
        cfg.setPage3Components(normalise(dto.getPage3Components()));

        OnboardingConfig saved = configRepository.save(cfg);
        System.out.println("✅ Config saved successfully");

        return ResponseEntity.ok(saved);
    }

    /* ---------- Helper: Normalize input to List<String> ---------- */
    private List<String> normalise(Object o) {
        if (o == null) return List.of();
        if (o instanceof List<?> list) {
            return list.stream().map(String::valueOf).toList();
        }
        return Arrays.stream(String.valueOf(o).split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();
    }

}
