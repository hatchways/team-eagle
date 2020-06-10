// Polls
export function getFriendsPolls(callback) {
  fetch('/polls/friends', {
    method: 'GET',
  }).then((res) => {
    res.json().then((data) => {
      if (callback) {
        if (res.status === 200) {
          callback(null, data);
        } else {
          callback(res);
        }
      }
    });
  });
}

export function getUserPolls() {
  return fetch('/polls', {
    method: 'GET',
  }).then((res) => res.json());
}

export function getPoll(pollId, callback) {
  fetch(`/polls/${pollId}`, {
    method: 'GET',
  }).then((res) => {
    res.json().then((data) => {
      if (callback) {
        if (res.status === 200) {
          callback(null, data);
        } else {
          callback(data.message);
        }
      }
    });
  });
}

// Friends Lists

export function getFriendLists() {
  return fetch('/friendLists', {
    method: 'GET',
  }).then((res) => res.json());
}

export function postFriendList(body) {
  return fetch('/friendLists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function putFriendList(body) {
  return fetch('/friendLists', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function deleteFriendList(_id) {
  return fetch(`/friendLists/${_id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
}
