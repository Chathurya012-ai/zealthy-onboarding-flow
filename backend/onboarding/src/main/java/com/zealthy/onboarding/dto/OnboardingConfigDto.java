package com.zealthy.onboarding.dto;

public class OnboardingConfigDto {
    private Object page2Components;
    private Object page3Components;

    // ✅ Getters
    public Object getPage2Components() {
        return page2Components;
    }

    public Object getPage3Components() {
        return page3Components;
    }

    // ✅ Setters (required for Spring to bind JSON)
    public void setPage2Components(Object page2Components) {
        this.page2Components = page2Components;
    }

    public void setPage3Components(Object page3Components) {
        this.page3Components = page3Components;
    }
}
