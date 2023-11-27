package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class PageController {
   // RedirectView 
   @RequestMapping("/login-success")
   public RedirectView exRedirect4() {
       RedirectView redirectView = new RedirectView();
       redirectView.setUrl("http://localhost:3000/");
       return redirectView;
   }
}