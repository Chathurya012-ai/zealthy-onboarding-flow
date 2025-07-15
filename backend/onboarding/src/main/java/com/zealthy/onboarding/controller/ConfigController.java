
package com.zealthy.onboarding.controller;

import com.zealthy.onboarding.dto.OnboardingConfigDto;
import com.zealthy.onboarding.model.OnboardingConfig;
import com.zealthy.onboarding.repository.OnboardingConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/config")
@RequiredArgsConstructor
public class ConfigController {

    private final OnboardingConfigRepository repo;

    @GetMapping
    public ResponseEntity<OnboardingConfigDto> getConfig() {
        OnboardingConfig cfg = repo.findById(1L)
                .orElseGet(() -> repo.save(
                        new OnboardingConfig(
                                1L,
                                List.of("aboutMe","birthdate"),
                                List.of("address")
                        )
                ));

        OnboardingConfigDto dto = OnboardingConfigDto.builder()
                .page2Components(cfg.getPage2Components())
                .page3Components(cfg.getPage3Components())
                .build();

        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<OnboardingConfigDto> saveConfig(
            @RequestBody OnboardingConfigDto dto) {
        OnboardingConfig cfg = new OnboardingConfig(
                1L,
                dto.getPage2Components(),
                dto.getPage3Components()
        );
        repo.save(cfg);
        return ResponseEntity.ok(dto);
    }
}
