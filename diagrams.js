// Hooper's Path - Drill Diagrams v2
// Basketball drills: top-down coach-playbook notation
//   - Court from above with lines
//   - Player = filled circle with number/label
//   - Defender = X
//   - Ball movement = dashed line with arrow
//   - Cut/run = solid line with arrow
//   - Screen = small perpendicular line
// Strength drills: two-panel training-manual illustration
//   - Start position on left, end position on right
//   - Arrow between showing motion
//   - Body drawn with proper proportions (not stick figures)
//   - Colored target muscle highlighted

(function() {
  const C = {
    court:     '#1a2235',
    courtDark: '#0f1523',
    line:      'rgba(245,241,232,0.55)',
    lineSoft:  'rgba(245,241,232,0.3)',
    flame:     '#ff6b1a',
    lime:      '#b4ff3a',
    ball:      '#ff8c3a',
    player:    '#f5f1e8',
    defender:  '#ff6b1a',
    body:      '#e8dcc8',
    bodyDark:  '#a08870',
    muscle:    '#ff6b1a',
    label:     'rgba(245,241,232,0.6)',
    accent:    '#b4ff3a',
  };

  // ============================================================
  // SVG PRIMITIVES
  // ============================================================
  const svg = (content, vb = '0 0 320 200') =>
    `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block" font-family="system-ui,-apple-system,sans-serif">${content}</svg>`;

  const defs = () => `
    <defs>
      <marker id="arrSolid" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.flame}"/>
      </marker>
      <marker id="arrLime" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.lime}"/>
      </marker>
      <marker id="arrBall" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.ball}"/>
      </marker>
    </defs>
  `;

  // ============================================================
  // BASKETBALL COURT RENDERING
  // ============================================================

  // Top-down half-court view. Hoop at top.
  // Standard coach-playbook orientation.
  const halfCourt = (inner = '') => `
    ${defs()}
    <rect x="20" y="15" width="280" height="170" fill="${C.court}" stroke="${C.line}" stroke-width="2" rx="3"/>
    <!-- baseline markings: backboard, rim -->
    <line x1="135" y1="20" x2="185" y2="20" stroke="${C.flame}" stroke-width="2.5"/>
    <circle cx="160" cy="29" r="6" fill="none" stroke="${C.flame}" stroke-width="2"/>
    <!-- paint/lane -->
    <rect x="125" y="20" width="70" height="62" fill="${C.courtDark}" stroke="${C.line}" stroke-width="1.5"/>
    <!-- free throw circle (solid top half) -->
    <path d="M 125 82 A 35 35 0 0 0 195 82" fill="none" stroke="${C.line}" stroke-width="1.5"/>
    <path d="M 125 82 A 35 35 0 0 1 195 82" fill="none" stroke="${C.lineSoft}" stroke-width="1" stroke-dasharray="3,3"/>
    <!-- 3-point arc -->
    <line x1="48" y1="20" x2="48" y2="55" stroke="${C.line}" stroke-width="1.5"/>
    <line x1="272" y1="20" x2="272" y2="55" stroke="${C.line}" stroke-width="1.5"/>
    <path d="M 48 55 A 112 112 0 0 0 272 55" fill="none" stroke="${C.line}" stroke-width="1.5"/>
    <!-- halfcourt line at bottom -->
    <line x1="20" y1="185" x2="300" y2="185" stroke="${C.line}" stroke-width="1.5"/>
    ${inner}
  `;

  // Full court horizontal (for conditioning, full-court drills)
  const fullCourt = (inner = '') => `
    ${defs()}
    <rect x="10" y="45" width="300" height="110" fill="${C.court}" stroke="${C.line}" stroke-width="2" rx="3"/>
    <!-- half line -->
    <line x1="160" y1="45" x2="160" y2="155" stroke="${C.line}" stroke-width="1.5"/>
    <!-- center circle -->
    <circle cx="160" cy="100" r="16" fill="none" stroke="${C.line}" stroke-width="1.5"/>
    <!-- left hoop area -->
    <rect x="10" y="78" width="24" height="44" fill="${C.courtDark}" stroke="${C.line}" stroke-width="1"/>
    <path d="M 34 78 A 22 22 0 0 0 34 122" fill="none" stroke="${C.line}" stroke-width="1"/>
    <line x1="10" y1="90" x2="16" y2="90" stroke="${C.flame}" stroke-width="2"/>
    <line x1="10" y1="110" x2="16" y2="110" stroke="${C.flame}" stroke-width="2"/>
    <circle cx="19" cy="100" r="4" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
    <!-- right hoop area -->
    <rect x="286" y="78" width="24" height="44" fill="${C.courtDark}" stroke="${C.line}" stroke-width="1"/>
    <path d="M 286 78 A 22 22 0 0 1 286 122" fill="none" stroke="${C.line}" stroke-width="1"/>
    <line x1="304" y1="90" x2="310" y2="90" stroke="${C.flame}" stroke-width="2"/>
    <line x1="304" y1="110" x2="310" y2="110" stroke="${C.flame}" stroke-width="2"/>
    <circle cx="301" cy="100" r="4" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
    ${inner}
  `;

  // Open space (no court)
  const openSpace = (inner = '') => `
    ${defs()}
    <rect x="15" y="15" width="290" height="170" fill="${C.court}" stroke="${C.lineSoft}" stroke-width="1" stroke-dasharray="4,3" rx="4"/>
    ${inner}
  `;

  // Player marker (filled circle, white, with optional number/letter)
  const P = (x, y, label = '1') => `
    <circle cx="${x}" cy="${y}" r="11" fill="${C.player}" stroke="${C.courtDark}" stroke-width="2"/>
    <text x="${x}" y="${y + 4}" text-anchor="middle" fill="${C.courtDark}" font-size="12" font-weight="700">${label}</text>
  `;

  // Defender marker (X in orange)
  const D = (x, y, label = 'X') => `
    <circle cx="${x}" cy="${y}" r="11" fill="${C.defender}" stroke="${C.courtDark}" stroke-width="2"/>
    <text x="${x}" y="${y + 4}" text-anchor="middle" fill="${C.courtDark}" font-size="12" font-weight="700">${label}</text>
  `;

  // Cone
  const cone = (x, y) => `<polygon points="${x-5},${y+4} ${x+5},${y+4} ${x},${y-6}" fill="${C.flame}" stroke="${C.courtDark}" stroke-width="1"/>`;

  // Ball
  const ball = (x, y) => `
    <circle cx="${x}" cy="${y}" r="5" fill="${C.ball}" stroke="${C.courtDark}" stroke-width="1"/>
    <path d="M ${x-4} ${y} Q ${x} ${y-4} ${x+4} ${y} M ${x-4} ${y} Q ${x} ${y+4} ${x+4} ${y}" stroke="${C.courtDark}" stroke-width="0.5" fill="none"/>
  `;

  // Cut (solid line with arrow) — standard basketball notation
  const cut = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>`;

  // Curved cut
  const cutCurve = (x1, y1, cx, cy, x2, y2) =>
    `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>`;

  // Dribble path (dashed line with arrow)
  const dribble = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ball}" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrBall)"/>`;

  const dribbleCurve = (x1, y1, cx, cy, x2, y2) =>
    `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${C.ball}" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrBall)"/>`;

  // Pass (solid flame-colored line with double arrow)
  const pass = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)"/>`;

  // Shot (solid line to rim with arrow)
  const shot = (x, y, rimX = 160, rimY = 29) => {
    const id = 'shot' + Math.random().toString(36).slice(2, 8);
    return `
      <defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.flame}"/>
      </marker></defs>
      <path d="M ${x} ${y} Q ${(x+rimX)/2} ${Math.min(y, rimY) - 25} ${rimX} ${rimY}" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="2,3" marker-end="url(#${id})"/>
    `;
  };

  // Title bar (overlayed on image)
  const title = (text) => `
    <rect x="20" y="15" width="280" height="22" fill="${C.courtDark}" opacity="0.85"/>
    <text x="160" y="30" text-anchor="middle" fill="${C.flame}" font-size="11" font-weight="700" letter-spacing="1.5">${text.toUpperCase()}</text>
  `;

  // Bottom caption
  const caption = (text, y = 195) =>
    `<text x="160" y="${y}" text-anchor="middle" fill="${C.label}" font-size="9" font-weight="500">${text}</text>`;

  // Coaching cue label (small orange badge)
  const cue = (x, y, text) => `
    <rect x="${x - text.length * 3}" y="${y - 7}" width="${text.length * 6}" height="14" rx="7" fill="${C.flame}"/>
    <text x="${x}" y="${y + 3}" text-anchor="middle" fill="${C.courtDark}" font-size="9" font-weight="700">${text}</text>
  `;

  // Step indicator (tiny numbered badge)
  const step = (x, y, n) => `
    <circle cx="${x}" cy="${y}" r="8" fill="${C.flame}" stroke="${C.courtDark}" stroke-width="1.5"/>
    <text x="${x}" y="${y + 3}" text-anchor="middle" fill="${C.courtDark}" font-size="10" font-weight="700">${n}</text>
  `;

  // ============================================================
  // HUMAN FIGURES for STRENGTH DRILLS
  // Uses simple but proper human proportions, no stick figures
  // Helper takes cx (center x), cy (feet y), and pose
  // ============================================================

  // Render human body with proper proportions
  // Units: head ~ 14px diameter, body ~6 heads tall
  // Poses: stand, squatDeep, squatHalf, lungeFront, lungeReverse,
  //        pushupUp, pushupDown, plank, sidePlank, pullupHang, pullupUp,
  //        lunge, bridge, deadbug, russian, hipFlexorStretch,
  //        boxJumpLand, bulgarianBack, jumpSquatTop, bendOverRow,
  //        pikePushup, wallsit, calfFlat, calfUp
  const person = (cx, cy, pose, opts = {}) => {
    const clr = opts.color || C.body;
    const faded = opts.faded;
    const op = faded ? '0.35' : '1';
    const st = opts.highlight ? C.muscle : clr;
    const stW = opts.highlight ? 3.5 : 2.5;

    const h = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${clr}" stroke="${C.courtDark}" stroke-width="1" opacity="${op}"/>`;
    const b = (x1, y1, x2, y2, w = 2.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${clr}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
    const m = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${st}" stroke-width="${stW}" stroke-linecap="round" opacity="${op}"/>`;

    switch (pose) {
      case 'stand': {
        return h(cx, cy-56, 6) + b(cx, cy-50, cx, cy-24) + // head, torso
          b(cx, cy-44, cx-10, cy-30) + b(cx, cy-44, cx+10, cy-30) + // arms
          b(cx, cy-24, cx-5, cy-1) + b(cx, cy-24, cx+5, cy-1); // legs
      }
      case 'squatDeep': {
        return h(cx, cy-42, 6) + b(cx, cy-36, cx+2, cy-22) + // shortened torso
          b(cx, cy-32, cx-10, cy-34) + b(cx, cy-32, cx+10, cy-34) + // arms front
          m(cx+2, cy-22, cx-10, cy-14) + m(cx-10, cy-14, cx-6, cy-1) + // bent L leg (highlight quads)
          m(cx+2, cy-22, cx+12, cy-14) + m(cx+12, cy-14, cx+7, cy-1); // bent R leg
      }
      case 'squatHalf': {
        return h(cx, cy-50, 6) + b(cx, cy-44, cx, cy-26) +
          b(cx, cy-40, cx-10, cy-32) + b(cx, cy-40, cx+10, cy-32) +
          m(cx, cy-26, cx-7, cy-14) + m(cx-7, cy-14, cx-6, cy-1) +
          m(cx, cy-26, cx+7, cy-14) + m(cx+7, cy-14, cx+6, cy-1);
      }
      case 'jumpTop': {
        // feet off ground, arms up
        return h(cx, cy-72, 6) + b(cx, cy-66, cx, cy-42) +
          b(cx, cy-60, cx-8, cy-75) + b(cx, cy-60, cx+8, cy-75) + // arms up
          b(cx, cy-42, cx-5, cy-22) + b(cx, cy-42, cx+5, cy-22); // feet above ground
      }
      case 'lungeFwd': {
        // front leg bent 90°, back leg extended
        return h(cx-12, cy-52, 6) + b(cx-12, cy-46, cx-10, cy-22) +
          b(cx-12, cy-40, cx-22, cy-28) + b(cx-12, cy-40, cx-4, cy-28) +
          m(cx-10, cy-22, cx+10, cy-16) + m(cx+10, cy-16, cx+10, cy-1) + // front leg
          b(cx-10, cy-22, cx-24, cy-8) + b(cx-24, cy-8, cx-16, cy-1); // back leg
      }
      case 'lungeBack': {
        // mirror of lungeFwd
        return h(cx+12, cy-52, 6) + b(cx+12, cy-46, cx+10, cy-22) +
          b(cx+12, cy-40, cx+22, cy-28) + b(cx+12, cy-40, cx+4, cy-28) +
          m(cx+10, cy-22, cx-10, cy-16) + m(cx-10, cy-16, cx-10, cy-1) +
          b(cx+10, cy-22, cx+24, cy-8) + b(cx+24, cy-8, cx+16, cy-1);
      }
      case 'pushupUp': {
        // plank with straight arms
        return h(cx-32, cy-20, 5) + // head at left
          b(cx-28, cy-19, cx+36, cy-17, 3) + // body horizontal
          b(cx-22, cy-19, cx-22, cy-2) + // near arm
          b(cx-22, cy-2, cx-16, cy-2) + // hand
          b(cx+32, cy-17, cx+38, cy-2); // feet
      }
      case 'pushupDown': {
        return h(cx-32, cy-12, 5) + // head down
          b(cx-28, cy-11, cx+36, cy-9, 3) + // body close to ground
          b(cx-22, cy-11, cx-26, cy-2) + // bent arm
          b(cx-22, cy-11, cx-18, cy-11) + // upper arm
          b(cx+32, cy-9, cx+38, cy-2); // feet
      }
      case 'pikePushup': {
        // inverted V shape
        return h(cx-25, cy-25, 5) +
          b(cx-20, cy-26, cx, cy-56, 3) + // torso up to hips at apex
          b(cx, cy-56, cx+25, cy-2, 3) + // legs straight down to feet
          b(cx-25, cy-20, cx-25, cy-2); // arm straight down
      }
      case 'plank': {
        return h(cx-40, cy-22, 5) +
          b(cx-35, cy-21, cx+40, cy-18, 3.5) +
          b(cx-30, cy-21, cx-30, cy-8) + // forearm to ground
          b(cx-30, cy-8, cx-20, cy-8) + // forearm horiz
          b(cx+40, cy-18, cx+48, cy-2); // legs/feet
      }
      case 'sidePlank': {
        return h(cx-40, cy-30, 5) +
          b(cx-36, cy-29, cx+40, cy-12, 3.5) +
          b(cx-36, cy-25, cx-36, cy-8) + // arm down
          b(cx-36, cy-8, cx-28, cy-8) + // forearm on ground
          b(cx-36, cy-25, cx-32, cy-45) + // upper arm raised
          b(cx+40, cy-12, cx+48, cy-2);
      }
      case 'hang': {
        // hanging from bar
        return h(cx, cy-72, 6) +
          b(cx, cy-66, cx, cy-20) +
          b(cx-6, cy-66, cx-6, cy-80) + b(cx+6, cy-66, cx+6, cy-80) + // arms up to bar
          b(cx, cy-20, cx-5, cy-2) + b(cx, cy-20, cx+5, cy-2);
      }
      case 'pullupTop': {
        // chin at bar
        return h(cx, cy-80, 6) +
          b(cx, cy-74, cx, cy-38) +
          m(cx-6, cy-74, cx-6, cy-86) + m(cx+6, cy-74, cx+6, cy-86) + // flexed arms
          b(cx, cy-38, cx-5, cy-20) + b(cx, cy-38, cx+5, cy-20);
      }
      case 'lyingBack': {
        // supine, legs bent, on ground
        return h(cx-45, cy-8, 5) +
          b(cx-40, cy-8, cx+10, cy-8, 3.5) + // torso flat
          b(cx+10, cy-8, cx+25, cy-22) + b(cx+25, cy-22, cx+35, cy-2); // bent legs
      }
      case 'bridge': {
        // hips lifted, knees bent, shoulders on floor
        return h(cx-50, cy-10, 5) +
          b(cx-45, cy-10, cx+5, cy-35, 3.5) + // torso from shoulders to lifted hips
          m(cx+5, cy-35, cx+20, cy-20) + // thigh
          b(cx+20, cy-20, cx+28, cy-2); // shin to floor
      }
      case 'deadbug': {
        // supine with opposite arm/leg extended
        return h(cx-50, cy-10, 5) +
          b(cx-45, cy-10, cx+20, cy-10, 3.5) +
          b(cx-38, cy-10, cx-56, cy-30, 2.5) + // arm up back
          m(cx+20, cy-10, cx+48, cy-30); // leg out forward
      }
      case 'russian': {
        // seated V, torso leaned back, legs up
        return h(cx-18, cy-40, 5) +
          b(cx-16, cy-36, cx+14, cy-16, 3.5) + // leaned torso
          b(cx+14, cy-16, cx+38, cy-38) + // legs up diagonally
          b(cx-5, cy-26, cx+10, cy-32, 2); // arms holding ball
      }
      case 'kneelStretch': {
        // kneeling hip flexor stretch
        return h(cx, cy-48, 6) +
          b(cx, cy-42, cx, cy-24) + // torso upright
          m(cx, cy-24, cx+20, cy-14) + m(cx+20, cy-14, cx+20, cy-1) + // front leg 90°
          m(cx, cy-24, cx-16, cy-10) + m(cx-16, cy-10, cx-22, cy-1); // back leg down
      }
      case 'bentRow': {
        // hinged at hip for DB row
        return h(cx-30, cy-40, 6) +
          b(cx-28, cy-36, cx+30, cy-25, 3.5) + // horizontal torso
          b(cx+28, cy-26, cx+28, cy-2) + // legs down
          m(cx-5, cy-30, cx-5, cy-15) + // arm pulling
          b(cx-15, cy-20, cx-5, cy-15, 2.5); // elbow
      }
      case 'overheadPress': {
        return h(cx, cy-56, 6) +
          b(cx, cy-50, cx, cy-20) +
          m(cx-8, cy-46, cx-14, cy-75) + m(cx+8, cy-46, cx+14, cy-75) + // arms up
          b(cx, cy-20, cx-5, cy-1) + b(cx, cy-20, cx+5, cy-1);
      }
      case 'benchPress': {
        // supine with arms pressing up
        return h(cx-40, cy-10, 5) +
          b(cx-36, cy-10, cx+20, cy-10, 3.5) +
          m(cx-15, cy-10, cx-15, cy-28) + m(cx+5, cy-10, cx+5, cy-28); // arms up
      }
      case 'calfFlat': {
        return h(cx, cy-58, 6) + b(cx, cy-52, cx, cy-26) +
          b(cx, cy-46, cx-10, cy-32) + b(cx, cy-46, cx+10, cy-32) +
          b(cx, cy-26, cx-5, cy-1) + b(cx, cy-26, cx+5, cy-1) +
          b(cx-8, cy-1, cx+8, cy-1, 3);
      }
      case 'calfUp': {
        return h(cx, cy-64, 6) + b(cx, cy-58, cx, cy-32) +
          b(cx, cy-52, cx-10, cy-38) + b(cx, cy-52, cx+10, cy-38) +
          b(cx, cy-32, cx-5, cy-6) + b(cx, cy-32, cx+5, cy-6) +
          m(cx-6, cy-6, cx+6, cy-6, 3); // on toes
      }
      case 'wallSit': {
        // back against wall, thighs parallel
        return h(cx-18, cy-46, 6) +
          b(cx-18, cy-40, cx-18, cy-20, 3.5) + // torso vertical against wall
          m(cx-18, cy-20, cx+6, cy-20) + // thigh horizontal
          b(cx+6, cy-20, cx+6, cy-2); // shin down
      }
      case 'broadJumpLoad': {
        return h(cx-10, cy-32, 5) + b(cx-10, cy-28, cx, cy-20, 3) +
          b(cx-16, cy-28, cx-26, cy-18) + // arms back
          b(cx+6, cy-28, cx+16, cy-18) +
          m(cx, cy-20, cx-8, cy-14) + m(cx-8, cy-14, cx-6, cy-1) +
          m(cx, cy-20, cx+10, cy-14) + m(cx+10, cy-14, cx+8, cy-1);
      }
      case 'broadJumpAir': {
        // midflight, arms forward, legs tucked
        return h(cx-8, cy-36, 5) + b(cx-6, cy-32, cx+8, cy-20, 3) +
          b(cx, cy-30, cx+14, cy-28) +  // arms forward
          b(cx+8, cy-20, cx+16, cy-15) + // leg extended
          b(cx+8, cy-20, cx-2, cy-12);
      }
      case 'box': { // no person, just box
        return '';
      }
      case 'stretch': {
        // forward fold reach
        return h(cx, cy-48, 6) +
          b(cx, cy-42, cx+20, cy-20, 3) + // torso folded
          b(cx+20, cy-20, cx+30, cy-4) + // arm reaching toward toes
          b(cx-2, cy-20, cx-5, cy-1) + b(cx+2, cy-20, cx+5, cy-1);
      }
      case 'ankleMob': {
        // split stance, front knee driving over toe
        return h(cx-10, cy-48, 6) +
          b(cx-10, cy-42, cx-10, cy-22, 3) +
          b(cx-10, cy-22, cx+10, cy-18) + // front thigh over toes
          m(cx+10, cy-18, cx+20, cy-1) + // front shin angled forward
          b(cx-10, cy-22, cx-22, cy-8) + b(cx-22, cy-8, cx-28, cy-1);
      }
      default: return h(cx, cy-56) + b(cx, cy-50, cx, cy-24) +
        b(cx, cy-44, cx-10, cy-30) + b(cx, cy-44, cx+10, cy-30) +
        b(cx, cy-24, cx-5, cy-1) + b(cx, cy-24, cx+5, cy-1);
    }
  };

  // Ground line
  const ground = (y = 185, x1 = 20, x2 = 300) =>
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.lineSoft}" stroke-width="2" stroke-linecap="round"/>
     <g opacity="0.3">${Array.from({length:8}, (_,i) => {
       const x = x1 + 10 + i * ((x2-x1-20)/8);
       return `<line x1="${x}" y1="${y}" x2="${x-5}" y2="${y+4}" stroke="${C.lineSoft}" stroke-width="1"/>`;
     }).join('')}</g>`;

  // Equipment
  const bench = (x, y, w = 60) =>
    `<rect x="${x - w/2}" y="${y - 4}" width="${w}" height="8" rx="2" fill="${C.flame}" stroke="${C.courtDark}" stroke-width="1.5"/>
     <line x1="${x - w/3}" y1="${y + 4}" x2="${x - w/3}" y2="${y + 14}" stroke="${C.courtDark}" stroke-width="2"/>
     <line x1="${x + w/3}" y1="${y + 4}" x2="${x + w/3}" y2="${y + 14}" stroke="${C.courtDark}" stroke-width="2"/>`;

  const box = (x, y, w = 50, h = 30) =>
    `<rect x="${x - w/2}" y="${y - h}" width="${w}" height="${h}" fill="${C.flame}" opacity="0.35" stroke="${C.flame}" stroke-width="2" rx="2"/>
     <text x="${x}" y="${y - h/2 + 3}" text-anchor="middle" fill="${C.flame}" font-size="9" font-weight="700">BOX</text>`;

  const pullupBar = () =>
    `<line x1="100" y1="30" x2="220" y2="30" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
     <line x1="100" y1="30" x2="100" y2="20" stroke="${C.flame}" stroke-width="3"/>
     <line x1="220" y1="30" x2="220" y2="20" stroke="${C.flame}" stroke-width="3"/>`;

  const wall = (x) =>
    `<line x1="${x}" y1="20" x2="${x}" y2="185" stroke="${C.flame}" stroke-width="3"/>
     ${Array.from({length:10},(_,i)=>`<line x1="${x-6}" y1="${30+i*16}" x2="${x-1}" y2="${36+i*16}" stroke="${C.flame}" stroke-width="1" opacity="0.4"/>`).join('')}`;

  const dumbbell = (x, y, s = 1) =>
    `<rect x="${x-8*s}" y="${y-3*s}" width="16*${s}" height="6*${s}" width="${16*s}" height="${6*s}" fill="${C.flame}" rx="1"/>
     <rect x="${x-10*s}" y="${y-5*s}" width="${5*s}" height="${10*s}" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>
     <rect x="${x+5*s}" y="${y-5*s}" width="${5*s}" height="${10*s}" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>`;

  const foamRoll = (x, y) =>
    `<ellipse cx="${x}" cy="${y}" rx="22" ry="8" fill="${C.flame}" opacity="0.5" stroke="${C.flame}" stroke-width="2"/>
     <line x1="${x-22}" y1="${y}" x2="${x+22}" y2="${y}" stroke="${C.flame}" stroke-width="0.8" opacity="0.7"/>`;

  // Motion arrow between panels
  const motionArrow = (x, y, dir = 'right') => {
    const id = 'mot' + Math.random().toString(36).slice(2, 8);
    return `
      <defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.lime}"/>
      </marker></defs>
      <line x1="${dir === 'right' ? x - 15 : x + 15}" y1="${y}" x2="${dir === 'right' ? x + 15 : x - 15}" y2="${y}"
        stroke="${C.lime}" stroke-width="3" stroke-linecap="round" marker-end="url(#${id})"/>
    `;
  };

  // Two-panel strength diagram helper
  const strengthTwoPanel = (title_, left, right, leftLabel, rightLabel, cueText) => svg(`
    ${title(title_)}
    <!-- divider -->
    <line x1="160" y1="50" x2="160" y2="175" stroke="${C.lineSoft}" stroke-width="1" stroke-dasharray="3,3"/>
    <!-- panels -->
    <g transform="translate(0,10)">${left}</g>
    <g transform="translate(0,10)">${right}</g>
    ${motionArrow(160, 100)}
    <text x="85" y="168" text-anchor="middle" fill="${C.lime}" font-size="10" font-weight="700">${leftLabel.toUpperCase()}</text>
    <text x="235" y="168" text-anchor="middle" fill="${C.flame}" font-size="10" font-weight="700">${rightLabel.toUpperCase()}</text>
    ${caption(cueText)}
  `);

  // ============================================================
  // DRILL DIAGRAMS
  // ============================================================
  const DIAGRAMS = {
    // ============================================================
    // BALL HANDLING
    // ============================================================
    bh1: () => svg(halfCourt(`
      ${title("Pound Dribble")}
      ${P(160, 120, '1')}
      ${ball(168, 128)}
      <!-- pound indicator: up/down arrows -->
      <g stroke="${C.ball}" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M 184 125 L 184 145" marker-end="url(#arrBall)"/>
        <path d="M 196 145 L 196 125" marker-end="url(#arrBall)"/>
      </g>
      ${cue(220, 135, 'POUND')}
      ${caption('Stay low · ball below knee · eyes up')}
    `)),

    bh2: () => svg(halfCourt(`
      ${title("Crossover Dribble")}
      ${P(160, 120, '1')}
      ${dribbleCurve(140, 135, 160, 90, 180, 135)}
      ${dribbleCurve(180, 140, 160, 100, 140, 140)}
      ${cue(100, 135, 'L')}
      ${cue(220, 135, 'R')}
      ${caption('Hand to hand · below waist · quick and tight')}
    `)),

    bh3: () => svg(halfCourt(`
      ${title("Figure 8 Dribble")}
      ${P(160, 120, '1')}
      <path d="M 145 140 Q 155 125 160 135 Q 165 145 175 140 Q 180 135 175 130 Q 170 125 160 135 Q 150 145 145 140" stroke="${C.ball}" stroke-width="2" fill="none" stroke-dasharray="4,2"/>
      ${ball(145, 140)}
      ${caption('Dribble through legs in figure 8 pattern')}
    `)),

    bh4: () => svg(halfCourt(`
      ${title("Two-Ball Dribble")}
      ${P(160, 120, '1')}
      ${ball(144, 135)}
      ${ball(176, 135)}
      <g stroke="${C.ball}" stroke-width="2" fill="none" marker-end="url(#arrBall)">
        <path d="M 144 143 L 144 158"/>
        <path d="M 176 143 L 176 158"/>
      </g>
      ${cue(110, 145, 'L BALL')}
      ${cue(215, 145, 'R BALL')}
      ${caption('Both balls same height → alternating')}
    `)),

    bh5: () => svg(halfCourt(`
      ${title("Spider Dribble")}
      ${P(160, 120, '1')}
      ${ball(160, 105)}
      <g stroke="${C.ball}" stroke-width="2" fill="none" stroke-dasharray="3,2" marker-end="url(#arrBall)">
        <path d="M 160 110 Q 140 135 160 150"/>
        <path d="M 160 150 Q 180 135 160 110"/>
      </g>
      ${cue(110, 135, 'FRONT')}
      ${cue(215, 135, 'BACK')}
      ${caption('Rapid alternating front/back of legs')}
    `)),

    bh6: () => svg(halfCourt(`
      ${title("In-and-Out Dribble")}
      ${P(160, 120, '1')}
      ${step(145, 110, 1)}
      ${step(180, 110, 2)}
      ${dribbleCurve(145, 120, 130, 105, 150, 125)}
      ${dribble(150, 130, 200, 160)}
      ${caption('1: fake crossover → 2: attack same hand')}
    `)),

    bh7: () => svg(halfCourt(`
      ${title("Behind-the-Back")}
      ${P(160, 120, '1')}
      ${dribbleCurve(145, 130, 160, 160, 175, 130)}
      ${caption('Ball passes BEHIND waist, hand to hand')}
    `)),

    bh8: () => svg(halfCourt(`
      ${title("Cone Weave")}
      ${cone(80, 140)} ${cone(120, 140)} ${cone(160, 140)} ${cone(200, 140)} ${cone(240, 140)}
      ${P(50, 140, '1')}
      <path d="M 60 145 Q 80 125 100 145 Q 120 165 140 145 Q 160 125 180 145 Q 200 165 220 145 Q 240 125 260 145" stroke="${C.ball}" stroke-width="2.5" stroke-dasharray="5,3" fill="none" marker-end="url(#arrBall)"/>
      ${caption('Crossover at EACH cone · alternate hands')}
    `)),

    bh9: () => svg(halfCourt(`
      ${title("Stationary Combo")}
      ${P(160, 120, '1')}
      ${ball(170, 130)}
      <g font-size="9" fill="${C.label}" font-weight="600">
        <text x="100" y="155">POUND x4</text>
        <text x="100" y="170" fill="${C.ball}">→ CROSS</text>
        <text x="215" y="155">POUND x4</text>
        <text x="215" y="170" fill="${C.ball}">→ BEHIND</text>
      </g>
      ${caption('Build sequences like a real game')}
    `)),

    // ============================================================
    // SHOOTING
    // ============================================================
    sh1: () => svg(halfCourt(`
      ${title("Form Shooting")}
      ${P(160, 55, '1')}
      ${shot(160, 55)}
      ${cue(260, 55, 'CLOSE')}
      ${caption('3 ft from rim · one-handed · perfect arc')}
    `)),

    sh2: () => svg(halfCourt(`
      ${title("Free Throws")}
      ${P(160, 80, '1')}
      ${shot(160, 80)}
      <!-- extra emphasis on FT line -->
      <line x1="125" y1="82" x2="195" y2="82" stroke="${C.flame}" stroke-width="3"/>
      ${caption('Same routine every shot · track makes/attempts')}
    `)),

    sh3: () => svg(halfCourt(`
      ${title("Mikan Drill")}
      ${P(145, 38, 'R')}
      ${P(175, 38, 'L')}
      ${shot(145, 38, 160, 29)}
      ${shot(175, 38, 160, 29)}
      <path d="M 145 46 Q 160 55 175 46" stroke="${C.lime}" stroke-width="2" fill="none" stroke-dasharray="3,3" marker-end="url(#arrLime)"/>
      ${caption('R layup → catch → L layup · continuous')}
    `)),

    sh4: () => svg(halfCourt(`
      ${title("Spot Shooting")}
      ${P(50, 55, '1')}
      ${P(95, 40, '2')}
      ${P(160, 37, '3')}
      ${P(225, 40, '4')}
      ${P(270, 55, '5')}
      ${shot(50, 55)}${shot(95, 40)}${shot(160, 37)}${shot(225, 40)}${shot(270, 55)}
      ${caption('5 in a row per spot before moving on')}
    `)),

    sh5: () => svg(halfCourt(`
      ${title("Catch and Shoot")}
      ${P(100, 75, 'P')}
      ${P(220, 75, '1')}
      ${pass(108, 75, 212, 75)}
      ${shot(220, 75)}
      ${cue(160, 65, 'CATCH → SHOOT')}
      ${caption('Square up on catch · shoot in rhythm')}
    `)),

    sh6: () => svg(halfCourt(`
      ${title("Pull-Up Jumper")}
      ${step(70, 130, 1)}
      ${P(70, 130, '1')}
      ${dribbleCurve(80, 130, 130, 110, 160, 85)}
      ${step(180, 80, 2)}
      ${P(160, 75, '2')}
      ${shot(160, 75)}
      ${cue(245, 85, 'RISE')}
      ${caption('1: dribble in · 2: plant hard · rise and shoot')}
    `)),

    sh7: () => svg(halfCourt(`
      ${title("3-Point Routine")}
      ${P(55, 47, '1')}
      ${P(95, 30, '2')}
      ${P(160, 28, '3')}
      ${shot(55, 47)}${shot(95, 30)}${shot(160, 28)}
      ${caption('Corner · wing · top · 10 shots each')}
    `)),

    sh8: () => svg(halfCourt(`
      ${title("Beat the Pro")}
      ${P(160, 55, '1')}
      ${shot(160, 55)}
      <g font-size="10" font-weight="700">
        <text x="70" y="150" fill="${C.lime}">YOU: +1 / make</text>
        <text x="70" y="168" fill="${C.flame}">PRO: +3 / miss</text>
      </g>
      ${cue(235, 160, 'RACE TO 21')}
      ${caption('Pressure shooting simulation')}
    `)),

    sh9: () => svg(halfCourt(`
      ${title("Elbow to Elbow")}
      ${P(125, 82, 'R')}
      ${P(195, 82, 'L')}
      ${shot(125, 82)}${shot(195, 82)}
      ${dribbleCurve(125, 92, 160, 130, 195, 92)}
      ${caption('Shoot R elbow · chase · dribble · L elbow · shoot')}
    `)),

    sh10: () => svg(openSpace(`
      ${title("Wall Shooting")}
      <!-- vertical wall on left -->
      <rect x="15" y="15" width="15" height="170" fill="${C.flame}" opacity="0.25" stroke="${C.flame}" stroke-width="2"/>
      <!-- target on wall 8ft up -->
      <circle cx="25" cy="55" r="8" fill="none" stroke="${C.flame}" stroke-width="2.5"/>
      <circle cx="25" cy="55" r="3" fill="${C.flame}"/>
      ${P(150, 110, '1')}
      ${shot(150, 110, 25, 55)}
      ${cue(85, 55, '8 FT UP')}
      ${caption('No hoop? Shoot at wall target · focus on form')}
    `)),

    // ============================================================
    // FINISHING (require hoop)
    // ============================================================
    fin1: () => svg(halfCourt(`
      ${title("Euro Step")}
      ${step(80, 75, 1)}
      ${P(80, 75, '1')}
      ${dribbleCurve(88, 75, 130, 80, 150, 55)}
      ${step(155, 50, 2)}
      ${P(155, 50, '2')}
      ${cut(155, 42, 165, 32)}
      ${step(175, 32, 3)}
      ${P(175, 32, '3')}
      ${shot(175, 32, 160, 29)}
      ${cue(245, 55, 'FAKE → ACROSS')}
      ${caption('Long step one way → step THROUGH the other')}
    `)),

    fin2: () => svg(halfCourt(`
      ${title("Reverse Layup")}
      ${P(100, 55, '1')}
      ${dribbleCurve(108, 55, 150, 55, 175, 38)}
      ${cutCurve(175, 38, 180, 25, 175, 20)}
      ${shot(175, 22, 158, 28)}
      ${cue(240, 40, 'FAR SIDE')}
      ${caption('Drive middle · finish on far side of rim')}
    `)),

    fin3: () => svg(halfCourt(`
      ${title("Floater")}
      ${P(160, 75, '1')}
      <!-- high arc trajectory -->
      <path d="M 160 70 Q 155 35 158 30" fill="none" stroke="${C.flame}" stroke-width="2.5" stroke-dasharray="2,3" marker-end="url(#arrSolid)"/>
      <!-- opponent below -->
      ${D(160, 48)}
      ${cue(250, 50, 'HIGH ARC')}
      ${caption('Short one-foot jumper · over the defender')}
    `)),

    fin4: () => svg(halfCourt(`
      ${title("Up and Under")}
      ${P(160, 52, '1')}
      ${step(160, 38, 1)}
      ${cue(100, 38, 'PUMP FAKE')}
      ${step(145, 30, 2)}
      ${cut(160, 52, 145, 30)}
      ${shot(145, 32, 160, 29)}
      ${caption('1: pump fake · 2: step through · finish opposite hand')}
    `)),

    fin5: () => svg(halfCourt(`
      ${title("1-2 Step Layup")}
      ${P(90, 55, '1')}
      ${step(110, 48, 1)}
      ${cut(90, 55, 110, 48)}
      ${step(130, 42, 2)}
      ${cut(110, 48, 130, 42)}
      ${shot(130, 40, 160, 29)}
      ${cue(245, 50, 'STRONG PUSH')}
      ${caption('Two controlled steps · explode off inside foot')}
    `)),

    // ============================================================
    // FOOTWORK
    // ============================================================
    ft1: () => svg(halfCourt(`
      ${title("Jump Stop + Pivot")}
      ${step(160, 170, 1)}
      ${P(160, 170, '1')}
      ${cut(160, 162, 160, 115)}
      ${step(160, 110, 2)}
      ${P(160, 110, '2')}
      <!-- pivot indicator -->
      <path d="M 150 110 A 10 10 0 1 1 170 110" stroke="${C.lime}" stroke-width="2" fill="none" stroke-dasharray="2,2" marker-end="url(#arrLime)"/>
      ${cue(240, 110, 'PIVOT 180°')}
      ${caption('Sprint · jump stop · pivot both feet')}
    `)),

    ft2: () => svg(halfCourt(`
      ${title("Triple Threat Attack")}
      ${P(160, 110, '1')}
      ${ball(152, 118)}
      ${cut(150, 115, 105, 80)}
      ${cut(170, 115, 215, 80)}
      ${cue(70, 80, 'RIP L')}
      ${cue(250, 80, 'RIP R')}
      ${caption('Low stance · ball at hip · first step explosive')}
    `)),

    ft3: () => svg(halfCourt(`
      ${title("Jab Step Series")}
      ${P(160, 110, '1')}
      <!-- jab -->
      <line x1="160" y1="110" x2="178" y2="100" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)"/>
      ${cue(210, 95, 'JAB')}
      <!-- then go or shoot -->
      ${cut(160, 110, 160, 70)}
      ${shot(160, 70)}
      ${caption('Small quick step · read defender · go OR shoot')}
    `)),

    ft4: () => svg(halfCourt(`
      ${title("Closeout Stance")}
      ${step(160, 170, 1)}
      ${P(160, 170, '1')}
      ${cut(160, 162, 160, 95)}
      ${step(160, 88, 2)}
      ${P(160, 88, '2')}
      <!-- hands up indicator -->
      <text x="160" y="72" text-anchor="middle" fill="${C.lime}" font-size="14">✋</text>
      ${cue(240, 90, 'BREAK DOWN')}
      ${caption('Sprint · chop feet · high hand · low stance')}
    `)),

    // ============================================================
    // DEFENSE
    // ============================================================
    df1: () => svg(openSpace(`
      ${title("Defensive Slides")}
      ${cone(90, 110)} ${cone(230, 110)}
      ${D(160, 110, 'D')}
      <line x1="100" y1="110" x2="220" y2="110" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)" marker-start="url(#arrLime)" stroke-dasharray="5,3"/>
      ${cue(95, 135, '8 FT')}
      ${cue(225, 135, '8 FT')}
      ${caption('Low stance · slide without crossing feet')}
    `)),

    df2: () => svg(fullCourt(`
      ${title("Zig-Zag Defense")}
      ${D(25, 100, 'D')}
      <path d="M 30 100 L 70 140 L 110 60 L 150 140 L 190 60 L 230 140 L 270 60 L 300 100"
        stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      ${caption('Slide diagonally · drop step at each change')}
    `)),

    df3: () => svg(halfCourt(`
      ${title("Close-Out Drill")}
      ${step(160, 45, 1)}
      ${D(160, 45, '1')}
      <line x1="160" y1="55" x2="160" y2="95" stroke="${C.lime}" stroke-width="2.5" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      ${step(160, 100, 2)}
      ${D(160, 105, '2')}
      <text x="160" y="88" text-anchor="middle" fill="${C.lime}" font-size="14">✋</text>
      ${cue(240, 105, 'CHOP FEET')}
      ${caption('Sprint to shooter · break down · high hand')}
    `)),

    df4: () => svg(openSpace(`
      ${title("Shell Stance Holds")}
      ${D(160, 110, 'D')}
      <!-- wide feet -->
      <line x1="140" y1="125" x2="180" y2="125" stroke="${C.flame}" stroke-width="3"/>
      <text x="140" y="145" text-anchor="middle" fill="${C.label}" font-size="9">WIDE</text>
      <text x="180" y="145" text-anchor="middle" fill="${C.label}" font-size="9">BASE</text>
      <!-- hold indicator -->
      <circle cx="250" cy="110" r="24" fill="none" stroke="${C.lime}" stroke-width="2" stroke-dasharray="3,3"/>
      <text x="250" y="114" text-anchor="middle" fill="${C.lime}" font-size="11" font-weight="700">HOLD</text>
      ${caption('Knees bent · butt down · 30 sec holds')}
    `)),

    // ============================================================
    // CONDITIONING
    // ============================================================
    cd1: () => svg(`
      ${defs()}
      ${title("Suicides — 4 reps")}
      <rect x="10" y="50" width="300" height="110" fill="${C.court}" stroke="${C.line}" stroke-width="2" rx="3"/>
      <!-- 4 lines to touch -->
      <line x1="90" y1="50" x2="90" y2="160" stroke="${C.line}" stroke-dasharray="3,2"/>
      <line x1="160" y1="50" x2="160" y2="160" stroke="${C.line}" stroke-dasharray="3,2"/>
      <line x1="230" y1="50" x2="230" y2="160" stroke="${C.line}" stroke-dasharray="3,2"/>
      ${P(25, 105, '1')}
      <!-- 4 sprints out and back -->
      <line x1="32" y1="85" x2="85" y2="85" stroke="${C.lime}" stroke-width="2" marker-end="url(#arrLime)"/>
      <line x1="88" y1="90" x2="32" y2="90" stroke="${C.flame}" stroke-width="1.5" marker-end="url(#arrSolid)" stroke-dasharray="3,2"/>
      <line x1="32" y1="100" x2="155" y2="100" stroke="${C.lime}" stroke-width="2" marker-end="url(#arrLime)"/>
      <line x1="158" y1="105" x2="32" y2="105" stroke="${C.flame}" stroke-width="1.5" marker-end="url(#arrSolid)" stroke-dasharray="3,2"/>
      <line x1="32" y1="115" x2="225" y2="115" stroke="${C.lime}" stroke-width="2" marker-end="url(#arrLime)"/>
      <line x1="228" y1="120" x2="32" y2="120" stroke="${C.flame}" stroke-width="1.5" marker-end="url(#arrSolid)" stroke-dasharray="3,2"/>
      <line x1="32" y1="130" x2="300" y2="130" stroke="${C.lime}" stroke-width="2" marker-end="url(#arrLime)"/>
      <line x1="300" y1="135" x2="32" y2="135" stroke="${C.flame}" stroke-width="1.5" marker-end="url(#arrSolid)" stroke-dasharray="3,2"/>
      <g font-size="8" fill="${C.label}">
        <text x="90" y="170" text-anchor="middle">FT</text>
        <text x="160" y="170" text-anchor="middle">HALF</text>
        <text x="230" y="170" text-anchor="middle">FAR FT</text>
        <text x="300" y="170" text-anchor="middle">END</text>
      </g>
      ${caption('Touch EVERY line · all-out sprint', 195)}
    `),

    cd2: () => svg(fullCourt(`
      ${title("17s")}
      <line x1="20" y1="50" x2="300" y2="50" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      <line x1="300" y1="150" x2="20" y2="150" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)" stroke-dasharray="4,3"/>
      ${P(25, 100, '1')}
      <text x="160" y="40" text-anchor="middle" fill="${C.label}" font-size="10" font-weight="600">17 TRIPS · 60 SEC</text>
      ${caption('Sideline to sideline · touch every line')}
    `)),

    cd3: () => svg(openSpace(`
      ${title("Mile Run")}
      <!-- running track -->
      <ellipse cx="160" cy="110" rx="120" ry="55" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="5,4"/>
      ${P(40, 110, '1')}
      <!-- arrow along track -->
      <path d="M 50 108 Q 160 50 275 108" fill="none" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      <!-- finish flag -->
      <text x="285" y="115" font-size="18">🏁</text>
      ${cue(160, 75, 'TIME IT')}
      ${caption('1 mile for time · track your PR')}
    `)),

    cd4: () => svg(fullCourt(`
      ${title("Full Court Layups")}
      ${P(25, 100, '1')}
      <line x1="35" y1="90" x2="290" y2="90" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      <line x1="290" y1="110" x2="35" y2="110" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)" stroke-dasharray="4,3"/>
      ${shot(290, 100, 301, 100)}
      ${shot(35, 100, 19, 100)}
      ${caption('Sprint · layup · sprint · layup · continuous')}
    `)),

    cd5: () => svg(openSpace(`
      ${title("Burpee Ladder")}
      <!-- ascending stairs shape -->
      <g stroke="${C.flame}" stroke-width="2.5" fill="${C.courtDark}">
        <rect x="40" y="140" width="30" height="20"/>
        <rect x="75" y="125" width="30" height="35"/>
        <rect x="110" y="110" width="30" height="50"/>
        <rect x="145" y="95" width="30" height="65"/>
        <rect x="180" y="80" width="30" height="80"/>
        <rect x="215" y="65" width="30" height="95"/>
        <rect x="250" y="50" width="30" height="110"/>
      </g>
      <g font-size="10" font-weight="700" fill="${C.flame}" text-anchor="middle">
        <text x="55" y="155">1</text>
        <text x="90" y="150">2</text>
        <text x="125" y="145">3</text>
        <text x="160" y="140">4</text>
        <text x="195" y="135">5</text>
        <text x="230" y="130">...</text>
        <text x="265" y="125">10</text>
      </g>
      ${caption('Up to 10 · 10 sec rest between · NO mercy')}
    `)),

    cd6: () => svg(openSpace(`
      ${title("Jump Rope Intervals")}
      <!-- figure with rope -->
      ${person(160, 150, 'stand')}
      <!-- rope arc -->
      <path d="M 140 125 Q 160 90 180 125" stroke="${C.flame}" stroke-width="2" fill="none"/>
      <path d="M 140 150 Q 160 175 180 150" stroke="${C.flame}" stroke-width="2" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
      <g font-size="11" font-weight="700" text-anchor="middle">
        <text x="80" y="55" fill="${C.lime}">30 ON</text>
        <text x="240" y="55" fill="${C.flame}">30 OFF</text>
      </g>
      ${cue(160, 40, 'x 10 ROUNDS')}
      ${caption('Quick feet · minimal ground contact')}
    `)),

    // ============================================================
    // WARMUP
    // ============================================================
    wu1: () => svg(openSpace(`
      ${title("Dynamic Warm-Up")}
      ${person(60, 170, 'stand')}
      ${person(130, 170, 'lungeFwd')}
      ${person(210, 170, 'stand')}
      <!-- arm circles on last figure -->
      <circle cx="210" cy="130" r="15" fill="none" stroke="${C.flame}" stroke-width="1.5" stroke-dasharray="3,2"/>
      ${person(275, 170, 'jumpTop', {highlight: true})}
      <g font-size="8" fill="${C.label}" text-anchor="middle">
        <text x="60" y="190">leg swings</text>
        <text x="130" y="190">lunges</text>
        <text x="210" y="190">arm circles</text>
        <text x="275" y="190">high knees</text>
      </g>
      ${caption('5 min flow · wake up the body', 199)}
    `)),

    wu2: () => svg(halfCourt(`
      ${title("Form Shooting Warmup")}
      ${P(160, 45, '1')}
      ${P(160, 65, '2')}
      ${P(130, 80, '3')}
      ${P(190, 80, '3')}
      ${shot(160, 45)}${shot(160, 65)}${shot(130, 80)}${shot(190, 80)}
      ${caption('Start close · 3 makes each spot · work outward')}
    `)),

    wu3: () => svg(openSpace(`
      ${title("Activation Series")}
      ${person(55, 170, 'squatDeep', {highlight: true})}
      ${person(125, 170, 'pushupUp')}
      ${person(195, 170, 'jumpTop')}
      ${person(260, 170, 'jumpTop', {highlight: true})}
      <g font-size="8" fill="${C.label}" text-anchor="middle">
        <text x="55" y="192">20 squats</text>
        <text x="125" y="192">10 push-ups</text>
        <text x="195" y="192">jumping jacks</text>
        <text x="260" y="192">5 vert jumps</text>
      </g>
      ${caption('2 rounds · CNS activation · game ready', 200)}
    `)),

    // ============================================================
    // STRENGTH — two-panel start/end
    // ============================================================
    u1: () => strengthTwoPanel('Push-Ups',
      `${ground(165, 20, 150)}${person(85, 165, 'pushupUp')}`,
      `${ground(165, 170, 300)}${person(235, 165, 'pushupDown', {highlight: true})}`,
      'Plank', 'Chest down',
      'Full lockout · chest to ground · straight line head to heels'),

    u2: () => svg(`
      ${title("Pull-Ups")}
      ${pullupBar()}
      ${person(110, 175, 'hang')}
      ${person(210, 175, 'pullupTop', {highlight: true})}
      ${motionArrow(160, 120)}
      <text x="110" y="193" text-anchor="middle" fill="${C.lime}" font-size="10" font-weight="700">DEAD HANG</text>
      <text x="210" y="193" text-anchor="middle" fill="${C.flame}" font-size="10" font-weight="700">CHIN OVER</text>
      ${caption('Full range · control down · no kipping')}
    `),

    u3: () => svg(`
      ${title("Pike Push-Ups")}
      ${ground()}
      ${person(80, 185, 'pikePushup')}
      ${motionArrow(160, 110)}
      ${person(240, 185, 'pikePushup', {highlight: true})}
      <!-- the arrow for head-to-floor motion -->
      <g transform="translate(240,0)">
        <path d="M -25 -15 L -25 -5" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)" transform="translate(0,170)"/>
      </g>
      <text x="80" y="203" text-anchor="middle" fill="${C.lime}" font-size="10" font-weight="700">HIPS HIGH</text>
      <text x="240" y="203" text-anchor="middle" fill="${C.flame}" font-size="10" font-weight="700">HEAD DOWN</text>
      ${caption("Overhead press pattern · build shoulder strength", 215)}
    `, '0 0 320 220'),

    u4: () => svg(`
      ${title("Diamond Push-Ups")}
      ${ground()}
      ${person(85, 185, 'pushupUp')}
      ${person(235, 185, 'pushupDown', {highlight: true})}
      ${motionArrow(160, 130)}
      <!-- diamond hand position indicator -->
      <g transform="translate(235, 172)">
        <polygon points="0,0 8,-4 16,0 8,4" fill="${C.flame}" stroke="${C.courtDark}" stroke-width="1"/>
        <text x="8" y="16" text-anchor="middle" fill="${C.flame}" font-size="8" font-weight="700">HANDS</text>
      </g>
      ${caption('Hands form diamond · elbows TIGHT · tricep burn')}
    `),

    u5: () => svg(`
      ${title("Inverted Rows")}
      <!-- bar -->
      <line x1="80" y1="100" x2="240" y2="100" stroke="${C.flame}" stroke-width="4"/>
      ${ground()}
      <!-- body hanging under bar -->
      <g transform="translate(0,5)">
        ${person(160, 175, 'benchPress')}
      </g>
      <!-- simpler: just show motion -->
      <g stroke="${C.flame}" stroke-width="2" fill="none" marker-end="url(#arrSolid)">
        <path d="M 160 150 L 160 115"/>
      </g>
      ${cue(265, 120, 'PULL')}
      ${caption('Under bar · pull chest up · body straight')}
    `),

    u6: () => svg(`
      ${title("Dumbbell Bench Press")}
      ${bench(160, 145, 180)}
      ${person(160, 180, 'benchPress')}
      ${dumbbell(130, 95, 0.8)}
      ${dumbbell(190, 95, 0.8)}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none" marker-end="url(#arrLime)">
        <line x1="140" y1="115" x2="140" y2="98"/>
        <line x1="180" y1="115" x2="180" y2="98"/>
      </g>
      ${cue(160, 75, 'PRESS UP')}
      ${caption('Control the descent · full lockout at top')}
    `),

    u7: () => svg(`
      ${title("Overhead Press")}
      ${ground()}
      ${person(160, 185, 'overheadPress', {highlight: true})}
      ${dumbbell(140, 95, 0.8)}
      ${dumbbell(180, 95, 0.8)}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none" marker-end="url(#arrLime)">
        <path d="M 140 120 L 140 102"/>
        <path d="M 180 120 L 180 102"/>
      </g>
      ${caption('Standing · press overhead · no back arch')}
    `),

    u8: () => svg(`
      ${title("Dumbbell Rows")}
      ${ground()}
      ${person(160, 175, 'bentRow', {highlight: true})}
      ${dumbbell(155, 145)}
      <path d="M 155 140 L 155 120" stroke="${C.lime}" stroke-width="2.5" fill="none" marker-end="url(#arrLime)"/>
      ${cue(220, 130, 'TO HIP')}
      ${caption('Hinge at hip · flat back · pull to hip · squeeze')}
    `),

    u9: () => svg(`
      ${title("Tricep Dips")}
      <!-- bench/chair -->
      <rect x="110" y="95" width="100" height="8" fill="${C.flame}" rx="2" stroke="${C.courtDark}" stroke-width="1.5"/>
      <line x1="115" y1="103" x2="115" y2="130" stroke="${C.courtDark}" stroke-width="2"/>
      <line x1="205" y1="103" x2="205" y2="130" stroke="${C.courtDark}" stroke-width="2"/>
      ${ground()}
      <!-- seated on edge, arms back -->
      ${person(160, 180, 'lyingBack')}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none" marker-end="url(#arrLime)">
        <line x1="160" y1="140" x2="160" y2="115"/>
      </g>
      ${caption('Hands on bench · lower elbows to 90° · press up')}
    `),

    u10: () => svg(`
      ${title("Lat Pulldown")}
      <!-- machine: top pulley and bar -->
      <line x1="140" y1="40" x2="180" y2="40" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
      <line x1="160" y1="44" x2="160" y2="75" stroke="${C.courtDark}" stroke-width="1.5" stroke-dasharray="3,2"/>
      <!-- cable handle -->
      <rect x="115" y="72" width="90" height="8" rx="3" fill="${C.flame}" stroke="${C.courtDark}" stroke-width="1.5"/>
      ${ground()}
      <!-- seated person, arms up pulling -->
      ${person(160, 185, 'overheadPress', {highlight: true})}
      <!-- seat -->
      <rect x="140" y="160" width="40" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1"/>
      <path d="M 160 130 L 160 90" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      ${cue(245, 110, 'TO CHEST')}
      ${caption('Seated · pull bar to upper chest · squeeze blades')}
    `),

    // LOWER
    l1: () => strengthTwoPanel('Bodyweight Squats',
      `${ground(165, 20, 150)}${person(85, 165, 'stand')}`,
      `${ground(165, 170, 300)}${person(235, 165, 'squatDeep', {highlight: true})}`,
      'Stand', 'Deep squat',
      'Chest up · break parallel · drive through heels'),

    l2: () => strengthTwoPanel('Jump Squats',
      `${ground(165, 20, 150)}${person(85, 165, 'squatHalf', {highlight: true})}`,
      `${ground(165, 170, 300)}${person(235, 155, 'jumpTop')}
      <!-- air indicator -->
      <line x1="225" y1="165" x2="245" y2="165" stroke="${C.lime}" stroke-width="2" stroke-dasharray="2,2"/>`,
      'Load', 'Explode',
      'Load low · jump MAX height · land soft with bent knees'),

    l3: () => svg(`
      ${title("Walking Lunges")}
      ${ground()}
      ${person(80, 185, 'lungeFwd')}
      ${person(160, 185, 'stand', {faded: true})}
      ${person(240, 185, 'lungeFwd', {highlight: true})}
      <path d="M 100 170 L 200 170" stroke="${C.lime}" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrLime)"/>
      ${caption('Long step · back knee to ground · drive up and through')}
    `),

    l4: () => strengthTwoPanel('Reverse Lunges',
      `${ground(165, 20, 150)}${person(85, 165, 'stand')}`,
      `${ground(165, 170, 300)}${person(235, 165, 'lungeBack', {highlight: true})}`,
      'Stand', 'Step back',
      'Step BACKWARD into lunge · easier on knees'),

    l5: () => svg(`
      ${title("Bulgarian Split Squats")}
      ${ground()}
      <!-- bench behind -->
      <rect x="220" y="155" width="60" height="10" fill="${C.flame}" rx="2" stroke="${C.courtDark}" stroke-width="1"/>
      ${person(155, 185, 'lungeFwd', {highlight: true})}
      <!-- indicate back foot on bench -->
      <line x1="150" y1="175" x2="225" y2="160" stroke="${C.body}" stroke-width="2.5"/>
      ${cue(255, 145, 'BACK FOOT UP')}
      ${caption('Front leg works · back foot elevated · deep bend')}
    `),

    l6: () => strengthTwoPanel('Calf Raises',
      `${ground(165, 20, 150)}${person(85, 165, 'calfFlat')}`,
      `${ground(165, 170, 300)}${person(235, 165, 'calfUp', {highlight: true})}`,
      'Flat feet', 'On toes',
      'Rise · slow down · use stair edge for full range'),

    l7: () => svg(`
      ${title("Broad Jumps")}
      ${ground()}
      ${person(60, 185, 'broadJumpLoad', {highlight: true})}
      <path d="M 80 165 Q 160 95 230 170" stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      ${person(245, 185, 'squatHalf')}
      ${cue(160, 65, 'FOR DISTANCE')}
      ${caption('Load · explode FORWARD · stick the landing')}
    `),

    l8: () => svg(`
      ${title("Box Jumps")}
      ${ground()}
      ${person(80, 185, 'squatHalf', {highlight: true})}
      ${box(230, 185, 70, 55)}
      <path d="M 105 170 Q 170 100 215 145" stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      ${caption('Jump onto box · stand tall · STEP down (never jump)')}
    `),

    l9: () => svg(`
      ${title("Glute Bridges")}
      ${ground()}
      ${person(160, 185, 'bridge', {highlight: true})}
      <!-- up arrow showing hip drive -->
      <path d="M 165 155 L 165 135" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      ${cue(240, 140, 'DRIVE HIPS')}
      ${caption('Feet flat · squeeze glutes at top · controlled')}
    `),

    l10: () => svg(`
      ${title("Single-Leg Glute Bridge")}
      ${ground()}
      ${person(140, 185, 'bridge', {highlight: true})}
      <!-- extended leg -->
      <line x1="150" y1="155" x2="260" y2="145" stroke="${C.flame}" stroke-width="3"/>
      ${cue(260, 165, 'STRAIGHT!')}
      ${caption('One leg extended · single-leg hip drive')}
    `),

    l11: () => svg(`
      ${title("Lateral Lunges")}
      ${ground()}
      ${person(80, 185, 'squatHalf')}
      ${person(160, 185, 'stand', {faded: true})}
      ${person(240, 185, 'squatHalf', {highlight: true})}
      <path d="M 100 170 L 145 170" stroke="${C.lime}" stroke-width="2" marker-end="url(#arrLime)"/>
      <path d="M 175 170 L 220 170" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)"/>
      ${caption('Step wide · sit into that hip · other leg straight')}
    `),

    l12: () => svg(`
      ${title("Wall Sit")}
      ${ground()}
      ${wall(65)}
      ${person(100, 185, 'wallSit', {highlight: true})}
      <!-- 90° indicator -->
      <path d="M 125 155 L 125 170 L 145 170" stroke="${C.lime}" stroke-width="2" fill="none"/>
      <text x="140" y="165" fill="${C.lime}" font-size="11" font-weight="700">90°</text>
      ${caption('Back FLAT on wall · thighs parallel to ground')}
    `),

    l13: () => strengthTwoPanel('Barbell Back Squat',
      `${ground(165, 20, 150)}
        <!-- barbell on shoulders -->
        <line x1="60" y1="115" x2="110" y2="115" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
        <rect x="52" y="112" width="10" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>
        <rect x="108" y="112" width="10" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>
        ${person(85, 165, 'stand')}`,
      `${ground(165, 170, 300)}
        <line x1="210" y1="130" x2="260" y2="130" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
        <rect x="202" y="127" width="10" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>
        <rect x="258" y="127" width="10" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1.5" rx="1"/>
        ${person(235, 165, 'squatDeep', {highlight: true})}`,
      'Stand', 'Deep squat',
      'Bar on UPPER back · chest up · break parallel · drive up'),

    l14: () => svg(`
      ${title("Romanian Deadlift")}
      ${ground()}
      <!-- stand with bar -->
      ${person(85, 185, 'stand')}
      <line x1="70" y1="145" x2="100" y2="145" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
      <rect x="64" y="142" width="8" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1" rx="1"/>
      <rect x="98" y="142" width="8" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1" rx="1"/>
      <!-- hinged forward with bar -->
      ${person(235, 185, 'bentRow', {highlight: true})}
      <line x1="210" y1="160" x2="260" y2="160" stroke="${C.flame}" stroke-width="4" stroke-linecap="round"/>
      <rect x="204" y="157" width="8" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1" rx="1"/>
      <rect x="258" y="157" width="8" height="6" fill="${C.courtDark}" stroke="${C.flame}" stroke-width="1" rx="1"/>
      ${motionArrow(160, 130)}
      <text x="85" y="203" text-anchor="middle" fill="${C.lime}" font-size="10" font-weight="700">STAND</text>
      <text x="235" y="203" text-anchor="middle" fill="${C.flame}" font-size="10" font-weight="700">HINGE</text>
      ${caption('Bar slides down legs · feel STRETCH in hamstrings', 215)}
    `, '0 0 320 220'),

    // CORE
    c1: () => svg(`
      ${title("Plank")}
      ${ground()}
      ${person(160, 185, 'plank', {highlight: true})}
      <!-- straight line indicator above body -->
      <line x1="95" y1="155" x2="230" y2="155" stroke="${C.lime}" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="160" y="148" text-anchor="middle" fill="${C.lime}" font-size="9" font-weight="700">STRAIGHT LINE</text>
      ${caption('Forearms + toes · engage core · no sagging')}
    `),

    c2: () => svg(`
      ${title("Side Plank")}
      ${ground()}
      ${person(160, 185, 'sidePlank', {highlight: true})}
      <text x="250" y="155" text-anchor="middle" fill="${C.lime}" font-size="9" font-weight="700">HIPS UP</text>
      ${caption('Stack feet · body straight sideways · both sides')}
    `),

    c3: () => svg(`
      ${title("Russian Twists")}
      ${ground()}
      ${person(160, 185, 'russian')}
      <!-- twist arrows -->
      <path d="M 100 155 Q 160 120 220 155" stroke="${C.flame}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrSolid)" marker-start="url(#arrSolid)"/>
      ${ball(155, 160)}
      ${caption('Lean back · rotate ball side to side · feet up harder')}
    `),

    c4: () => svg(`
      ${title("Dead Bug")}
      ${ground()}
      ${person(160, 185, 'deadbug', {highlight: true})}
      <text x="100" y="140" fill="${C.flame}" font-size="9" font-weight="700">OPP ARM</text>
      <text x="235" y="140" fill="${C.flame}" font-size="9" font-weight="700">OPP LEG</text>
      ${caption('Opposite arm + leg extend · lower back stays flat')}
    `),

    c5: () => svg(`
      ${title("Bicycle Crunches")}
      ${ground()}
      ${person(160, 185, 'deadbug')}
      <path d="M 130 160 Q 160 135 190 160" stroke="${C.flame}" stroke-width="2" fill="none" stroke-dasharray="3,2" marker-end="url(#arrSolid)"/>
      <path d="M 190 160 Q 160 135 130 160" stroke="${C.lime}" stroke-width="2" fill="none" stroke-dasharray="3,2" marker-end="url(#arrLime)"/>
      ${cue(160, 130, 'ELBOW → KNEE')}
      ${caption('Alternate sides · SLOW and controlled')}
    `),

    c6: () => svg(`
      ${title("Hanging Knee Raises")}
      ${pullupBar()}
      ${person(160, 175, 'hang')}
      <!-- knees up -->
      <g stroke="${C.muscle}" stroke-width="3" fill="none">
        <line x1="160" y1="135" x2="140" y2="120"/>
        <line x1="140" y1="120" x2="125" y2="140"/>
        <line x1="160" y1="135" x2="180" y2="120"/>
        <line x1="180" y1="120" x2="195" y2="140"/>
      </g>
      <path d="M 225 155 L 225 125" stroke="${C.lime}" stroke-width="2.5" marker-end="url(#arrLime)"/>
      ${cue(265, 140, 'TO CHEST')}
      ${caption('Hang from bar · knees to chest · control down')}
    `),

    c7: () => svg(`
      ${title("Mountain Climbers")}
      ${ground()}
      ${person(160, 185, 'plank')}
      <!-- one knee driven forward -->
      <g stroke="${C.muscle}" stroke-width="3" fill="none">
        <line x1="195" y1="170" x2="170" y2="155"/>
        <line x1="170" y1="155" x2="150" y2="165"/>
      </g>
      <path d="M 210 160 L 150 160" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)" marker-start="url(#arrSolid)" stroke-dasharray="2,2"/>
      ${cue(160, 135, 'FAST!')}
      ${caption('Plank position · drive knees alternately · fast')}
    `),

    c8: () => strengthTwoPanel('V-Ups',
      `${ground(165, 20, 150)}
        <!-- lying flat -->
        <g transform="translate(85, 0)">
          <circle cx="-40" cy="155" r="5" fill="${C.body}" stroke="${C.courtDark}" stroke-width="1"/>
          <line x1="-36" y1="155" x2="40" y2="155" stroke="${C.body}" stroke-width="3" stroke-linecap="round"/>
          <line x1="-30" y1="155" x2="-30" y2="140" stroke="${C.body}" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="-20" y1="155" x2="-20" y2="140" stroke="${C.body}" stroke-width="2.5" stroke-linecap="round"/>
        </g>`,
      `${ground(165, 170, 300)}
        <!-- V shape: torso up at angle, legs up at angle -->
        <g transform="translate(235, 0)">
          <circle cx="-10" cy="125" r="5" fill="${C.body}" stroke="${C.courtDark}" stroke-width="1"/>
          <line x1="-8" y1="128" x2="15" y2="160" stroke="${C.muscle}" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="15" y1="160" x2="38" y2="128" stroke="${C.muscle}" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="-10" y1="128" x2="-25" y2="118" stroke="${C.body}" stroke-width="2" stroke-linecap="round"/>
          <line x1="5" y1="138" x2="-8" y2="128" stroke="${C.body}" stroke-width="2" stroke-linecap="round"/>
        </g>`,
      'Flat', 'V shape',
      'Raise legs AND torso simultaneously · touch hands to feet'),

    // PLYO
    p1: () => svg(`
      ${title("Depth Jumps")}
      ${ground()}
      ${box(60, 185, 50, 40)}
      ${person(60, 145, 'stand')}
      ${step(30, 160, 1)}
      <path d="M 90 155 Q 125 175 155 175" stroke="${C.flame}" stroke-width="2" fill="none" stroke-dasharray="3,2" marker-end="url(#arrSolid)"/>
      ${person(155, 185, 'squatHalf')}
      ${step(170, 190, 2)}
      <path d="M 175 165 Q 220 85 260 135" stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      ${person(260, 180, 'jumpTop', {highlight: true})}
      ${step(290, 145, 3)}
      ${caption('Step off · LAND · immediate MAX jump')}
    `),

    p2: () => svg(`
      ${title("Lateral Bounds")}
      ${ground()}
      ${person(60, 185, 'stand', {faded: true})}
      ${person(160, 175, 'jumpTop')}
      ${person(260, 185, 'stand', {highlight: true})}
      <path d="M 85 165 Q 130 105 160 170" stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      <path d="M 190 170 Q 225 105 255 170" stroke="${C.flame}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrSolid)"/>
      ${caption('Single-leg · bound side to side · STICK each landing')}
    `),

    p3: () => svg(`
      ${title("Tuck Jumps")}
      ${ground()}
      ${person(60, 185, 'stand')}
      <!-- midair tucked -->
      <g transform="translate(160, 105)">
        <circle cx="0" cy="-10" r="6" fill="${C.body}" stroke="${C.courtDark}" stroke-width="1"/>
        <line x1="0" y1="-4" x2="0" y2="15" stroke="${C.body}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="-5" y1="5" x2="-18" y2="0" stroke="${C.body}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="5" y1="5" x2="18" y2="0" stroke="${C.body}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="0" y1="15" x2="-12" y2="5" stroke="${C.muscle}" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="15" x2="12" y2="5" stroke="${C.muscle}" stroke-width="3" stroke-linecap="round"/>
      </g>
      ${cue(225, 95, 'KNEES TO CHEST')}
      ${person(260, 185, 'stand')}
      <path d="M 80 165 Q 160 60 245 165" stroke="${C.flame}" stroke-width="2" fill="none" stroke-dasharray="3,3" marker-end="url(#arrSolid)"/>
      ${caption('Jump up · pull knees TO CHEST · immediate next')}
    `),

    p4: () => svg(`
      ${title("Skater Jumps")}
      ${ground()}
      ${person(60, 185, 'stand')}
      ${person(160, 175, 'stand', {highlight: true})}
      ${person(260, 185, 'stand')}
      <path d="M 80 170 Q 120 125 155 170" stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrLime)"/>
      <path d="M 180 170 Q 220 125 255 170" stroke="${C.flame}" stroke-width="2.5" fill="none" stroke-dasharray="4,3" marker-end="url(#arrSolid)"/>
      ${caption('Speed skater bounding · back leg sweeps behind')}
    `),

    p5: () => svg(`
      ${title("Pogo Jumps")}
      ${ground()}
      ${person(90, 185, 'stand')}
      ${person(160, 185, 'stand')}
      ${person(230, 185, 'stand')}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none">
        <path d="M 90 165 L 90 150" marker-end="url(#arrLime)"/>
        <path d="M 160 165 L 160 145" marker-end="url(#arrLime)"/>
        <path d="M 230 165 L 230 150" marker-end="url(#arrLime)"/>
      </g>
      ${cue(160, 130, 'STIFF LEGS')}
      ${caption('Bounce off balls of feet · minimal ground contact')}
    `),

    // MOBILITY
    m1: () => svg(`
      ${title("Foam Roll Quads")}
      ${ground()}
      <!-- face down -->
      <g transform="translate(160, 10)">
        ${person(0, 175, 'plank')}
      </g>
      ${foamRoll(150, 175)}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3">
        <line x1="115" y1="175" x2="205" y2="175" marker-end="url(#arrLime)" marker-start="url(#arrLime)"/>
      </g>
      ${cue(250, 130, '20 SEC ON TIGHT SPOTS')}
      ${caption('Face down · roll front of thighs slowly')}
    `),

    m2: () => svg(`
      ${title("Foam Roll IT Band")}
      ${ground()}
      <!-- side lying -->
      <g transform="translate(160, 0)">
        ${person(0, 185, 'sidePlank', {faded: true})}
      </g>
      ${foamRoll(150, 175)}
      <g stroke="${C.lime}" stroke-width="2.5" fill="none" stroke-dasharray="4,3">
        <line x1="115" y1="175" x2="205" y2="175" marker-end="url(#arrLime)" marker-start="url(#arrLime)"/>
      </g>
      ${caption('Side-lying · outer thigh · hip to above knee')}
    `),

    m3: () => svg(`
      ${title("Hip Flexor Stretch")}
      ${ground()}
      ${person(160, 185, 'kneelStretch', {highlight: true})}
      ${cue(95, 140, 'SQUEEZE GLUTE')}
      <path d="M 155 155 L 170 145" stroke="${C.flame}" stroke-width="2" marker-end="url(#arrSolid)"/>
      ${caption('Kneeling · squeeze glute · lean forward slightly')}
    `),

    m4: () => svg(`
      ${title("World's Greatest Stretch")}
      ${ground()}
      ${person(160, 185, 'lungeFwd', {highlight: true})}
      <!-- rotated arm up -->
      <line x1="155" y1="148" x2="155" y2="110" stroke="${C.muscle}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="155" cy="105" r="3" fill="${C.muscle}"/>
      <path d="M 130 130 Q 140 90 155 110" stroke="${C.lime}" stroke-width="2" fill="none" stroke-dasharray="3,2" marker-end="url(#arrLime)"/>
      ${cue(245, 100, 'ROTATE UP')}
      ${caption('Lunge · hand inside foot · rotate arm up')}
    `),

    m5: () => svg(`
      ${title("Ankle Mobility")}
      ${ground()}
      ${person(140, 185, 'ankleMob', {highlight: true})}
      <path d="M 165 175 L 200 175" stroke="${C.flame}" stroke-width="2.5" marker-end="url(#arrSolid)"/>
      ${cue(260, 170, 'KNEE OVER TOES')}
      ${cue(80, 195, 'HEEL STAYS DOWN')}
      ${caption('Half-kneeling · drive front knee FORWARD')}
    `),
  };

  window.HOOPERS_DIAGRAMS = DIAGRAMS;
})();
