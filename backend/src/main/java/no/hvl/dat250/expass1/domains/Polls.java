package no.hvl.dat250.expass1.domains;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class Polls {

    public static class User {
        @JsonProperty
        private String username;
        @JsonProperty
        private String email;

        private List<Vote> votes;

        public User() {}

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public List<Vote> getVotes() {
            return votes;
        }

        public void setVotes(List<Vote> votes) {
            this.votes = votes;
        }

        @Override
        public String toString() {
            return "User{" +
                    "username='" + username + '\'' +
                    ", email='" + email + '\'' +
                    '}';
        }

    }

    public static class Poll {
        private String id;
        private String question;
        private Instant publishedAt;
        private Instant validUntil;
        private List<Vote> votes = new ArrayList<>();  // Initialize the list
        private List<VoteOption> voteOptions = new ArrayList<>();

        private String creator;

        public Poll() {}

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public Instant getPublishedAt() {
            return publishedAt;
        }

        public void setPublishedAt(Instant publishedAt) {
            this.publishedAt = publishedAt;
        }

        public Instant getValidUntil() {
            return validUntil;
        }

        public void setValidUntil(Instant validUntil) {
            this.validUntil = validUntil;
        }

        public List<VoteOption> getVoteOptions() {
            return voteOptions;
        }

        public void setVoteOptions(List<VoteOption> voteOptions) {
            this.voteOptions = voteOptions;
        }

        public String getCreator() {
            return creator;
        }

        public void setCreator(String creator) {
            this.creator = creator;
        }

        public List<Vote> getVotes() {
            return votes;
        }

        public void setVotes(List<Vote> votes) {
            this.votes = votes;
        }
    }

    public static class Vote {
        private String voteId;
        private Instant publishedAt;
        private User voter;
        private String optionId;

        public Vote() {}

        public Instant getPublishedAt() {
            return publishedAt;
        }

        public void setPublishedAt(Instant publishedAt) {
            this.publishedAt = publishedAt;
        }

        public User getVoter() {
            return voter;
        }

        public void setVoter(User voter) {
            this.voter = voter;
        }

        public String getOptionId() {
            return optionId;
        }

        public void setOptionId(String optionId) {
            this.optionId = optionId;
        }

        public String getVoteId() {
            return voteId;
        }

        public void setVoteId(String voteId) {
            this.voteId = voteId;
        }
    }

    public static class VoteOption {
        private String optionId;
        private String caption;
        private int presentationOrder;
        private Poll poll;

        private List<Vote> votes = new ArrayList<>();

        public VoteOption() {}

        public String getOptionId() {
            return optionId;
        }

        public void setOptionId(String optionId) {
            this.optionId = optionId;
        }

        public String getCaption() {
            return caption;
        }

        public void setCaption(String caption) {
            this.caption = caption;
        }

        public int getPresentationOrder() {
            return presentationOrder;
        }

        public void setPresentationOrder(int presentationOrder) {
            this.presentationOrder = presentationOrder;
        }

        public Poll getPoll() {
            return poll;
        }

        public void setPoll(Poll poll) {
            this.poll = poll;
        }

        public List<Vote> getVotes() {
            return votes;
        }

        public void setVotes(List<Vote> votes) {
            this.votes = votes;
        }
    }

}
