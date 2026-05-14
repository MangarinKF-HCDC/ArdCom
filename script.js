/**
 * Shared ArdCom Electronics page scripts.
 * All page behavior is initialized from here so the HTML stays markup-only.
 */
const allProducts = [
  { category: "Vendo Machines", bestSelling: true, name: "ArdCom WiFi Vending Machine", price: "₱ 4,500.00", image1: "Source Image/Shop/Vendo Machines/ArdCom WiFi Vending Machine/1.jpg", image2: "Source Image/Shop/Vendo Machines/ArdCom WiFi Vending Machine/2.jpg", details: "Smart WiFi-enabled vending machine for convenient automated sales." },
  { category: "Shot Clocks", bestSelling: true, name: "ArdCom Wireless Basketball Shotclocks", price: "₱ 9,750.00", image1: "Source Image/Shop/Shot Clocks/ArdCom Wireless Basketball Shotclocks/1.png", image2: "Source Image/Shop/Shot Clocks/ArdCom Wireless Basketball Shotclocks/2.webp", details: "Wireless shot clock system for basketball games and training." },
  { category: "Computer Sets", bestSelling: true, name: "Ryzen 5 5600G Computer Set", price: "₱ 25,000.00", image1: "Source Image/Shop/Computer Sets/Ryzen 5 5600G Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Ryzen 5 5600G Computer Set/2.jpg", details: "Complete desktop PC set powered by AMD Ryzen 5 5600G processor." },
  { category: "Computer Sets", bestSelling: true, name: "Ryzen 7 5700G Computer Set", price: "₱ 35,000.00", image1: "Source Image/Shop/Computer Sets/Ryzen 7 5700G Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Ryzen 7 5700G Computer Set/2.jpg", details: "High-performance PC set with AMD Ryzen 7 5700G for multitasking and gaming." },
  { category: "Computer Sets", name: "Ryzen 9 5900X Computer Set", price: "₱ 50,000.00", image1: "Source Image/Shop/Computer Sets/Ryzen 9 5900X Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Ryzen 9 5900X Computer Set/2.webp", details: "Premium PC set featuring the powerful AMD Ryzen 9 5900X processor." },
  { category: "Computer Sets", bestSelling: true, name: "Intel i3 12100 Computer Set", price: "₱ 20,000.00", image1: "Source Image/Shop/Computer Sets/Intel i3 12100 Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Intel i3 12100 Computer Set/2.jpg", details: "Affordable desktop set with Intel Core i3 12100 for everyday use." },
  { category: "Computer Sets", name: "Intel i5 12400 Computer Set", price: "₱ 30,000.00", image1: "Source Image/Shop/Computer Sets/Intel i5 12400 Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Intel i5 12400 Computer Set/2.webp", details: "Versatile PC set with Intel Core i5 12400 for work and play." },
  { category: "Computer Sets", name: "Intel i7 12700 Computer Set", price: "₱ 40,000.00", image1: "Source Image/Shop/Computer Sets/Intel i7 12700 Computer Set/1.jpg", image2: "Source Image/Shop/Computer Sets/Intel i7 12700 Computer Set/2.jpg", details: "Powerful desktop set with Intel Core i7 12700 for demanding tasks." },
  { category: "Computer Case", name: "Lian Li PC-O11 Dynamic EVO", price: "₱ 7,500.00", image1: "Source Image/Shop/Computer Case/Lian Li PC-O11 Dynamic EVO/1.webp", image2: "Source Image/Shop/Computer Case/Lian Li PC-O11 Dynamic EVO/2.webp", details: "Premium mid-tower case with modular design and tempered glass panels." },
  { category: "Computer Case", name: "Inplay PC Case", price: "₱ 3,500.00", image1: "Source Image/Shop/Computer Case/Inplay PC Case/1.webp", image2: "Source Image/Shop/Computer Case/Inplay PC Case/2.jpg", details: "Durable and stylish PC case for custom desktop builds." },
  { category: "Computer Case", name: "Inplay PC Case with RGB", price: "₱ 4,500.00", image1: "Source Image/Shop/Computer Case/Inplay PC Case with RGB/1.jpg", image2: "Source Image/Shop/Computer Case/Inplay PC Case with RGB/2.jpg", details: "PC case featuring vibrant RGB lighting for a modern look." },
  { category: "Computer Fan", name: "Noctua NF-A12x25", price: "₱ 1,500.00", image1: "Source Image/Shop/Computer Fan/Noctua NF-A12x25/1.jpg", image2: "Source Image/Shop/Computer Fan/Noctua NF-A12x25/2.jpg", details: "High-performance 120mm cooling fan with quiet operation." },
  { category: "Computer Fan", name: "Corsair LL120 RGB", price: "₱ 2,000.00", image1: "Source Image/Shop/Computer Fan/Corsair LL120 RGB/1.jpg", image2: "Source Image/Shop/Computer Fan/Corsair LL120 RGB/2.jpg", details: "120mm RGB fan for enhanced cooling and customizable lighting." },
  { category: "Computer Fan", name: "Cooler Master MasterFan MF120R ARGB", price: "₱ 1,800.00", image1: "Source Image/Shop/Computer Fan/Cooler Master MasterFan MF120R ARGB/1.jpg", image2: "Source Image/Shop/Computer Fan/Cooler Master MasterFan MF120R ARGB/2.jpg", details: "ARGB cooling fan for efficient airflow and vivid lighting effects." },
  { category: "Computer Fan", name: "Cooler Master MasterFan MF120R ARGB 3 Pack", price: "₱ 5,000.00", image1: "Source Image/Shop/Computer Fan/Cooler Master MasterFan MF120R ARGB 3 Pack/1.webp", image2: "Source Image/Shop/Computer Fan/Cooler Master MasterFan MF120R ARGB 3 Pack/2.jpg", details: "Set of three ARGB fans for advanced PC cooling and aesthetics." },
  { category: "Computer Fan", name: "Inplay PC Fan with RGB", price: "₱ 1,500.00", image1: "Source Image/Shop/Computer Fan/Inplay PC Fan with RGB/1.jpg", image2: "Source Image/Shop/Computer Fan/Inplay PC Fan with RGB/2.webp", details: "RGB cooling fan for desktop computers with quiet performance." },
  { category: "Computer Fan", name: "Inplay PC Fan 3 Pack with RGB", price: "₱ 4,000.00", image1: "Source Image/Shop/Computer Fan/Inplay PC Fan 3 Pack with RGB/1.jpg", image2: "Source Image/Shop/Computer Fan/Inplay PC Fan 3 Pack with RGB/2.webp", details: "Triple pack of RGB fans for enhanced cooling and lighting." },
  { category: "Laptops", bestSelling: true, name: "Lenovo IdeaPad 3 15ITL6", price: "₱ 25,000.00", image1: "Source Image/Shop/Laptops/Lenovo IdeaPad 3 15ITL6/1.jpg", image2: "Source Image/Shop/Laptops/Lenovo IdeaPad 3 15ITL6/2.avif", details: "15-inch Lenovo laptop with Intel processor for productivity and study." },
  { category: "Laptops", name: "Lenovo IdeaPad 3 14ITL6", price: "₱ 20,000.00", image1: "Source Image/Shop/Laptops/Lenovo IdeaPad 3 14ITL6/1.jpg", image2: "Source Image/Shop/Laptops/Lenovo IdeaPad 3 14ITL6/2.png", details: "Compact 14-inch Lenovo laptop ideal for work and travel." },
  { category: "Laptops", bestSelling: true, name: "Asus VivoBook 15 X515EA", price: "₱ 30,000.00", image1: "Source Image/Shop/Laptops/Asus VivoBook 15 X515EA/1.jpg", image2: "Source Image/Shop/Laptops/Asus VivoBook 15 X515EA/2.webp", details: "Sleek Asus VivoBook with 15-inch display and fast performance." },
  { category: "Laptops", bestSelling: true, name: "HP 15s-fq2716TU", price: "₱ 28,000.00", image1: "Source Image/Shop/Laptops/HP 15s-fq2716TU/1.jpg", image2: "Source Image/Shop/Laptops/HP 15s-fq2716TU/2.jpg", details: "HP 15-inch laptop with reliable performance for daily tasks." },
  { category: "Memory", name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz", price: "₱ 4,000.00", image1: "Source Image/Shop/Memory/Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz/1.jpg", image2: "Source Image/Shop/Memory/Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz/2.avif", details: "High-speed 16GB DDR4 memory kit for gaming and multitasking." },
  { category: "Memory", name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4 3200MHz", price: "₱ 4,500.00", image1: "Source Image/Shop/Memory/G.Skill Ripjaws V 16GB (2x8GB) DDR4 3200MHz/1.jpg", image2: "Source Image/Shop/Memory/G.Skill Ripjaws V 16GB (2x8GB) DDR4 3200MHz/2.jpg", details: "Performance DDR4 memory kit for enhanced PC responsiveness." },
  { category: "Memory", name: "Team T-Force Vulcan Z 16GB (2x8GB) DDR4 3200MHz", price: "₱ 3,500.00", image1: "Source Image/Shop/Memory/Team T-Force Vulcan Z 16GB (2x8GB) DDR4 3200MHz/1.jpg", image2: "Source Image/Shop/Memory/Team T-Force Vulcan Z 16GB (2x8GB) DDR4 3200MHz/2.jpg", details: "Durable and efficient DDR4 RAM kit for desktop upgrades." },
  { category: "Motherboard", name: "ASUS Prime B550M-A WiFi", price: "₱ 7,000.00", image1: "Source Image/Shop/Motherboard/ASUS Prime B550M-A WiFi/1.png", image2: "Source Image/Shop/Motherboard/ASUS Prime B550M-A WiFi/2.jpg", details: "Micro-ATX motherboard with WiFi and robust connectivity options." },
  { category: "Motherboard", name: "ASUS TUF Gaming B550M-PLUS WiFi", price: "₱ 8,000.00", image1: "Source Image/Shop/Motherboard/ASUS TUF Gaming B550M-PLUS WiFi/1.jpg", image2: "Source Image/Shop/Motherboard/ASUS TUF Gaming B550M-PLUS WiFi/2.png", details: "Durable gaming motherboard with WiFi and advanced features." },
  { category: "Motherboard", name: "Gigabyte A550M S2H", price: "₱ 6,000.00", image1: "Source Image/Shop/Motherboard/Gigabyte A550M S2H/1.jpg", image2: "Source Image/Shop/Motherboard/Gigabyte A550M S2H/2.png", details: "Affordable micro-ATX motherboard for reliable PC builds." },
  { category: "Motherboard", name: "MSI B550M PRO-VDH WIFI", price: "₱ 7,500.00", image1: "Source Image/Shop/Motherboard/MSI B550M PRO-VDH WIFI/1.jpg", image2: "Source Image/Shop/Motherboard/MSI B550M PRO-VDH WIFI/2.webp", details: "Professional-grade motherboard with built-in WiFi and stability." },
  { category: "PC Accessories", name: "Logitech G502 HERO", price: "₱ 2,500.00", image1: "Source Image/Shop/PC Accessories/Logitech G502 HERO/1.jpg", image2: "Source Image/Shop/PC Accessories/Logitech G502 HERO/2.webp", details: "High-precision gaming mouse with customizable buttons." },
  { category: "PC Accessories", name: "Razer DeathAdder V2", price: "₱ 3,000.00", image1: "Source Image/Shop/PC Accessories/Razer DeathAdder V2/1.jpg", image2: "Source Image/Shop/PC Accessories/Razer DeathAdder V2/2.jpg", details: "Ergonomic gaming mouse designed for speed and accuracy." },
  { category: "PC Accessories", name: "Logitech Headset G432", price: "₱ 2,000.00", image1: "Source Image/Shop/PC Accessories/Logitech Headset G432/1.jpg", image2: "Source Image/Shop/PC Accessories/Logitech Headset G432/2.webp", details: "Surround sound gaming headset for immersive audio." },
  { category: "PC Accessories", name: "Inplay Gaming Headset", price: "₱ 1,500.00", image1: "Source Image/Shop/PC Accessories/Inplay Gaming Headset/1.webp", image2: "Source Image/Shop/PC Accessories/Inplay Gaming Headset/2.webp", details: "Comfortable headset for gaming and multimedia use." },
  { category: "PC Accessories", name: "Inplay Gaming Mouse Pad", price: "₱ 500.00", image1: "Source Image/Shop/PC Accessories/Inplay Gaming Mouse Pad/1.jpg", image2: "Source Image/Shop/PC Accessories/Inplay Gaming Mouse Pad/2.jpg", details: "Large mouse pad for smooth and precise mouse movement." },
  { category: "PC Accessories", name: "Inplay Gaming Mouse Pad with RGB", price: "₱ 1,000.00", image1: "Source Image/Shop/PC Accessories/Inplay Gaming Mouse Pad with RGB/1.jpg", image2: "Source Image/Shop/PC Accessories/Inplay Gaming Mouse Pad with RGB/2.jpg", details: "RGB mouse pad for enhanced gaming aesthetics." },
  { category: "Processor", name: "AMD Ryzen 5 5600G", price: "₱ 12,000.00", image1: "Source Image/Shop/Processor/AMD Ryzen 5 5600G/1.jpg", image2: "Source Image/Shop/Processor/AMD Ryzen 5 5600G/2.webp", details: "6-core AMD Ryzen processor for fast and efficient computing." },
  { category: "Processor", name: "AMD Ryzen 7 5700G", price: "₱ 18,000.00", image1: "Source Image/Shop/Processor/AMD Ryzen 7 5700G/1.jpg", image2: "Source Image/Shop/Processor/AMD Ryzen 7 5700G/2.jpg", details: "8-core AMD Ryzen processor for high-performance tasks." },
  { category: "Processor", name: "AMD Ryzen 9 5900X", price: "₱ 30,000.00", image1: "Source Image/Shop/Processor/AMD Ryzen 9 5900X/1.jpg", image2: "Source Image/Shop/Processor/AMD Ryzen 9 5900X/2.jpg", details: "12-core AMD Ryzen processor for extreme multitasking and gaming." },
  { category: "Processor", name: "Intel i3 12100", price: "₱ 10,000.00", image1: "Source Image/Shop/Processor/Intel i3 12100/1.webp", image2: "Source Image/Shop/Processor/Intel i3 12100/2.jpg", details: "Entry-level Intel Core i3 processor for everyday computing." },
  { category: "Processor", name: "Intel i5 12400", price: "₱ 15,000.00", image1: "Source Image/Shop/Processor/Intel i5 12400/1.jpg", image2: "Source Image/Shop/Processor/Intel i5 12400/2.jpg", details: "Mid-range Intel Core i5 processor for balanced performance." },
  { category: "Processor", name: "Intel i7 12700", price: "₱ 25,000.00", image1: "Source Image/Shop/Processor/Intel i7 12700/1.jpg", image2: "Source Image/Shop/Processor/Intel i7 12700/2.jpg", details: "High-end Intel Core i7 processor for demanding applications." },
  { category: "Storage", name: "Western Digital Blue 1TB HDD", price: "₱ 2,500.00", image1: "Source Image/Shop/Storage/Western Digital Blue 1TB HDD/1.jpg", image2: "Source Image/Shop/Storage/Western Digital Blue 1TB HDD/2.png", details: "Reliable 1TB HDD for desktop storage and backups." },
  { category: "Storage", name: "Seagate Barracuda 2TB HDD", price: "₱ 3,500.00", image1: "Source Image/Shop/Storage/Seagate Barracuda 2TB HDD/1.webp", image2: "Source Image/Shop/Storage/Seagate Barracuda 2TB HDD/2.jpg", details: "High-capacity 2TB HDD for storing large files and media." },
  { category: "Storage", name: "Samsung 970 EVO Plus 500GB NVMe SSD", price: "₱ 4,000.00", image1: "Source Image/Shop/Storage/Samsung 970 EVO Plus 500GB NVMe SSD/1.jpg", image2: "Source Image/Shop/Storage/Samsung 970 EVO Plus 500GB NVMe SSD/2.avif", details: "Fast 500GB NVMe SSD for rapid data access and boot times." },
  { category: "Storage", name: "Crucial P5 1TB NVMe SSD", price: "₱ 6,000.00", image1: "Source Image/Shop/Storage/Crucial P5 1TB NVMe SSD/1.jpg", image2: "Source Image/Shop/Storage/Crucial P5 1TB NVMe SSD/2.webp", details: "1TB NVMe SSD for high-speed storage and performance." },
  { category: "Storage", name: "Ramsta 256GB SSD", price: "₱ 1,500.00", image1: "Source Image/Shop/Storage/Ramsta 256GB SSD/1.jpg", image2: "Source Image/Shop/Storage/Ramsta 256GB SSD/2.webp", details: "Compact 256GB SSD for quick system upgrades." },
  { category: "Television", bestSelling: true, name: "NVision 43\" 4K UHD TV", price: "₱ 15,000.00", image1: "Source Image/Shop/Television/NVision 43 inch 4K UHD TV/1.png", image2: "Source Image/Shop/Television/NVision 43 inch 4K UHD TV/2.webp", details: "43-inch 4K UHD smart TV for immersive home entertainment." },
  { category: "Monitor", bestSelling: true, name: "LG 24MP59G 24\" Gaming Monitor", price: "₱ 7,000.00", image1: "Source Image/Shop/Monitor/LG 24MP59G 24 inch Gaming Monitor/1.jpg", image2: "Source Image/Shop/Monitor/LG 24MP59G 24 inch Gaming Monitor/2.jpg", details: "24-inch LG gaming monitor with fast refresh rate and vivid colors." },
  { category: "Monitor", bestSelling: true, name: "Inplay 24\" Gaming Monitor", price: "₱ 5,000.00", image1: "Source Image/Shop/Monitor/Inplay 24 inch Gaming Monitor/1.jpg", image2: "Source Image/Shop/Monitor/Inplay 24 inch Gaming Monitor/2.jpg", details: "24-inch Inplay monitor designed for smooth gaming visuals." },
  { category: "Monitor", bestSelling: true, name: "Inplay 27\" Gaming Monitor", price: "₱ 7,000.00", image1: "Source Image/Shop/Monitor/Inplay 27 inch Gaming Monitor/1.jpg", image2: "Source Image/Shop/Monitor/Inplay 27 inch Gaming Monitor/2.jpg", details: "27-inch Inplay gaming monitor for immersive gameplay experience." }
];

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initSearchBox();
  initShoppingPage();
  initProductSearchPage();
  initProductDetailPage();
});

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll("section, .page-content > div").forEach((section) => {
    section.classList.add("reveal-seam");
    observer.observe(section);
  });
}

