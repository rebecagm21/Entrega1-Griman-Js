// Array para guardar historial de corridas
let historial = [];

// Función para ingresar meta
function definirMeta() {
    let meta = parseFloat(prompt("¿Cuál es tu meta de distancia total en km?"));
    return meta;
}

// Función para pedir datos de cada corrida
function ingresarDatos() {
    let nombre = prompt("Ingresa tu nombre:");
    let distancia = parseFloat(prompt("¿Cuántos kilómetros corriste?"));
    let tiempo = parseFloat(prompt("¿En cuántos minutos lo lograste?"));

    // Validación básica
    if (isNaN(distancia) || isNaN(tiempo) || distancia <= 0 || tiempo <= 0) {
        alert("⚠️ Datos inválidos. Intenta de nuevo.");
        return null;
    }

    return { nombre, distancia, tiempo };
}

// Función para calcular estadísticas
function calcularEstadisticas(distancia, tiempo) {
    let ritmo = tiempo / distancia; // minutos por km
    let velocidad = (distancia / tiempo) * 60; // km/h
    return { ritmo, velocidad };
}

// Función para mostrar resultados de una corrida
function mostrarResultados(nombre, distancia, tiempo, ritmo, velocidad) {
    let mensaje = `🏃 Resumen de la corrida de ${nombre}\n
  Distancia: ${distancia} km
  Tiempo: ${tiempo} min
  Ritmo promedio: ${ritmo.toFixed(2)} min/km
  Velocidad promedio: ${velocidad.toFixed(2)} km/h`;

    alert(mensaje);
    console.log(mensaje);
}

// Función para mostrar historial completo, meta y promedios
function mostrarHistorial(meta) {
    let totalDistancia = 0;
    let sumaRitmos = 0;
    let sumaVelocidades = 0;
    let resumen = "📋 Historial de corridas:\n\n";

    for (let i = 0; i < historial.length; i++) {
        let corrida = historial[i];
        totalDistancia += corrida.distancia;
        sumaRitmos += corrida.ritmo;
        sumaVelocidades += corrida.velocidad;

        // resumen += ${ i + 1 }. ${ corrida.nombre } - ${ corrida.distancia } km en ${ corrida.tiempo } min | Ritmo: ${ corrida.ritmo.toFixed(2) } min / km | Vel: ${ corrida.velocidad.toFixed(2) } km / h\n;
    }

    resumen += '\n📊 Distancia total acumulada: ${ totalDistancia } km\n';

    // Promedios generales
    let promedioRitmo = sumaRitmos / historial.length;
    let promedioVelocidad = sumaVelocidades / historial.length;

    resumen += `Promedio de ritmo: ${promedioRitmo.toFixed(2)} min / km\n`;
    resumen += `Promedio de velocidad: ${promedioVelocidad.toFixed(2)} km / h\n`;

    // Condicional para revisar la meta
    if (totalDistancia >= meta) {
        resumen += '🎉 ¡Felicidades! Has cumplido tu meta de ${ meta } km.';
    } else {
        let restante = meta - totalDistancia;
        resumen += '⏳ Aún te faltan ${ restante.toFixed(2) } km para alcanzar tu meta.';
    }

    alert(resumen);
    console.log(resumen);
}

// Función principal
function iniciarSimulador() {
    let meta = definirMeta();
    let continuar = true;

    while (continuar) {
        let datos = ingresarDatos();

        if (datos !== null) {
            let stats = calcularEstadisticas(datos.distancia, datos.tiempo);
            mostrarResultados(datos.nombre, datos.distancia, datos.tiempo, stats.ritmo, stats.velocidad);

            // Guardar en historial
            historial.push({
                nombre: datos.nombre,
                distancia: datos.distancia,
                tiempo: datos.tiempo,
                ritmo: stats.ritmo,
                velocidad: stats.velocidad
            });
        }

        continuar = confirm("¿Quieres registrar otra corrida?");
    }

    // Mostrar historial y resultado final de meta
    if (historial.length > 0) {
        mostrarHistorial(meta);
    } else {
        alert("No se registraron corridas.");
    }
}

// Llamada al simulador
iniciarSimulador();