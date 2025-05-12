document.addEventListener("DOMContentLoaded", () => {

  const defaultView = [14.99785, 120.6556];
  const defaultZoom = 18;

  const map = L.map("leaflet-map", {
    center: defaultView,
    zoom: defaultZoom,
    zoomControl: false
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const locations = {
    et: [14.998246583833552, 120.65414091736372],
    is: [14.997972217457177, 120.65425495052446],
    ss: [14.99779503752756, 120.65466075609],
    hrm: [14.997870171921177, 120.65499938495952],
    cssp: [14.998078967481698, 120.6567034235456],
    grad_1: [14.997916776584026, 120.65405946666735],
    grad_2: [14.99785459641144, 120.65396424824596],
   gate_4: [14.997150, 120.653789],
    gate_2: [14.99787295054242, 120.65327635515237],
    gate_3: [14.998001758775736, 120.65385408542204],
    gate_1: [14.997249400971546, 120.6532185561277],
    acad: [14.997165321665658, 120.6535385600835],
    gate_5: [14.998504427922397, 120.6563219818991],
    gate_6: [14.998488882923656, 120.6564051303811],
    gate_7: [14.997269881153665, 120.65641475347688],
    parking_2: [14.997802276638941, 120.65630855603273],
    gate_8: [14.997226746381333, 120.6560670759434],
    admin: [14.997486055361032, 120.65398796655205],
    parking_1: [14.997375, 120.653575],
    ccs: [14.997616, 120.654841],
    cas: [14.997912, 120.654886],
    cit: [14.998173, 120.654857],
    swb: [14.997645, 120.655106],
    chtm: [14.99775550310931, 120.65523519378209],
    ufc: [14.997355455959111, 120.65457796910107],
    cea: [14.997394671365905, 120.65472119079188],
    lib: [14.997430, 120.654363],
    tvl: [14.998062925442591, 120.65541685998527],
    engr: [14.997353034549056, 120.65560193241295],
    eleng: [14.997726116188334, 120.65553487718553],
    accre_lab: [14.997451663306034, 120.65531111656666],
    cea_ext: [14.997401, 120.655015],
    cli: [14.997092933549627, 120.65557156880007],
    aud: [14.998318, 120.655763],
    it: [14.998487630013525, 120.65538950656446],
    ann: [14.998592558734275, 120.65577976796669],
    hos: [14.99809170824405, 120.65615799861536],
    cbs_2: [14.997462876125526, 120.6559518222376],
    cbs_1: [14.99714938357256, 120.65583648724643],
    cbs_3: [14.997650, 120.655758],
    cbs_4: [14.997736, 120.655989],
    cas_ext: [14.998026349438359, 120.65684591391289],
    hs: [14.99741182895181, 120.6570438646833],
    pool: [14.997627660312046, 120.65760825938719],
    cafe: [14.997594980842464, 120.65781125078848],
    citext: [14.998390054787972, 120.65483474762588],
    coe: [14.997622, 120.653685],
    gym: [14.998324, 120.657153],
    court: [14.997912, 120.657263]
  };

  const markerGroup = L.layerGroup().addTo(map);

  for (const [key, coords] of Object.entries(locations)) {
    L.marker(coords, { zIndexOffset: 1000 }) 
      .bindPopup(key.toUpperCase())
      .addTo(markerGroup);
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

    markerGroup.bringToFront(); 
  }

  startSelect.addEventListener("change", drawRoute);
  endSelect.addEventListener("change", drawRoute);

  document.getElementById("zoom-in").addEventListener("click", () => map.zoomIn());
  document.getElementById("zoom-out").addEventListener("click", () => map.zoomOut());
  document.getElementById("reset-view").addEventListener("click", () => {
    map.setView(defaultView, defaultZoom);
  });

  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        mobileMenu.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

});