function initSearchBox() {
  const searchInput = document.getElementById("mainSearchInput") || document.getElementById("searchInput");
  const searchBtn = document.getElementById("mainSearchBtn") || document.getElementById("searchBtn");
  const suggestionsPanel = document.getElementById("searchSuggestions");

  if (!searchInput || !suggestionsPanel) return;

  searchInput.addEventListener("input", () => renderSuggestions(searchInput.value, suggestionsPanel));
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSearchSubmit(searchInput.value);
  });

  searchBtn?.addEventListener("click", () => handleSearchSubmit(searchInput.value));

  suggestionsPanel.addEventListener("click", (event) => {
    const suggestion = event.target.closest(".search-suggestion-item");
    if (!suggestion) return;

    const value = suggestion.dataset.value;
    const type = suggestion.dataset.type;
    searchInput.value = value;
    suggestionsPanel.classList.remove("show");

    if (isProductSearchPage()) {
      renderSearchResults(value, type);
    } else {
      goToProductSearch(value);
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) {
      suggestionsPanel.classList.remove("show");
    }
  });
}

function initShoppingPage() {
  const grid = document.getElementById("productsGrid");
  if (!grid || isProductSearchPage()) return;

  // Initialize shopping page with all products
  renderShoppingProducts(allProducts);
  displayBestSellingImage();
  renderCategoryGrid();

  // Setup category button event listeners
  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", function() {
      // Extract category name from the text span (excluding emoji icon)
      const category = this.querySelector('.category-button-text')?.textContent.trim();
      if (category) {
        goToProductSearch(category);
      }
    });
  });

  // Setup best-selling hero click
  document.getElementById("bestSellingHero")?.addEventListener("click", () => {
    goToProductSearch("Best Selling");
  });

  // Setup search input for shopping page
  const searchInput = document.querySelector(".search-container input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const query = this.value.trim().toLowerCase();
      const searchSuggestions = document.getElementById("searchSuggestions");
      
      if (query.length === 0) {
        searchSuggestions.classList.remove("show");
        return;
      }

      const categories = [...new Set(allProducts.map(p => p.category))];
      const matchingCategories = categories.filter(cat => cat.toLowerCase().includes(query));
      const matchingProducts = allProducts.filter(product => product.name.toLowerCase().includes(query));

      let suggestionsHTML = '';

      if (matchingCategories.length > 0) {
        suggestionsHTML += matchingCategories.map(category => `
          <div class="search-suggestion-item category-suggestion" onclick="goToProductSearch('${escapeAttribute(category)}')">
            <div class="suggestion-name">${escapeHTML(category)}</div>
          </div>
        `).join('');
      }

      if (matchingProducts.length > 0) {
        suggestionsHTML += matchingProducts.map(product => `
          <div class="search-suggestion-item product-suggestion" onclick="goToProductSearch('${escapeAttribute(product.name)}')">
            <div class="suggestion-name">${escapeHTML(product.name)}</div>
          </div>
        `).join('');
      }

      if (suggestionsHTML === '') {
        searchSuggestions.classList.remove("show");
        return;
      }

      searchSuggestions.innerHTML = suggestionsHTML;
      searchSuggestions.classList.add("show");
    });
  }

  // Close suggestions when clicking outside
  document.addEventListener("click", function(event) {
    const searchContainer = document.querySelector(".search-container");
    const searchSuggestions = document.getElementById("searchSuggestions");
    if (searchContainer && !event.target.closest(".search-container")) {
      searchSuggestions?.classList.remove("show");
    }
  });
}

