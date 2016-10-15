package com.epam.k.domain;

import com.epam.k.domain.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.EnumSet;

public class Principal implements UserDetails {

    private String username;
    private String passwordHash;
    private EnumSet<Role> authorities;

    @Override
    @JsonIgnore
    public EnumSet<Role> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(EnumSet<Role> authorities) {
        this.authorities = authorities;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return passwordHash;
    }

    public void setPassword(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
