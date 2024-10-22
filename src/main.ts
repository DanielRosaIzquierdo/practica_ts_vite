import { Activity } from "./utils/activity";
import { createClient, ErrorResponse, PhotosWithTotalResults } from 'pexels';


const endpoint = 'http://bored.api.lewagon.com/api/activity/';

document.getElementById('card')!.style.display = "none";
document.getElementById('card2')!.style.display = "none";


export const getActivity = () => {

    fetch(endpoint).then((respuesta) => respuesta.json()).then((data) => {
        console.log(data);
        let actividad: Activity = data;
        console.log(actividad.activity);
        document.getElementById('card')!.style.display = "flex";
        document.getElementById('titulo')!.textContent = `tipo: ${actividad.type}`;
        document.getElementById('subtitulo')!.textContent = `precio: ${actividad.price}`;
        document.getElementById('texto')!.textContent = `${actividad.activity}`;
        document.getElementById('subtituloAccesibilidad')!.textContent = `accesibilidad: ${actividad.accessibility}`;
        document.getElementById('subtituloNParticipantes')!.textContent = `participantes: ${actividad.participants}`;

        if (actividad.type === 'busywork') {
            getImage('img', 'work');
        } else {
            getImage('img', actividad.type);
        }

    }).catch((error) => console.log(error));

}

export const getActivityByType = (type: string) => {

    let endpointType: string = endpoint + '?type=' + type;

    fetch(endpointType).then((respuesta) => respuesta.json()).then((data) => {
        console.log(data);
        let actividad: Activity = data;
        console.log(actividad.activity);
        document.getElementById('card2')!.style.display = "flex";
        document.getElementById('titulo2')!.textContent = `tipo: ${actividad.type}`;
        document.getElementById('subtitulo2')!.textContent = `precio: ${actividad.price}`;
        document.getElementById('texto2')!.textContent = `${actividad.activity}`;
        document.getElementById('subtituloAccesibilidad2')!.textContent = `accesibilidad: ${actividad.accessibility}`;
        document.getElementById('subtituloNParticipantes2')!.textContent = `participantes: ${actividad.participants}`;
        getImage('imgType', type);

    }).catch((error) => console.log(error));

}


const getImage = (id: string, tipo: string) => {

    let numeroAleatorioEntero = Math.floor(Math.random() * 15);
    console.log(numeroAleatorioEntero);

    const client = createClient('uQCKTEnEFwyIJ3HJZoa30wYUbtlyqrdcJblyKnPt9Rv1MsOdNd67ECIr');
    const query = tipo;

    client.photos.search({ query, per_page: 15 })
        .then((response: PhotosWithTotalResults | ErrorResponse) => {
            if ('photos' in response) {
                if (response.photos.length > 0) {
                    const imgUrl = response.photos[numeroAleatorioEntero].src.original;
                    const imgElement = document.getElementById(id) as HTMLImageElement;
                    imgElement.src = imgUrl;
                    console.log(response);
                } else {
                    console.error('No se encontraron fotos.');
                }
            } else {
                console.error('Error fetching photos:', response);
            }
        })
        .catch((error: ErrorResponse) => {
            console.error('Error fetching photos:', error);
        });

}

document.getElementById('btnNewActivity')!.addEventListener("click", () => {
    getActivity();
})

document.getElementById('btnNewActivityByTypeRelaxation')!.addEventListener("click", () => {
    getActivityByType('relaxation');
})

document.getElementById('btnNewActivityByTypeCooking')!.addEventListener("click", () => {
    getActivityByType('cooking');
})

document.getElementById('btnNewActivityByTypeRecreational')!.addEventListener("click", () => {
    getActivityByType('recreational');
})