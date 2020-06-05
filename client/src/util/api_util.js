export function getFriendsPolls(callback) {
  fetch('/polls', {
    method: 'GET',
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
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
