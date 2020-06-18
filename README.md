# Poll App. Hatchways Co-op Project.

## Background and Overview

This app allows users to upload polls with two photos, and ask friends from friend lists, or the general public to vote on their polls.

---

## Setup

1. `cd` to `./server`
   1. Make sure MongoDB is setup and running on your localhost on port 27017. The app will connect to "poll" database on your local mongo connection.
   2. `yarn install`
   3. `yarn dev`

In a new terminal tab:

2. `cd` to `./client`

   1. `yarn install`
   2. `yarn start`

3. [optional] if you want to test out uplodaing photos, go to .env file and enter the following credentials with keys:

```
AWS_SECRET_ACCESS_KEY = ""
AWS_ACCESS_KEY_ID = ""
```

---

## Technology

### Stack

- Database
  - MongoDB
- Backend
  - Express, Mongoose
- Frontend
  - React (hooks), Material UI

### Noticeable Dependencies

Backend:

- `socket.io`
  - For establishing web socket connections to update active/inactive user status
- `aws-sdk`, `multer`, `multer-s3`
  - For parsing uploaded images and sending them AWS S3
- `chai`, `mocha`, `mongodb-memory-server`
  - For integration testing

Frontend:

- `socket.io-client`
- `@material-ui/core`, `@material-ui/icons`, `@material-ui/tabs`
- `react-dropzone`

---

## API Endpoints

Checkout the [dev README](./dev.README.md) for details about API endpoints.

---

## App Images

![Register page](readme_assets/images/register.png)
![Home page](readme_assets/images/home_page.png)

<img src="readme_assets/images/friend_list_create.png" alt="Friend list create modal" width="400"/>
<br/>
<img src="readme_assets/images/followers.png" alt="Friends page. Followers tab." width="500"/>
<br/>
<img src="readme_assets/images/poll_update.png" alt="Poll update modal" width="400"/>
<br/>
<img src="readme_assets/images/poll_update_with_dropdown.png" alt="Poll update modal with dropdown" width="400"/>
<br/>
<img src="readme_assets/images/profile_image_update.png" alt="Profile image update modal" width="500"/>
<br/>

![Home page](readme_assets/images/polls_page.png)

---

## Noticeable Features

### Feature Overview

- Web sockets
- Mobile responsiveness
- Integration tests
- React context

### Feature visuals

- #### Web sockets
  App shows live indicators when users are logged in:

![active user demo GIF](readme_assets/GIFS/web_socket_demo.gif)

`server/bin/www`:

```JavaScript
io.on('connection', (socket) => {
  console.log('connection');

  socket.on('userActive', () => {
    socket.emit('makeActive');
    io.emit('friendsUpdate');
  });

  socket.on('userLogout', () => {
    io.emit('friendsUpdate');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
```

- #### Mobile responsiveness

<img src="readme_assets/GIFS/mobile_navigation_demo.gif" alt="App on mobile navigation GIF" width="300"/>
<br/>
<img src="readme_assets/GIFS/mobile_horizontal_scroll_demo.gif" alt="App on mobile horizontal scroll GIF" width="300"/>
<br/>
<img src="readme_assets/GIFS/mobile_modal_demo.gif" alt="App on mobile navigation GIF" width="300"/>
<br/>

- #### Integration tests

  ![Integration tests spec run GIF](readme_assets/GIFS/spec_run.gif)

- #### React Context
  `client/src/components/contexts/PollContext.js`:

```JavaScript
import React from 'react';

// This is what each component should import
export const PollContext = React.createContext();

// This should be imported only by index.js
export const PollContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    poll: {},
    votes: [],
  });

  function setPollState(newState) {
    setState((prevState) => {
      return { ...prevState, ...newState };
    });
  }

  return (
    <PollContext.Provider
      value={{
        ...state,
        setPollState,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

```

---

## Contributors

[Dhruv Arora](https://github.com/dotslash227), [Thiago Nemecek](https://github.com/tgnemecek), [Abdulhakeem Almidan](https://github.com/Hakeemmidan)
