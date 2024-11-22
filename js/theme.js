const fecha = new Date();
const urlTheme = document.getElementById("csstheme");
let datostheme = [
    {
        name: "Fiesta Patrias",
        file: "css/18Sept.css",
        incio: { dia: 1, mes: 9, year: 2025, hora: '00:00:00' },
        fin: { dia: 30, mes: 9, year: 2025, hora: '24:00:00' }
    },
    {
        name: "Navidad",
        file: "css/navidad.css",
        incio: { dia: 1, mes: 12, year: 2025, hora: '00:00:00' },
        fin: { dia: 31, mes: 12, year: 2025, hora: '24:00:00' }
    }
];

function changetheme() {
    let xy, yz;
    datostheme.forEach(temas => {
        xy = new Date(`${fecha.getFullYear()}/${temas.incio.mes}/${temas.incio.dia} ${temas.incio.hora}`);
        yz = new Date(`${fecha.getFullYear()}/${temas.fin.mes}/${temas.fin.dia} ${temas.fin.hora}`);
        if ((xy <= fecha) && (yz >= fecha)) {
            urlTheme.href = temas.file;
        }
    });
}
window.addEventListener('load', changetheme);