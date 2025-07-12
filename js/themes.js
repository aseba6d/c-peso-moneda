document.addEventListener("DOMContentLoaded", () => {
  const colorPalettes = [
    {
      name: "Navideño",
      className: "theme-christmas",
      fixed: true,
      monthRange: [11, 11],
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: false,
      availableByUrl: false,
      viewportTarget: "desktop",
    },
    {
      name: "Fiesta Patrias",
      className: "theme-fiesta-patrias",
      fixed: true,
      monthRange: [8, 8],
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: false,
      availableByUrl: false,
      viewportTarget: "desktop",
    },
    {
      name: "Azul",
      className: "theme-blue",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 1,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Rojo",
      className: "theme-red",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 2,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Verde",
      className: "theme-green",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 3,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Violeta",
      className: "theme-violet",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 4,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Rosado",
      className: "theme-rosado",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 5,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Naranja",
      className: "theme-naranja",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 6,
      urlOrder: null,
      viewportTarget: "laptop",
    },
    {
      name: "Cafe",
      className: "theme-cafe",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 7,
      urlOrder: null,
      viewportTarget: "laptop"
    },
    {
      name: "Yoamero",
      className: "theme-yoamero",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 1,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Liliana",
      className: "theme-yoamero-lily",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 2,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Sebastían",
      className: "theme-yoamero-sebastian",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 3,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Elisa",
      className: "theme-yoamero-elisa",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 4,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Jair",
      className: "theme-yoamero-jair",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 5,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Emily",
      className: "theme-yoamero-emily",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 6,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Yoamero/Charlotte",
      className: "theme-yoamero-charlotte",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: true,
      availableByUrl: false,
      defaultOrder: 7,
      urlOrder: null,
      viewportTarget: "desktop"
    },
    {
      name: "Pokémon",
      className: "theme-pkm",
      fixed: false,
      monthRange: null,
      dayRange: null,
      lastDaysOfMonth: -1,
      hourRange: null,
      availableByDefault: false, // Este era el problema, ya que no se incluía en relevantPalettes
      availableByUrl: true,
      defaultOrder: null,
      urlOrder: 1,
      viewportTarget: "desktop"
    }

  ];
  const htmlElement = document.documentElement;
  const paletteToggleBtn = document.getElementById("palette-toggle-btn");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const footerThemeCredit = document.getElementById("footer-theme-credit");
  let currentPalette = null;

  /**
   * Elimina todas las clases de tema del elemento HTML.
   */
  function removeAllThemeClasses() {
    colorPalettes.forEach((palette) => {
      htmlElement.classList.remove(palette.className);
    });
  }

  /**
   * Aplica una paleta de colores al documento.
   * @param {object} palette - El objeto de la paleta a aplicar.
   * @param {boolean} saveToStorage - Indica si la paleta debe guardarse en el almacenamiento local.
   */
  function applyPalette(palette, saveToStorage = false) {
    removeAllThemeClasses();
    htmlElement.classList.add(palette.className);
    currentPalette = palette;
    if (saveToStorage) {
      // Guarda el className de la paleta seleccionada en lugar de un índice
      localStorage.setItem("lastSelectedPalette", palette.className);
    }
    if (window.innerWidth >= 1280) {
      footerThemeCredit.textContent = `Tema: ${palette.name}`;
    } else {
      footerThemeCredit.textContent = "";
    }
    const currentLightDarkMode =
      localStorage.getItem("color-theme-small-viewport") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    applyLightDarkMode(currentLightDarkMode, false);
  }

  function applyLightDarkMode(theme, saveToLocalStorage = true) {
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    if (saveToLocalStorage) {
      localStorage.setItem("color-theme-small-viewport", theme);
    }
    updateThemeIcons(theme);
  }

  function updateThemeIcons(currentTheme) {
    if (currentTheme === "dark") {
      themeToggleLightIcon.style.display = "block";
      themeToggleDarkIcon.style.display = "none";
    } else {
      themeToggleDarkIcon.style.display = "block";
      themeToggleLightIcon.style.display = "none";
    }
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
          if (palette.lastDaysOfMonth !== -1) {
            const totalDaysInMonth = getDaysInMonth(currentYear, currentMonth);
            const startDayForRange =
              totalDaysInMonth - palette.lastDaysOfMonth + 1;
            if (
              currentDayOfMonth < startDayForRange ||
              currentDayOfMonth > totalDaysInMonth
            ) {
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

  /**
   * Verifica el viewport y aplica el tema adecuado según la lógica de prioridad.
   */
  function checkViewportAndThemes() {
    const currentDate = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const offParam = urlParams.get("off");
    const disableFixedThemes = offParam !== null;
    let resolvedPalette = null;
    let initialLightDarkMode =
      localStorage.getItem("color-theme-small-viewport") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    let targetFixedPalette = getMatchingFixedTheme(
      currentDate,
      disableFixedThemes
    );

    if (targetFixedPalette) {
      // Prioridad 1: Tema fijo (Navideño, Año Nuevo, Fiestas Patrias)
      resolvedPalette = targetFixedPalette;
    } else {
      let relevantPalettes = [];
      if (window.innerWidth >= 1280) {
        relevantPalettes = colorPalettes.filter(
          (p) =>
            !p.fixed &&
            (p.availableByDefault || p.availableByUrl) && // MODIFICADO: Incluir temas disponibles por URL
            p.viewportTarget === "desktop"
        );
      } else if (window.innerWidth >= 1024) {
        relevantPalettes = colorPalettes.filter(
          (p) =>
            !p.fixed &&
            (p.availableByDefault || p.availableByUrl) && // MODIFICADO: Incluir temas disponibles por URL
            p.viewportTarget === "laptop"
        );
      } else {
        // Para pantallas pequeñas, no se aplican temas de paleta, solo modo claro/oscuro
        removeAllThemeClasses();
        applyLightDarkMode(initialLightDarkMode, false);
        footerThemeCredit.textContent = "";
        return;
      }

      // Prioridad 2: Tema por URL (si 'tema' está en la URL)
      const temaParam = urlParams.get("tema");
      if (temaParam && !isNaN(parseInt(temaParam))) {
        const requestedUrlOrder = parseInt(temaParam);
        const selectedThemeFromUrl = relevantPalettes.find(
          (p) => p.availableByUrl && p.urlOrder === requestedUrlOrder
        );
        if (selectedThemeFromUrl) {
          resolvedPalette = selectedThemeFromUrl;
        }
      }

      // Prioridad 3: Último tema elegido por el usuario (desde localStorage)
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

      // Prioridad 4: Tema por defecto (el primero disponible por defecto, ordenado)
      if (!resolvedPalette) {
        const defaultPalettes = relevantPalettes
          .filter((p) => p.availableByDefault)
          .sort((a, b) => (a.defaultOrder || 999) - (b.defaultOrder || 999)); // Ordena por defaultOrder
        if (defaultPalettes.length > 0) {
          resolvedPalette = defaultPalettes[0]; // Toma el primero después de ordenar
        } else {
          resolvedPalette = null; // No hay paleta por defecto disponible
        }
      }
    }

    if (resolvedPalette) {
      applyPalette(resolvedPalette, false); // No guardar en el almacenamiento local al cargar
    } else {
      removeAllThemeClasses();
      footerThemeCredit.textContent = "";
      applyLightDarkMode(initialLightDarkMode, false);
    }
  }

  // Event listener para el botón de alternancia de paleta
  paletteToggleBtn.addEventListener("click", () => {
    // La visibilidad del botón ahora se controla completamente por CSS.
    // Esta lógica de JS solo se ejecuta si el botón es visible.
    if (window.innerWidth < 1024) return; // Solo para pantallas de laptop y desktop
    const currentDate = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const offParam = urlParams.get("off");
    const disableFixedThemes = offParam !== null;
    if (getMatchingFixedTheme(currentDate, disableFixedThemes)) return; // No ciclar si hay un tema fijo

    let palettesToCycle = [];
    if (window.innerWidth >= 1280) {
      palettesToCycle = colorPalettes.filter(
        (p) =>
          !p.fixed &&
          p.availableByDefault &&
          p.viewportTarget === "desktop" // Filtrar solo por desktop
      );
    } else {
      palettesToCycle = colorPalettes.filter(
        (p) =>
          !p.fixed &&
          p.availableByDefault &&
          p.viewportTarget === "laptop" // Filtrar solo por laptop
      );
    }
    if (palettesToCycle.length === 0) return;

    // Ordenar por defaultOrder para un ciclo consistente
    palettesToCycle.sort((a, b) => (a.defaultOrder || 999) - (b.defaultOrder || 999));

    // Encontrar la paleta actual en la lista ordenada
    let currentIndex = palettesToCycle.findIndex(p => p.className === currentPalette.className);
    if (currentIndex === -1) {
        // Si currentPalette no se encuentra en la lista ciclable (ej. era un tema fijo),
        // empezar desde el principio de la lista ciclable.
        currentIndex = -1;
    }

    let nextIndex = (currentIndex + 1) % palettesToCycle.length;
    const nextPalette = palettesToCycle[nextIndex];
    applyPalette(nextPalette, true); // Guardar la nueva paleta seleccionada
  });

  // Event listener para el botón de alternancia de tema (claro/oscuro)
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.classList.contains("dark")
      ? "dark"
      : "light";
    applyLightDarkMode(currentTheme === "dark" ? "light" : "dark");
  });

  // Llamadas iniciales al cargar la página
  checkViewportAndThemes();
  window.addEventListener("resize", checkViewportAndThemes);
});