// Drill diagrams - SVG visual instructions for each drill
// Each function returns an SVG string. Consistent visual language:
//   - Player: circle with "X" or figure
//   - Ball: filled orange dot
//   - Dribble path: dashed line
//   - Run/move path: solid line
//   - Arrow: direction of movement
//   - Numbered circles: sequence of steps
//   - Cones: small orange triangles

(function() {
  // Colors (match main app theme)
  const C = {
    line: '#f5f1e8',
    lineDim: 'rgba(245,241,232,0.4)',
    court: '#1f2940',
    courtLine: 'rgba(245,241,232,0.3)',
    flame: '#ff6b1a',
    lime: '#b4ff3a',
    player: '#b4ff3a',
    ball: '#ff6b1a',
    body: '#f5f1e8',
    ground: 'rgba(245,241,232,0.2)',
  };

  // ============================================================
  // SHARED SVG HELPERS — returned as SVG string fragments
  // ============================================================
  const svgWrap = (content, vb = '0 0 300 180') =>
    `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">${content}</svg>`;

  // Half-court: hoop at top, 3pt arc, free-throw line, lane
  const halfCourt = (extra = '') => `
    <rect x="10" y="10" width="280" height="160" fill="${C.court}" stroke="${C.courtLine}" stroke-width="1.5" rx="4"/>
    <!-- baseline at top -->
    <line x1="10" y1="10" x2="290" y2="10" stroke="${C.courtLine}" stroke-width="1.5"/>
    <!-- lane -->
    <rect x="115" y="10" width="70" height="55" fill="none" stroke="${C.courtLine}" stroke-width="1.5"/>
    <!-- free throw line/circle -->
    <path d="M 115 65 A 35 35 0 0 0 185 65" fill="none" stroke="${C.courtLine}" stroke-width="1.5"/>
    <!-- rim -->
    <circle cx="150" cy="20" r="5" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
    <!-- backboard -->
    <line x1="138" y1="13" x2="162" y2="13" stroke="${C.flame}" stroke-width="2"/>
    <!-- 3pt arc -->
    <path d="M 40 10 L 40 45 A 110 110 0 0 0 260 45 L 260 10" fill="none" stroke="${C.courtLine}" stroke-width="1.5"/>
    ${extra}
  `;

  // Full court sideways view (for conditioning)
  const fullCourtH = (extra = '') => `
    <rect x="5" y="40" width="290" height="100" fill="${C.court}" stroke="${C.courtLine}" stroke-width="1.5" rx="4"/>
    <line x1="150" y1="40" x2="150" y2="140" stroke="${C.courtLine}" stroke-width="1" stroke-dasharray="3,2"/>
    <circle cx="150" cy="90" r="18" fill="none" stroke="${C.courtLine}" stroke-width="1"/>
    <!-- left hoop -->
    <rect x="5" y="80" width="20" height="20" fill="none" stroke="${C.courtLine}" stroke-width="1"/>
    <circle cx="18" cy="90" r="3" fill="none" stroke="${C.flame}" stroke-width="1"/>
    <!-- right hoop -->
    <rect x="275" y="80" width="20" height="20" fill="none" stroke="${C.courtLine}" stroke-width="1"/>
    <circle cx="282" cy="90" r="3" fill="none" stroke="${C.flame}" stroke-width="1"/>
    ${extra}
  `;

  // Player marker
  const player = (x, y, label = '') =>
    `<circle cx="${x}" cy="${y}" r="8" fill="${C.player}" stroke="${C.court}" stroke-width="1.5"/>
     <text x="${x}" y="${y + 3}" text-anchor="middle" fill="${C.court}" font-size="10" font-weight="bold" font-family="system-ui">${label || 'X'}</text>`;

  // Ball
  const ball = (x, y) =>
    `<circle cx="${x}" cy="${y}" r="4" fill="${C.ball}"/>`;

  // Numbered step marker
  const step = (x, y, n) =>
    `<circle cx="${x}" cy="${y}" r="9" fill="${C.flame}" stroke="${C.line}" stroke-width="1"/>
     <text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="${C.court}" font-size="11" font-weight="bold" font-family="system-ui">${n}</text>`;

  // Arrow
  const arrow = (x1, y1, x2, y2, color = C.lime, dashed = false) => {
    const id = 'arr' + Math.random().toString(36).slice(2, 8);
    return `
      <defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/>
      </marker></defs>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="4,3"' : ''} marker-end="url(#${id})"/>
    `;
  };

  // Curved arrow (bezier)
  const curvedArrow = (x1, y1, cx, cy, x2, y2, color = C.lime, dashed = false) => {
    const id = 'car' + Math.random().toString(36).slice(2, 8);
    return `
      <defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/>
      </marker></defs>
      <path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="4,3"' : ''} marker-end="url(#${id})"/>
    `;
  };

  // Cone marker
  const cone = (x, y) =>
    `<polygon points="${x-4},${y+3} ${x+4},${y+3} ${x},${y-5}" fill="${C.flame}"/>`;

  // Stick-figure body (side view)
  const stickSide = (cx, cy, pose = 'stand') => {
    // cy = feet level, cx = center x
    if (pose === 'stand') {
      return `
        <circle cx="${cx}" cy="${cy-60}" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-52}" x2="${cx}" y2="${cy-25}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-45}" x2="${cx-10}" y2="${cy-30}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-45}" x2="${cx+10}" y2="${cy-30}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-25}" x2="${cx-7}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-25}" x2="${cx+7}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
      `;
    }
    if (pose === 'squat') {
      return `
        <circle cx="${cx}" cy="${cy-45}" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx}" y1="${cy-37}" x2="${cx-2}" y2="${cy-20}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-5}" y1="${cy-32}" x2="${cx+10}" y2="${cy-30}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-2}" y1="${cy-20}" x2="${cx-12}" y2="${cy-15}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-12}" y1="${cy-15}" x2="${cx-8}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-2}" y1="${cy-20}" x2="${cx+8}" y2="${cy-15}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx+8}" y1="${cy-15}" x2="${cx+5}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
      `;
    }
    if (pose === 'lunge') {
      return `
        <circle cx="${cx-10}" cy="${cy-55}" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-10}" y1="${cy-47}" x2="${cx-8}" y2="${cy-25}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-8}" y1="${cy-25}" x2="${cx+15}" y2="${cy-8}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx+15}" y1="${cy-8}" x2="${cx+15}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
        <line x1="${cx-8}" y1="${cy-25}" x2="${cx-22}" y2="${cy-2}" stroke="${C.body}" stroke-width="2"/>
      `;
    }
    return '';
  };

  // Ground line
  const ground = (y = 170) =>
    `<line x1="20" y1="${y}" x2="280" y2="${y}" stroke="${C.ground}" stroke-width="2"/>`;

  // Label
  const label = (x, y, text, color = C.lineDim, size = 10) =>
    `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}" font-family="system-ui" font-weight="500">${text}</text>`;

  // ============================================================
  // BASKETBALL DRILL DIAGRAMS
  // ============================================================
  const DIAGRAMS = {
    // BALL HANDLING
    bh1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      ${ball(160, 130)}
      ${arrow(160, 130, 160, 155, C.flame, true)}
      ${arrow(160, 155, 160, 132, C.flame, true)}
      ${label(150, 30, 'POUND DRIBBLE', C.flame, 12)}
      ${label(150, 48, 'Stay low • Eyes up', C.lineDim)}
      ${label(210, 140, 'pound hard', C.lineDim, 9)}
      ${label(150, 168, 'ball stays below knee', C.lineDim, 9)}
    `),

    bh2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      ${ball(120, 125)}
      ${curvedArrow(120, 125, 135, 100, 180, 125, C.flame, true)}
      ${curvedArrow(180, 125, 135, 100, 120, 125, C.flame, true)}
      ${label(150, 30, 'CROSSOVER', C.flame, 12)}
      ${label(150, 48, 'Side to side, below waist', C.lineDim)}
      ${label(100, 140, 'L', C.lime, 11)}
      ${label(200, 140, 'R', C.lime, 11)}
    `),

    bh3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      <!-- figure 8 pattern -->
      <path d="M 110 130 Q 130 110 150 130 Q 170 150 190 130 Q 170 110 150 130 Q 130 150 110 130" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${ball(110, 130)}
      ${label(150, 30, 'FIGURE 8', C.flame, 12)}
      ${label(150, 48, 'Through legs, both directions', C.lineDim)}
    `),

    bh4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      ${ball(130, 125)}
      ${ball(170, 125)}
      ${arrow(130, 125, 130, 150, C.flame, true)}
      ${arrow(170, 125, 170, 150, C.flame, true)}
      ${label(150, 30, 'TWO-BALL DRIBBLE', C.flame, 12)}
      ${label(150, 48, 'Same height, then alternating', C.lineDim)}
      ${label(130, 168, 'L ball', C.lineDim, 9)}
      ${label(170, 168, 'R ball', C.lineDim, 9)}
    `),

    bh5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      ${ball(150, 105)}
      ${curvedArrow(150, 105, 120, 135, 150, 160, C.flame, true)}
      ${curvedArrow(150, 160, 180, 135, 150, 105, C.flame, true)}
      ${label(150, 30, 'SPIDER', C.flame, 12)}
      ${label(150, 48, 'Front → back → front', C.lineDim)}
      ${label(108, 135, 'front', C.lineDim, 9)}
      ${label(195, 135, 'back', C.lineDim, 9)}
    `),

    bh6: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 140, 'squat')}
      ${ball(145, 130)}
      ${curvedArrow(145, 130, 120, 120, 130, 130, C.flame, true)}
      ${arrow(130, 130, 180, 130, C.lime)}
      ${label(150, 30, 'IN-AND-OUT', C.flame, 12)}
      ${label(150, 48, 'Fake cross, stay same hand', C.lineDim)}
      ${label(115, 108, '1. fake', C.flame, 9)}
      ${label(190, 125, '2. attack', C.lime, 9)}
    `),

    bh7: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(150, 130, 'squat')}
      ${ball(130, 140)}
      <!-- behind-back curve -->
      <path d="M 130 140 Q 150 160 170 140" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${arrow(170, 140, 173, 141, C.flame)}
      ${label(150, 30, 'BEHIND THE BACK', C.flame, 12)}
      ${label(150, 48, 'Ball passes behind waist', C.lineDim)}
      ${label(150, 170, 'hand to hand', C.lineDim, 9)}
    `),

    bh8: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${cone(60, 90)}
      ${cone(110, 90)}
      ${cone(160, 90)}
      ${cone(210, 90)}
      ${cone(260, 90)}
      <path d="M 40 110 Q 60 75 80 110 Q 110 145 140 110 Q 160 75 180 110 Q 210 145 240 110 Q 260 75 280 110" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${ball(40, 110)}
      ${label(150, 30, 'CONE WEAVE', C.flame, 12)}
      ${label(150, 48, 'Crossover at each cone', C.lineDim)}
      ${label(150, 160, 'change hands each cone', C.lineDim, 9)}
    `),

    // SHOOTING
    sh1: () => svgWrap(halfCourt(`
      ${player(150, 50)}
      ${arrow(150, 50, 150, 25, C.flame)}
      ${label(150, 100, 'FORM SHOOTING', C.flame, 12)}
      ${label(150, 115, 'Stand 3 ft from rim', C.lineDim)}
      ${label(150, 130, 'One hand • perfect arc', C.lineDim, 9)}
      ${label(150, 145, 'BEEF: Balance, Eyes, Elbow, Follow through', C.lime, 8)}
    `)),

    sh2: () => svgWrap(halfCourt(`
      ${player(150, 70, '')}
      <line x1="115" y1="65" x2="185" y2="65" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(150, 70, 150, 25, C.flame)}
      ${label(150, 100, 'FREE THROWS', C.flame, 12)}
      ${label(150, 115, 'Same routine every shot', C.lineDim)}
      ${label(150, 130, 'Breathe • bounce • shoot', C.lineDim, 9)}
      ${label(150, 145, 'Track makes/attempts', C.lime, 9)}
    `)),

    sh3: () => svgWrap(halfCourt(`
      ${player(135, 30)}
      ${player(165, 30)}
      ${arrow(135, 30, 150, 22, C.flame)}
      ${arrow(165, 30, 150, 22, C.flame)}
      ${label(150, 55, 'L', C.lime, 11)}
      ${label(150, 80, 'alternate →', C.lineDim, 9)}
      ${label(150, 105, 'MIKAN DRILL', C.flame, 12)}
      ${label(150, 120, 'R layup → catch → L layup', C.lineDim)}
      ${label(150, 135, 'Continuous • stay under rim', C.lineDim, 9)}
    `)),

    sh4: () => svgWrap(halfCourt(`
      ${player(45, 40, '1')}
      ${player(85, 15, '2')}
      ${player(150, 12, '3')}
      ${player(215, 15, '4')}
      ${player(255, 40, '5')}
      ${arrow(45, 40, 150, 22, C.lime)}
      ${arrow(255, 40, 150, 22, C.lime)}
      ${label(150, 105, 'SPOT SHOOTING', C.flame, 12)}
      ${label(150, 120, '5 in a row before moving', C.lineDim)}
      ${label(150, 135, 'Corner → wing → top', C.lineDim, 9)}
    `)),

    sh5: () => svgWrap(halfCourt(`
      ${player(80, 55)}
      ${player(210, 55)}
      ${ball(210, 55)}
      ${arrow(210, 55, 85, 55, C.flame, true)}
      ${arrow(80, 55, 150, 22, C.lime)}
      ${label(80, 45, 'SHOOTER', C.lime, 8)}
      ${label(210, 45, 'PASSER', C.lineDim, 8)}
      ${label(150, 105, 'CATCH & SHOOT', C.flame, 12)}
      ${label(150, 120, 'Square feet on catch', C.lineDim)}
      ${label(150, 135, 'Shoot in rhythm • no dribble', C.lineDim, 9)}
    `)),

    sh6: () => svgWrap(halfCourt(`
      ${player(80, 85, '1')}
      ${ball(86, 92)}
      <path d="M 88 90 Q 120 80 140 75" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${player(150, 60, '2')}
      ${arrow(150, 60, 150, 22, C.lime)}
      ${label(150, 105, 'PULL-UP JUMPER', C.flame, 12)}
      ${label(150, 120, 'Dribble in • plant hard', C.lineDim)}
      ${label(150, 135, 'Rise up • shoot high point', C.lineDim, 9)}
    `)),

    sh7: () => svgWrap(halfCourt(`
      ${player(30, 30, '1')}
      ${player(70, 10, '2')}
      ${player(150, 8, '3')}
      ${arrow(30, 30, 150, 22, C.flame)}
      ${arrow(70, 10, 150, 22, C.flame)}
      ${arrow(150, 8, 150, 22, C.flame)}
      ${label(150, 105, '3-POINT ROUTINE', C.flame, 12)}
      ${label(150, 120, '10 shots per spot', C.lineDim)}
      ${label(150, 135, 'Corner • wing • top', C.lineDim, 9)}
    `)),

    sh8: () => svgWrap(halfCourt(`
      ${player(150, 55)}
      ${arrow(150, 55, 150, 22, C.flame)}
      ${label(150, 100, 'BEAT THE PRO', C.flame, 12)}
      ${label(150, 115, 'You: +1 per make', C.lime, 10)}
      ${label(150, 130, 'Pro: +3 per miss', C.flame, 10)}
      ${label(150, 148, 'First to 21 wins', C.lineDim, 9)}
    `)),

    // FINISHING
    fin1: () => svgWrap(halfCourt(`
      ${player(90, 70, '1')}
      ${curvedArrow(90, 70, 140, 65, 175, 40, C.flame)}
      ${player(180, 35, '2')}
      ${curvedArrow(180, 35, 145, 30, 140, 22, C.lime)}
      ${label(150, 100, 'EURO STEP', C.flame, 12)}
      ${label(150, 115, 'Fake one way, step the other', C.lineDim)}
      ${label(150, 130, '1: long step • 2: across', C.lineDim, 9)}
    `)),

    fin2: () => svgWrap(halfCourt(`
      ${player(100, 55, '1')}
      ${curvedArrow(100, 55, 150, 50, 170, 25, C.flame)}
      ${arrow(170, 25, 155, 22, C.lime)}
      ${label(150, 100, 'REVERSE LAYUP', C.flame, 12)}
      ${label(150, 115, 'Finish on far side of rim', C.lineDim)}
      ${label(150, 130, 'Use backboard for protection', C.lineDim, 9)}
    `)),

    fin3: () => svgWrap(halfCourt(`
      ${player(150, 75, '1')}
      ${arrow(150, 75, 150, 25, C.flame)}
      <path d="M 150 60 Q 155 40 152 28" fill="none" stroke="${C.lime}" stroke-width="1.5" stroke-dasharray="2,2"/>
      ${label(150, 100, 'FLOATER', C.flame, 12)}
      ${label(150, 115, 'Short one-foot jumper', C.lineDim)}
      ${label(150, 130, 'High arc over defender', C.lineDim, 9)}
      ${label(150, 145, '6-10 ft from rim', C.lineDim, 9)}
    `)),

    fin4: () => svgWrap(halfCourt(`
      ${player(150, 50, '1')}
      ${arrow(150, 50, 150, 35, C.flame, true)}
      ${label(150, 40, 'fake', C.flame, 8)}
      ${player(150, 35, '2')}
      ${arrow(150, 35, 150, 22, C.lime)}
      ${label(150, 100, 'UP AND UNDER', C.flame, 12)}
      ${label(150, 115, 'Pump fake → step through', C.lineDim)}
      ${label(150, 130, 'Finish opposite hand', C.lineDim, 9)}
    `)),

    fin5: () => svgWrap(halfCourt(`
      ${player(90, 55, '1')}
      ${arrow(90, 55, 130, 40, C.flame)}
      ${player(135, 37, '2')}
      ${arrow(135, 37, 150, 22, C.lime)}
      ${label(150, 100, '1-2 STEP LAYUP', C.flame, 12)}
      ${label(150, 115, 'Controlled approach', C.lineDim)}
      ${label(150, 130, 'Strong push off inside foot', C.lineDim, 9)}
    `)),

    // FOOTWORK
    ft1: () => svgWrap(halfCourt(`
      ${player(150, 100, '1')}
      ${arrow(150, 100, 150, 70, C.flame)}
      ${player(150, 60, '2')}
      <path d="M 142 60 A 8 8 0 1 1 158 60" fill="none" stroke="${C.lime}" stroke-width="2" stroke-dasharray="2,2"/>
      ${label(150, 125, 'JUMP STOP + PIVOT', C.flame, 12)}
      ${label(150, 140, 'Sprint • jump stop • pivot 180°', C.lineDim)}
      ${label(150, 155, 'Stay balanced through rotation', C.lineDim, 9)}
    `)),

    ft2: () => svgWrap(halfCourt(`
      ${player(150, 70, 'X')}
      ${arrow(150, 70, 100, 55, C.flame)}
      ${arrow(150, 70, 200, 55, C.lime)}
      ${label(150, 100, 'TRIPLE THREAT', C.flame, 12)}
      ${label(150, 115, 'Rip & drive both ways', C.lineDim)}
      ${label(150, 130, 'Low stance • ball at hip', C.lineDim, 9)}
    `)),

    ft3: () => svgWrap(halfCourt(`
      ${player(150, 70)}
      ${arrow(150, 70, 165, 62, C.flame, true)}
      ${label(175, 64, 'jab', C.flame, 9)}
      ${arrow(150, 70, 150, 40, C.lime)}
      ${label(150, 100, 'JAB STEP SERIES', C.flame, 12)}
      ${label(150, 115, 'Jab → go, jab → shoot', C.lineDim)}
      ${label(150, 130, 'Small quick step to read D', C.lineDim, 9)}
    `)),

    ft4: () => svgWrap(halfCourt(`
      ${player(150, 120, '1')}
      ${arrow(150, 120, 150, 75, C.flame)}
      ${player(150, 65, '2')}
      ${label(150, 55, '✋ hands up', C.lime, 9)}
      ${label(150, 140, 'CLOSEOUT', C.flame, 12)}
      ${label(150, 155, 'Sprint • break down • contest', C.lineDim)}
    `)),

    // DEFENSE
    df1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${cone(80, 110)}
      ${cone(220, 110)}
      ${player(150, 110, 'D')}
      ${arrow(150, 110, 95, 110, C.flame)}
      ${arrow(150, 110, 205, 110, C.lime)}
      ${label(150, 30, 'DEFENSIVE SLIDES', C.flame, 12)}
      ${label(150, 48, 'Low stance • slide cone to cone', C.lineDim)}
      ${label(80, 130, '8 ft', C.lineDim, 9)}
      ${label(220, 130, '8 ft', C.lineDim, 9)}
      ${label(150, 160, 'no crossing feet', C.flame, 9)}
    `),

    df2: () => svgWrap(fullCourtH(`
      <path d="M 20 60 L 70 120 L 130 60 L 190 120 L 250 60 L 280 120" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${arrow(275, 115, 280, 120, C.flame)}
      ${player(20, 60, 'D')}
      ${label(150, 30, 'ZIG-ZAG DEFENSE', C.flame, 12)}
      ${label(150, 160, 'Slide diagonal • drop step', C.lineDim)}
    `)),

    df3: () => svgWrap(halfCourt(`
      ${player(150, 25, '1')}
      ${arrow(150, 25, 150, 75, C.flame)}
      ${player(150, 85, '2')}
      ${label(150, 60, 'break down', C.lime, 9)}
      ${label(150, 110, 'CLOSE-OUT DRILL', C.flame, 12)}
      ${label(150, 125, 'Under rim → 3pt • high hand', C.lineDim)}
      ${label(150, 140, "Don't fly past shooter", C.lineDim, 9)}
    `)),

    df4: () => svgWrap(halfCourt(`
      ${player(140, 55, 'X')}
      ${player(165, 55, 'O')}
      <path d="M 152 60 L 158 60" stroke="${C.flame}" stroke-width="3"/>
      ${arrow(165, 55, 180, 55, C.lime, true)}
      ${label(150, 100, 'BOX OUT', C.flame, 12)}
      ${label(150, 115, 'Hit body • hold position', C.lineDim)}
      ${label(150, 130, 'Wide base • elbows out', C.lineDim, 9)}
    `)),

    // CONDITIONING
    cd1: () => svgWrap(`
      <rect x="5" y="30" width="290" height="120" fill="${C.court}" stroke="${C.courtLine}" stroke-width="1.5" rx="4"/>
      <line x1="80" y1="30" x2="80" y2="150" stroke="${C.courtLine}" stroke-dasharray="2,2"/>
      <line x1="150" y1="30" x2="150" y2="150" stroke="${C.courtLine}" stroke-dasharray="2,2"/>
      <line x1="220" y1="30" x2="220" y2="150" stroke="${C.courtLine}" stroke-dasharray="2,2"/>
      ${player(10, 90, 'X')}
      ${arrow(15, 90, 75, 90, C.flame)}
      ${arrow(75, 100, 15, 100, C.lime, true)}
      ${arrow(15, 70, 145, 70, C.flame)}
      ${arrow(145, 80, 15, 80, C.lime, true)}
      ${label(40, 60, '1', C.flame, 10)}
      ${label(80, 160, 'FT', C.lineDim, 9)}
      ${label(150, 160, 'half', C.lineDim, 9)}
      ${label(220, 160, 'far FT', C.lineDim, 9)}
      ${label(290, 160, 'end', C.lineDim, 9)}
      ${label(150, 20, 'SUICIDES — out and back to each line', C.flame, 11)}
      ${label(150, 175, 'touch every line • all-out sprint', C.lineDim, 9)}
    `),

    cd2: () => svgWrap(`
      <rect x="5" y="30" width="290" height="120" fill="${C.court}" stroke="${C.courtLine}" stroke-width="1.5" rx="4"/>
      ${arrow(15, 75, 285, 75, C.flame)}
      ${arrow(285, 95, 15, 95, C.lime, true)}
      ${player(15, 85, 'X')}
      ${label(150, 20, '17s — SIDELINE TO SIDELINE', C.flame, 11)}
      ${label(150, 60, '17 trips in 60 sec', C.lineDim)}
      ${label(150, 125, 'touch every sideline', C.lineDim, 9)}
      ${label(150, 170, '← sideline → sideline →', C.lineDim, 9)}
    `),

    cd3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      <path d="M 30 120 Q 80 80 130 100 Q 180 130 230 90 Q 260 70 280 90" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="4,3"/>
      ${player(30, 120)}
      <circle cx="280" cy="90" r="10" fill="none" stroke="${C.lime}" stroke-width="2"/>
      ${label(280, 94, '🏁', C.lime, 11)}
      ${label(150, 30, 'MILE RUN', C.flame, 12)}
      ${label(150, 48, '1 mile for time', C.lineDim)}
      ${label(150, 160, 'pace yourself • kick last lap', C.lineDim, 9)}
    `),

    cd4: () => svgWrap(fullCourtH(`
      ${player(20, 85, 'X')}
      ${arrow(25, 80, 275, 80, C.flame)}
      ${arrow(275, 100, 25, 100, C.lime, true)}
      <circle cx="282" cy="90" r="6" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
      <circle cx="18" cy="90" r="6" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
      ${label(150, 30, 'FULL COURT LAYUPS', C.flame, 12)}
      ${label(150, 160, 'sprint • layup • sprint • layup', C.lineDim)}
    `)),

    // WARMUP
    wu1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(60, 140, 'stand')}
      ${stickSide(120, 140, 'lunge')}
      ${stickSide(200, 140, 'stand')}
      <path d="M 200 110 Q 215 95 200 85" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
      <path d="M 200 110 Q 185 95 200 85" fill="none" stroke="${C.flame}" stroke-width="1.5"/>
      ${stickSide(260, 140, 'stand')}
      ${label(60, 165, 'swings', C.lineDim, 8)}
      ${label(120, 165, 'lunges', C.lineDim, 8)}
      ${label(200, 165, 'arm circles', C.lineDim, 8)}
      ${label(260, 165, 'high knees', C.lineDim, 8)}
      ${label(150, 30, 'DYNAMIC WARMUP', C.flame, 12)}
      ${label(150, 48, '5 min flow through all moves', C.lineDim)}
    `),

    wu2: () => svgWrap(halfCourt(`
      ${player(150, 30, '1')}
      ${player(150, 55, '2')}
      ${player(110, 80, '3')}
      ${player(190, 80, '3')}
      ${arrow(150, 30, 150, 22, C.flame)}
      ${arrow(150, 55, 150, 22, C.flame)}
      ${label(150, 100, 'FORM SHOOTING WARMUP', C.flame, 11)}
      ${label(150, 115, 'Start close • 3 makes per spot', C.lineDim)}
      ${label(150, 130, 'Work outward', C.lineDim, 9)}
    `)),

    wu3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${stickSide(50, 150, 'squat')}
      <g transform="translate(110, 105) rotate(90)">${stickSide(0, 35, 'stand')}</g>
      ${stickSide(190, 150, 'stand')}
      ${stickSide(250, 135, 'stand')}
      ${arrow(250, 110, 250, 95, C.flame)}
      ${label(50, 172, '20 squats', C.lineDim, 8)}
      ${label(130, 172, '10 push-ups', C.lineDim, 8)}
      ${label(190, 172, 'jumping jacks', C.lineDim, 8)}
      ${label(250, 172, '5 jumps', C.lineDim, 8)}
      ${label(150, 30, 'ACTIVATION SERIES', C.flame, 12)}
      ${label(150, 48, '2 rounds • wakes up nervous system', C.lineDim)}
    `),

    // ============================================================
    // STRENGTH DRILLS
    // ============================================================
    u1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(145)}
      <!-- push-up side view: body plank, arms pushing -->
      <line x1="80" y1="120" x2="220" y2="120" stroke="${C.body}" stroke-width="3"/>
      <circle cx="230" cy="118" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="95" y1="120" x2="100" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="175" y1="120" x2="170" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="220" y1="120" x2="215" y2="145" stroke="${C.body}" stroke-width="2"/>
      ${arrow(150, 115, 150, 138, C.flame)}
      ${arrow(150, 138, 150, 115, C.lime)}
      ${label(150, 30, 'PUSH-UPS', C.flame, 12)}
      ${label(150, 48, 'Chest to floor • full lockout', C.lineDim)}
      ${label(150, 70, 'Straight line head to heels', C.lineDim, 9)}
      ${label(170, 138, 'down', C.flame, 9)}
      ${label(170, 115, 'up', C.lime, 9)}
    `),

    u2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      <!-- pull-up bar -->
      <line x1="110" y1="30" x2="190" y2="30" stroke="${C.flame}" stroke-width="3"/>
      <line x1="110" y1="20" x2="110" y2="30" stroke="${C.flame}" stroke-width="2"/>
      <line x1="190" y1="20" x2="190" y2="30" stroke="${C.flame}" stroke-width="2"/>
      <!-- hands on bar -->
      <line x1="130" y1="32" x2="130" y2="55" stroke="${C.body}" stroke-width="2"/>
      <line x1="170" y1="32" x2="170" y2="55" stroke="${C.body}" stroke-width="2"/>
      <!-- head and body -->
      <circle cx="150" cy="65" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="130" y1="55" x2="150" y2="70" stroke="${C.body}" stroke-width="2"/>
      <line x1="170" y1="55" x2="150" y2="70" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="73" x2="150" y2="125" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="125" x2="142" y2="155" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="125" x2="158" y2="155" stroke="${C.body}" stroke-width="2"/>
      ${arrow(210, 100, 210, 45, C.lime)}
      ${label(220, 75, 'pull up', C.lime, 9)}
      ${label(150, 170, 'Chin over bar • control down', C.lineDim, 9)}
    `),

    u3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- pike: hands and feet on ground, hips up -->
      <circle cx="120" cy="100" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="125" y1="105" x2="170" y2="60" stroke="${C.body}" stroke-width="2"/>
      <line x1="170" y1="60" x2="220" y2="150" stroke="${C.body}" stroke-width="2"/>
      <line x1="115" y1="105" x2="100" y2="155" stroke="${C.body}" stroke-width="2"/>
      <line x1="125" y1="105" x2="140" y2="155" stroke="${C.body}" stroke-width="2"/>
      ${arrow(120, 85, 120, 110, C.flame)}
      ${label(150, 30, 'PIKE PUSH-UPS', C.flame, 12)}
      ${label(150, 48, 'Hips high • press head to floor', C.lineDim)}
      ${label(170, 40, 'hips up', C.lineDim, 9)}
    `),

    u4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(145)}
      <line x1="80" y1="120" x2="220" y2="120" stroke="${C.body}" stroke-width="3"/>
      <circle cx="230" cy="118" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <!-- diamond hands -->
      <polygon points="145,118 155,118 150,113" fill="none" stroke="${C.flame}" stroke-width="2"/>
      <line x1="150" y1="120" x2="150" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="220" y1="120" x2="215" y2="145" stroke="${C.body}" stroke-width="2"/>
      ${label(150, 30, 'DIAMOND PUSH-UPS', C.flame, 12)}
      ${label(150, 48, 'Hands form diamond shape', C.lineDim)}
      ${label(150, 68, 'Elbows tight to body', C.lineDim, 9)}
      ${label(150, 165, '🔸 tricep focus', C.flame, 9)}
    `),

    u5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      <!-- bar/table -->
      <line x1="80" y1="70" x2="220" y2="70" stroke="${C.flame}" stroke-width="3"/>
      <!-- body under bar, pulling up -->
      <line x1="120" y1="72" x2="120" y2="100" stroke="${C.body}" stroke-width="2"/>
      <line x1="180" y1="72" x2="180" y2="100" stroke="${C.body}" stroke-width="2"/>
      <circle cx="150" cy="110" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="120" y1="100" x2="150" y2="115" stroke="${C.body}" stroke-width="2"/>
      <line x1="180" y1="100" x2="150" y2="115" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="117" x2="220" y2="135" stroke="${C.body}" stroke-width="2"/>
      <line x1="220" y1="135" x2="230" y2="160" stroke="${C.body}" stroke-width="2"/>
      ${ground(162)}
      ${arrow(150, 125, 150, 85, C.lime)}
      ${label(150, 30, 'INVERTED ROWS', C.flame, 12)}
      ${label(150, 48, 'Pull chest to bar', C.lineDim)}
      ${label(150, 170, 'Keep body straight', C.lineDim, 9)}
    `),

    u6: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      <!-- bench -->
      <line x1="50" y1="120" x2="250" y2="120" stroke="${C.flame}" stroke-width="4"/>
      <!-- body lying -->
      <circle cx="220" cy="113" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="60" y1="115" x2="210" y2="115" stroke="${C.body}" stroke-width="3"/>
      <!-- arms up with dumbbells -->
      <line x1="150" y1="115" x2="130" y2="75" stroke="${C.body}" stroke-width="2"/>
      <line x1="170" y1="115" x2="190" y2="75" stroke="${C.body}" stroke-width="2"/>
      <rect x="120" y="65" width="20" height="15" fill="${C.flame}" rx="2"/>
      <rect x="180" y="65" width="20" height="15" fill="${C.flame}" rx="2"/>
      ${arrow(150, 90, 150, 60, C.lime)}
      ${arrow(150, 60, 150, 90, C.flame, true)}
      ${label(150, 30, 'DUMBBELL BENCH', C.flame, 12)}
      ${label(150, 48, 'Press up • control down', C.lineDim)}
    `),

    u7: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      <circle cx="150" cy="55" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="63" x2="150" y2="125" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="125" x2="135" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="125" x2="165" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="75" x2="115" y2="50" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="75" x2="185" y2="50" stroke="${C.body}" stroke-width="2"/>
      <rect x="105" y="38" width="20" height="15" fill="${C.flame}" rx="2"/>
      <rect x="175" y="38" width="20" height="15" fill="${C.flame}" rx="2"/>
      ${arrow(220, 100, 220, 45, C.lime)}
      ${label(150, 30, 'SHOULDER PRESS', C.flame, 12)}
      ${label(150, 175, 'Press overhead • no arch', C.lineDim, 9)}
    `),

    u8: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- hinged over -->
      <circle cx="80" cy="90" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="88" y1="90" x2="200" y2="85" stroke="${C.body}" stroke-width="3"/>
      <line x1="200" y1="85" x2="200" y2="155" stroke="${C.body}" stroke-width="2"/>
      <!-- arm with dumbbell -->
      <line x1="180" y1="90" x2="170" y2="140" stroke="${C.body}" stroke-width="2"/>
      <rect x="160" y="140" width="20" height="12" fill="${C.flame}" rx="2"/>
      ${arrow(175, 130, 175, 95, C.lime)}
      ${label(150, 30, 'DUMBBELL ROW', C.flame, 12)}
      ${label(150, 48, 'Pull to hip • squeeze back', C.lineDim)}
      ${label(150, 175, 'Hinge at hip • flat back', C.lineDim, 9)}
    `),

    // LOWER
    l1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      ${stickSide(100, 165, 'stand')}
      ${arrow(140, 130, 170, 130, C.flame)}
      ${stickSide(210, 165, 'squat')}
      ${label(100, 30, '1. STAND', C.lime, 11)}
      ${label(210, 30, '2. SQUAT', C.flame, 11)}
      ${label(150, 50, 'BODYWEIGHT SQUATS', C.flame, 12)}
      ${label(150, 175, 'Chest up • break parallel', C.lineDim, 9)}
    `),

    l2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      ${stickSide(80, 165, 'squat')}
      ${arrow(130, 135, 155, 95, C.flame)}
      ${stickSide(190, 120, 'stand')}
      <line x1="175" y1="160" x2="205" y2="160" stroke="${C.lime}" stroke-width="2" stroke-dasharray="2,2"/>
      ${label(80, 30, '1. LOAD', C.lime, 11)}
      ${label(200, 30, '2. EXPLODE', C.flame, 11)}
      ${label(150, 50, 'JUMP SQUATS', C.flame, 12)}
      ${label(150, 175, 'Explode up • land soft', C.lineDim, 9)}
    `),

    l3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(80, 160, 'lunge')}
      ${arrow(130, 130, 170, 130, C.flame)}
      ${stickSide(220, 160, 'lunge')}
      ${label(150, 30, 'WALKING LUNGES', C.flame, 12)}
      ${label(150, 48, 'Long step • back knee down', C.lineDim)}
      ${label(150, 175, 'Drive up and through', C.lineDim, 9)}
    `),

    l4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(150, 160, 'stand')}
      <g transform="scale(-1,1) translate(-240, 0)">${stickSide(70, 160, 'lunge')}</g>
      ${arrow(160, 135, 180, 135, C.flame, true)}
      ${label(150, 30, 'REVERSE LUNGES', C.flame, 12)}
      ${label(150, 48, 'Step BACKWARD into lunge', C.lineDim)}
      ${label(150, 175, 'Easier on knees', C.lineDim, 9)}
    `),

    l5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- bench behind -->
      <line x1="200" y1="125" x2="260" y2="125" stroke="${C.flame}" stroke-width="3"/>
      <!-- front leg squatting, back foot elevated -->
      <circle cx="120" cy="60" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="120" y1="68" x2="120" y2="100" stroke="${C.body}" stroke-width="2"/>
      <line x1="120" y1="100" x2="130" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="120" y1="100" x2="200" y2="125" stroke="${C.body}" stroke-width="2"/>
      ${label(150, 30, 'BULGARIAN SPLIT SQUAT', C.flame, 11)}
      ${label(150, 48, 'Back foot elevated', C.lineDim)}
      ${label(150, 175, 'Deep squat on front leg', C.lineDim, 9)}
      ${label(230, 115, 'bench', C.flame, 8)}
    `),

    l6: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- 2 positions: heels down, heels up -->
      <g transform="translate(80, 0)">
        ${stickSide(0, 160, 'stand')}
        <line x1="-7" y1="158" x2="7" y2="158" stroke="${C.body}" stroke-width="3"/>
      </g>
      ${arrow(130, 140, 170, 140, C.flame)}
      <g transform="translate(220, 0)">
        ${stickSide(0, 150, 'stand')}
        <line x1="-7" y1="148" x2="0" y2="158" stroke="${C.body}" stroke-width="3"/>
        <line x1="0" y1="158" x2="7" y2="148" stroke="${C.body}" stroke-width="3"/>
      </g>
      ${label(80, 30, 'HEELS DOWN', C.lime, 10)}
      ${label(220, 30, 'RISE ON TOES', C.flame, 10)}
      ${label(150, 50, 'CALF RAISES', C.flame, 12)}
      ${label(150, 175, 'Slow down • use stair edge', C.lineDim, 9)}
    `),

    l7: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(60, 160, 'squat')}
      <path d="M 80 135 Q 150 60 220 140" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${arrow(215, 138, 220, 140, C.flame)}
      ${stickSide(230, 160, 'squat')}
      ${label(150, 30, 'BROAD JUMPS', C.flame, 12)}
      ${label(150, 48, 'Jump forward for distance', C.lineDim)}
      ${label(150, 175, 'Stick the landing', C.lineDim, 9)}
    `),

    l8: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- box -->
      <rect x="180" y="115" width="80" height="45" fill="${C.flame}" opacity="0.3" stroke="${C.flame}" stroke-width="2"/>
      ${stickSide(80, 160, 'squat')}
      <path d="M 100 135 Q 140 80 210 110" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${arrow(205, 112, 210, 110, C.flame)}
      ${stickSide(220, 115, 'stand')}
      ${label(150, 30, 'BOX JUMPS', C.flame, 12)}
      ${label(150, 48, 'Onto sturdy box • stand tall', C.lineDim)}
      ${label(150, 175, 'Step down • do not jump down', C.lineDim, 9)}
    `),

    l9: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- lying on back, hips bridged up -->
      <circle cx="80" cy="130" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="87" y1="130" x2="170" y2="100" stroke="${C.body}" stroke-width="3"/>
      <line x1="170" y1="100" x2="200" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="200" y1="145" x2="220" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="220" y1="158" x2="235" y2="158" stroke="${C.body}" stroke-width="3"/>
      ${arrow(180, 135, 175, 110, C.lime)}
      ${label(170, 125, 'drive hips', C.lime, 9)}
      ${label(150, 30, 'GLUTE BRIDGES', C.flame, 12)}
      ${label(150, 48, 'Squeeze glutes at top', C.lineDim)}
      ${label(150, 175, 'Feet flat • knees bent', C.lineDim, 9)}
    `),

    l10: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <circle cx="70" cy="130" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="77" y1="130" x2="155" y2="100" stroke="${C.body}" stroke-width="3"/>
      <line x1="155" y1="100" x2="180" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="180" y1="145" x2="195" y2="158" stroke="${C.body}" stroke-width="2"/>
      <line x1="195" y1="158" x2="215" y2="158" stroke="${C.body}" stroke-width="3"/>
      <!-- extended leg -->
      <line x1="155" y1="100" x2="240" y2="85" stroke="${C.flame}" stroke-width="2"/>
      ${label(230, 75, 'straight!', C.flame, 9)}
      ${label(150, 30, 'SINGLE-LEG GLUTE BRIDGE', C.flame, 11)}
      ${label(150, 48, 'One leg extended straight', C.lineDim)}
      ${label(150, 175, 'Extra glute activation', C.lineDim, 9)}
    `),

    l11: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(150, 160, 'stand')}
      ${arrow(140, 145, 85, 145, C.flame)}
      ${arrow(160, 145, 215, 145, C.lime)}
      <g transform="translate(-80,0)">${stickSide(150, 160, 'squat')}</g>
      <g transform="translate(80,0)">${stickSide(150, 160, 'squat')}</g>
      ${label(150, 30, 'LATERAL LUNGES', C.flame, 12)}
      ${label(150, 48, 'Step wide • sit into hip', C.lineDim)}
      ${label(150, 175, 'Other leg stays straight', C.lineDim, 9)}
    `),

    l12: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      <!-- wall -->
      <line x1="50" y1="30" x2="50" y2="165" stroke="${C.flame}" stroke-width="3"/>
      <pattern id="wallp" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="8" y2="8" stroke="${C.flame}" stroke-width="0.5" opacity="0.4"/></pattern>
      <rect x="40" y="30" width="10" height="135" fill="url(#wallp)"/>
      <!-- sitting against wall, thighs parallel to floor -->
      <circle cx="65" cy="85" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="65" y1="92" x2="65" y2="130" stroke="${C.body}" stroke-width="2"/>
      <line x1="65" y1="130" x2="140" y2="130" stroke="${C.body}" stroke-width="2"/>
      <line x1="140" y1="130" x2="140" y2="160" stroke="${C.body}" stroke-width="2"/>
      ${label(190, 110, '90°', C.lime, 12)}
      ${label(190, 130, 'thighs parallel', C.lineDim, 9)}
      ${label(150, 30, 'WALL SIT', C.flame, 12)}
      ${label(150, 48, 'Back flat • hold position', C.lineDim)}
    `),

    // CORE
    c1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(140)}
      <!-- plank on forearms -->
      <circle cx="75" cy="110" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="82" y1="110" x2="230" y2="115" stroke="${C.body}" stroke-width="3"/>
      <line x1="82" y1="115" x2="82" y2="138" stroke="${C.body}" stroke-width="2"/>
      <line x1="82" y1="138" x2="95" y2="138" stroke="${C.body}" stroke-width="2"/>
      <line x1="230" y1="115" x2="230" y2="138" stroke="${C.body}" stroke-width="2"/>
      <!-- straight line indicator -->
      <line x1="65" y1="105" x2="240" y2="108" stroke="${C.lime}" stroke-width="1" stroke-dasharray="3,2"/>
      ${label(150, 95, 'straight line head to heels', C.lime, 9)}
      ${label(150, 30, 'PLANK', C.flame, 12)}
      ${label(150, 48, 'Forearms and toes', C.lineDim)}
      ${label(150, 165, 'Engage core • no sagging', C.lineDim, 9)}
    `),

    c2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(150)}
      <!-- side plank -->
      <line x1="70" y1="150" x2="90" y2="150" stroke="${C.body}" stroke-width="3"/>
      <line x1="90" y1="150" x2="90" y2="110" stroke="${C.body}" stroke-width="2"/>
      <line x1="90" y1="110" x2="230" y2="115" stroke="${C.body}" stroke-width="3"/>
      <circle cx="240" cy="113" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="160" y1="112" x2="165" y2="80" stroke="${C.body}" stroke-width="2"/>
      ${label(150, 30, 'SIDE PLANK', C.flame, 12)}
      ${label(150, 48, 'Body straight sideways', C.lineDim)}
      ${label(150, 70, 'Both sides', C.lineDim, 9)}
      ${label(150, 165, 'Stack feet • hips up', C.lineDim, 9)}
    `),

    c3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- seated leaning back -->
      <circle cx="180" cy="80" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="173" y1="86" x2="140" y2="130" stroke="${C.body}" stroke-width="3"/>
      <line x1="140" y1="130" x2="100" y2="130" stroke="${C.body}" stroke-width="2"/>
      <line x1="100" y1="130" x2="80" y2="105" stroke="${C.body}" stroke-width="2"/>
      <!-- arms with ball, rotating -->
      <line x1="160" y1="105" x2="120" y2="90" stroke="${C.body}" stroke-width="2"/>
      ${ball(115, 90)}
      ${curvedArrow(115, 90, 155, 50, 220, 90, C.flame, true)}
      ${label(150, 30, 'RUSSIAN TWISTS', C.flame, 12)}
      ${label(150, 48, 'Rotate side to side', C.lineDim)}
      ${label(150, 175, 'Feet up for harder', C.lineDim, 9)}
    `),

    c4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(155)}
      <!-- lying on back -->
      <circle cx="60" cy="130" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="67" y1="130" x2="230" y2="130" stroke="${C.body}" stroke-width="3"/>
      <!-- opposite arm and leg extended -->
      <line x1="130" y1="130" x2="170" y2="90" stroke="${C.flame}" stroke-width="2"/>
      <line x1="195" y1="130" x2="235" y2="95" stroke="${C.flame}" stroke-width="2"/>
      <!-- other arm/leg on floor -->
      <line x1="130" y1="130" x2="95" y2="155" stroke="${C.body}" stroke-width="2" opacity="0.5"/>
      <line x1="195" y1="130" x2="240" y2="155" stroke="${C.body}" stroke-width="2" opacity="0.5"/>
      ${label(150, 30, 'DEAD BUG', C.flame, 12)}
      ${label(150, 48, 'Opposite arm + leg extend', C.lineDim)}
      ${label(150, 70, 'Lower back stays flat', C.lineDim, 9)}
    `),

    c5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <circle cx="90" cy="120" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="95" y1="125" x2="180" y2="125" stroke="${C.body}" stroke-width="3"/>
      <!-- crunched up -->
      <line x1="100" y1="120" x2="125" y2="100" stroke="${C.body}" stroke-width="2"/>
      <line x1="155" y1="125" x2="130" y2="95" stroke="${C.flame}" stroke-width="2"/>
      <line x1="120" y1="100" x2="130" y2="95" stroke="${C.flame}" stroke-width="3"/>
      <line x1="180" y1="125" x2="220" y2="110" stroke="${C.body}" stroke-width="2"/>
      ${label(150, 30, 'BICYCLE CRUNCHES', C.flame, 12)}
      ${label(150, 48, 'Elbow to opposite knee', C.lineDim)}
      ${label(150, 68, 'Alternate sides', C.lineDim, 9)}
      ${label(150, 175, 'Slow and controlled', C.lineDim, 9)}
    `),

    c6: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      <!-- pull-up bar -->
      <line x1="110" y1="30" x2="190" y2="30" stroke="${C.flame}" stroke-width="3"/>
      <!-- hanging, knees up -->
      <line x1="135" y1="32" x2="135" y2="55" stroke="${C.body}" stroke-width="2"/>
      <line x1="165" y1="32" x2="165" y2="55" stroke="${C.body}" stroke-width="2"/>
      <circle cx="150" cy="65" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="135" y1="55" x2="150" y2="70" stroke="${C.body}" stroke-width="2"/>
      <line x1="165" y1="55" x2="150" y2="70" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="72" x2="150" y2="105" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="105" x2="120" y2="115" stroke="${C.flame}" stroke-width="2"/>
      <line x1="120" y1="115" x2="110" y2="95" stroke="${C.flame}" stroke-width="2"/>
      <line x1="150" y1="105" x2="180" y2="115" stroke="${C.flame}" stroke-width="2"/>
      <line x1="180" y1="115" x2="190" y2="95" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(220, 130, 220, 85, C.lime)}
      ${label(150, 170, 'Knees to chest • control down', C.lineDim, 9)}
    `),

    c7: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- plank with one knee pulled up -->
      <circle cx="70" cy="120" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="77" y1="122" x2="200" y2="122" stroke="${C.body}" stroke-width="3"/>
      <line x1="80" y1="125" x2="80" y2="155" stroke="${C.body}" stroke-width="2"/>
      <line x1="130" y1="125" x2="130" y2="155" stroke="${C.body}" stroke-width="2"/>
      <!-- one knee forward -->
      <line x1="200" y1="122" x2="160" y2="105" stroke="${C.flame}" stroke-width="2"/>
      <line x1="160" y1="105" x2="140" y2="115" stroke="${C.flame}" stroke-width="2"/>
      <line x1="200" y1="122" x2="240" y2="155" stroke="${C.body}" stroke-width="2"/>
      ${arrow(180, 110, 150, 110, C.flame, true)}
      ${arrow(150, 110, 180, 110, C.lime, true)}
      ${label(150, 30, 'MOUNTAIN CLIMBERS', C.flame, 12)}
      ${label(150, 48, 'Drive knees to chest fast', C.lineDim)}
      ${label(150, 175, 'Plank position • alternate', C.lineDim, 9)}
    `),

    // PLYO
    p1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <rect x="30" y="130" width="45" height="30" fill="${C.flame}" opacity="0.3" stroke="${C.flame}" stroke-width="2"/>
      ${stickSide(50, 130, 'stand')}
      <path d="M 80 120 Q 120 140 150 145" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${stickSide(150, 160, 'squat')}
      <path d="M 170 135 Q 200 70 230 100" fill="none" stroke="${C.lime}" stroke-width="2"/>
      ${stickSide(240, 160, 'stand')}
      ${label(50, 30, '1. STEP OFF', C.flame, 10)}
      ${label(150, 30, '2. LAND', C.lineDim, 10)}
      ${label(240, 30, '3. EXPLODE', C.lime, 10)}
      ${label(150, 175, 'Minimize ground time', C.lineDim, 9)}
    `),

    p2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(60, 160, 'stand')}
      <path d="M 80 135 Q 130 100 180 135" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${stickSide(200, 160, 'stand')}
      <path d="M 220 135 Q 170 100 120 135" fill="none" stroke="${C.lime}" stroke-width="2" stroke-dasharray="3,2"/>
      ${label(150, 30, 'LATERAL BOUNDS', C.flame, 12)}
      ${label(150, 48, 'Side to side • single-leg', C.lineDim)}
      ${label(150, 175, 'Stick each landing', C.lineDim, 9)}
    `),

    p3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      ${stickSide(80, 165, 'stand')}
      <path d="M 100 140 Q 150 40 200 140" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      <!-- midair tuck -->
      <circle cx="150" cy="60" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="67" x2="150" y2="85" stroke="${C.body}" stroke-width="2"/>
      <line x1="145" y1="75" x2="135" y2="80" stroke="${C.body}" stroke-width="2"/>
      <line x1="155" y1="75" x2="165" y2="80" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="85" x2="135" y2="75" stroke="${C.flame}" stroke-width="2"/>
      <line x1="150" y1="85" x2="165" y2="75" stroke="${C.flame}" stroke-width="2"/>
      ${stickSide(220, 165, 'stand')}
      ${label(150, 30, 'TUCK JUMPS', C.flame, 12)}
      ${label(150, 48, 'Pull knees to chest', C.lineDim)}
      ${label(150, 175, 'Land • immediate next jump', C.lineDim, 9)}
    `),

    p4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(60, 160, 'stand')}
      <path d="M 80 140 Q 120 110 160 140" fill="none" stroke="${C.flame}" stroke-width="2" stroke-dasharray="3,2"/>
      ${stickSide(170, 160, 'stand')}
      <path d="M 190 140 Q 230 110 270 140" fill="none" stroke="${C.lime}" stroke-width="2" stroke-dasharray="3,2"/>
      ${label(150, 30, 'SKATER JUMPS', C.flame, 12)}
      ${label(150, 48, 'Speed skater bounding', C.lineDim)}
      ${label(150, 175, 'Side leg sweeps back', C.lineDim, 9)}
    `),

    p5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      ${stickSide(100, 160, 'stand')}
      <path d="M 100 140 Q 100 115 100 140" fill="none" stroke="${C.flame}" stroke-width="2"/>
      ${stickSide(150, 160, 'stand')}
      <path d="M 150 140 Q 150 100 150 140" fill="none" stroke="${C.flame}" stroke-width="2"/>
      ${stickSide(200, 160, 'stand')}
      <path d="M 200 140 Q 200 115 200 140" fill="none" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(100, 145, 100, 125, C.lime)}
      ${arrow(150, 145, 150, 120, C.lime)}
      ${arrow(200, 145, 200, 125, C.lime)}
      ${label(150, 30, 'POGO JUMPS', C.flame, 12)}
      ${label(150, 48, 'Stiff legs • quick bounces', C.lineDim)}
      ${label(150, 175, 'Minimal ground contact', C.lineDim, 9)}
    `),

    // MOBILITY
    m1: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- foam roll under quads, face down -->
      <circle cx="80" cy="120" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="87" y1="122" x2="90" y2="128" stroke="${C.body}" stroke-width="2"/>
      <line x1="90" y1="128" x2="220" y2="135" stroke="${C.body}" stroke-width="3"/>
      <line x1="220" y1="135" x2="245" y2="145" stroke="${C.body}" stroke-width="2"/>
      <!-- foam roller -->
      <ellipse cx="170" cy="150" rx="18" ry="8" fill="${C.flame}" opacity="0.5" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(130, 150, 210, 150, C.lime, true)}
      ${arrow(210, 150, 130, 150, C.lime, true)}
      ${label(150, 30, 'FOAM ROLL QUADS', C.flame, 12)}
      ${label(150, 48, 'Face down • roll front of thighs', C.lineDim)}
      ${label(150, 175, 'Pause 20 sec on tight spots', C.lineDim, 9)}
    `),

    m2: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(160)}
      <!-- side lying, roll IT band -->
      <circle cx="80" cy="130" r="7" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="87" y1="130" x2="230" y2="135" stroke="${C.body}" stroke-width="3"/>
      <!-- roller under outer thigh -->
      <ellipse cx="170" cy="150" rx="18" ry="8" fill="${C.flame}" opacity="0.5" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(130, 150, 210, 150, C.lime, true)}
      ${arrow(210, 150, 130, 150, C.lime, true)}
      ${label(150, 30, 'FOAM ROLL IT BAND', C.flame, 12)}
      ${label(150, 48, 'Side-lying • outer thigh', C.lineDim)}
      ${label(150, 175, 'Hip to just above knee', C.lineDim, 9)}
    `),

    m3: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      <!-- kneeling lunge, back knee down -->
      <circle cx="150" cy="60" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="68" x2="150" y2="120" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="120" x2="90" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="90" y1="160" x2="80" y2="165" stroke="${C.body}" stroke-width="2"/>
      <!-- front leg bent -->
      <line x1="150" y1="120" x2="210" y2="125" stroke="${C.body}" stroke-width="2"/>
      <line x1="210" y1="125" x2="215" y2="160" stroke="${C.body}" stroke-width="2"/>
      ${label(130, 95, 'squeeze', C.flame, 9)}
      ${label(130, 108, 'glute', C.flame, 9)}
      ${label(150, 30, 'HIP FLEXOR STRETCH', C.flame, 12)}
      ${label(150, 48, 'Kneeling • lean forward', C.lineDim)}
      ${label(150, 175, 'Opens up front of hip', C.lineDim, 9)}
    `),

    m4: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      <!-- lunge with hand inside foot, other arm rotating up -->
      <circle cx="130" cy="75" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="130" y1="83" x2="140" y2="125" stroke="${C.body}" stroke-width="2"/>
      <line x1="140" y1="125" x2="190" y2="145" stroke="${C.body}" stroke-width="2"/>
      <line x1="190" y1="145" x2="210" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="140" y1="125" x2="95" y2="160" stroke="${C.body}" stroke-width="2"/>
      <!-- hand down -->
      <line x1="130" y1="90" x2="160" y2="140" stroke="${C.body}" stroke-width="2"/>
      <!-- other arm rotating up -->
      <line x1="130" y1="90" x2="120" y2="40" stroke="${C.flame}" stroke-width="2"/>
      ${arrow(100, 70, 120, 40, C.flame)}
      ${label(150, 30, "WORLD'S GREATEST STRETCH", C.flame, 11)}
      ${label(150, 48, 'Lunge → rotate up', C.lineDim)}
      ${label(150, 175, 'Full body mobility', C.lineDim, 9)}
    `),

    m5: () => svgWrap(`
      <rect width="300" height="180" fill="${C.court}" rx="4"/>
      ${ground(165)}
      <!-- half kneeling, front knee driving forward -->
      <circle cx="150" cy="60" r="8" fill="none" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="68" x2="150" y2="115" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="115" x2="80" y2="160" stroke="${C.body}" stroke-width="2"/>
      <line x1="80" y1="160" x2="70" y2="165" stroke="${C.body}" stroke-width="2"/>
      <line x1="150" y1="115" x2="200" y2="135" stroke="${C.body}" stroke-width="2"/>
      <line x1="200" y1="135" x2="220" y2="160" stroke="${C.body}" stroke-width="2"/>
      ${arrow(200, 120, 240, 120, C.flame)}
      ${label(245, 125, 'knee over toes', C.flame, 9)}
      ${label(220, 172, 'heel stays down', C.lineDim, 9)}
      ${label(150, 30, 'ANKLE MOBILITY', C.flame, 12)}
      ${label(150, 48, 'Drive front knee over toes', C.lineDim)}
    `),
  };

  // Expose
  window.HOOPERS_DIAGRAMS = DIAGRAMS;
})();
