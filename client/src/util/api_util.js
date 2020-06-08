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

export function getPoll(pollId, callback) {
  return fetch(`/polls/${pollId}`, {
    method: 'GET',
  }).then((res) => {
    return res.json().then((data) => {
      if (res.status === 200) {
        return data;
      } else {
        return callback(res);
      }
    });
  });
}
