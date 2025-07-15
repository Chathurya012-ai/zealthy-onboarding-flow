
package com.zealthy.onboarding.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnboardingConfigDto {
    private List<String> page2Components;
    private List<String> page3Components;
}
