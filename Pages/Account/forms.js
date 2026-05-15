/* Log In Forms */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const button = document.querySelector(".login-btn") || document.querySelector("button[type='submit']");
    if (button) button.innerHTML = "Logging In...";

    const email = loginForm.querySelector("input[name='email']").value.trim();
    const passwordValue = loginForm.querySelector("input[name='password']").value.trim();

    try {
      const response = await loginUser({ email, password: passwordValue });
      setAuthToken(response.token);
      window.currentUser = response.user;
      showAppNotification('Login successful.');
      if (button) button.innerHTML = "Success!";
      setTimeout(() => {
        window.location.href = '../../index.html';
      }, 800);
    } catch (error) {
      if (button) button.innerHTML = "Log In";
      showAppNotification(error.message || 'Unable to log in.', 'error');
    }
  });
}

/* Sign Up Forms */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const button = document.querySelector(".signup-btn") || document.querySelector("button[type='submit']");
    if (button) button.innerHTML = "Creating...";

    const username = signupForm.querySelector("input[name='username']").value.trim();
    const email = signupForm.querySelector("input[name='email']").value.trim();
    const passwordValue = signupForm.querySelector("input[name='password']").value.trim();
    const phone = signupForm.querySelector("input[name='phone']").value.trim();
    const address = signupForm.querySelector("input[name='address']").value.trim();
    const city = signupForm.querySelector("input[name='city']").value.trim();
    const province = signupForm.querySelector("input[name='province']").value.trim();
    const postal_code = signupForm.querySelector("input[name='postal_code']").value.trim();

    try {
      const response = await signupUser({
        username,
        email,
        password: passwordValue,
        phone,
        address,
        city,
        province,
        postal_code,
      });

      setAuthToken(response.token);
      window.currentUser = response.user;
      showAppNotification('Account created successfully.');
      if (button) button.innerHTML = "Account Created!";
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    } catch (error) {
      if (button) button.innerHTML = "Sign Up";
      showAppNotification(error.message || 'Unable to create account.', 'error');
    }
  });
}

/* Floating Effect */

const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 30) * -1;
    const rotateY = (x - centerX) / 30;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

    const rotateX = ((y - centerY) / 30) * -1;
    const rotateY = (x - centerX) / 30;

    card.style.transform =
    `perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)`;

  });


  card.addEventListener('mouseleave', () => {

    card.style.transform =
    'perspective(1000px) rotateX(0) rotateY(0)';

  });

});

/*  */