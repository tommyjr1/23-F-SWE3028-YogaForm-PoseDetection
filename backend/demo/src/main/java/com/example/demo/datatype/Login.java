package com.example.demo.datatype;

import lombok.Getter;
import lombok.Setter;

public class Login {
    private  @Getter @Setter String credential;
    private  @Getter @Setter String token;

    
    // private String part;
    // private String check;

    public Login() {

    }

    public Login(final String token) {
        this.token = token;
    }

    
    @Override
    public String toString() {
        return "Login: " +
                token;
    }
}
