
let seguir = 1;
async function iniciarJuego() {
 
while (seguir === 1) {
  // Bienvenida y explicación del juego
  await Swal.fire({
    title: 'Bienvenido al juego de Dipli',
    html: `
      <div>
        <p> <strong>Debes adivinar un número aleatorio </strong>.</p>
        <p>¡Mucho cuidado! Por cada respuesta incorrecta, la radiactividad aumenta y puedes provocar la explosión nuclear de Dipli💣</p>
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjlzdmJhdm5ibnVlZHZ0bGRkMWozY2hhc2N6d2lncmRla2V4NjgzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LlTYKN146VMyI/giphy.gif" style="width: 400px; height: 200px;" alt="Robot">
        <p>SUERTE!</p>
      </div>`,
    confirmButtonText: 'Comenzar',
    allowOutsideClick: false
  });

  // Pedir al usuario la cantidad de vidas necesarias para ganar
  let intentos = Number(
    await Swal.fire({
      title: 'Selecciona la cantidad de vidas',
      input: 'number',
      inputLabel: 'Vidas',
      inputAttributes: {
        min: 1,
        step: 1
      },
      showCancelButton: false,
      confirmButtonText: 'Comenzar',
      allowOutsideClick: false
    }).then(result => result.value)
  );

  // Variables globales
  let numeroAleatorio = Math.floor(Math.random() * 61) - 20;
  let intentosUsuario = [];
  let gano = false;
  let rem = 0;

  while (intentos > 0 && !gano && rem < 1500) {
    let valorUsuario = Number(
      await Swal.fire({
        title: 'Ingresa un número',
        input: 'number',
        inputLabel: 'Número',
        inputAttributes: {
         
          step: 1
        },
        showCancelButton: false,
        confirmButtonText: 'Adivinar',
        allowOutsideClick: false
      }).then(result => result.value)
    );
    intentosUsuario.push(valorUsuario);

    if (valorUsuario < -20 || valorUsuario > 40 || isNaN(valorUsuario)) {
        await Swal.fire({
            title: 'Número inválido',
            html: `
              <div>
                <p>El número está fuera del rango permitido. Pierdes una oportunidad.❌❌</p>
                <img src="https://media.giphy.com/media/NtbFgpnaxFeNy/giphy.gif" style="width: 400px; height: 200px;" alt="Robot">
              </div>`,
           
            confirmButtonText: 'Continuar',
            allowOutsideClick: false
          });
          
      intentos--;
      rem += 150;
    } else if (rem + 150 >= 1500) {
      await Swal.fire({
  title: '¡Volamos por los aires!',
  html: `
    <div>
      <p>Tu REM superó los 1500. ¡Volamos por los aires! #%&-<##!!!</p>
      <p>El número era: ${numeroAleatorio}</p>
      <img src="https://i.gifer.com/1f0V.gif" style="width: 400px; height: 200px;" alt="Explosión">
    </div>`,

  confirmButtonText: 'Aceptar',
  allowOutsideClick: false
});

      rem = 1500;
    } else if (valorUsuario !== numeroAleatorio) {
      intentos--;
      rem += 150;
      await Swal.fire({
        title: 'Fallaste!',
        html: `
          <div>
            <p>Fallaste! Te quedan ${intentos} oportunidades, y ${rem} REM. ¡Sigue intentando!🤞🍀</p>
            <p>${obtenerMensajeAleatorio(valorUsuario, numeroAleatorio)}</p>
            <img src="https://media.giphy.com/media/7xkxbhryQO7hm/giphy.gif" alt="Imagen">
          </div>`,
      
        confirmButtonText: 'Continuar',
        allowOutsideClick: false
      });
      
    } else if (numeroAleatorio === valorUsuario) {
        await Swal.fire({
        title: '¡Felicitaciones!',
        text: '¡Felicitaciones, ganaste el juego! Te desafío a que lo intentes con menos vidas!',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Felicitaciones',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
      gano = true;
    }

    if (intentos === 0) {
        await Swal.fire({
            title: '¡Vuelve a intentarlo!',
            html: `
              <div>
                <p>Parece que los intentos no fueron suficientes para vencerme. ¡Necesitas más para ganar!</p>
                <img src="https://media.giphy.com/media/NtbFgpnaxFeNy/giphy.gif" alt="Imagen">
              </div>`,
           
            confirmButtonText: 'Continuar',
            allowOutsideClick: false
          });
          
    }
  }

  let intentosDetalle = '';
  for (let i = 0; i < intentosUsuario.length; i++) {
    intentosDetalle += `Intento ${i + 1}: número ingresado: ${intentosUsuario[i]}. Fallo por: ${Math.abs(intentosUsuario[i] - numeroAleatorio)}\n`;
  }

  await Swal.fire({
    title: 'Resumen de intentos',
    html: `
      <div>
        <p>${intentosDetalle}</p>
        <img src="https://media.giphy.com/media/gYZ7qO81g4dt6/giphy.gif" alt="Imagen">
      </div>`,
    icon: 'info',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false
  });
  

  seguir = Number(
    await Swal.fire({
        title: '¿Quieres jugar de nuevo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        allowOutsideClick: false,
        html: '<img src="https://media.giphy.com/media/woWQA2I7xqRMI/giphy.gif" alt="Imagen">',
      }).then(result => result.value === true ? 1 : 0)
  );
}
}

window.onload = function() {
  iniciarJuego();
};
// función para generar mensajes aleatorios utilizando estructura de control switch case
function obtenerMensajeAleatorio(valorUsuario, numeroAleatorio) {
  let numeroMensaje = Math.floor(Math.random() * 5);
  let mensajeAleatorio = '';

  switch (numeroMensaje) {
    case 0:
      mensajeAleatorio = `👉Te doy una ayuda: ¿el número es par? ${numeroAleatorio % 2 === 0}`;
      break;
    case 1:
      mensajeAleatorio = `🤞🤞Te doy pista más: ¿el número es mayor que veinte? ${numeroAleatorio > 20}`;
      break;
    case 2:
      let diferencia = Math.abs(valorUsuario - numeroAleatorio);
      mensajeAleatorio = `🍀🍀Como quiero que ganes te voy a dar una pista: la diferencia entre tu número y el mío es de ${diferencia}`;
      break;
    case 3:
      mensajeAleatorio = 'Esta vez no hay pistas... solo voy a cruzar mis robóticos dedos por vos🦾🦾';
      break;
    case 4:
      mensajeAleatorio = 'Deberías escuchar más a tu intuición 💫';
      break;
    default:
      break;
  }

  return mensajeAleatorio;
}
