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

    // ✅ GET endpoint
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

    // ✅ POST endpoint
    @PostMapping
    public ResponseEntity<OnboardingConfig> saveConfig(@RequestBody OnboardingConfigDto dto) {
        System.out.println("👉 Received POST /api/config");
        System.out.println("page2: " + dto.getPage2Components());
        System.out.println("page3: " + dto.getPage3Components());

        OnboardingConfig cfg = new OnboardingConfig(
                1L,
                normalise(dto.getPage2Components()),  // ✅ convert Object to List<String>
                normalise(dto.getPage3Components())
        );

        OnboardingConfig saved = configRepository.save(cfg);
        System.out.println("✅ Config saved successfully");

        return ResponseEntity.ok(saved);
    }

    // ✅ Place this method at the bottom of the controller
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
