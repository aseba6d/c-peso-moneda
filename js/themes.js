document.addEventListener("DOMContentLoaded", () => {
  const colorPalettes = [
    { name: "Navideño", className: "theme-christmas", fixed: true, monthRange: [11, 11], dayRange: null, lastDaysOfMonth: -1, hourRange: null, viewportTarget: "desktop" },
    { name: "Fiesta Patrias", className: "theme-fiesta-patrias", fixed: true, monthRange: [8, 8], dayRange: null, lastDaysOfMonth: -1, hourRange: null, viewportTarget: "desktop" },
    { name: "Azul", className: "theme-blue", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 1 }, viewportTarget: "laptop" },
    { name: "Rojo", className: "theme-red", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 2 }, viewportTarget: "laptop" },
    { name: "Verde", className: "theme-green", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 3 }, viewportTarget: "laptop" },
    { name: "Violeta", className: "theme-violet", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 4 }, viewportTarget: "laptop" },
    { name: "Rosado", className: "theme-rosado", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 5 }, viewportTarget: "laptop" },
    { name: "Naranja", className: "theme-naranja", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 6 }, viewportTarget: "laptop" },
    { name: "Cafe", className: "theme-cafe", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 7 }, viewportTarget: "laptop" },
    { name: "Yoamero", className: "theme-yoamero", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 1 }, viewportTarget: "desktop" },
    { name: "Yoamero/Liliana", className: "theme-yoamero-lily", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 2 }, viewportTarget: "desktop" },
    { name: "Yoamero/Sebastían", className: "theme-yoamero-sebastian", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 3 }, viewportTarget: "desktop" },
    { name: "Yoamero/Elisa", className: "theme-yoamero-elisa", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 4 }, viewportTarget: "desktop" },
    { name: "Yoamero/Jair", className: "theme-yoamero-jair", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 5 }, viewportTarget: "desktop" },
    { name: "Yoamero/Emily", className: "theme-yoamero-emily", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 6 }, viewportTarget: "desktop" },
    { name: "Yoamero/Charlotte", className: "theme-yoamero-charlotte", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByDefault: true, defaultOrder: 7 }, viewportTarget: "desktop" },
    { name: "Pokémon", className: "theme-pkm", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByUrl: true, urlOrder: 1 }, viewportTarget: "desktop" },
    { name: "Slam Dunk", className: "theme-slam-dunk", fixed: false, monthRange: null, dayRange: null, lastDaysOfMonth: -1, hourRange: null, availability: { availableByUrl: true, urlOrder: 2 }, viewportTarget: "desktop" }
  ];

  const htmlElement = document.documentElement;
  const paletteToggleBtn = document.getElementById("palette-toggle-btn");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  const footerThemeCredit = document.getElementById("footer-theme-credit");
  const seasonalThemeSection = document.getElementById("seasonal-theme-section");
  const seasonalThemeToggle = document.getElementById("seasonal-theme-toggle");
  const urlThemesSection = document.getElementById("url-themes-section");
  const urlThemeButtonsContainer = urlThemesSection.querySelector(".theme-url-buttons-container");

  let currentPalette = null;

  function removeAllThemeClasses() {
    colorPalettes.forEach((palette) => {
      htmlElement.classList.remove(palette.className);
    });
  }

  function applyPalette(palette, saveToStorage = false) {
    removeAllThemeClasses();
    htmlElement.classList.add(palette.className);
    currentPalette = palette;
    if (saveToStorage) {
      localStorage.setItem("lastSelectedPalette", palette.className);
    }
    footerThemeCredit.textContent = window.innerWidth >= 1280 ? `Tema: ${palette.name}` : "";

    const currentLightDarkMode =
      localStorage.getItem("color-theme-small-viewport") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyLightDarkMode(currentLightDarkMode, false);
  }

  function applyLightDarkMode(theme, saveToLocalStorage = true) {
    htmlElement.classList.toggle("dark", theme === "dark");
    if (saveToLocalStorage) {
      localStorage.setItem("color-theme-small-viewport", theme);
    }
    updateThemeIcons(theme);
  }

  function updateThemeIcons(currentTheme) {
    themeToggleLightIcon.style.display = currentTheme === "dark" ? "block" : "none";
    themeToggleDarkIcon.style.display = currentTheme === "dark" ? "none" : "block";
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getMatchingFixedTheme(currentDate, disableFixedThemes) {
    if (disableFixedThemes) return null;

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDayOfMonth = currentDate.getDate();
    const currentHourOfDay = currentDate.getHours();
    let bestMatch = null;
    let highestSpecificityScore = -1;

    colorPalettes.forEach((palette) => {
      if (palette.fixed) {
        let matches = true;
        let specificityScore = 0;

        if (palette.monthRange) {
          const [startMonth, endMonth] = palette.monthRange;
          if (currentMonth < startMonth || currentMonth > endMonth) {
            matches = false;
          } else {
            specificityScore += 1;
          }
        }

        if (matches) {
          if (palette.lastDaysOfMonth !== -1 && palette.lastDaysOfMonth !== null) {
            const totalDaysInMonth = getDaysInMonth(currentYear, currentMonth);
            const startDayForRange = totalDaysInMonth - palette.lastDaysOfMonth + 1;
            if (currentDayOfMonth < startDayForRange || currentDayOfMonth > totalDaysInMonth) {
              matches = false;
            } else {
              specificityScore += 4;
            }
          } else if (palette.dayRange) {
            const [startDay, endDay] = palette.dayRange;
            if (currentDayOfMonth < startDay || currentDayOfMonth > endDay) {
              matches = false;
            } else {
              specificityScore += 4;
            }
          }
        }

        if (matches && palette.hourRange) {
          const [startHour, endHour] = palette.hourRange;
          if (currentHourOfDay < startHour || currentHourOfDay > endHour) {
            matches = false;
          } else {
            specificityScore += 8;
          }
        }

        if (matches && specificityScore > highestSpecificityScore) {
          highestSpecificityScore = specificityScore;
          bestMatch = palette;
        }
      }
    });
    return bestMatch;
  }

  function getEffectivePalettes(viewportTarget, includeUrlAvailable = false) {
    return colorPalettes
      .filter(p =>
        !p.fixed &&
        p.viewportTarget === viewportTarget &&
        (p.availability?.availableByDefault || (includeUrlAvailable && p.availability?.availableByUrl))
      )
      .sort((a, b) => (a.availability?.defaultOrder || 999) - (b.availability?.defaultOrder || 999));
  }

  function updateUrlParameter(key, value) {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
  }

  function renderUrlThemes() {
    urlThemeButtonsContainer.innerHTML = '';
    const urlAvailableThemes = colorPalettes.filter(p => p.availability?.availableByUrl && p.viewportTarget === 'desktop');

    urlAvailableThemes.sort((a, b) => (a.availability?.urlOrder || 999) - (b.availability?.urlOrder || 999));

    const urlParams = new URLSearchParams(window.location.search);
    const currentTemaUrl = urlParams.get('tema');
    const isOffParamPresent = urlParams.get('off') !== null;

    urlAvailableThemes.forEach(theme => {
      const button = document.createElement('button');
      button.textContent = theme.name;
      button.classList.add('theme-url-btn');
      button.dataset.urlOrder = theme.availability.urlOrder;

      if (currentTemaUrl && parseInt(currentTemaUrl) === theme.availability.urlOrder && !isOffParamPresent) {
        button.classList.add('active');
      }

      urlThemeButtonsContainer.appendChild(button);
    });
  }

  function checkViewportAndThemes() {
    const currentDate = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const disableFixedThemes = urlParams.get("off") !== null;
    let resolvedPalette = null;

    const isDesktopViewport = window.innerWidth >= 1280;
    const temaParam = urlParams.get("tema");
    const isTemaLista = temaParam === "lista";
    
    const isFixedThemeConfiguredForDate = getMatchingFixedTheme(currentDate, false) !== null;

    if (isDesktopViewport && isTemaLista && isFixedThemeConfiguredForDate) {
        seasonalThemeSection.style.display = 'flex';
        seasonalThemeToggle.checked = !disableFixedThemes;
    } else {
        seasonalThemeSection.style.display = 'none';
        seasonalThemeToggle.checked = false;
    }

    if (isDesktopViewport && isTemaLista) {
        urlThemesSection.style.display = 'block';
        renderUrlThemes();
    } else {
        urlThemesSection.style.display = 'none';
    }

    const initialLightDarkMode =
      localStorage.getItem("color-theme-small-viewport") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const activeFixedTheme = getMatchingFixedTheme(currentDate, disableFixedThemes);

    if (activeFixedTheme) {
      resolvedPalette = activeFixedTheme;
    } else {
      let viewportTarget;
      if (window.innerWidth >= 1280) {
        viewportTarget = "desktop";
      } else if (window.innerWidth >= 1024) {
        viewportTarget = "laptop";
      } else {
        removeAllThemeClasses();
        applyLightDarkMode(initialLightDarkMode, false);
        footerThemeCredit.textContent = "";
        return;
      }

      const relevantPalettes = getEffectivePalettes(viewportTarget, true);

      if (temaParam && temaParam !== "lista" && !isNaN(parseInt(temaParam))) {
        const requestedUrlOrder = parseInt(temaParam);
        const selectedThemeFromUrl = relevantPalettes.find(
          (p) => p.availability?.availableByUrl && p.availability?.urlOrder === requestedUrlOrder
        );
        if (selectedThemeFromUrl) {
          resolvedPalette = selectedThemeFromUrl;
        }
      }

      if (!resolvedPalette) {
        const lastSelectedPaletteClassName = localStorage.getItem("lastSelectedPalette");
        if (lastSelectedPaletteClassName) {
          const lastSelectedPalette = relevantPalettes.find(
            (p) => p.className === lastSelectedPaletteClassName
          );
          if (lastSelectedPalette) {
            resolvedPalette = lastSelectedPalette;
          }
        }
      }

      if (!resolvedPalette) {
        const defaultPalettes = relevantPalettes.filter(p => p.availability?.availableByDefault);
        if (defaultPalettes.length > 0) {
          resolvedPalette = defaultPalettes[0];
        } else {
          resolvedPalette = null;
        }
      }
    }

    if (resolvedPalette) {
      applyPalette(resolvedPalette, false);
    } else {
      removeAllThemeClasses();
      footerThemeCredit.textContent = "";
      applyLightDarkMode(initialLightDarkMode, false);
    }
  }

  paletteToggleBtn.addEventListener("click", () => {
    if (window.innerWidth < 1024) return;

    const currentDate = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const disableFixedThemes = urlParams.get("off") !== null;

    if (getMatchingFixedTheme(currentDate, disableFixedThemes) && !disableFixedThemes) return;

    const viewportTarget = window.innerWidth >= 1280 ? "desktop" : "laptop";
    const palettesToCycle = getEffectivePalettes(viewportTarget, false);

    if (palettesToCycle.length === 0) return;

    let currentIndex = palettesToCycle.findIndex(p => p.className === currentPalette.className);
    if (currentIndex === -1) {
      currentIndex = -1;
    }

    const nextIndex = (currentIndex + 1) % palettesToCycle.length;
    const nextPalette = palettesToCycle[nextIndex];
    applyPalette(nextPalette, true);
  });

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
    applyLightDarkMode(currentTheme === "dark" ? "light" : "dark");
  });

  seasonalThemeToggle.addEventListener('change', () => {
    if (seasonalThemeToggle.checked) {
      updateUrlParameter('off', null);
    } else {
      updateUrlParameter('off', 'true');
    }
    checkViewportAndThemes();
  });

  urlThemeButtonsContainer.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.theme-url-btn');
    if (clickedButton) {
      const urlOrder = clickedButton.dataset.urlOrder;
      updateUrlParameter('tema', urlOrder);
      checkViewportAndThemes();
    }
  });

  checkViewportAndThemes();
  window.addEventListener("resize", checkViewportAndThemes);
});