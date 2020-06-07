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

export function getFriendLists() {
  return fetch('/friendLists', {
    method: 'GET',
  }).then((res) => res.json());
}
