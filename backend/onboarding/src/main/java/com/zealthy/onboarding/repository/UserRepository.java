package com.zealthy.onboarding.repository;

import com.zealthy.onboarding.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
