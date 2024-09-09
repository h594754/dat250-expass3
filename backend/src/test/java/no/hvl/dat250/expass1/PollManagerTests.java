package no.hvl.dat250.expass1;

import no.hvl.dat250.expass1.components.PollManager;
import no.hvl.dat250.expass1.domains.Polls;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class  PollManagerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PollManager pollManager;

    //This is automatic, because of the mockMvc annotations.
    @Test
    public void testCreateNewUser() throws Exception {
        String userInfoJson = "{ \"username\": \"tester\", \"email\": \"tester@example.com\"}";

        MvcResult result = mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userInfoJson))
                .andExpect(status().isOk())
                .andReturn();

        Polls.User user = pollManager.getUserByUsername("tester");
        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("tester");
        assertThat(user.getEmail()).isEqualTo("tester@example.com");
    }

    @Test
    public void testCreateNewPoll() throws Exception {
        // First create a user
        testCreateNewUser();

        String inputJson = "{"
                + "\"question\": \"What's your favorite programming test framework?\","
                + "\"validUntil\": \"2024-12-31T23:59:59Z\","
                + "\"voteOptions\": ["
                + "  { \"caption\": \"JUnit\", \"presentationOrder\": 1 },"
                + "  { \"caption\": \"TestNG\", \"presentationOrder\": 2 }"
                + "]"
                + "}";

        MvcResult result = mockMvc.perform(post("/createPoll?username=tester")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson))
                .andExpect(status().isOk())
                .andReturn();

        Polls.Poll poll = pollManager.getAllPolls().getFirst();
        assertThat(poll).isNotNull();
        assertThat(poll.getQuestion()).isEqualTo("What's your favorite programming test framework?");
        assertThat(poll.getVoteOptions().size()).isEqualTo(2);
        assertThat(poll.getVoteOptions().get(0).getCaption()).isEqualTo("JUnit");
        assertThat(poll.getVoteOptions().get(1).getCaption()).isEqualTo("TestNG");
    }

    @Test
    public void testAddVoteToPoll() throws Exception {
        testCreateNewPoll();

        Polls.Poll poll = pollManager.getAllPolls().getFirst();

        // Cast a vote
        mockMvc.perform(post("/votePoll/{pollId}/vote?username=tester&voteOptionId=1", poll.getId()))
                .andExpect(status().isOk())
                .andReturn();

        assertThat(poll.getVotes().size()).isEqualTo(1);
        Polls.Vote vote = poll.getVotes().get(0);
        Polls.User user = pollManager.getUserByUsername("tester");

        assertThat(vote.getVoter()).isEqualTo(user);
        assertThat(vote.getOptionId()).isEqualTo("1");
    }


}
