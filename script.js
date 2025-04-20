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
  
    // Map functionality
    const mapContainer = document.getElementById("map-container")
    const schoolMap = document.getElementById("school-map")
    const zoomInBtn = document.getElementById("zoom-in")
    const zoomOutBtn = document.getElementById("zoom-out")
    const resetBtn = document.getElementById("reset")
  
    // Set initial scale and position
    let scale = 1
    let posX = 0
    let posY = 0
    let isDragging = false
    let startPosX = 0
    let startPosY = 0
  
    // Zoom in function
    zoomInBtn.addEventListener("click", () => {
      if (scale < 3) {
        scale += 0.2
        updateMapTransform()
      }
    })
  
    // Zoom out function
    zoomOutBtn.addEventListener("click", () => {
      if (scale > 0.5) {
        scale -= 0.2
        updateMapTransform()
      }
    })
  
    // Reset map function
    resetBtn.addEventListener("click", () => {
      scale = 1
      posX = 0
      posY = 0
      updateMapTransform()
    })
  
    // Update map transform
    function updateMapTransform() {
      schoolMap.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
    }
  
    // Map dragging functionality
    mapContainer.addEventListener("mousedown", (e) => {
      isDragging = true
      startPosX = e.clientX - posX
      startPosY = e.clientY - posY
      mapContainer.style.cursor = "grabbing"
    })
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        posX = e.clientX - startPosX
        posY = e.clientY - startPosY
        updateMapTransform()
      }
    })
  
    document.addEventListener("mouseup", () => {
      isDragging = false
      mapContainer.style.cursor = "grab"
    })
  
    // Touch events for mobile
    mapContainer.addEventListener("touchstart", (e) => {
      isDragging = true
      startPosX = e.touches[0].clientX - posX
      startPosY = e.touches[0].clientY - posY
      e.preventDefault()
    })
  
    document.addEventListener("touchmove", (e) => {
      if (isDragging) {
        posX = e.touches[0].clientX - startPosX
        posY = e.touches[0].clientY - startPosY
        updateMapTransform()
        e.preventDefault()
      }
    })
  
    document.addEventListener("touchend", () => {
      isDragging = false
    })
  
    // Custom map upload functionality
    const mapUpload = document.getElementById("map-upload")
    const uploadBtn = document.getElementById("upload-btn")
  
    uploadBtn.addEventListener("click", () => {
      if (mapUpload.files.length > 0) {
        const file = mapUpload.files[0]
        const reader = new FileReader()
  
        reader.onload = (e) => {
          schoolMap.src = e.target.result
  
          // Reset map position and scale when new map is uploaded
          scale = 1
          posX = 0
          posY = 0
          updateMapTransform()
  
          // Clear existing markers when new map is uploaded
          clearMarkers()
  
          alert("Map uploaded successfully!")
        }
  
        reader.readAsDataURL(file)
      } else {
        alert("Please select a file to upload.")
      }
    })
  
    // Custom markers functionality
    const addMarkerBtn = document.getElementById("add-marker")
    const clearMarkersBtn = document.getElementById("clear-markers")
    const markerType = document.getElementById("marker-type")
    const markerLabel = document.getElementById("marker-label")
    let markers = []
    let isAddingMarker = false
  
    addMarkerBtn.addEventListener("click", () => {
      if (isAddingMarker) {
        isAddingMarker = false
        addMarkerBtn.textContent = "Add Marker"
        mapContainer.style.cursor = "grab"
      } else {
        isAddingMarker = true
        addMarkerBtn.textContent = "Cancel"
        mapContainer.style.cursor = "crosshair"
        alert("Click on the map to place your marker.")
      }
    })
  
    mapContainer.addEventListener("click", (e) => {
      if (isAddingMarker) {
        // Only add marker if we're not dragging the map
        if (!isDragging) {
          const rect = mapContainer.getBoundingClientRect()
          const x = (e.clientX - rect.left) / scale - posX / scale
          const y = (e.clientY - rect.top) / scale - posY / scale
  
          const type = markerType.value
          const label = markerLabel.value || type
  
          addMarker(x, y, type, label)
  
          // Reset after adding
          isAddingMarker = false
          addMarkerBtn.textContent = "Add Marker"
          mapContainer.style.cursor = "grab"
          markerLabel.value = ""
        }
      }
    })
  
    function addMarker(x, y, type, label) {
      const marker = document.createElement("div")
      marker.className = `map-marker ${type}`
      marker.style.left = `${x}px`
      marker.style.top = `${y}px`
  
      const labelElement = document.createElement("div")
      labelElement.className = "marker-label"
      labelElement.textContent = label
  
      marker.appendChild(labelElement)
      mapContainer.appendChild(marker)
  
      markers.push(marker)
    }
  
    clearMarkersBtn.addEventListener("click", clearMarkers)
  
    function clearMarkers() {
      markers.forEach((marker) => {
        mapContainer.removeChild(marker)
      })
      markers = []
    }
  
    // Set initial cursor style
    mapContainer.style.cursor = "grab"
  
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
  