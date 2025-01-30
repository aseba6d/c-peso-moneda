const fecha = new Date();
const urlTheme = document.getElementById("csstheme");
const urlParams = new URLSearchParams(window.location.search);
let urlVar1 = urlParams.get("tema");
let urlVar2 = urlParams.get("on");
let urlVar3 = urlParams.get("off");
let FechaCdg, DefCdg, UrlCdg;
let datostheme = [
    {
        name: "asebabd",
        file: "css/asebabd.css",
        type: 'Url',
        urlCodigo: 0,
        default: true
    },
    {
        name: "Fiesta Patrias",
        file: "css/18Sept.css",
        type: 'fecha',
        incio: { dia: 1, mes: 9 },
        fin: { dia: 30, mes: 9 },
        urlCodigo: 1,
        default: false
    },
    {
        name: "Navidad",
        file: "css/navidad.css",
        type: 'fecha',
        incio: { dia: 1, mes: 12 },
        fin: { dia: 31, mes: 12 },
        urlCodigo: 2,
        default: false
    },
    {
        name: "Hello Kitty",
        file: "css/theme-3.css",
        type: 'Url',
        urlCodigo: 3,
        default: false
    },
    {
        name: "Pokémon",
        file: "css/theme-4.css",
        type: 'Url',
        urlCodigo: 4,
        default: false
    },
    {
        name: "SlamDunk",
        file: "css/theme-5.css",
        type: 'Url',
        urlCodigo: 5,
        default: false
    },
    {
        name: "DragonBall Z",
        file: "css/theme-6.css",
        type: 'Url',
        urlCodigo: 6,
        default: false
    },
    {
        name: "Inuyasha",
        file: "css/theme-7.css",
        type: 'Url',
        urlCodigo: 7,
        default: false
    },
    {
        name: "Liliana",
        file: "css/liliana.css",
        type: 'fecha',
        incio: { dia: 29, mes: 1 },
        fin: { dia: 9, mes: 2 },
        urlCodigo: 8,
        default: false
    }
];
datostheme.forEach(temas => {
    if (temas.type === 'Url' && temas.default === true) {
        DefCdg = temas.urlCodigo;
    }
    if (temas.type === 'fecha') {
        let xy = new Date(`${fecha.getFullYear()}/${temas.incio.mes}/${temas.incio.dia} 00:00:00`);
        let yz = new Date(`${fecha.getFullYear()}/${temas.fin.mes}/${temas.fin.dia} 23:59:59`);
        if (xy <= fecha && yz >= fecha) {
            FechaCdg = temas.urlCodigo;
        }
    }
});
if ((urlVar2 === '' || urlVar2 === null) && urlVar3 !== '' && FechaCdg !== undefined) {
    urlTheme.href = datostheme[FechaCdg].file;
} else if (parseInt(urlVar1) < datostheme.length && (urlVar1 !== null || urlVar1 !== '')) {
    urlTheme.href = datostheme[parseInt(urlVar1)].file;
} else {
    urlTheme.href = datostheme[DefCdg].file;
}
/* function changetheme() {};
window.addEventListener('load', changetheme); */