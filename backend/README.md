# dat250-expass2

### Endpoints
Can also be found in http://127.0.0.1:8080/swagger-ui/index.html
#### In user controller
##### to list users
- "/listUsers"

##### to create user
- "/users"

#### In poll controller
##### to create a poll
- "/createPoll"

##### to list all polls
- "/listPolls"

##### to vote on a poll
- "/votePoll/{pollId}/vote"

### Issues
- Had some issues with the tests, because I used a beforeEach tag and reinitializing the PollManager for each run. <br />
- Also had some issues during the creation of votes on how to structure it too work, solved by creating a list of votes in the poll itself. 
- Issue with the swagger ui, worked after a update of gradle and restart of IDE.