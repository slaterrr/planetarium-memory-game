/** Humaira's File
 * Its has five effects
 * 1.shootingStars(), 2.confettiCannon(), 3. comicBubble(), 4. rainbowShimmer(), 5. rocketLaunch(), 6. blackHole effect

 */

//INJECT DYNAMIC CSS(bcz i don't wanna make changes in style.css file)

(function injectEffectStyles() {
  const style = document.createElement("style");
  style.id = "fx-styles";
  style.textContent = `
    
    @keyframes fx-streak {
      0%   { opacity: 1; width: 0px; }
      60%  { opacity: 1; }
      100% { opacity: 0; width: 280px; }
    }
    .fx-streak {
      position: fixed;
      height: 3px;
      border-radius: 999px;
      pointer-events: none;
      z-index: 9999;
      animation: fx-streak var(--fx-dur, 0.4s) ease-out forwards;
    }

    @keyframes fx-confetti-fall {
      0%   { transform: translateY(0px) rotate(0deg);    opacity: 1; }
      100% { transform: translateY(260px) rotate(720deg); opacity: 0; }
    }
    .fx-confetti {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      animation: fx-confetti-fall var(--fx-dur, 0.9s) ease-in var(--fx-delay, 0s) forwards;
    }

    @keyframes fx-bubble-pop {
      0%   { transform: translate(-50%,-50%) scale(0)    rotate(-10deg); opacity: 1; }
      35%  { transform: translate(-50%,-50%) scale(1.25) rotate(4deg);   opacity: 1; }
      55%  { transform: translate(-50%,-50%) scale(0.90) rotate(-2deg);  opacity: 1; }
      75%  { transform: translate(-50%,-50%) scale(1.08) rotate(1deg);   opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(0)    rotate(0deg);   opacity: 0; }
    }
    .fx-comic-bubble {
      position: fixed;
      transform: translate(-50%,-50%) scale(0);
      background: #108f73;
      color: #0d0f1a;
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(22px, 3.5vw, 36px);
      font-weight: 900;
      padding: 12px 28px;
      border-radius: 999px;
      border: 5px solid #ffffff;
      pointer-events: none;
      z-index: 10000;
      white-space: nowrap;
      text-align: center;
      animation: fx-bubble-pop 1.1s cubic-bezier(.36,.07,.19,.97) forwards;
    }

    @keyframes fx-rainbow {
      0%   { filter: hue-rotate(0deg)   brightness(1);   }
      20%  { filter: hue-rotate(90deg)  brightness(1.8); }
      40%  { filter: hue-rotate(180deg) brightness(2);   }
      60%  { filter: hue-rotate(270deg) brightness(1.8); }
      80%  { filter: hue-rotate(360deg) brightness(1.4); }
      100% { filter: hue-rotate(360deg) brightness(0) blur(8px); opacity: 0; }
    }
    .fx-rainbow {
      animation: fx-rainbow 0.9s ease forwards !important;
      pointer-events: none;
    }

    @keyframes fx-rocket {
      0%   { transform: translateY(0)     scale(1)    rotate(-4deg); opacity: 1; }
      20%  { transform: translateY(-18px) scale(1.12) rotate(5deg);  opacity: 1; }
      100% { transform: translateY(-240px) scale(0.1) rotate(-3deg); opacity: 0; }
    }
    .fx-rocket {
      animation: fx-rocket 0.8s cubic-bezier(.4,0,.6,1) forwards !important;
      pointer-events: none;
    }

    @keyframes fx-flame {
      0%   { opacity: 0.9; transform: scaleX(1)   translateY(0); }
      50%  { opacity: 0.6; transform: scaleX(0.7) translateY(-12px); }
      100% { opacity: 0;   transform: scaleX(0.3) translateY(-28px); }
    }
    .fx-flame {
      position: fixed;
      border-radius: 50% 50% 20% 20%;
      pointer-events: none;
      z-index: 9998;
      animation: fx-flame var(--fx-dur, 0.35s) ease-out forwards;
    }

    /* === Black hole + astronaut HUD effect === */

    /* Black hole: fixed, upper-right, clearly LEFT of timer text, not overlapping */
    #mini-black-hole {
      position: fixed;
      top: 10px;
      right: 270px;          /* moved further left from timer */
      width: 85px;
      height: 85px;
      border-radius: 50%;
      background: radial-gradient(circle, #000 48%, #2a006e 68%, #8a00ff 85%, transparent 100%);
      box-shadow: 0 0 28px 10px #9b00ff, 0 0 55px 18px #5500aa88, 0 0 80px 24px #2a006e44;
      animation: bh-spin 3s linear infinite;
      z-index: 100;
      pointer-events: none;
    }
    @keyframes bh-spin {
      0%   { box-shadow: 0 0 28px 10px #9b00ff, 0 0 55px 18px #5500aa88, 0 0 80px 24px #2a006e44; }
      50%  { box-shadow: 0 0 38px 16px #bb22ff, 0 0 70px 26px #6600cc88, 0 0 100px 32px #3300aa44; }
      100% { box-shadow: 0 0 28px 10px #9b00ff, 0 0 55px 18px #5500aa88, 0 0 80px 24px #2a006e44; }
    }

    /* Astronaut: fixed, upper area, starts to the RIGHT of the Abort Mission button */
    #hud-astronaut {
      position: fixed;
      top: 18px;
      left: 200px;           /* clears the ~130px Abort Mission button + spacing */
      width: 72px;
      height: 72px;
      object-fit: contain;
      z-index: 101;
      pointer-events: none;
    }

    #game-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: black;
      opacity: 0;
      z-index: 200;
      pointer-events: none;
      transition: opacity 1.2s ease;
    }
    #timesup-message {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(18px, 2.5vw, 32px);
      color: #39FF14;
      text-align: center;
      z-index: 300;
      pointer-events: none;
      text-shadow: 0 0 18px #39FF14;
      line-height: 1.6;
    }

  `;
  document.head.appendChild(style);
})();


