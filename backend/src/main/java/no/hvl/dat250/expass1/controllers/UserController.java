package no.hvl.dat250.expass1.controllers;

import no.hvl.dat250.expass1.components.PollManager;
import no.hvl.dat250.expass1.domains.Polls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class UserController {
    @Autowired
    private PollManager pollManager;

    @GetMapping("/listUsers")
    public Collection<Polls.User> listUsers() {
        return pollManager.getAllUsers();
    }
    @PostMapping("/users")
    public void createUser(@RequestBody Polls.User user) {
        pollManager.addUser(user);
    }

}