function initProductSearchPage() {
  if (!isProductSearchPage()) return;

  const searchInput = document.getElementById("searchInput");
  const query = new URLSearchParams(window.location.search).get("search");

  if (query) {
    if (searchInput) searchInput.value = query;
    renderSearchResults(query);
    return;
  }

  showSearchPrompt();
}

function renderSuggestions(rawQuery, suggestionsPanel) {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    suggestionsPanel.classList.remove("show");
    suggestionsPanel.innerHTML = "";
    return;
  }

  const categories = [...new Set(allProducts.map((product) => product.category))];
  const matchingCategories = categories.filter((category) => category.toLowerCase().includes(query));
  const matchingProducts = allProducts.filter((product) => product.name.toLowerCase().includes(query));

  const suggestions = [
    ...matchingCategories.map((category) => ({ type: "category", value: category, label: category })),
    ...matchingProducts.map((product) => ({ type: "product", value: product.name, label: product.name }))
  ];

  if (suggestions.length === 0) {
    suggestionsPanel.classList.remove("show");
    suggestionsPanel.innerHTML = "";
    return;
  }

  suggestionsPanel.innerHTML = suggestions.map((suggestion) => `
    <div class="search-suggestion-item ${suggestion.type === "category" ? "category-suggestion" : ""}"
      data-type="${suggestion.type}"
      data-value="${escapeAttribute(suggestion.value)}">
      <div class="suggestion-name">${escapeHTML(suggestion.label)}</div>
    </div>
  `).join("");
  suggestionsPanel.classList.add("show");
}