//List of colors used in effects

const FX_COLORS = [
  "#0a8858","#39FF14","#00BFFF","#FFD700",
  "#FF4500","#7DF9FF","#568017","#0b298b","#C77DFF"
];

//Get random color

function randColor() {
  return FX_COLORS[Math.floor(Math.random() * FX_COLORS.length)];
}

//Remove elements after animation ends

function removeAfter(el, ms) {
  setTimeout(() => el && el.parentNode && el.parentNode.removeChild(el), ms);
}


//Effect funcations

function shootingStars(count = 10) {     //Shooting stars across screen 
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const s     = document.createElement("div");
      s.classList.add("fx-streak");                  
      const angle = -(20 + Math.random() * 30);       //Random position and direction 
      const top   = 5  + Math.random() * 85;
      const color = randColor();
      const dur   = (0.3 + Math.random() * 0.25).toFixed(2) + "s";
      s.style.cssText = `
        top: ${top}vh; left: -20px;
        height: ${(2 + Math.random() * 3).toFixed(1)}px;
        background: linear-gradient(90deg, transparent, ${color});
        transform: rotate(${angle}deg); transform-origin: left center;
        box-shadow: 0 0 6px 2px ${color};
        --fx-dur: ${dur};
      `;
      document.body.appendChild(s);
      removeAfter(s, 800);
    }, i * 75);
  }
}

//Confetti burst from cards 

function confettiCannon(cardEl1, cardEl2) {
  [cardEl1, cardEl2].forEach(card => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top;
    for (let i = 0; i < 22; i++) {
      const p     = document.createElement("div");
      p.classList.add("fx-confetti");
      const size  = 6  + Math.random() * 9;
      const spread= -80 + Math.random() * 160;
      const color = randColor();
      const dur   = (0.7 + Math.random() * 0.5).toFixed(2) + "s";
      const delay = (Math.random() * 0.15).toFixed(2) + "s";
      const isPill= Math.random() > 0.5;
      p.style.cssText = `
        left: ${cx + spread - size / 2}px; top: ${cy}px;
        width: ${size}px; height: ${isPill ? size * 2.5 : size}px;
        background: ${color};
        border-radius: ${isPill ? "3px" : "50%"};
        --fx-dur: ${dur}; --fx-delay: ${delay};
      `;
      document.body.appendChild(p);
      removeAfter(p, 1400);
    }
  });
}

//Big MATCH bubble in center

function comicBubble() {
  const texts = ["MATCH!", "AMAZING!", "STELLAR!", "BOOM!", "WOW!", "GREAT!"];
  const b = document.createElement("div");
  b.classList.add("fx-comic-bubble");
  b.textContent = texts[Math.floor(Math.random() * texts.length)];
  b.style.left = "50vw";
  b.style.top  = "50vh";
  document.body.appendChild(b);
  removeAfter(b, 1200);
}

//Rainbow effect on matched cards 

function rainbowShimmer(cardEl1, cardEl2) {
  [cardEl1, cardEl2].forEach(card => {
    if (card) card.classList.add("fx-rainbow");
  });
}

//Rocket launch effect

