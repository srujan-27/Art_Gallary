const gallery = document.getElementById("gallery");

async function loadGallery() {
  try {
    const res = await fetch("http://localhost:3000/art");
    if (!res.ok) throw new Error("Failed to load artworks");
    
    const arts = await res.json();

    arts.forEach((art, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => {
        window.location.href = `art.html?id=${index}`;
      };

      const img = document.createElement("img");
      img.src = art.image || "https://via.placeholder.com/300";
      img.alt = art.title;

      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = art.title;

      card.appendChild(img);
      card.appendChild(title);
      gallery.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    gallery.innerHTML = "<p>Failed to load artworks.</p>";
  }
}

loadGallery();
