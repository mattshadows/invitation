// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const invitation = document.getElementById('invitation');
    const container = document.querySelector('.container');
    let isOpen = false;
    
    // Función para abrir el sobre con animación épica
    function openEnvelope() {
        if (!isOpen) {
            isOpen = true;
            
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
        nameTitle.textContent = 'ARELY';
        nameTitle.style.cssText = `
            font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
            font-size: 2.5rem;
            color: #FFFFFF;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            margin: 0;
            margin-top: 165px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 4px;
            font-weight: bold;
        `;

        // Crear los detalles del evento - SIN LÍNEAS AMARILLAS, MÁS ANCHO
        const eventDetails = document.createElement('div');
        eventDetails.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin: 1px auto;
            backdrop-filter: blur(5px);
            width: 95%;
        `;

        const dateTime = document.createElement('div');
        dateTime.innerHTML = `
            <div style="text-align: center;">
                <div style="font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive; font-size: 1.3rem; color: #FFFFFF; font-weight: bold; margin-bottom: 8px;">
                    El día Sábado 8 de
                </div>
                <div style="font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive; font-size: 1.3rem; color: #FFFFFF; font-weight: bold; margin-bottom: 15px;">
                    Noviembre 2025
                </div>
                <div style="padding: 10px; margin: 15px 0;">
                    <div style="font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive; font-size: 1rem; color: #FFFFFF; font-weight: bold; margin-bottom: 8px;">Lugar:</div>
                    <div style="font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive; font-size: 0.9rem; color: #FFFFFF; line-height: 1.4; margin-bottom: 8px;">
                        Centro de Eventos Vensai<br>
                        Av. Juan de la Rosa<br>
                        Nº2229, entre C. Ismael<br>
                        Céspedes y C. Yuqui
                    </div>
                </div>
                <div style="font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive; font-size: 1.1rem; color: #FFFFFF; font-weight: bold;">
                    18:00 horas
                </div>
            </div>
        `;

        eventDetails.appendChild(dateTime);

        // Crear los botones en una fila - MÁS PEQUEÑOS
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 30px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
        `;

        const buttons = [
            { text: 'CÓMO LLEGAR', icon: '📍', color: '#4A90E2' },
            { text: 'CÓDIGO VESTIMENTA', icon: '👗', color: '#9B59B6' },
            { text: 'CRONOGRAMA', icon: '⏰', color: '#E67E22' }
        ];

        buttons.forEach(buttonData => {
            const button = document.createElement('button');
            button.innerHTML = `${buttonData.icon}<br><span style="font-size: 0.6rem; font-weight: bold;">${buttonData.text}</span>`;
            button.style.cssText = `
                background: linear-gradient(45deg, ${buttonData.color}, ${buttonData.color}dd);
                border: 2px solid #DAA520;
                border-radius: 50%;
                width: 70px;
                height: 70px;
                color: #FFFFFF;
                font-family: 'Papyrus', 'Chalkduster', 'Marker Felt', fantasy, cursive;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 5px;
                position: relative;
                z-index: 1;
                flex-shrink: 0;
            `;
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            });
            
            buttonsContainer.appendChild(button);
        });

        // Agregar elementos a la invitación en orden vertical
        invitation.appendChild(mirror);
        invitation.appendChild(nameTitle);
        invitation.appendChild(eventDetails);
        invitation.appendChild(buttonsContainer);
        
        // Agregar marco e invitación al contenedor
        invitationContainer.appendChild(frameImage);
        invitationContainer.appendChild(invitation);
        finalBackgroundOverlay.appendChild(invitationContainer);
        
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
            openEnvelope();
        }
    });
    
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
});
