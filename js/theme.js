const fecha = new Date();
const urlTheme = document.getElementById("csstheme");
const urlParams = new URLSearchParams(window.location.search);
let urlVar1 = urlParams.get("tema");
let urlVar2 = urlParams.get("on");
let urlVar3 = urlParams.get("off");
let FechaCdg;
const DefCdg = [];
const UrlCdg = [], UrlCdg2  = [];
let datostheme = [
    {
        name: "asebabd",
        file: "css/asebabd.css",
        type: ['default', 'Url'],
        urlCodigo: 0
    },
    {
        name: "Fiesta Patrias",
        file: "css/18Sept.css",
        type: ['fecha'],
        incio: { dia: 1, mes: 9 },
        fin: { dia: 30, mes: 9 }
    },
    {
        name: "Navidad",
        file: "css/navidad.css",
        type: ['fecha'],
        incio: { dia: 1, mes: 12 },
        fin: { dia: 31, mes: 12 }
    },
    {
        name: "Pokémon",
        file: "css/theme-4.css",
        type: ['Url'],
        urlCodigo: 1
    },
    {
        name: "SlamDunk",
        file: "css/theme-5.css",
        type: ['Url'],
        urlCodigo: 2
    },
    {
        name: "Hello Kitty",
        file: "css/theme-3.css",
        type: ['Url'],
        urlCodigo: 3
    },
    {
        name: "DragonBall Z",
        file: "css/theme-6.css",
        type: ['Url'],
        urlCodigo: 4
    },
    {
        name: "Inuyasha",
        file: "css/theme-7.css",
        type: ['Url'],
        urlCodigo: 5
    },
    {
        name: "Liliana",
        file: "css/liliana.css",
        type: ['default', 'Url'],
        urlCodigo: 6
    },
    {
        name: "Sebastian",
        file: "css/sebastian.css",
        type: ['default', 'Url'],
        urlCodigo: 7
    },
    {
        name: "Charlotte",
        file: "css/charlotte.css",
        type: ['default', 'Url'],
        urlCodigo: 8
    },
    {
        name: "Elisa",
        file: "css/elisa.css",
        type: ['default', 'Url'],
        urlCodigo: 9
    },
    {
        name: "Emily",
        file: "css/emily.css",
        type: ['default', 'Url'],
        urlCodigo: 10
    },
    {
        name: "Jair",
        file: "css/jair.css",
        type: ['default', 'Url'],
        urlCodigo: 11
    },
    {
        name: "Nao-Ya",
        file: "css/7a04m.css",
        type: ['default', 'Url'],
        urlCodigo: 12
    },
    {
        name: "Pequeña Lulu",
        file: "css/pqlulu.css",
        type: ['Url'],
        urlCodigo: 13
    }
];
datostheme.forEach((temas, idx) => {
    if (temas.type.indexOf('default') !== -1) {
        DefCdg.push(temas.file);
    }
    if (temas.type.indexOf('fecha') !== -1) {
        let xy = new Date(`${fecha.getFullYear()}/${temas.incio.mes}/${temas.incio.dia} 00:00:00`);
        let yz = new Date(`${fecha.getFullYear()}/${temas.fin.mes}/${temas.fin.dia} 23:59:59`);
        if (xy <= fecha && yz >= fecha) {
            FechaCdg = idx;
        }
    }
    if (temas.type.indexOf('Url') !== -1) {
        UrlCdg.push(temas.urlCodigo);
        UrlCdg2.push(idx);
    }
});
if ((urlVar2 === '' || urlVar2 === null) && urlVar3 !== '' && FechaCdg !== undefined) {
    urlTheme.href = datostheme[FechaCdg].file;
} else if (parseInt(urlVar1) < UrlCdg.length && (urlVar1 !== null || urlVar1 !== '') && (UrlCdg.indexOf(parseInt(urlVar1)) !== -1)) {
    urlTheme.href = datostheme[UrlCdg2[UrlCdg.indexOf(parseInt(urlVar1))]].file;

} else {
    urlTheme.href = DefCdg[getRandomInt(DefCdg.length)];
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
/* function changetheme() {};
window.addEventListener('load', changetheme); */