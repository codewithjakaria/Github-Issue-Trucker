const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    alert('Login Successful');

    window.location.href = 'main.html';
  } else {
    alert('Wrong Username or Password');
  }
});
