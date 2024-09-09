package no.hvl.dat250.expass1.components;

import org.springframework.stereotype.Component;
import no.hvl.dat250.expass1.domains.Polls;

import java.time.Instant;
import java.util.*;

@Component
public class PollManager {
    private final HashMap<String, Polls.User> users = new HashMap<>();
    private final HashMap<String, Polls.Poll> polls = new HashMap<>();
    private int voteOptionCounter = 0;


    public void addUser(Polls.User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        System.out.println("Add user: " + user.getUsername() + "," + user.getEmail());
        users.put(user.getUsername(), user);
    }

    public Polls.User getUserByUsername(String username)
    {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null");
        }
        System.out.println("Get user " + username + "users " + users);

        return users.get(username);
    }

    public Collection<Polls.User> getAllUsers() {
        return users.values();
    }

    public void createPoll(Polls.Poll poll, String username) {
        Polls.User user = getUserByUsername(username);

        if(user == null) {
            throw new IllegalArgumentException("No user found");
        }

        poll.setId(UUID.randomUUID().toString());
        poll.setPublishedAt(Instant.now());
        poll.setCreator(user.getUsername());

        poll.getVoteOptions().forEach(option -> {
            option.setOptionId(String.valueOf(voteOptionCounter++));
        });
        // Add the poll to the hashmap
        polls.put(poll.getId(), poll);
        System.out.println("Poll created: " + poll + " by user: " + user.getUsername());
    }

    public List<Polls.Poll> getAllPolls() {
        return new ArrayList<>(polls.values());
    }

    public Polls.Poll getPollById(String pollId) {
        return polls.get(pollId);
    }

    public void addVoteToPoll(String username, String pollId, String voteOptionId) {
        Polls.Poll poll = polls.get(pollId);
        if (poll == null) {
            throw new IllegalArgumentException("Poll is not found");
        }

        Polls.User user = getUserByUsername(username);
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }

        Polls.Vote vote = new Polls.Vote();
        vote.setVoteId(UUID.randomUUID().toString());
        vote.setVoter(user);
        vote.setOptionId(voteOptionId);
        vote.setPublishedAt(Instant.now());

        if (poll.getVotes() == null) {
            poll.setVotes(new ArrayList<>()); // Initialize if necessary
        }

        poll.getVotes().add(vote);
    }


}
