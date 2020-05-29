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
