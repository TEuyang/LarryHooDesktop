let currentIndex = 0;
let items = [];

document.addEventListener("DOMContentLoaded", () => {
  // Collect all items with the class 'item'
  items = Array.from(document.querySelectorAll(".item"));

  // Add event listeners to all items for click event
  items.forEach((item, index) => {
    item.addEventListener("click", () => showPopup(index));
  });

  // Preload images and videos
  preloadAssets(items);
});

function preloadAssets(items) {
  items.forEach((item) => {
    const type = item.dataset.type;
    const src = item.dataset.src;

    if (type === "image") {
      const img = new Image();
      img.src = src;
    } else if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
    }
  });
}

function showPopup(index) {
  currentIndex = index;
  const item = items[currentIndex];
  const type = item.dataset.type;
  const src = item.dataset.src;
  const alt = item.dataset.alt;
  const notes = item.dataset.notes;

  const popup = document.getElementById("documentPopup");
  const img = document.getElementById("popupImage");
  const mediaContainer = document.getElementById("popupMedia");
  const notesDiv = document.getElementById("popupNotes");

  if (type === "image") {
    img.src = src;
    img.alt = alt;
    img.style.display = "block"; // Show image
    mediaContainer.innerHTML = ""; // Clear media container
    mediaContainer.style.display = "none"; // Hide media container
  } else if (type === "video") {
    img.style.display = "none"; // Hide image
    mediaContainer.innerHTML = `
      <video controls autoplay width="100%">
        <source src="${src}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    mediaContainer.style.display = "block"; // Show media container
  }

  notesDiv.innerHTML = `<strong>Filename:</strong> ${alt}<br><strong>Description:</strong> ${notes}`;
  notesDiv.style.display = "block"; // Show notes

  popup.style.display = "block"; // Show popup
  updateNavigationButtons();
}

function closePopup() {
  const popup = document.getElementById("documentPopup");
  const mediaContainer = document.getElementById("popupMedia");

  // Stop any playing video by pausing it
  const video = mediaContainer.querySelector("video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  popup.style.display = "none"; // Hide popup
}

function showNext() {
  if (currentIndex < items.length - 1) {
    showPopup(currentIndex + 1);
  }
}

function showPrevious() {
  if (currentIndex > 0) {
    showPopup(currentIndex - 1);
  }
}

function closePopup() {
  const popup = document.getElementById("documentPopup");
  const mediaContainer = document.getElementById("popupMedia");

  // Stop any playing video by pausing it
  const video = mediaContainer.querySelector("video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  popup.style.display = "none"; // Hide popup
}
function updateNavigationButtons() {
  document.getElementById("prevButton").style.display =
    currentIndex > 0 ? "block" : "none";
  document.getElementById("nextButton").style.display =
    currentIndex < items.length - 1 ? "block" : "none";
}
