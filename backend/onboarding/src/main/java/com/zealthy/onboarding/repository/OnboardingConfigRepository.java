package com.zealthy.onboarding.repository;

import com.zealthy.onboarding.model.OnboardingConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnboardingConfigRepository
        extends JpaRepository<OnboardingConfig, Long> { }
