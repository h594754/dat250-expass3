package no.hvl.dat250.expass1.components;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import no.hvl.dat250.expass1.domains.Polls;

import java.time.Instant;
import java.util.*;

@Component
public class PollManager {
    private final HashMap<String, Polls.User> users = new HashMap<>();
    private final HashMap<String, Polls.Poll> polls = new HashMap<>();
    private int voteOptionCounter = 0;


    @PostConstruct
    public void initUsersAndPolls() {
        // Create sample votes
        Polls.Vote vote1 = new Polls.Vote();
        vote1.setVoteId(UUID.randomUUID().toString());
        vote1.setPublishedAt(Instant.now());
        vote1.setOptionId("option1");

        Polls.Vote vote2 = new Polls.Vote();
        vote2.setVoteId(UUID.randomUUID().toString());
        vote2.setPublishedAt(Instant.now());
        vote2.setOptionId("option2");

        // Create users with initial votes
        List<Polls.Vote> votesForUser1 = new ArrayList<>();
        votesForUser1.add(vote1);

        List<Polls.Vote> votesForUser2 = new ArrayList<>();
        votesForUser2.add(vote2);

        Polls.User user1 = new Polls.User("john_doe", "john.doe@example.com", votesForUser1);
        Polls.User user2 = new Polls.User("jane_smith", "jane.smith@example.com", votesForUser2);
        Polls.User user3 = new Polls.User("alice_jones", "alice.jones@example.com", new ArrayList<>()); // No initial votes for this user

        // Add users to the map
        users.put(user1.getUsername(), user1);
        users.put(user2.getUsername(), user2);
        users.put(user3.getUsername(), user3);

        // Create sample vote options
        Polls.VoteOption option1 = new Polls.VoteOption();
        option1.setOptionId(UUID.randomUUID().toString());
        option1.setCaption("Red");
        option1.setPresentationOrder(1);

        Polls.VoteOption option2 = new Polls.VoteOption();
        option2.setOptionId(UUID.randomUUID().toString());
        option2.setCaption("Blue");
        option2.setPresentationOrder(2);

        Polls.VoteOption option3 = new Polls.VoteOption();
        option3.setOptionId(UUID.randomUUID().toString());
        option3.setCaption("Green");
        option3.setPresentationOrder(3);

        // Create sample polls
        Polls.Poll poll1 = new Polls.Poll();
        poll1.setId(UUID.randomUUID().toString());
        poll1.setQuestion("What is your favorite color?");
        poll1.setPublishedAt(Instant.now());
        poll1.setValidUntil(Instant.now().plusSeconds(3600)); // Valid for 1 hour
        poll1.setCreator(user1.getUsername()); // Created by user1
        poll1.setVoteOptions(List.of(option1, option2, option3)); // Add vote options to the poll


        // Add polls to the map
        polls.put(poll1.getId(), poll1);

        System.out.println("Sample data added");
    }

    public void addUser(Polls.User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        if(!usernameEmailAlreadyExists(user.getUsername(), user.getEmail())) {
            System.out.println("Add user: " + user.getUsername() + "," + user.getEmail());
            users.put(user.getUsername(), user);
        }

    }

    public Polls.User getUserByUsername(String username)
    {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null");
        }
        System.out.println("Get user " + username + "users " + users);

        return users.get(username);
    }

    public boolean usernameEmailAlreadyExists(String username, String email) {
        Polls.User user = users.get(username);

        // If username already exists but email does not match, return false
        if(user != null && !user.getEmail().equals(email)) {
            return true;
        }

        // Check if email already exists with a different username
        for (Polls.User existingUser : users.values()) {
            if (existingUser.getEmail().equals(email) && !existingUser.getUsername().equals(username)) {
                return true; // Email exists but username is different
            }
        }

        if (user == null && users.values().stream().noneMatch(u -> u.getEmail().equals(email))) {
            return false; // Both username and email can be used
        }



        return false;
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

        user.addVote(vote);

        System.out.println("Vote added to user and votes");

    }


}
