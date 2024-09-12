# dat250-expass3

### Installations

- React Router Dom
  So that I can show new pages to the user when the user does an action.
- @mui/material / Material UI, to use prestyled components to not have to deal with CSS for this project.

### Issues
- Had some issues with serializing when I tried to vote on a poll. Due to cyclic reference issues. But added the tags @JsonManagedReference and @JsonBackReference to User and Vote class.  

NB: You will have to run npm install when cloning the project because the node_modules are hidden in the gitignore. 