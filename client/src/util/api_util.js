// Polls
export function getFriendsPolls(callback) {
  fetch('/polls', {
    method: 'GET',
  }).then((res) => {
    res.json().then((data) => {
      if (callback) {
        if (res.status === 200) {
          callback(null, data.polls);
        } else {
          callback(res);
        }
      }
    });
  });
}

export async function getUserPolls() {
  const response = await fetch('/polls', { method: 'GET' });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.error);
  }
  return body;
}

export async function deleteUserPoll(_id) {
  const response = await fetch(`/polls/${_id}`, { method: 'DELETE' });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.error);
  }
  return body;
}

export async function putUserPoll(data) {
  const response = await fetch('/polls', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.error);
  }
  return body;
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
