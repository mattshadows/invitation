// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear y reproducir música de fondo al cargar la página
    const backgroundMusic = document.createElement('audio');
    backgroundMusic.src = "assets/Alice's Theme (From Alice in WonderlandSoundtrack Version) (mp3cut.net).mp3";
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Volumen moderado
    backgroundMusic.preload = 'auto';
    
    // Agregar música al body
    document.body.appendChild(backgroundMusic);
    
    // Variable para controlar si la música ya se inició
    let musicStarted = false;
    
    // Función para iniciar música
    function startMusic() {
        if (!musicStarted) {
            backgroundMusic.currentTime = 7; // Saltar los primeros 5 segundos
            backgroundMusic.play().then(() => {
                console.log('Música iniciada correctamente (saltando primeros 5 segundos)');
                musicStarted = true;
            }).catch(e => console.log('Error al reproducir música:', e));
        }
    }
    
    // Intentar reproducir música automáticamente (probablemente fallará)
    backgroundMusic.play().catch(error => {
        console.log('Música en espera - se reproducirá en el primer clic');
        // Agregar listener para cualquier clic en la página
        document.addEventListener('click', startMusic, { once: true });
        // También agregar listener para cualquier tecla
        document.addEventListener('keydown', startMusic, { once: true });
    });
    const envelope = document.getElementById('envelope');
    const invitation = document.getElementById('invitation');
    const container = document.querySelector('.container');
    let isOpen = false;
    
    // Función para abrir el sobre con animación épica
    function openEnvelope() {
        if (!isOpen) {
            isOpen = true;
            
            // Ocultar el indicador de tecla (DESACTIVADO TEMPORALMENTE)
            // const skipHint = document.querySelector('.skip-hint');
            // if (skipHint) {
            //     skipHint.style.display = 'none';
            // }
            
            // Crear efecto de humo
            createSmokeEffect();
            
            // Después de 2 segundos, empezar el zoom y desenfoque
            setTimeout(() => {
                startZoomAndBlur();
            }, 2000);
            
            // Después de 3 segundos, empezar la transición a negro
            setTimeout(() => {
                startBlackTransition();
            }, 3000);
        }
    }
    
    // Función para crear efecto de humo real
    function createSmokeEffect() {
        const smokeContainer = document.createElement('div');
        smokeContainer.className = 'smoke-container';
        smokeContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        document.body.appendChild(smokeContainer);
        
        // Crear múltiples capas de humo realista
        for (let i = 0; i < 8; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-layer';
            smoke.style.cssText = `
                position: absolute;
                width: ${200 + i * 50}px;
                height: ${300 + i * 100}px;
                background: 
                    radial-gradient(ellipse at center bottom, 
                        rgba(64, 224, 208, ${0.3 - i * 0.03}) 0%, 
                        rgba(32, 178, 170, ${0.2 - i * 0.02}) 30%, 
                        rgba(0, 255, 255, ${0.1 - i * 0.01}) 60%, 
                        transparent 100%);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: smokeRise ${4 + i * 0.8}s ease-out forwards;
                pointer-events: none;
                filter: blur(${i * 2}px);
            `;
            
            smokeContainer.appendChild(smoke);
        }
        
        // Crear humo adicional que se mueve hacia los lados
        for (let i = 0; i < 6; i++) {
            const sideSmoke = document.createElement('div');
            sideSmoke.className = 'side-smoke';
            sideSmoke.style.cssText = `
                position: absolute;
                width: ${150 + i * 30}px;
                height: ${200 + i * 50}px;
                background: 
                    radial-gradient(ellipse at center bottom, 
                        rgba(64, 224, 208, ${0.2 - i * 0.02}) 0%, 
                        rgba(32, 178, 170, ${0.15 - i * 0.015}) 40%, 
                        transparent 100%);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: smokeSide ${4.5 + i * 0.5}s ease-out forwards;
                pointer-events: none;
                filter: blur(${i * 1.5}px);
            `;
            
            smokeContainer.appendChild(sideSmoke);
        }
        
        // Remover el contenedor de humo después de la animación
        setTimeout(() => {
            if (smokeContainer.parentNode) {
                smokeContainer.parentNode.removeChild(smokeContainer);
            }
        }, 8000);
    }
    
    // Función para empezar el zoom y desenfoque gradual
    function startZoomAndBlur() {
        const envelope = document.getElementById('envelope');
        
        // Aplicar zoom gradual más sutil solo a la carta
        let scaleValue = 1;
        const zoomInterval = setInterval(() => {
            scaleValue += 0.005;
            envelope.style.transform = `scale(${scaleValue})`;
            
            if (scaleValue >= 1.2) {
                clearInterval(zoomInterval);
            }
        }, 150); // Cada 150ms aumenta 0.005 de escala
        
        // Aplicar desenfoque gradual más lento con distorsión de remolino solo a la carta
        let blurValue = 0;
        let rotationValue = 0;
        let swirlIntensity = 0;
        const blurInterval = setInterval(() => {
            blurValue += 0.2;
            rotationValue += 0.5;
            swirlIntensity += 0.1;
            
            // Crear efecto de remolino con múltiples transformaciones solo en la carta
            envelope.style.filter = `blur(${blurValue}px)`;
            envelope.style.transform = `
                scale(${scaleValue}) 
                rotate(${rotationValue}deg) 
                perspective(1000px) 
                rotateX(${swirlIntensity * 5}deg) 
                rotateY(${swirlIntensity * 3}deg)
            `;
            
            // Agregar efecto de distorsión radial solo a la carta
            envelope.style.clipPath = `circle(${100 - swirlIntensity * 20}% at 50% 50%)`;
            
            if (blurValue >= 10) {
                clearInterval(blurInterval);
            }
        }, 100); // Cada 100ms aumenta blur, rotación y distorsión
    }
    
    // Función para empezar la transición a negro
    function startBlackTransition() {
        const blackOverlay = document.createElement('div');
        blackOverlay.className = 'black-overlay';
        blackOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 100;
            opacity: 0;
            transition: opacity 1.5s ease-out;
        `;
        
        document.body.appendChild(blackOverlay);
        
        // Animar la opacidad
        setTimeout(() => {
            blackOverlay.style.opacity = '1';
            
            // Después de que se complete la transición a negro, mostrar la cara
            setTimeout(() => {
                showSmilingFace();
            }, 1500);
        }, 100);
    }
    
    // Función para mostrar la cara sonriente con animación
    function showSmilingFace() {
        const faceContainer = document.createElement('div');
        faceContainer.className = 'face-container';
        faceContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 101;
            background: black;
        `;
        
        const faceImage = document.createElement('img');
        faceImage.src = 'assets/sonriente.webp';
        faceImage.alt = 'Cara sonriente';
        faceImage.className = 'smiling-face';
        faceImage.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            opacity: 0;
            transform: scale(0.8);
            filter: brightness(0.1);
            transition: all 2s ease-out;
        `;
        
        faceContainer.appendChild(faceImage);
        document.body.appendChild(faceContainer);
        
        // Animar la aparición de la cara
        setTimeout(() => {
            faceImage.style.opacity = '1';
            faceImage.style.transform = 'scale(1)';
            faceImage.style.filter = 'brightness(1)';
        }, 500);
        
        // Agregar efecto de parpadeo de ojos
        setTimeout(() => {
            addEyeBlinkEffect(faceImage);
        }, 2000);
        
        // Agregar texto con efecto de escritura
        setTimeout(() => {
            addTypewriterText(faceContainer);
        }, 0); // Empezar a escribir inmediatamente cuando se pone oscura la pantalla
        
        // Después de estar visible un rato, hacer que desaparezca
        setTimeout(() => {
            hideSmilingFace(faceImage, faceContainer);
        }, 10000); // 10 segundos después de aparecer (más tiempo para leer el texto)
    }
    
    // Función para agregar efecto de parpadeo de ojos
    function addEyeBlinkEffect(faceImage) {
        let blinkCount = 0;
        const maxBlinks = 3;
        
        const blinkInterval = setInterval(() => {
            faceImage.style.filter = 'brightness(0.3)';
            
            setTimeout(() => {
                faceImage.style.filter = 'brightness(1)';
                blinkCount++;
                
                if (blinkCount >= maxBlinks) {
                    clearInterval(blinkInterval);
                }
            }, 200);
        }, 1000);
    }
    
    // Función para agregar texto con efecto de escritura
    function addTypewriterText(faceContainer) {
        // Crear contenedor para el texto superior
        const topTextContainer = document.createElement('div');
        topTextContainer.style.cssText = `
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            z-index: 102;
            pointer-events: none;
        `;
        
        // Crear contenedor para el texto inferior
        const bottomTextContainer = document.createElement('div');
        bottomTextContainer.style.cssText = `
            position: absolute;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            z-index: 102;
            pointer-events: none;
        `;
        
        // Primer texto: "¡RAPIDO RAPIDO! EL RELOJ YA MARCA LA HORA..." (ARRIBA)
        const firstText = document.createElement('div');
        firstText.style.cssText = `
            font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
            font-size: 1.2rem;
            color: #FFFFFF;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s ease;
        `;
        
        // Segundo texto: "EL PAIS DE LAS MARAVILLAS ABRIRA SUS PUERTAS PARA CELEBRAR ALGO MUY ESPECIAL" (ABAJO)
        const secondText = document.createElement('div');
        secondText.style.cssText = `
            font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
            font-size: 1.0rem;
            color: #FFFFFF;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s ease;
            line-height: 1.3;
        `;
        
        // Agregar textos a sus contenedores
        topTextContainer.appendChild(firstText);
        bottomTextContainer.appendChild(secondText);
        faceContainer.appendChild(topTextContainer);
        faceContainer.appendChild(bottomTextContainer);
        
        // Efecto de escritura para el primer texto
        const firstMessage = "¡RAPIDO RAPIDO! EL RELOJ YA MARCA LA HORA...";
        let firstIndex = 0;
        
        const typeFirstText = () => {
            if (firstIndex < firstMessage.length) {
                firstText.textContent += firstMessage[firstIndex];
                firstIndex++;
                setTimeout(typeFirstText, 50); // Velocidad de escritura más rápida
            } else {
                // Empezar a escribir el segundo texto después de un breve delay
                setTimeout(() => {
                    typeSecondText();
                }, 300);
            }
        };
        
        // Efecto de escritura para el segundo texto
        const secondMessage = "EL PAIS DE LAS MARAVILLAS ABRIRA SUS PUERTAS PARA CELEBRAR ALGO MUY ESPECIAL";
        let secondIndex = 0;
        
        const typeSecondText = () => {
            if (secondIndex < secondMessage.length) {
                secondText.textContent += secondMessage[secondIndex];
                secondIndex++;
                setTimeout(typeSecondText, 40); // Velocidad de escritura más rápida
            }
        };
        
        // Iniciar el efecto de escritura
        setTimeout(() => {
            typeFirstText();
        }, 100); // Pequeño delay para asegurar que el contenedor esté listo
    }
    
    // Función para hacer desaparecer la cara de la misma manera que apareció
    function hideSmilingFace(faceImage, faceContainer) {
        // Encontrar los contenedores de texto
        const topTextContainer = faceContainer.querySelector('div[style*="top: 10%"]');
        const bottomTextContainer = faceContainer.querySelector('div[style*="bottom: 20%"]');
        
        // Animar la desaparición del texto (efecto inverso)
        if (topTextContainer) {
            const topText = topTextContainer.querySelector('div');
            if (topText) {
                topText.style.opacity = '0';
                topText.style.transform = 'translateY(-20px)';
            }
        }
        
        if (bottomTextContainer) {
            const bottomText = bottomTextContainer.querySelector('div');
            if (bottomText) {
                bottomText.style.opacity = '0';
                bottomText.style.transform = 'translateY(20px)';
            }
        }
        
        // Animar la desaparición de la cara (efecto inverso)
        faceImage.style.opacity = '0';
        faceImage.style.transform = 'scale(0.8)';
        faceImage.style.filter = 'brightness(0.1)';
        
        // Después de la animación, remover el contenedor y mostrar nuevo fondo
        setTimeout(() => {
            if (faceContainer.parentNode) {
                faceContainer.parentNode.removeChild(faceContainer);
            }
            // Mostrar nuevo fondo con efecto desvanecido
            showNewBackground();
        }, 2000); // Esperar a que termine la animación de 2 segundos
    }
    
    // Función para mostrar el nuevo fondo con efecto desvanecido
    function showNewBackground() {
        // Crear overlay para el nuevo fondo
        const newBackgroundOverlay = document.createElement('div');
        newBackgroundOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: url('assets/fondo2.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 200;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        `;
        
        // Crear contenedor para el marco
        const frameContainer = document.createElement('div');
        frameContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 201;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        `;
        
        // Crear el marco
        const frame = document.createElement('img');
        frame.src = 'assets/marco.png'; // Ajusta el nombre del archivo según tu imagen
        frame.alt = 'Marco mágico';
        frame.style.cssText = `
            width: 70vw;
            height: 70vh;
            object-fit: contain;
            filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3));
            animation: levitate 3s ease-in-out infinite;
        `;
        
        // Crear contenedor para el contenido dentro del marco
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 202;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            animation: levitate 3s ease-in-out infinite;
        `;
        
        // Crear el texto
        const textElement = document.createElement('div');
        textElement.textContent = 'ESTAS SEGURO QUE QUIERES ENTRAR AL PAIS DE LAS MARAVILLAS?';
        textElement.style.cssText = `
            font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
            font-size: 0.7rem;
            color: #000000;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 20px;
            line-height: 1.4;
            max-width: 40vw;
            text-align: center;
        `;
        
        // Crear el botón
        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'ENTRAR';
        buttonElement.style.cssText = `
            font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
            font-size: 0.9rem;
            color: #FFFFFF;
            background: linear-gradient(45deg, #8B4513, #DAA520, #8B4513);
            border: 2px solid #DAA520;
            border-radius: 15px;
            padding: 8px 20px;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
            animation: buttonGlow 2s ease-in-out infinite alternate;
        `;
        
        // Efecto hover para el botón
        buttonElement.addEventListener('mouseenter', () => {
            buttonElement.style.transform = 'scale(1.1)';
            buttonElement.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.4)';
        });
        
        buttonElement.addEventListener('mouseleave', () => {
            buttonElement.style.transform = 'scale(1)';
            buttonElement.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });
        
        // Event listener para el click del botón
        buttonElement.addEventListener('click', () => {
            transitionToNextBackground(newBackgroundOverlay);
        });
        
        // Agregar elementos al contenedor de contenido
        contentContainer.appendChild(textElement);
        contentContainer.appendChild(buttonElement);
        
        // Agregar el marco al contenedor
        frameContainer.appendChild(frame);
        frameContainer.appendChild(contentContainer);
        newBackgroundOverlay.appendChild(frameContainer);
        
        // Agregar al body
        document.body.appendChild(newBackgroundOverlay);
        
        // Animar la aparición del nuevo fondo
        setTimeout(() => {
            newBackgroundOverlay.style.opacity = '1';
        }, 100);
        
        // Animar la aparición del marco después del fondo
        setTimeout(() => {
            frameContainer.style.opacity = '1';
        }, 1500); // 1.5 segundos después de que aparezca el fondo
        
        // Animar la aparición del contenido después del marco
        setTimeout(() => {
            contentContainer.style.opacity = '1';
        }, 2500); // 2.5 segundos después de que aparezca el fondo
    }
    
    // Función para transición al siguiente fondo
    function transitionToNextBackground(currentBackground) {
        // Crear overlay de transición con efecto mágico
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.9) 100%);
            z-index: 300;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        `;
        
        // Crear partículas mágicas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #DAA520;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${2 + Math.random() * 2}s ease-in-out infinite;
                box-shadow: 0 0 10px #DAA520;
            `;
            transitionOverlay.appendChild(particle);
        }
        
        // Agregar overlay al body
        document.body.appendChild(transitionOverlay);
        
        // Animar la transición
        setTimeout(() => {
            transitionOverlay.style.opacity = '1';
        }, 100);
        
        // Después de la transición, cambiar al siguiente fondo
        setTimeout(() => {
            // Remover el fondo actual
            if (currentBackground.parentNode) {
                currentBackground.parentNode.removeChild(currentBackground);
            }
            
            // Crear el siguiente fondo
            showFinalBackground();
            
            // Remover el overlay de transición
            setTimeout(() => {
                if (transitionOverlay.parentNode) {
                    transitionOverlay.parentNode.removeChild(transitionOverlay);
                }
            }, 1000);
        }, 2000);
    }
    
    // Función para mostrar el fondo final
    function showFinalBackground() {

        // Crear overlay para el fondo final
        const finalBackgroundOverlay = document.createElement('div');
        finalBackgroundOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: url('assets/fondo3.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 400;
            opacity: 0;
            transition: opacity 3s ease-in-out;
        `;
        
        // Crear contenedor para la invitación
        const invitationContainer = document.createElement('div');
        invitationContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 401;
            opacity: 0;
            transition: opacity 2s ease-in-out;
        `;
        
        // Crear el marco dorado opulente
        const frameImage = document.createElement('img');
        frameImage.src = 'assets/un-marco-dorado-opulento-con-esquinas-ornamentales-bordea-fondo-de-textura-oscura-perfecto-para-las-invitaciones-certificados-o-385168344.png';
        frameImage.alt = 'Marco dorado opulente';
        frameImage.style.cssText = `
            width: 90vw;
            height: 90vh;
            object-fit: contain;
            filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
            position: relative;
            z-index: 1;
        `;

        // Crear canvas de Processing para animaciones
        const processingCanvas = document.createElement('canvas');
        processingCanvas.id = 'processing-canvas';
        processingCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 4;
            pointer-events: none;
        `;

        // Crear la invitación (contenido dentro del marco)
        const invitation = document.createElement('div');
        invitation.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70vw;
            height: 70vh;
            background: transparent;
            text-align: center;
            overflow-y: auto;
            z-index: 2;
            padding: 20px;
        `;

        // Crear el espejo pequeño en la parte superior central
        const mirror = document.createElement('img');
        mirror.src = 'assets/espejo.png';
        mirror.alt = 'Espejo mágico';
        mirror.style.cssText = `
            width: 180px;
            height: 180px;
            object-fit: contain;
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        `;
        
        // Crear el nombre ARELY debajo del espejo - BLANCO
        const nameTitle = document.createElement('h1');
        nameTitle.textContent = 'Arely';
        nameTitle.style.cssText = `
            font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive;
            font-size: 3.5rem;
            color: #FFFFFF;
            margin: 0;
            margin-top: 175px;
            text-align: center;
            text-transform: none;
            letter-spacing: 2px;
            font-weight: normal;
            font-style: normal;
        `;

        // Crear frase sutil debajo de Arely
        const subtlePhrase = document.createElement('div');
        subtlePhrase.innerHTML = `
            "El secreto
            es rodearte de personas que te hagan sonreír el corazón.
            Entonces, y solo entonces, estarás en el País de las Maravillas."
        `;
        subtlePhrase.style.cssText = `
            font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive;
            font-size: 0.6rem;
            color: #FFFFFF;
            font-weight: normal;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 0;
            font-style: italic;
            opacity: 0.9;
            z-index: 10;
            position: relative;
            line-height: 1.4;
        `;
        // Crear los detalles del evento - SIN LÍNEAS AMARILLAS, MÁS ANCHO
        const eventDetails = document.createElement('div');
        eventDetails.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin: 1px auto;
            backdrop-filter: blur(5px);
            width: 100%;
        `;

        const dateTime = document.createElement('div');
        dateTime.innerHTML = `
            <div style="text-align: center;">
                <!-- Fecha y Hora juntas -->
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 10px;">
                    <!-- Fecha -->
                    <div style="text-align: center;">
                        <div style="font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive; font-size: 1.8rem; color: #FFFFFF; font-weight: bold; line-height: 1; font-style: normal;">
                            8
                        </div>
                        <div style="font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive; font-size: 1.2rem; color: #FFFFFF; font-weight: normal; font-style: normal;">
                            NOVIEMBRE
                        </div>
                        <div style="font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive; font-size: 1.0rem; color: #FFFFFF; font-weight: normal; font-style: normal; margin-top: 2px;">
                            2025
                        </div>
                    </div>
                    
                    <!-- Gato como separador -->
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <div style="width: 70px; height: auto; opacity: 0.9; filter: brightness(1.2); position: relative; animation: levitar 3s ease-in-out infinite, balancear 4s ease-in-out infinite;">
                            <img src="assets/gatosvg.svg" alt="Gato" style="width: 100%; height: auto;">
                            <!-- Ojos animados superpuestos -->
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                                <!-- Ojo izquierdo - ajusta estas posiciones -->
                                <div style="position: absolute; top: 15%; left: 25%; width: 10px; height: 10px; background: #000; border-radius: 50%; animation: parpadear 4s ease-in-out infinite;"></div>
                                <!-- Ojo derecho - ajusta estas posiciones -->
                                <div style="position: absolute; top: 15%; left: 65%; width: 10px; height: 10px; background: #000; border-radius: 50%; animation: parpadear 4s ease-in-out infinite;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hora -->
                    <div style="text-align: center;">
                        <div style="font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive; font-size: 1.8rem; color: #FFFFFF; font-weight: bold; line-height: 1; font-style: normal;">
                            18:00
                        </div>
                        <div style="font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive; font-size: 1.2rem; color: #FFFFFF; font-weight: normal; font-style: normal;">
                            HORAS
                        </div>
                    </div>
                </div>
            </div>
        `;

        eventDetails.appendChild(dateTime);

        // Crear el texto del lugar encima de los botones
        const lugarContainer = document.createElement('div');
        lugarContainer.style.cssText = `
            text-align: center;
            margin: 15px 0 10px 0;
        `;
        
        const lugarTitle = document.createElement('div');
        lugarTitle.style.cssText = `
            font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive;
            font-size: 1.2rem;
            color: #FFFFFF;
            font-weight: normal;
            margin-bottom: 8px;
        `;
        lugarTitle.textContent = 'Lugar:';
        
        const lugarText = document.createElement('div');
        lugarText.style.cssText = `
            font-family: 'MedievalSharp', 'Playfair Display', 'Times New Roman', cursive;
            font-size: 0.7rem;
            color: #FFFFFF;
            line-height: 1.3;
            font-style: normal;
            letter-spacing: 0.5px;
        `;
        lugarText.innerHTML = `
            Centro de Eventos Vensai<br>
            Av. Juan de la Rosa
            Nº2229, entre C. Ismael
            Céspedes y C. Yuqui
        `;
        
        lugarContainer.appendChild(lugarTitle);
        lugarContainer.appendChild(lugarText);
        eventDetails.appendChild(lugarContainer);

        // Crear los botones en una fila - MÁS PEQUEÑOS
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 30px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 20px;
            border: 1px solid #333333;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            backdrop-filter: blur(10px);
        `;

        const buttons = [
            { text: 'CÓMO LLEGAR', icon: '📍', color: '#000000' },
            { text: 'CÓDIGO VESTIMENTA', icon: '👗', color: '#000000' },
            { text: 'CRONOGRAMA', icon: '⏰', color: '#000000' }
        ];

        buttons.forEach(buttonData => {
            const button = document.createElement('button');
            button.innerHTML = `${buttonData.icon}<br><span style="font-size: 0.6rem; font-weight: bold;">${buttonData.text}</span>`;
            button.style.cssText = `
                background: #000000;
                border: 2px solid #333333;
                border-radius: 50%;
                width: 80px;
                height: 80px;
                color: #FFFFFF;
                font-family: 'Arial', sans-serif;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 2px;
                position: relative;
                z-index: 1;
                flex-shrink: 0;
                overflow: hidden;
            `;
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.8)';
                button.style.borderColor = '#DAA520';
                button.style.background = '#111111';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
                button.style.borderColor = '#333333';
                button.style.background = '#000000';
            });
            
            buttonsContainer.appendChild(button);
        });

        // Agregar elementos a la invitación en orden vertical
        invitation.appendChild(mirror);
        invitation.appendChild(nameTitle);
        invitation.appendChild(subtlePhrase);
        invitation.appendChild(eventDetails);
        invitation.appendChild(buttonsContainer);
        
        // Agregar marco, invitación y canvas de Processing al contenedor
        invitationContainer.appendChild(frameImage);
        invitationContainer.appendChild(invitation);
        invitationContainer.appendChild(processingCanvas);
        finalBackgroundOverlay.appendChild(invitationContainer);

        // Inicializar animaciones de Processing después de que aparezca el marco
        setTimeout(() => {
            console.log('Inicializando animaciones de Processing...');
            // Asegurar que el canvas tenga el tamaño correcto
            processingCanvas.width = invitationContainer.offsetWidth;
            processingCanvas.height = invitationContainer.offsetHeight;
            console.log('Tamaño del canvas:', processingCanvas.width, 'x', processingCanvas.height);
            initializeProcessingAnimations(processingCanvas);
        }, 2000);
        
        // Agregar al body
        document.body.appendChild(finalBackgroundOverlay);
        
        // Animar la aparición del fondo final
        setTimeout(() => {
            finalBackgroundOverlay.style.opacity = '1';
        }, 500);
        
        // Animar la aparición de la invitación
        setTimeout(() => {
            invitationContainer.style.opacity = '1';
        }, 1500);
    }
    
    // Event listener para el click en el sobre
    envelope.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!isOpen) {
            // Iniciar música cuando se hace clic en el sobre
            startMusic();
            openEnvelope();
        }
    });
    
    // Event listener para la tecla "a" - DESACTIVADO TEMPORALMENTE
    // document.addEventListener('keydown', function(e) {
    //     if (e.key.toLowerCase() === 'a' && !isOpen) {
    //         e.preventDefault();
    //         console.log('Tecla "a" presionada - saltando directamente a la invitación');
    //         // Iniciar música cuando se presiona "a"
    //         startMusic();
    //         skipToInvitation();
    //     }
    // });
    
    // Función para saltar directamente a la invitación
    function skipToInvitation() {
        if (!isOpen) {
            isOpen = true;
            
            // Ocultar el indicador de tecla (DESACTIVADO TEMPORALMENTE)
            // const skipHint = document.querySelector('.skip-hint');
            // if (skipHint) {
            //     skipHint.style.display = 'none';
            // }
            
            // Limpiar cualquier elemento existente
            const existingElements = document.querySelectorAll('.smoke-container, .black-overlay, .face-container, .new-background-overlay, .final-background-overlay');
            existingElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
            
            // Ir directamente a la vista final
            showFinalBackground();
        }
    }
    
    // Agregar animación CSS para el botón
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        @keyframes buttonGlow {
            0% { 
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(218, 165, 32, 0.6);
            }
            100% { 
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(139, 69, 19, 0.8);
            }
        }
        
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-20px) scale(1.2);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(buttonStyle);
    
    // Agregar CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes smokeRise {
            0% {
                transform: translate(-50%, -50%) scale(0.5) translateY(50px);
                opacity: 0;
            }
            20% {
                transform: translate(-50%, -50%) scale(0.8) translateY(20px);
                opacity: 0.6;
            }
            60% {
                transform: translate(-50%, -50%) scale(1.2) translateY(-100px);
                opacity: 0.4;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5) translateY(-300px);
                opacity: 0;
            }
        }
        
        @keyframes smokeSide {
            0% {
                transform: translate(-50%, -50%) scale(0.3) translateY(30px);
                opacity: 0;
            }
            30% {
                transform: translate(calc(-50% + ${Math.random() * 100 - 50}px), -50%) scale(0.8) translateY(-50px);
                opacity: 0.5;
            }
            70% {
                transform: translate(calc(-50% + ${Math.random() * 200 - 100}px), -50%) scale(1.1) translateY(-150px);
                opacity: 0.3;
            }
            100% {
                transform: translate(calc(-50% + ${Math.random() * 300 - 150}px), -50%) scale(1.3) translateY(-250px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Función para inicializar animaciones de Processing
    function initializeProcessingAnimations(canvas) {
        // Verificar que Processing esté disponible
        if (typeof Processing === 'undefined') {
            console.error('Processing.js no está cargado');
            return;
        }
        
        // Crear instancia de Processing directamente
        console.log('Creando instancia de Processing...');
        const processingInstance = new Processing(canvas, function(p) {
            console.log('Processing setup ejecutándose...');
                    // Variables para el espejo (DESHABILITADAS)
                    // let mirrorScale = 0;
                    // let mirrorRotation = 0;
                    // let mirrorAlpha = 0;
                    // let mirrorAnimating = true;

                    // Variables para la escritura de "ARELY" (DESHABILITADAS)
                    // let letters = ["A", "R", "E", "L", "Y"];
                    // let currentLetter = 0;
                    // let letterDelay = 0;
                    // let writingComplete = false;
                    // let letterX = [];
                    // let letterY = [];
                    // let letterScale = [];
                    // let letterGlow = [];

                    // Variables para los botones (DESHABILITADAS)
                    // let buttonVisible = [false, false, false];
                    // let buttonScale = [0, 0, 0];
                    // let buttonRotation = [0, 0, 0];
                    // let buttonDelay = 0;

                    // Variables para las partículas mágicas
                    let particles = [];
                    let particleCount = 25; // Más partículas

                    // Clase para las partículas
                    class Particle {
                        constructor(startX, startY) {
                            this.x = startX;
                            this.y = startY;
                            this.vx = p.random(-3, 3); // Mayor dispersión horizontal
                            this.vy = p.random(-4, -1); // Mayor dispersión vertical
                            this.maxLife = p.random(80, 150); // Vida más larga
                            this.life = this.maxLife;
                            this.particleColor = p.color(255, 215, 0, 150);
                            this.size = p.random(3, 8); // Partículas más grandes
                        }

                        update() {
                            this.x += this.vx;
                            this.y += this.vy;
                            this.life--;

                            // Movimiento más orgánico y amplio
                            this.vx += p.random(-0.2, 0.2);
                            this.vy += p.random(-0.1, 0.1);

                            // Límites más amplios para mayor dispersión
                            this.vx = p.constrain(this.vx, -4, 4);
                            this.vy = p.constrain(this.vy, -5, 2);
                        }

                        display() {
                            p.pushMatrix();
                            p.translate(this.x, this.y);

                            let alpha = p.map(this.life, 0, this.maxLife, 0, 255);
                            p.fill(p.red(this.particleColor), p.green(this.particleColor), p.blue(this.particleColor), alpha);
                            p.noStroke();

                            p.beginShape();
                            for(let i = 0; i < 5; i++) {
                                let angle = p.map(i, 0, 5, 0, p.TWO_PI);
                                let radius1 = this.size;
                                let radius2 = this.size * 0.4;
                                let x1 = p.cos(angle) * radius1;
                                let y1 = p.sin(angle) * radius1;
                                let x2 = p.cos(angle + p.PI/5) * radius2;
                                let y2 = p.sin(angle + p.PI/5) * radius2;
                                p.vertex(x1, y1);
                                p.vertex(x2, y2);
                            }
                            p.endShape(p.CLOSE);

                            p.fill(255, 255, 255, alpha * 0.3);
                            p.ellipse(0, 0, this.size * 0.5, this.size * 0.5);

                            p.popMatrix();
                        }

                        isDead() {
                            return this.life <= 0;
                        }
                    }

                    p.setup = function() {
                        p.size(canvas.width, canvas.height);
                        p.smooth();

                        // Inicialización de letras deshabilitada
                        // for(let i = 0; i < 5; i++) {
                        //     letterX[i] = p.width/2 + (i - 2) * 60;
                        //     letterY[i] = p.height/2 + 50;
                        //     letterScale[i] = 0;
                        //     letterGlow[i] = 0;
                        // }
                    };

                    p.draw = function() {
                        p.background(0, 0, 0, 0);

                        updateParticles();
                        // animateMirror(); // DESHABILITADO
                        // animateWriting(); // DESHABILITADO
                        // animateButtons(); // DESHABILITADO
                    };

                    // function animateMirror() {
                    //     if(mirrorScale < 1.0) {
                    //         mirrorScale += 0.05;
                    //         mirrorScale = p.constrain(mirrorScale, 0, 1);
                    //     }

                    //     mirrorRotation += 0.02;

                    //     if(mirrorAlpha < 255) {
                    //         mirrorAlpha += 8;
                    //         mirrorAlpha = p.constrain(mirrorAlpha, 0, 255);
                    //     }

                    //     p.pushMatrix();
                    //     p.translate(p.width/2, 100);
                    //     p.scale(mirrorScale);
                    //     p.rotate(p.sin(mirrorRotation) * 0.1);

                    //     let glow = p.sin(p.frameCount * 0.1) * 0.3 + 0.7;
                    //     p.fill(255, 215, 0, mirrorAlpha * glow * 0.3);
                    //     p.noStroke();
                    //     p.ellipse(0, 0, 200, 200);

                    //     p.fill(255, 255, 255, mirrorAlpha);
                    //     p.stroke(255, 215, 0, mirrorAlpha);
                    //     p.strokeWeight(3);
                    //     p.ellipse(0, 0, 180, 180);

                    //     p.popMatrix();

                    //     if(mirrorScale >= 1.0 && mirrorAlpha >= 255) {
                    //         mirrorAnimating = false;
                    //     }
                    // }

                    // function animateWriting() {
                    //     if(letterDelay > 0) {
                    //         letterDelay--;
                    //         return;
                    //     }

                    //     if(currentLetter < letters.length) {
                    //         letterScale[currentLetter] += 0.1;
                    //         letterScale[currentLetter] = p.constrain(letterScale[currentLetter], 0, 1);

                    //         letterGlow[currentLetter] = p.sin(p.frameCount * 0.2) * 0.5 + 0.5;

                    //         p.pushMatrix();
                    //         p.translate(letterX[currentLetter], letterY[currentLetter]);
                    //         p.scale(letterScale[currentLetter]);

                    //         // Brillo dorado de fondo
                    //         p.fill(255, 215, 0, 255 * letterGlow[currentLetter] * 0.8);
                    //         p.textSize(80);
                    //         p.textAlign(p.CENTER, p.CENTER);
                    //         p.text(letters[currentLetter], 0, 0);

                    //         // Letra principal blanca
                    //         p.fill(255, 255, 255, 255);
                    //         p.textSize(80);
                    //         p.text(letters[currentLetter], 0, 0);

                    //         p.popMatrix();

                    //         if(letterScale[currentLetter] >= 1.0) {
                    //             currentLetter++;
                    //             letterDelay = 20;
                    //         }
                    //     } else {
                    //         writingComplete = true;
                    //     }
                    // }

                    function animateButtons() {
                        if(writingComplete && buttonDelay > 0) {
                            buttonDelay--;
                            return;
                        }

                        for(let i = 0; i < 3; i++) {
                            if(!buttonVisible[i] && buttonDelay <= 0) {
                                buttonVisible[i] = true;
                                buttonDelay = 30;
                            }

                            if(buttonVisible[i]) {
                                if(buttonScale[i] < 1.0) {
                                    buttonScale[i] += 0.08;
                                    buttonScale[i] = p.constrain(buttonScale[i], 0, 1);
                                }

                                buttonRotation[i] += 0.05;

                                p.pushMatrix();
                                p.translate(p.width/2 + (i - 1) * 120, p.height - 100);
                                p.scale(buttonScale[i]);
                                p.rotate(p.sin(buttonRotation[i]) * 0.1);

                                let bounce = p.sin(buttonScale[i] * p.PI) * 0.2;
                                p.translate(0, -bounce * 20);

                                p.fill(100 + i * 50, 150, 200 + i * 20);
                                p.stroke(255, 215, 0);
                                p.strokeWeight(2);
                                p.ellipse(0, 0, 70, 70);

                                p.fill(255, 255, 255, 100);
                                p.ellipse(-15, -15, 20, 20);

                                p.popMatrix();
                            }
                        }
                    }

                    function updateParticles() {
                        if(p.random(1) < 0.15 && particles.length < particleCount) {
                            // Partículas desde múltiples puntos para mayor dispersión
                            let startX = p.random(-100, p.width + 100); // Fuera de los bordes
                            let startY = p.height + p.random(0, 100);
                            particles.push(new Particle(startX, startY));
                        }

                        for(let i = particles.length - 1; i >= 0; i--) {
                            let particle = particles[i];
                            particle.update();
                            particle.display();

                            if(particle.isDead()) {
                                particles.splice(i, 1);
                            }
                        }
                    }
                });
    }
});
