async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorDiv = document.getElementById("error");
  
    if (!username || !password) {
      errorDiv.textContent = "Please fill in both fields.";
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        errorDiv.textContent = data.error || "Login failed.";
      } else {
        localStorage.setItem("token", data.token); // Save token
        window.location.href = "upload.html"; 
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "Something went wrong.";
    }
  }
  