function handleSearchSubmit(rawQuery) {
  const query = rawQuery.trim();

  if (isProductSearchPage()) {
    renderSearchResults(query);
    return;
  }

  if (query) goToProductSearch(query);
}

function renderShoppingProducts(productsToShow) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = productsToShow.map((product) => `
    <div class="product-card" onclick="goToProductDetail('${escapeAttribute(product.name)}')">
      <div class="product-image-container">
        <img src="${assetPath(product.image1)}" alt="${escapeAttribute(product.name)}" class="product-image">
      </div>
      <div class="product-info">
        <div class="product-name">${escapeHTML(product.name)}</div>
        <div class="product-price">${escapeHTML(product.price)}</div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation()">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function renderSearchResults(rawQuery, suggestionType = "") {
  const grid = document.getElementById("productsGrid");
  const searchSuggestions = document.getElementById("searchSuggestions");
  const query = rawQuery.trim();

  if (!grid) return;
  searchSuggestions?.classList.remove("show");

  if (!query) {
    showSearchPrompt();
    return;
  }

  const lowerQuery = query.toLowerCase();
  let filteredProducts;

  if (lowerQuery === "best selling") {
    filteredProducts = allProducts.filter((product) => product.bestSelling);
  } else if (suggestionType === "category") {
    filteredProducts = allProducts.filter((product) => product.category === query);
  } else if (suggestionType === "product") {
    filteredProducts = allProducts.filter((product) => product.name === query);
  } else {
    filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = '<div class="no-results-message">No products found matching your search. Try a different search term.</div>';
    return;
  }

  grid.innerHTML = filteredProducts.map((product) => {
    const rating = (4.5 + Math.random() * 0.5).toFixed(1);
    return `
    <div class="search-product-card" onclick="goToProductDetail('${escapeAttribute(product.name)}')">
      <div class="search-card-images">
        <div class="search-card-image">
          <img src="${assetPath(product.image1)}" alt="${escapeAttribute(product.name)} - Image 1" class="product-image">
        </div>
        <div class="search-card-image">
          <img src="${assetPath(product.image2)}" alt="${escapeAttribute(product.name)} - Image 2" class="product-image">
        </div>
      </div>
      <div class="search-card-info">
        <div class="search-card-name">${escapeHTML(product.name)}</div>
        <div class="search-card-price">${escapeHTML(product.price)}</div>
        <div class="search-card-rating">⭐ ${rating} Rating</div>
        <div class="search-card-details">${escapeHTML(product.details)}</div>
        <div class="search-card-buttons" onclick="event.stopPropagation()">
          <button class="search-btn add-to-cart-btn">Add to Cart</button>
          <button class="search-btn buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  `}).join("");
}

