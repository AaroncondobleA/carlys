document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btn-iniciar');
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const regaloCarlys = document.getElementById('regalo-carlys');
    const musica = document.getElementById('musica-fondo');
    const audioVoz = document.getElementById('audio-voz');

    if (btnIniciar) {
        btnIniciar.addEventListener('click', async () => {
            // Ocultar pantalla de inicio
            pantallaInicio.style.opacity = '0';
            setTimeout(() => {
                pantallaInicio.style.display = 'none';
                regaloCarlys.style.display = 'block';
            }, 500);

            // Intentar reproducir música de fondo
            if (musica) {
                try {
                    musica.volume = 0.4;
                    await musica.play();
                } catch (e) {
                    console.log("Reproducción automática bloqueada por el navegador:", e);
                }
            }

            // Inicializar partículas si tsParticles está cargado
            if (typeof tsParticles !== 'undefined') {
                // Partículas de polvo estelar
                tsParticles.load("tsparticles-dust", {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: ["#00d2ff", "#ffffff", "#8ab4f8"] },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 2, random: true },
                        move: { enable: true, speed: 0.8, direction: "none", random: true, out_mode: "out" }
                    }
                });

                // Partículas flotantes decorativas
                tsParticles.load("tsparticles-flowers", {
                    particles: {
                        number: { value: 15, density: { enable: true, value_area: 900 } },
                        color: { value: ["#00d2ff", "#3a7bd5"] },
                        shape: { type: "heart" },
                        opacity: { value: 0.3, random: true },
                        size: { value: 10, random: true },
                        move: { enable: true, speed: 1.5, direction: "top", random: true, out_mode: "out" }
                    }
                });
            }
        });
    }

    // Pausar la música de fondo si se reproduce la nota de voz
    if (audioVoz && musica) {
        audioVoz.addEventListener('play', () => {
            if (!musica.paused) {
                musica.pause();
            }
        });

        audioVoz.addEventListener('pause', () => {
            if (regaloCarlys.style.display === 'block') {
                musica.play().catch(() => {});
            }
        });
    }
});