function rocketLaunch(cardEl1, cardEl2) {
  [cardEl1, cardEl2].forEach((card, ci) => {
    if (!card) return;
    for (let f = 0; f < 8; f++) {                  //Add flame 
      setTimeout(() => {
        const rect  = card.getBoundingClientRect();
        const flame = document.createElement("div");
        flame.classList.add("fx-flame");
        const size  = 16 + Math.random() * 22;
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height - 10;
        const color = f % 2 === 0 ? "#301868" : "#038352";
        const dur   = (0.28 + Math.random() * 0.18).toFixed(2) + "s";
        flame.style.cssText = `
          left: ${cx - size / 2 + (Math.random() * 18 - 9)}px;
          top:  ${cy - size / 2}px;
          width: ${size}px; height: ${(size * 1.6).toFixed(1)}px;
          background: ${color}; --fx-dur: ${dur};
        `;
        document.body.appendChild(flame);
        removeAfter(flame, 600);
      }, ci * 50 + f * 45);
    }
    setTimeout(() => card.classList.add("fx-rocket"), 320 + ci * 40);    //Launch card upward
  });
}


//Will run all effects in order

function triggerMatchEffect(cardEl1, cardEl2) {
  if (!cardEl1 || !cardEl2) return;
  shootingStars(10);
  setTimeout(() => confettiCannon(cardEl1, cardEl2), 100);
  setTimeout(() => comicBubble(), 220);
  setTimeout(() => rainbowShimmer(cardEl1, cardEl2), 320);
  setTimeout(() => rocketLaunch(cardEl1, cardEl2), 520);
}

//Connet into game logic

(function patchCheckMatch() {
  window.addEventListener("load", () => {
    const _original = checkMatch;
    window.checkMatch = function checkMatch() {
      const c1 = (typeof firstCard  !== "undefined") ? firstCard  : null;   
      const c2 = (typeof secondCard !== "undefined") ? secondCard : null;
      if (c1 && c2 && c1.name === c2.name) {
        triggerMatchEffect(c1.card, c2.card);
      }
      _original.apply(this, arguments);
    };
  });
})();


//  Black hole + astronaut HUD: DOM injection and patching 

