package no.hvl.dat250.expass1.controllers;

import no.hvl.dat250.expass1.components.PollManager;
import no.hvl.dat250.expass1.domains.Polls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
public class PollsController {
    @Autowired
    private PollManager pollManager;

    // In the url it needs to be put ?username="username" to choose the user that creates the poll.
    @PostMapping("/createPoll")
    public void createPoll(@RequestParam String username, @RequestBody Polls.Poll poll) {
        pollManager.createPoll(poll, username);
    }

    @GetMapping("/listPolls")
    public List<Polls.Poll> listAllPolls() {
        return pollManager.getAllPolls();
    }

    @PostMapping("/votePoll/{pollId}/vote")
    public ResponseEntity<String> addVoteToPoll(@RequestParam String username, @PathVariable String pollId, @RequestParam String voteOptionId) {

        try {
            pollManager.addVoteToPoll(username, pollId, voteOptionId);
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Vote added to the poll");

    }



}
