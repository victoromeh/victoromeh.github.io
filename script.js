// ============================================================
// PROJECT DATA
// To add or edit a project: update this array.
// images: add 5–7 sheet image paths (jpg/png exported from your PDF set)
// pdf: path to the full downloadable drawing set
// ============================================================
const projects = [
  {
    tag: "Permit-Ready · Single Family Home",
    title: "4-Bedroom Single Family Home + Basement",
    description: "Complete permit-ready drawing set for a two-storey single family home with an unfinished basement and attached 2-car garage.",
    bullets: [
      "Site plan and foundation plan",
      "First and second floor plans",
      "Roof plan and RCPs",
      "All exterior elevations",
      "Building sections and stair section",
      "Wall sections and construction details",
      "Door, window, and finish schedules"
    ],
    images: [
      "assets/images/projects/single-family/01.jpg",
      "assets/images/projects/single-family/02.jpg",
      "assets/images/projects/single-family/03.jpg",
      "assets/images/projects/single-family/04.jpg",
      "assets/images/projects/single-family/05.jpg"
    ],
    pdf: "assets/pdfs/single-family-home.pdf"
  },
  {
    tag: "Permit-Ready · ADU",
    title: "Accessory Dwelling Unit — Studio Layout",
    description: "Complete permit-ready drawing set for a single-storey accessory dwelling unit with open plan living and kitchen, one bedroom, one bathroom, and a dedicated laundry space.",
    bullets: [
      "Site plan and foundation plan",
      "Floor plan",
      "Roof plan and RCP",
      "All exterior elevations",
      "Building section",
      "Wall sections and construction details",
      "Door, window, and finish schedules"
    ],
    images: [
      "assets/images/projects/adu/01.jpg",
      "assets/images/projects/adu/02.jpg",
      "assets/images/projects/adu/03.jpg",
      "assets/images/projects/adu/04.jpg",
      "assets/images/projects/adu/05.jpg"
    ],
    pdf: "assets/pdfs/adu.pdf"
  },
  {
    tag: "Permit-Ready · Renovation",
    title: "2-Bed to 3-Bed Renovation & Addition",
    description: "Full remodel drawing set taking an existing 2-bedroom, 1-bathroom home to a 3-bedroom, 2-bathroom layout with a new ensuite master bath and added front porch.",
    bullets: [
      "Existing conditions plan",
      "Demolition plan",
      "Proposed floor plan",
      "Roof plan and exterior elevations",
      "Building section",
      "Wall sections and construction details",
      "Door, window, and finish schedules"
    ],
    images: [
      "assets/images/projects/remodel/01.jpg",
      "assets/images/projects/remodel/02.jpg",
      "assets/images/projects/remodel/03.jpg",
      "assets/images/projects/remodel/04.jpg",
      "assets/images/projects/remodel/05.jpg"
    ],
    pdf: "assets/pdfs/renovation-addition.pdf"
  },
  {
    tag: "Concept Design · Commercial",
    title: "Shipping Container Pub",
    description: "Conceptual design for an outdoor pub built from a series of shipping containers, with a bar, manager's office, and restrooms opening onto a shared covered seating area.",
    bullets: [
      "Floor plan",
      "Roof plan",
      "Elevations",
      "3D views"
    ],
    images: [
      "assets/images/projects/container-pub/01.jpg",
      "assets/images/projects/container-pub/02.jpg",
      "assets/images/projects/container-pub/03.jpg",
      "assets/images/projects/container-pub/04.jpg"
    ],
    pdf: "assets/pdfs/shipping-container-pub.pdf"
  },
  {
    tag: "Concept Design · Multi-Family",
    title: "Multi-Storey Apartment Building, Lagos",
    description: "Conceptual design for a multi-storey apartment block in Lagos, Nigeria, with ground floor parking and three 2-bedroom apartments per upper floor.",
    bullets: [
      "Floor plans",
      "Elevations",
      "3D views"
    ],
    images: [
      "assets/images/projects/apartment-block/01.jpg",
      "assets/images/projects/apartment-block/02.jpg",
      "assets/images/projects/apartment-block/03.jpg",
      "assets/images/projects/apartment-block/04.jpg"
    ],
    pdf: "assets/pdfs/apartment-block-lagos.pdf"
  }
];

// ============================================================
// RENDER PROJECT GRID
// ============================================================
const grid = document.getElementById("projectGrid");

projects.forEach((project, index) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-thumb">
      <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
    </div>
    <div class="project-card-body">
      <p class="project-tag">${project.tag}</p>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `;
  card.addEventListener("click", () => openModal(index));
  grid.appendChild(card);
});

// ============================================================
// MODAL + SLIDER
// ============================================================
const modal = document.getElementById("projectModal");
const sliderTrack = document.getElementById("sliderTrack");
const sliderCounter = document.getElementById("sliderCounter");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalDownload = document.getElementById("modalDownload");

let currentSlide = 0;
let currentImages = [];

function openModal(index) {
  const project = projects[index];
  currentImages = project.images;
  currentSlide = 0;

  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDownload.href = project.pdf;

  modalList.innerHTML = "";
  project.bullets.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    modalList.appendChild(li);
  });

  sliderTrack.innerHTML = currentImages
    .map(src => `<img src="${src}" alt="${project.title} drawing sheet">`)
    .join("");

  updateSlider();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  sliderCounter.textContent = `${currentSlide + 1} / ${currentImages.length}`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % currentImages.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
  updateSlider();
}

document.querySelectorAll("[data-close]").forEach(el =>
  el.addEventListener("click", closeModal)
);
document.getElementById("sliderNext").addEventListener("click", nextSlide);
document.getElementById("sliderPrev").addEventListener("click", prevSlide);

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Basic touch swipe support
let touchStartX = 0;
sliderTrack.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
sliderTrack.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (diff > 40) prevSlide();
  if (diff < -40) nextSlide();
});

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();
