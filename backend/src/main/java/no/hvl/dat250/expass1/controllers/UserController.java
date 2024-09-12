package no.hvl.dat250.expass1.controllers;

import no.hvl.dat250.expass1.components.PollManager;
import no.hvl.dat250.expass1.domains.Polls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    @Autowired
    private PollManager pollManager;

    @GetMapping("/listUsers")
    public Collection<Polls.User> listUsers() {
        return pollManager.getAllUsers();
    }
    @PostMapping("/users")
    public ResponseEntity<String> createUser(@RequestBody Polls.User user) {
        //If email already exist or username does.
        if(pollManager.usernameEmailAlreadyExists(user.getUsername(), user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username or email already exists. Please choose a different one.");
        }


        pollManager.addUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User created successfully");
    }

}