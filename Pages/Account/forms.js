/* Log In Forms */

const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const button = document.querySelector(".login-btn");

    button.innerHTML = "Logging In...";

    setTimeout(() => {

      button.innerHTML = "Success!";

      setTimeout(() => {
        button.innerHTML = "Log In";
      }, 1500);

    }, 1200);

  });

}

/* Sign Up Forms */

const signupForm = document.getElementById("signupForm");

if(signupForm){

  signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    const button = document.querySelector(".signup-btn");

    button.innerHTML = "Creating...";

    setTimeout(() => {

      button.innerHTML = "Account Created!";

      setTimeout(() => {
        button.innerHTML = "Sign Up";
      }, 1600);

    }, 1200);

  });

}

/* Password Toogle Log In */

const togglePassword = document.querySelector(".toggle-password");
const password = document.getElementById("password");

if(togglePassword){

  togglePassword.addEventListener("click", () => {

    const type = password.getAttribute("type") === "password"
    ? "text"
    : "password";

    password.setAttribute("type", type);

    togglePassword.innerHTML =
    type === "password"
    ? '<i class="fa-regular fa-eye"></i>'
    : '<i class="fa-regular fa-eye-slash"></i>';

  });

}

/* Password Toogle Sign Up */

const signupToggle = document.querySelector(".toggle-password-signup");
const signupPassword = document.getElementById("signupPassword");

if(signupToggle){

  signupToggle.addEventListener("click", () => {

    const type = signupPassword.getAttribute("type") === "password"
    ? "text"
    : "password";

    signupPassword.setAttribute("type", type);

    signupToggle.innerHTML =
    type === "password"
    ? '<i class="fa-regular fa-eye"></i>'
    : '<i class="fa-regular fa-eye-slash"></i>';

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