function displayBestSellingImage() {
  const image = document.getElementById("bestSellingImage");
  const bestSellingProducts = allProducts.filter((product) => product.bestSelling);

  if (!image || bestSellingProducts.length === 0) return;

  const product = bestSellingProducts[Math.floor(Math.random() * bestSellingProducts.length)];
  image.src = assetPath(product.image1);
  image.alt = product.name;
}

function getCategoryImage(category) {
  const product = allProducts.find(p => p.category === category);
  return product ? assetPath(product.image1) : "";
}

function renderCategoryGrid() {
  const categoryGridElement = document.getElementById("categoryGrid");
  if (!categoryGridElement) return;

  // Get unique categories from products, excluding Monitor
  const categories = [...new Set(allProducts.map(p => p.category))].filter(cat => cat !== "Monitor");
  
  // Create category buttons HTML
  const categoryButtonsHTML = categories.map(category => {
    const imageUrl = getCategoryImage(category);
    const backgroundStyle = imageUrl ? `background-image: url('${imageUrl}');` : "";
    
    return `
      <button class="category-button">
        <div class="category-image-frame" style="${backgroundStyle}"></div>
        <span class="category-button-text">${escapeHTML(category)}</span>
      </button>
    `;
  }).join('');
  
  categoryGridElement.innerHTML = categoryButtonsHTML;
}

