const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const titleEl = document.getElementById("title");
const artimgEl = document.getElementById("artimg");
const blurbEl = document.getElementById("blurb");

async function loadArt() {
  try {
    const res = await fetch(`http://localhost:3000/art`);
    if (!res.ok) throw new Error("Failed to load artwork");

    const arts = await res.json();
    const art = arts[id];

    if (!art) throw new Error("Artwork not found");

    document.title = art.title;
    titleEl.textContent = art.title;
    artimgEl.src = art.image || "https://via.placeholder.com/600";
    blurbEl.textContent = art.blurb;
  } catch (err) {
    console.error(err);
    titleEl.textContent = "Artwork Not Found";
    blurbEl.textContent = "";
  }
}

loadArt();
