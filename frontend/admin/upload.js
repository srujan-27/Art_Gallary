async function uploadArt() {
    const title = document.getElementById("title").value.trim();
    const blurb = document.getElementById("blurb").value.trim();
    const image = document.getElementById("image").files[0];
    const errorDiv = document.getElementById("error");
    const successDiv = document.getElementById("success");
  
    errorDiv.textContent = "";
    successDiv.textContent = "";
  
    if (!title || !blurb || !image) {
      errorDiv.textContent = "Please fill all fields and select an image.";
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("blurb", blurb);
    formData.append("image", image);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "login.html";  
        return;
      }
  
      const res = await fetch("http://localhost:3000/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`  
        },
        body: formData
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        errorDiv.textContent = data.error || "Upload failed.";
      } else {
        successDiv.textContent = "Artwork uploaded successfully!";
        document.getElementById("title").value = "";
        document.getElementById("blurb").value = "";
        document.getElementById("image").value = "";
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "Something went wrong.";
    }
  }
  