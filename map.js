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
   acad_1: [14.998563, 120.656703],    
   acad_2: [14.997165321665658, 120.6535385600835],
   admin: [14.997486055361032, 120.65398796655205],
   amb: [14.997225422663393, 120.6554062149816],
   asb: [14.998730154325703, 120.65601142292054],
   aud: [14.998318, 120.655763],
   cmlb: [14.997392039435649, 120.65539591694035],
   cas: [14.997912, 120.654886],
   cbs_1: [14.99714938357256, 120.65583648724643],
   cbs_2: [14.997462876125526, 120.6559518222376],
   cbs_3: [14.997650, 120.655758],
   ccs: [14.997616, 120.654841],
   coe: [14.997650040616106, 120.65350121835115],
   coe_ext:[14.997622, 120.653685],
   cea: [14.997241778480277, 120.65471728732098],
   cea_ext: [14.997401, 120.655015],
   cit:[14.998351264015238, 120.65476239812367],
   cit_ext: [14.998439960055169, 120.65515801454237],
   cssp: [14.997645, 120.655106],
   court: [14.997912, 120.657263],
   dc: [14.997685401014273, 120.65419480896126],
   museum: [14.997681073430064, 120.65320733299238],
   engr_1: [14.997353034549056, 120.65560193241295],
   engr_2: [14.997726116188334, 120.65553487718553],
   elb_1: [14.997133451954653, 120.65541920460058],
   elb_2: [14.997480986163746, 120.65523177790372],
   et: [14.998246583833552, 120.65414091736372],
   el: [14.998430792114965, 120.65624629505766],
   ft: [14.99775550310931, 120.65523519378209],
   gate_1: [14.997249400971546, 120.6532185561277],
   gate_2: [14.99787295054242, 120.65327635515237],
   gate_3: [14.998001758775736, 120.65385408542204],
   gate_4: [14.997150, 120.653789],
   gate_5: [14.998504427922397, 120.6563219818991],
   gate_6: [14.998488882923656, 120.6564051303811],
   gate_7: [14.997269881153665, 120.65641475347688],
   gate_8: [14.997226746381333, 120.6560670759434],
   gazebo: [14.997950743500223, 120.65606099885062],
   gs: [14.998173, 120.654857],
   grad_1: [14.997916776584026, 120.65405946666735],
   grad_2: [14.99785459641144, 120.65396424824596],
   gsh: [14.998654993073817, 120.65622466441228],
   gsl: [14.99872451520724, 120.65626376266279],
   gym: [14.998324, 120.657153],
   hs: [14.99741182895181, 120.6570438646833],
   ict: [14.997611254362015, 120.65452081905073],
   io: [14.997182530718408, 120.65327867371897],
   hrm: [14.997817707390325, 120.65500743158577],  
   is: [14.997972217457177, 120.65425495052446],
   irtpc: [14.997653553967135, 120.65653177120772],
   irtpc_ext: [14.997422280187802, 120.65651546597573],
   irtpc_ext1: [14.997649409278178, 120.65688791183537],
   it: [14.998592558734275, 120.65577976796669],
   iteng: [14.998487630013525, 120.65538950656446],
   lib: [14.997430, 120.654363],
   mpool: [14.998248401515236, 120.65439660237446],
   mdrtc: [14.997736, 120.655989],
   mphall: [14.998614187478456, 120.65614352759755],
   mrf: [14.997183545695783, 120.65769459178354],	
   parking_1: [14.997375, 120.653575],
   parking_2: [14.997802276638941, 120.65630855603273],
   parking_s: [14.997115328112612, 120.65681379109671],
   pgar: [14.997169672201464, 120.65397289007123],
   pump: [14.997321978572645, 120.65751008521083],
   rotcnstp: [14.998249230450773, 120.65431765072475],
   sgsb: [14.998189129041856, 120.65397833951201],
   shs_1: [14.998078967481698, 120.6567034235456],
   shs_2: [14.998081968859093, 120.65700834605425],
   ss: [14.997781435608376, 120.65470300089243],
   spb: [14.998205296865006, 120.65385852967331],
   supsh: [14.998250888323131, 120.653717789776],
   toilet:[14.99808706424788, 120.65522537674052],
   tvl: [14.998062925442591, 120.65541685998527],
   cli: [14.997092933549627, 120.65557156880007],
   ufc: [14.997355455959111, 120.65457796910107],
   hos: [14.99809170824405, 120.65615799861536],
   pool: [14.997627660312046, 120.65760825938719],
   wc: [14.997594980842464, 120.65781125078848]
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
