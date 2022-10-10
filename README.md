# Stack Spill

The Stack Spill is a web application designed to replicate some functionalities found in [StackOverflow](https://stackoverflow.com/).

With Stack Spill, you can sign-up, login, or sign in as a guest to try out all the features. Once inside, you'll be able to ask Questions and submit Answers to Questions submitted by other users. Be curious and share your knowledge!

Checkout the website!

### Locally
- Create an .env file and generate values for each of the following:
    - PORT
    - DB_FILE
    - JWT_SECRET
    - JWT_EXPIRES_IN
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY

### Live Site [Stack Spill](https://stack-spill.herokuapp.com/)


# Tech

Great achievements take time and a strong foundation to construct an operating website. Here are the programs used:

- JavaScript
- CSS
- SQLite3
- Sequelize
- Express
- bcrypt.js
- CSRF.js
- React-Redux
- Heroku: Postgres
- AWS S3

## **Snapshots**
## Home Page
<img width="800" alt="login" src="./images/Home_Page.png">

## Question Page
<img width="800" alt="feed" src="./images/Question_Page.png">

## Profile
<img width="800" alt="profile" src="./images/User_Profile.png">

# Features

Here are the things you can do:

- Questions
   - Ask Questions
   - Update your Question's Title and Body
   - Delete your Question
   - Sort through Questions by most recent or by alphabetical order

- Answers
   - Answer existing Questions
   - Update your existing Answer
   - Delete your Answer

- Votes
   - Create an UpVote/DownVote on existing Questions
   - Edit your UpVote/DownVote on existing Questions
   - Delete your UpVote/DownVote on existing Questions
   - Create an UpVote/DownVote on existing Answers
   - Edit your UpVote/DownVote on existing Answers
   - Delete your UpVote/DownVote on existing Answers

- Users
   - Sign Up, Login, and Demo User
   - View a User's profile
   - View the Questions a User asked
   - View the Questions a User answered

- Search
   - Look up Questions and Users to interact with other users and their Questions
      - The search bar begins to render results that match the key pressed


# Behind The Scenes
The backend does a lot of the heavy lifting to provide the desired outcome.
In the example shown below, in order to edit a vote the signed in user owns on a question, the route undergoes a verification process. First, the backend makes sure a signed in user is present, next it finds the question in mind, continuing with searching for vote that belongs to the user, followed by more steps: checks that the question exists, checks that the vote exists, and finally, creates the desired output for the update. All while establishing error messages if any of those verifications fail. Ultimately solidifying a well crafted solution for the desired route.

```
router.put("/:questionId/votes", requireAuth, validateVote, async (req, res) => {
    const { user } = req;
    const { questionId } = req.params;
    const { vote } = req.body;
    const question = await Question.findByPk(questionId);
    const currentVote = await Vote.findOne({
      where: { userId: user.id, questionId },
    });

    if (question) {
      if (currentVote) {
        await currentVote.update({
          vote,
        });
        res.json(currentVote);
      } else {
        const error = new Error("Vote not found");
        error.status = 404;
        throw error;
      }
    } else {
      const error = new Error("Question not found");
      error.status = 404;
      throw error;
    }
  }
);
```

# Future Features

There will be more, but let's have fun with what we have for now!
- [ ] Live Chat
- [ ] Text Editor
- [ ] Post comments on Answers
- [ ] Sort User Questions and User Answers
- [ ] Sort results by higher Vote count
- [ ] Bookmark Questions
- [ ] Tags
- [ ] Visible Text Count when submitting Questions and Answers
