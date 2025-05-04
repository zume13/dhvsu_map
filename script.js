document.addEventListener("DOMContentLoaded", () => {

  const defaultView = [14.99785, 120.6556];
  const defaultZoom = 19;

  const map = L.map("leaflet-map", {
    center: [14.99785, 120.6556],
    zoom: 17,
    zoomControl: false
  });
  

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const locations = {
    gate_2: [14.99787295054242, 120.65327635515237],
    gate_3: [14.998001758775736, 120.65385408542204],
    gate_1: [14.997235689334952, 120.65319705482693],
    gate_5: [14.998504427922397, 120.6563219818991],
    gate_6: [14.998488882923656, 120.6564051303811],
    gate_7: [14.997279159886942, 120.65617720270585],
    gate_8: [14.99722734292323, 120.65605918550561],
    admin: [14.997486055361032, 120.65398796655205],
    taw: [14.998228961660555, 120.65415515016345],
    coe: [14.99793714161489, 120.65417128955947],
    ccs: [14.997649278556784, 120.65480872253569],
    cas: [14.997937141609, 120.65475819479173],
    cssp: [14.998158976751514, 120.65499423275024],
    swb: [14.99772441300185, 120.65509571890907],
    chtm: [14.99775550310931, 120.65523519378209],
    ufc: [14.997355455959111, 120.65457796910107],
    ro: [14.997394671365905, 120.65472119079188],
    lib: [14.997594870838707, 120.65430714943457],
    cea_ext: [14.997311688513577, 120.6550484576488],
    cli: [14.997092933549627, 120.65557156880007],
    aud: [14.998082993738224, 120.65579486955303],
    it: [14.998487630013525, 120.65538950656446],
    ann: [14.998592558734275, 120.65577976796669],
    hos: [14.99809170824405, 120.65615799861536],
    cbs: [14.99747072553969, 120.65603189570346],
    cas_ext: [14.998026349438359, 120.65684591391289],
    hs: [14.99741182895181, 120.6570438646833],
    pool: [14.997627660312046, 120.65760825938719],
    cafe: [14.997594980842464, 120.65781125078848],
    citext: [14.998390054787972, 120.65483474762588],
    cit: [14.997773846156417, 120.65363541962047],
    gym: [14.998272474655874, 120.65760924807313],
  };

  for (const [key, coords] of Object.entries(locations)) {
    L.marker(coords).addTo(map).bindPopup(key.toUpperCase());
  }

  let control = null;
  const startSelect = document.getElementById("start");
  const endSelect = document.getElementById("destination");

  function drawRoute() {
    if (!startSelect.value || !endSelect.value) return;
    if (control) map.removeControl(control);

    control = L.Routing.control({
      waypoints: [
        L.latLng(...locations[startSelect.value]),
        L.latLng(...locations[endSelect.value])
      ],
      routeWhileDragging: false,
      show: false
    }).addTo(map);
  }

  startSelect.addEventListener("change", drawRoute);
  endSelect.addEventListener("change", drawRoute);

  document.getElementById("zoom-in").addEventListener("click", () => map.zoomIn());
  document.getElementById("zoom-out").addEventListener("click", () => map.zoomOut());
  document.getElementById("reset-view").addEventListener("click", () => {
    map.setView(defaultView, defaultZoom);
  });
  
});

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  mobileMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        mobileMenu.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })

      // Update active link
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.classList.remove("active")
      })
      this.classList.add("active")
    })
  })

  // Touch events for mobile
  // Define mapContainer before using it
const mapContainer = document.getElementById("leaflet-map");

if (mapContainer) {
    // Touch events for mobile
    mapContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startPosX = e.touches[0].clientX - posX;
        startPosY = e.touches[0].clientY - posY;
        e.preventDefault();
    });

    document.addEventListener("touchmove", (e) => {
        if (isDragging) {
            posX = e.touches[0].clientX - startPosX;
            posY = e.touches[0].clientY - startPosY;
            updateMapTransform();
            e.preventDefault();
        }
    });

    document.addEventListener("touchend", () => {
        isDragging = false;
    });
} else {
    console.error("Map container element not found!");
}

  // Handle window resize
  window.addEventListener("resize", () => {
    // Reset map position and scale on window resize for better mobile experience
    if (window.innerWidth < 768) {
      scale = 1
      posX = 0
      posY = 0
      updateMapTransform()
    }
  })

  // Active menu highlighting based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-menu a")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 100) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  })
})
