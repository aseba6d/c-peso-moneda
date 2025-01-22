const fecha = new Date();
const urlTheme = document.getElementById("csstheme");
const urlParams = new URLSearchParams(window.location.search);
let urlVar = urlParams.get("t");
if(urlVar === null) { urlVar = 0};
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
        incio: { dia: 1, mes: 9, hora: '00:00:00' },
        fin: { dia: 30, mes: 9, hora: '23:59:59' },
        urlCodigo: 1,
        default: false
    },
    {
        name: "Navidad",
        file: "css/navidad.css",
        type: 'fecha',
        incio: { dia: 1, mes: 12, hora: '00:00:00' },
        fin: { dia: 31, mes: 12, hora: '23:59:59' },
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
    }
];

function changetheme() {
    urlTheme.href = datostheme[0].file;
    datostheme.forEach(temas => {
        if ((parseInt(urlVar) === temas.urlCodigo) && (parseInt(urlVar) < datostheme.length)) {
                urlTheme.href = temas.file;
        } 
        if (temas.type === 'fecha') {
            let xy = new Date(`${fecha.getFullYear()}/${temas.incio.mes}/${temas.incio.dia} ${temas.incio.hora}`);
            let yz = new Date(`${fecha.getFullYear()}/${temas.fin.mes}/${temas.fin.dia} ${temas.fin.hora}`);
            if ((xy <= fecha) && (yz >= fecha)) {
                urlTheme.href = temas.file;
            }
        }
    });
}
window.addEventListener('load', changetheme);