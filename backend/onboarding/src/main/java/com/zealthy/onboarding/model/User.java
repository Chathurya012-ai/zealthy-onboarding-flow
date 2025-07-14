package com.zealthy.onboarding.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String aboutMe;
    private String street;
    private String city;
    private String state;
    private String zip;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    @JsonProperty("address")
    public String getAddress() {
        return String.format("%s, %s, %s %s",
                street == null ? "" : street,
                city   == null ? "" : city,
                state  == null ? "" : state,
                zip    == null ? "" : zip
        ).trim().replaceAll(" ,", ",");
    }
}