function filterShoppingCategory(category) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  // Filter products by category
  const filtered = allProducts.filter(p => p.category === category);
  renderShoppingProducts(filtered);

  // Update active button state
  document.querySelectorAll(".category-button").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".category-button").forEach(btn => {
    const btnText = btn.textContent.trim();
    if (btnText.includes(category) || category.includes(btnText)) {
      btn.classList.add("active");
    }
  });

  // Clear search input
  const searchInput = document.querySelector(".search-container input");
  if (searchInput) {
    searchInput.value = "";
  }
  const searchSuggestions = document.getElementById("searchSuggestions");
  if (searchSuggestions) {
    searchSuggestions.classList.remove("show");
  }
}

function showBestSellingProducts() {
  const bestSellingProducts = allProducts.filter(p => p.bestSelling === true);
  
  if (bestSellingProducts.length > 0) {
    const grid = document.getElementById("productsGrid");
    if (grid) {
      renderShoppingProducts(bestSellingProducts);
      
      // Update active button state
      document.querySelectorAll(".category-button").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Scroll to products section
      document.querySelector(".products-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function initProductDetailPage() {
  if (!isProductDetailPage()) return;

  const params = new URLSearchParams(window.location.search);
  const productName = params.get("product");

  if (!productName) {
    window.location.href = "Shopping.html";
    return;
  }

  const product = allProducts.find(p => p.name === productName);

  if (!product) {
    window.location.href = "Shopping.html";
    return;
  }

  document.getElementById("productImage1").src = assetPath(product.image1);
  document.getElementById("productImage2").src = assetPath(product.image2);
  document.getElementById("mainImage").src = assetPath(product.image1);
  document.getElementById("productCategory").textContent = product.category;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productRating").textContent = "⭐ 4.5 Rating";
  document.getElementById("productDescription").textContent = product.details;
  document.title = `${product.name} - ArdCom Electronics`;

  initQuantityControls();
}

let currentImage = 1;

function switchImage(imageNum) {
  const mainImage = document.getElementById("mainImage");
  const image1 = document.getElementById("productImage1");
  const image2 = document.getElementById("productImage2");
  const thumbs = document.querySelectorAll(".product-detail-thumb");

  if (imageNum === 1) {
    mainImage.src = image1.src;
    currentImage = 1;
  } else {
    mainImage.src = image2.src;
    currentImage = 2;
  }

  thumbs.forEach(thumb => thumb.classList.remove("selected"));
  thumbs[imageNum - 1].classList.add("selected");
}

function initQuantityControls() {
  const qtyInput = document.getElementById("quantityInput");
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus = document.getElementById("qtyPlus");

  if (!qtyInput || !qtyMinus || !qtyPlus) return;

  qtyMinus.addEventListener("click", () => {
    const current = parseInt(qtyInput.value) || 1;
    if (current > 1) qtyInput.value = current - 1;
  });

  qtyPlus.addEventListener("click", () => {
    const current = parseInt(qtyInput.value) || 1;
    if (current < 99) qtyInput.value = current + 1;
  });

  qtyInput.addEventListener("change", () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val < 1) val = 1;
    if (val > 99) val = 99;
    qtyInput.value = val;
  });
}

function isProductDetailPage() {
  return /\/Pages\/Product\.html|\\Pages\\Product\.html/i.test(decodeURIComponent(window.location.pathname));
}

function goToProductDetail(productName) {
  const page = isInPagesFolder() ? "Product.html" : "Pages/Product.html";
  window.location.href = `${page}?product=${encodeURIComponent(productName)}`;
}

function showSearchPrompt() {
  const grid = document.getElementById("productsGrid");
  if (grid) {
    grid.innerHTML = '<div class="no-results-message">Enter a search term and click the search button to find products</div>';
  }
}

function goToProductSearch(query) {
  window.location.href = `${productSearchPath()}?search=${encodeURIComponent(query)}`;
}

function productSearchPath() {
  return isInPagesFolder() ? "Product Search.html" : "Pages/Product Search.html";
}

function assetPath(path) {
  return isInPagesFolder() ? `../${path}` : path;
}

function isProductSearchPage() {
  const pathname = decodeURIComponent(window.location.pathname).toLowerCase();
  return pathname.endsWith("/product search.html") ||
    pathname.endsWith("\\product search.html");
}

function isInPagesFolder() {
  return /\/pages\/|\\pages\\/i.test(decodeURIComponent(window.location.pathname));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
