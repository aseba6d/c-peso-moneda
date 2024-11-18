let themeName = new Array(),
    theme_file = new Array(),
    theme_condition1 = new Array(),
    theme_condition2 = new Array();
const fecha = new Date(),
    urlTheme = document.getElementById("csstheme");
// themes 1
themeName[0] = "asebabd"; //nombre
theme_file[0] = "css/asebabd.css"; //nombre archivo
theme_condition1[0] = 0; //Condición 1 a mostrar
theme_condition2[0] = 0; //Condición 2 a mostrar
// themes 2
themeName[1] = "Fiesta Patrias";
theme_file[1] = "css/18-sept.css";
theme_condition1[1] = 0;
theme_condition2[1] = 9;
// themes 4
themeName[2] = "Navidad";
theme_file[2] = "css/navidad.css";
theme_condition1[2] = 0;
theme_condition2[2] = 12;

function changetheme() {
    urlTheme.href = theme_file[0];
    if (fecha.getMonth() + 1 === theme_condition2[2]) {
        urlTheme.href = theme_file[2];
    }
    if (fecha.getMonth() + 1 === theme_condition2[3]) {
        urlTheme.href = theme_file[3];
    }
}
window.addEventListener('load', changetheme);