(function injectAndPatchHudEffect() {
  window.addEventListener("load", () => {

    // --- Inject HTML elements (positioned independently via CSS) ---
    const miniBH = document.createElement("div");
    miniBH.id = "mini-black-hole";
    miniBH.style.display = "none";
    document.body.appendChild(miniBH);

    const astronaut = document.createElement("img");
    astronaut.id = "hud-astronaut";
    astronaut.src = "assets/astronaut.png";
    astronaut.alt = "astronaut";
    astronaut.setAttribute("draggable", "false");
    astronaut.style.display = "none";
    document.body.appendChild(astronaut);

    const overlay = document.createElement("div");
    overlay.id = "game-overlay";
    document.body.appendChild(overlay);

    const timesupMsg = document.createElement("div");
    timesupMsg.id = "timesup-message";
    document.body.appendChild(timesupMsg);

    const TOTAL_TIME = 70;
    const AST_START_LEFT = 200; // px — starts to the right of the ~130px Abort Mission button

    // Track all pending timeouts so abort can cancel them
    const pendingTimeouts = [];
    function safeTimeout(fn, ms) {
      const id = setTimeout(fn, ms);
      pendingTimeouts.push(id);
      return id;
    }
    function clearAllPendingTimeouts() {
      while (pendingTimeouts.length) clearTimeout(pendingTimeouts.pop());
    }

    // Black hole center X based on CSS: right:270px, width:85px
    function getBHCenterX() {
      return window.innerWidth - 270 - 42;
    }

    // Update astronaut position each tick 
    function updateAstronautEffect() {
      const tl = (typeof timeLeft !== "undefined") ? timeLeft : TOTAL_TIME;
      const progress = 1 - (tl / TOTAL_TIME);

      const travelPx = getBHCenterX() - (AST_START_LEFT + 36);
      const newLeft  = AST_START_LEFT + (progress * travelPx);
      astronaut.style.transition = 'left 0.95s linear';
      astronaut.style.left = newLeft + 'px';
      astronaut.style.transform = `rotate(${progress * 25}deg)`;

      const spinDur = tl <= 15 ? '0.6s' : tl <= 30 ? '1.2s' : '3s';
      miniBH.style.animationDuration = spinDur;
      if (tl <= 15) {
        miniBH.style.boxShadow = '0 0 30px 14px #cc00ff, 0 0 60px 20px #3a006688';
      }
    }

    // Time-up cinematic (lose) 
    function playTimeUpEffect() {
      timesupMsg.innerHTML = "Time up buddy! Try again";

      // 1. Astronaut moves into black hole center and shrinks (transition: 0.5s)
      const bhCenterX = getBHCenterX();
      astronaut.style.transition = 'left 0.5s ease-in, transform 0.5s ease-in, opacity 0.5s ease-in';
      astronaut.style.left      = (bhCenterX - 36) + 'px';
      astronaut.style.transform = 'rotate(-90deg) scale(0.1)';
      astronaut.style.opacity   = '0';

      // 2. Black hole starts expanding (overlaps with astronaut anim, screen goes black ~1500ms)
      safeTimeout(() => {
        const maxDim   = Math.max(window.innerWidth, window.innerHeight) * 2.5;
        const expandPx = maxDim / 85;
        miniBH.style.transition = 'transform 1.1s ease-in, box-shadow 1.1s ease-in';
        miniBH.style.transform  = `scale(${expandPx})`;
        miniBH.style.boxShadow  = '0 0 80px 40px #000, 0 0 200px 100px #1a0030';
      }, 400);

      // 3. Message appears AFTER black hole fully covers screen (~1600ms), holds 3 seconds
      safeTimeout(() => {
        overlay.style.display = 'block';
        overlay.style.opacity = '0.92';
        timesupMsg.style.display = 'block';

        // 4. Hold message for exactly 3 seconds, then reset
        safeTimeout(() => {
          window.endGame();
        }, 3000);
      }, 1600);
    }

    // Win message overlay (4s then endGame)
    function playWinEffect() {
      timesupMsg.innerHTML = "You won!";
      overlay.style.display = 'block';
      safeTimeout(() => { overlay.style.opacity = '0.75'; }, 50);
      timesupMsg.style.display = 'block';

      safeTimeout(() => {
        window.endGame();
      }, 3000);
    }

    // Patch checkWin to intercept win and trigger win effect 
    const _origCheckWin = window.checkWin;
    window.checkWin = function checkWin() {
      const result = _origCheckWin.apply(this, arguments);
      if (result && miniBH.style.display === 'block') {
        clearAllPendingTimeouts();
        playWinEffect();
      }
      return result;
    };

    // Full immediate reset (no animation) 
    function resetHudEffect() {
      clearAllPendingTimeouts();

      astronaut.style.transition = 'none';
      astronaut.style.left      = AST_START_LEFT + 'px';
      astronaut.style.top       = '18px';
      astronaut.style.transform = 'rotate(0deg)';
      astronaut.style.opacity   = '1';
      astronaut.style.width     = '72px';
      astronaut.style.height    = '72px';

      miniBH.style.transition        = 'none';
      miniBH.style.transform         = '';
      miniBH.style.boxShadow         = '';
      miniBH.style.animationDuration = '3s';

      const gc = document.getElementById('game-container');
      if (gc) { gc.style.transition = 'none'; gc.style.opacity = '1'; }

      overlay.style.transition = 'none';
      overlay.style.opacity    = '0';
      overlay.style.display    = 'none';
      timesupMsg.style.display = 'none';
    }

    // Fix button centering (clears inline display:'block' set by game.js) 
    function fixButtonCentering() {
      const startBtn = document.getElementById('start-button');
      if (startBtn) startBtn.style.display = '';
    }

    // Patch startGame: show elements, reset state
    const _origStartGame = window.startGame;
    window.startGame = function startGame(difficulty) {
      clearAllPendingTimeouts();
      _origStartGame.apply(this, arguments);
      resetHudEffect();
      miniBH.style.display    = 'block';
      astronaut.style.display = 'block';
    };

    // Patch updateTimerDisplay: hook per-tick astronaut update 
    const _origStartTimer = window.startTimer;
    window.startTimer = function startTimer() {
      const _origUpdateTimer = window.updateTimerDisplay;
      window.updateTimerDisplay = function updateTimerDisplay() {
        _origUpdateTimer.apply(this, arguments);
        const tl = (typeof timeLeft !== "undefined") ? timeLeft : -1;
        if (miniBH.style.display === 'block') {
          if (tl <= 0) {
            playTimeUpEffect();
          } else {
            updateAstronautEffect();
          }
        }
      };
      _origStartTimer.apply(this, arguments);
    };

    // Patch endGame: hide elements, reset, fix button centering
    const _origEndGame = window.endGame;
    window.endGame = function endGame() {
      clearAllPendingTimeouts();
      miniBH.style.display    = 'none';
      astronaut.style.display = 'none';
      resetHudEffect();
      _origEndGame.apply(this, arguments);
      fixButtonCentering();
    };

    // Patch exitButton (Abort Mission): skip cinematic, reset immediately 
    const exitBtn = document.getElementById('exit-button');
    if (exitBtn) {
      // Remove the plain endGame listener set in input.js and replace with abort handler
      exitBtn.removeEventListener('click', window.endGame);
      exitBtn.addEventListener('click', function abortGame() {
        clearAllPendingTimeouts();
        miniBH.style.display    = 'none';
        astronaut.style.display = 'none';
        resetHudEffect();
        // Call the original game.js endGame directly (no cinematic)
        _origEndGame.apply(this, arguments);
        fixButtonCentering();
      });
    }

  });
})();