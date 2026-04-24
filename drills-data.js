// Hooper's Path - Drill Library
// Each drill is tagged with environments it works in:
//   fullct - full court available
//   halfct - half court (at least one hoop + half the lines)
//   hoop   - just a basketball hoop, no lines
//   nohoop - open space, ball ok, no hoop (driveway, gym floor)
//   noball - anywhere, no ball needed
//   homegym - weights, maybe pullup bar (garage/basement setup)
//   gym     - commercial gym with machines and racks

const ENVIRONMENTS = [
  { id: 'fullct', label: 'Full Court', icon: '🏟️', description: 'School gym, rec center' },
  { id: 'halfct', label: 'Half Court', icon: '🏀', description: 'Driveway, park, outdoor' },
  { id: 'hoop',   label: 'Hoop Only',  icon: '🥅', description: 'Just a rim, no lines' },
  { id: 'nohoop', label: 'No Hoop',    icon: '🔶', description: 'Open space, can bring ball' },
  { id: 'homegym',label: 'Home Gym',   icon: '🏠', description: 'Weights, pullup bar' },
  { id: 'gym',    label: 'Gym',        icon: '💪', description: 'Full commercial gym' },
];

const BASKETBALL_DRILLS = [
  // BALL HANDLING (mostly work anywhere with a ball)
  { id: "bh1", category: "ball-handling", name: "Pound Dribble",
    description: "Hard pound dribble, ball below knee. Stay low, keep eyes up.",
    baseReps: "2 sets x 30 sec each hand", difficulty: 1,
    why: "Builds hand strength and control for tight-space dribbling.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "bh2", category: "ball-handling", name: "Crossover Dribble",
    description: "Low crossovers side to side. Keep ball below waist.",
    baseReps: "3 sets x 20 crosses", difficulty: 1,
    why: "Foundation for breaking down defenders off the dribble.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "bh3", category: "ball-handling", name: "Figure 8 Dribble",
    description: "Dribble between legs in figure 8 pattern, stay low.",
    baseReps: "3 sets x 30 sec", difficulty: 2,
    why: "Improves hand coordination and ball feel.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "bh4", category: "ball-handling", name: "Two-Ball Dribble",
    description: "Dribble two balls at once - same height, then alternating.",
    baseReps: "3 sets x 45 sec", difficulty: 3,
    why: "Develops weak-hand equality and peripheral awareness.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "bh5", category: "ball-handling", name: "Spider Dribble",
    description: "Alternate dribbles front and back of legs rapidly.",
    baseReps: "3 sets x 20 sec", difficulty: 2,
    why: "Quick hands and fingertip control.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "bh6", category: "ball-handling", name: "In-and-Out Dribble",
    description: "Fake crossover with hand on top of ball, keep ball in same hand.",
    baseReps: "3 sets x 15 each hand", difficulty: 2,
    why: "Essential move to freeze defenders.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "bh7", category: "ball-handling", name: "Behind-the-Back Dribble",
    description: "Continuous behind-the-back dribbles while walking forward.",
    baseReps: "3 sets x 10 switches", difficulty: 2,
    why: "Escape move under pressure.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "bh8", category: "ball-handling", name: "Cone Weave Dribble",
    description: "Set 5 cones 3 ft apart, weave through with crossover at each.",
    baseReps: "4 trips", difficulty: 2,
    why: "Combines handling with change of direction.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "bh9", category: "ball-handling", name: "Stationary Combo",
    description: "Pound 4 times, crossover, pound 4 times, crossover. Switch patterns.",
    baseReps: "3 sets x 45 sec", difficulty: 2,
    why: "Combines moves in sequence like a real game.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  // SHOOTING (requires a hoop)
  { id: "sh1", category: "shooting", name: "Form Shooting",
    description: "3 ft from basket. One-handed shots, focus on arc and follow-through.",
    baseReps: "25 makes each side", difficulty: 1,
    why: "Grooves proper shooting mechanics.",
    envs: ["fullct","halfct","hoop"] },

  { id: "sh2", category: "shooting", name: "Free Throws",
    description: "Same routine every shot. Track makes out of attempts.",
    baseReps: "50 attempts, log makes", difficulty: 1,
    why: "Free points in games. Every missed FT is a mistake.",
    envs: ["fullct","halfct"], trackPR: "freeThrowPct" },

  { id: "sh3", category: "shooting", name: "Mikan Drill",
    description: "R-hand layup, catch with L, L-hand layup. Continuous under the rim.",
    baseReps: "30 makes", difficulty: 1,
    why: "Finishing touch with both hands around the rim.",
    envs: ["fullct","halfct","hoop"] },

  { id: "sh4", category: "shooting", name: "Spot Shooting",
    description: "5 spots around arc. Make 5 in a row before moving to next spot.",
    baseReps: "All 5 spots", difficulty: 2,
    why: "Builds consistency from game spots.",
    envs: ["fullct","halfct"] },

  { id: "sh5", category: "shooting", name: "Catch and Shoot",
    description: "Self-toss or partner pass. Square up on catch, shoot in rhythm.",
    baseReps: "3 sets x 10 makes", difficulty: 2,
    why: "Most common shot in real games.",
    envs: ["fullct","halfct","hoop"] },

  { id: "sh6", category: "shooting", name: "Pull-Up Jumper",
    description: "Dribble into pull-up from mid-range. Plant hard and rise.",
    baseReps: "3 sets x 10 makes each side", difficulty: 3,
    why: "Creates your own shot when defense closes out.",
    envs: ["fullct","halfct","hoop"] },

  { id: "sh7", category: "shooting", name: "3-Point Routine",
    description: "3 spots beyond arc (corner, wing, top). 10 shots each spot.",
    baseReps: "30 attempts, log makes", difficulty: 3,
    why: "Range extension for modern game.",
    envs: ["fullct","halfct"], trackPR: "threePtPct" },

  { id: "sh8", category: "shooting", name: "Beat the Pro",
    description: "You get 1pt per make, pro gets 3pts per miss. Race to 21.",
    baseReps: "1 game to 21", difficulty: 2,
    why: "Pressure shooting simulation.",
    envs: ["fullct","halfct"] },

  { id: "sh9", category: "shooting", name: "Elbow to Elbow",
    description: "Shoot from right elbow, chase rebound, dribble to left elbow, shoot.",
    baseReps: "10 makes each elbow", difficulty: 2,
    why: "Mid-range shots off the dribble.",
    envs: ["fullct","halfct"] },

  { id: "sh10", category: "shooting", name: "Wall Shooting",
    description: "No hoop? Shoot against wall 8ft up. Perfect your form and arc.",
    baseReps: "50 reps each side", difficulty: 1,
    why: "Builds muscle memory when no rim available.",
    envs: ["nohoop","homegym","gym"] },

  // FINISHING (need a hoop)
  { id: "fin1", category: "finishing", name: "Euro Step",
    description: "Drive baseline, fake one direction, step through the other.",
    baseReps: "3 sets x 10 each side", difficulty: 2,
    why: "Essential counter for aggressive help defense.",
    envs: ["fullct","halfct","hoop"] },

  { id: "fin2", category: "finishing", name: "Reverse Layup",
    description: "Attack middle, finish on far side of rim using backboard.",
    baseReps: "3 sets x 10 each side", difficulty: 2,
    why: "Uses rim as protection from shot blockers.",
    envs: ["fullct","halfct","hoop"] },

  { id: "fin3", category: "finishing", name: "Floater",
    description: "Short one-foot jumper from 6-10 ft over taller defender.",
    baseReps: "3 sets x 10 each side", difficulty: 3,
    why: "Key weapon against shot blockers.",
    envs: ["fullct","halfct","hoop"] },

  { id: "fin4", category: "finishing", name: "Up and Under",
    description: "Pump fake, step through, finish with opposite hand.",
    baseReps: "3 sets x 8 each side", difficulty: 2,
    why: "Creates space when defender jumps.",
    envs: ["fullct","halfct","hoop"] },

  { id: "fin5", category: "finishing", name: "1-2 Step Layup",
    description: "Controlled 2-step approach, strong push off inside foot.",
    baseReps: "3 sets x 10 each side", difficulty: 1,
    why: "Foundation of every layup.",
    envs: ["fullct","halfct","hoop"] },

  // FOOTWORK (some need court lines, some don't)
  { id: "ft1", category: "footwork", name: "Jump Stop + Pivot",
    description: "Sprint, jump stop, pivot 180° on each foot. Balance is everything.",
    baseReps: "3 sets x 10", difficulty: 1,
    why: "Control and balance in triple threat.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "ft2", category: "footwork", name: "Triple Threat Attack",
    description: "From triple threat stance: rip through and drive each direction.",
    baseReps: "3 sets x 10 each side", difficulty: 2,
    why: "First step quickness off catch.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "ft3", category: "footwork", name: "Jab Step Series",
    description: "Jab step, jab-and-go, jab-and-shoot. Mix the sequence.",
    baseReps: "3 sets x 8 each move", difficulty: 2,
    why: "Moves defender before you even dribble.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "ft4", category: "footwork", name: "Closeout Stance",
    description: "Sprint forward, break down into low stance with high hands.",
    baseReps: "3 sets x 10", difficulty: 1,
    why: "Contest without fouling or getting blown by.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  // DEFENSE (mostly need space, some need lines)
  { id: "df1", category: "defense", name: "Defensive Slides",
    description: "Low stance, slide side to side between two cones 8 ft apart.",
    baseReps: "3 sets x 30 sec", difficulty: 1,
    why: "Lateral quickness to stay in front.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "df2", category: "defense", name: "Zig-Zag Defense",
    description: "Slide diagonally court-length, drop step at each change of direction.",
    baseReps: "3 trips", difficulty: 2,
    why: "Game-speed lateral movement.",
    envs: ["fullct","halfct"] },

  { id: "df3", category: "defense", name: "Close-Out Drill",
    description: "Start under rim, sprint to 3pt line, break down, high hand contest.",
    baseReps: "3 sets x 8", difficulty: 2,
    why: "Most common defensive action.",
    envs: ["fullct","halfct"] },

  { id: "df4", category: "defense", name: "Shell Stance Holds",
    description: "Hold defensive stance: feet wide, knees bent, butt down. 30 sec.",
    baseReps: "4 sets x 30 sec", difficulty: 1,
    why: "Builds endurance for staying low on D.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  // CONDITIONING
  { id: "cd1", category: "conditioning", name: "Suicides",
    description: "Sprint to FT line back, half court back, far FT back, baseline back.",
    baseReps: "4 reps, 45 sec rest", difficulty: 2,
    why: "Game-shape conditioning.",
    envs: ["fullct"], trackPR: "suicideTime" },

  { id: "cd2", category: "conditioning", name: "17s",
    description: "Sideline to sideline, 17 trips in 60 sec.",
    baseReps: "3 rounds, 60 sec rest", difficulty: 3,
    why: "Lateral conditioning for defense.",
    envs: ["fullct","halfct"] },

  { id: "cd3", category: "conditioning", name: "Mile Run",
    description: "1 mile as fast as possible. Track time.",
    baseReps: "1 mile", difficulty: 2,
    why: "Aerobic base for 4-quarter games.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"], trackPR: "mileTime" },

  { id: "cd4", category: "conditioning", name: "Full Court Layup Finisher",
    description: "Sprint full court, layup, sprint back, layup. Continuous.",
    baseReps: "10 makes", difficulty: 2,
    why: "Conditioning + finishing while tired.",
    envs: ["fullct"] },

  { id: "cd5", category: "conditioning", name: "Burpee Ladder",
    description: "1 burpee, 10 sec rest, 2 burpees, 10 sec rest... up to 10.",
    baseReps: "1 ladder", difficulty: 3,
    why: "Full body conditioning when no court available.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "cd6", category: "conditioning", name: "Jump Rope Intervals",
    description: "30 sec on, 30 sec rest, for 10 rounds.",
    baseReps: "10 rounds", difficulty: 1,
    why: "Basketball-specific calf and ankle conditioning.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  // WARM-UP (work everywhere)
  { id: "wu1", category: "warmup", name: "Dynamic Stretching",
    description: "Leg swings, arm circles, high knees, butt kicks, walking lunges.",
    baseReps: "5 min flow", difficulty: 1,
    why: "Activates muscles for peak performance.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "wu2", category: "warmup", name: "Form Shooting Warmup",
    description: "Start close, work out. 3 makes each spot before moving back.",
    baseReps: "5-10 min", difficulty: 1,
    why: "Calibrates shooting touch.",
    envs: ["fullct","halfct","hoop"] },

  { id: "wu3", category: "warmup", name: "Activation Series",
    description: "20 bodyweight squats, 10 push-ups, 10 jumping jacks, 5 vertical jumps.",
    baseReps: "2 rounds", difficulty: 1,
    why: "Gets central nervous system firing.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },
];

const STRENGTH_DRILLS = [
  // UPPER BODY
  { id: "u1", category: "upper", name: "Push-Ups",
    description: "Chest to ground, full lockout. Strict form.",
    baseReps: "3 sets x max reps", difficulty: 1,
    why: "Chest, shoulders, triceps — pushing strength.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"], trackPR: "maxPushups" },

  { id: "u2", category: "upper", name: "Pull-Ups",
    description: "Full hang to chin over bar. Dead hang assisted if needed.",
    baseReps: "3 sets x max reps", difficulty: 3,
    why: "Back and biceps — critical for rebounding.",
    envs: ["homegym","gym"], trackPR: "maxPullups" },

  { id: "u3", category: "upper", name: "Pike Push-Ups",
    description: "Hips high, push head toward ground. Shoulder focus.",
    baseReps: "3 sets x 8-12", difficulty: 2,
    why: "Builds overhead pressing strength.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "u4", category: "upper", name: "Diamond Push-Ups",
    description: "Hands together forming diamond. Elbows stay tight.",
    baseReps: "3 sets x max", difficulty: 2,
    why: "Tricep emphasis for shooting arm strength.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "u5", category: "upper", name: "Inverted Rows",
    description: "Under bar or table edge, pull chest to bar. Keep body straight.",
    baseReps: "3 sets x 10-15", difficulty: 2,
    why: "Back strength without pull-up bar.",
    envs: ["homegym","gym"] },

  { id: "u6", category: "upper", name: "Dumbbell Bench Press",
    description: "On bench or floor, press dumbbells up. Control the descent.",
    baseReps: "3 sets x 10", difficulty: 2,
    why: "Absorbs contact in the post.",
    envs: ["homegym","gym"] },

  { id: "u7", category: "upper", name: "Shoulder Press",
    description: "Standing, press dumbbells from shoulders to overhead.",
    baseReps: "3 sets x 10", difficulty: 2,
    why: "Strong shoulders shoot through fatigue.",
    envs: ["homegym","gym"] },

  { id: "u8", category: "upper", name: "Dumbbell Rows",
    description: "One arm at a time, hinge at hip, pull dumbbell to hip.",
    baseReps: "3 sets x 10 each", difficulty: 2,
    why: "Back width and pulling strength.",
    envs: ["homegym","gym"] },

  { id: "u9", category: "upper", name: "Bench Press",
    description: "Barbell bench press. Feet flat, back flat, control the bar.",
    baseReps: "4 sets x 8", difficulty: 3,
    why: "Heavy pushing strength for contact.",
    envs: ["gym"] },

  { id: "u10", category: "upper", name: "Lat Pulldown",
    description: "Machine. Pull bar to upper chest. Squeeze shoulder blades.",
    baseReps: "3 sets x 12", difficulty: 2,
    why: "Back development if pullups too hard.",
    envs: ["gym"] },

  // LOWER
  { id: "l1", category: "lower", name: "Bodyweight Squats",
    description: "Feet shoulder-width, sit back, chest up, break parallel.",
    baseReps: "3 sets x 20", difficulty: 1,
    why: "Foundation for jumping and defensive stance.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l2", category: "lower", name: "Jump Squats",
    description: "Squat down, explode up as high as possible. Land soft.",
    baseReps: "3 sets x 10", difficulty: 2,
    why: "Vertical jump power.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"], trackPR: "vertical" },

  { id: "l3", category: "lower", name: "Walking Lunges",
    description: "Long step forward, back knee to ground, drive up and through.",
    baseReps: "3 sets x 20 total steps", difficulty: 2,
    why: "Single-leg strength for change of direction.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l4", category: "lower", name: "Reverse Lunges",
    description: "Step backward into lunge. Easier on knees.",
    baseReps: "3 sets x 10 each leg", difficulty: 1,
    why: "Single-leg balance and strength.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l5", category: "lower", name: "Bulgarian Split Squats",
    description: "Back foot elevated on bench/couch. Deep squat on front leg.",
    baseReps: "3 sets x 10 each", difficulty: 3,
    why: "Brutal for quad and glute strength.",
    envs: ["homegym","gym"] },

  { id: "l6", category: "lower", name: "Calf Raises",
    description: "Rise on toes, slow down. Use stair edge for full range.",
    baseReps: "3 sets x 20", difficulty: 1,
    why: "Ankle stability and first-step quickness.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l7", category: "lower", name: "Broad Jumps",
    description: "Jump forward for distance. Stick the landing. Walk back.",
    baseReps: "3 sets x 6", difficulty: 2,
    why: "Horizontal power for drives.",
    envs: ["fullct","halfct","hoop","nohoop"] },

  { id: "l8", category: "lower", name: "Box Jumps",
    description: "Jump onto sturdy box or bench. Stand fully, step down.",
    baseReps: "3 sets x 8", difficulty: 2,
    why: "Vertical jump training.",
    envs: ["homegym","gym"] },

  { id: "l9", category: "lower", name: "Glute Bridges",
    description: "On back, feet flat, drive hips up squeezing glutes.",
    baseReps: "3 sets x 15", difficulty: 1,
    why: "Glute strength for jumping and cutting.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l10", category: "lower", name: "Single-Leg Glute Bridges",
    description: "Same as bridge but one leg extended straight up.",
    baseReps: "3 sets x 10 each", difficulty: 2,
    why: "Single-leg power and hip stability.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l11", category: "lower", name: "Lateral Lunges",
    description: "Step wide to side, sit into that hip, push back to center.",
    baseReps: "3 sets x 10 each", difficulty: 2,
    why: "Lateral quickness for defense.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l12", category: "lower", name: "Wall Sit",
    description: "Back flat on wall, thighs parallel to floor. Hold.",
    baseReps: "3 sets x 45 sec", difficulty: 1,
    why: "Isometric quad endurance.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "l13", category: "lower", name: "Barbell Back Squat",
    description: "Bar on upper back, feet shoulder-width, sit back and down.",
    baseReps: "4 sets x 6-8", difficulty: 3,
    why: "Heavy lower body strength.",
    envs: ["gym"] },

  { id: "l14", category: "lower", name: "Romanian Deadlift",
    description: "Hinge at hips, bar slides down legs, feel stretch in hamstrings.",
    baseReps: "3 sets x 10", difficulty: 3,
    why: "Hamstring and glute strength — jumping posterior chain.",
    envs: ["homegym","gym"] },

  // CORE
  { id: "c1", category: "core", name: "Plank",
    description: "Forearms and toes, straight line head to heels.",
    baseReps: "3 sets x 45 sec", difficulty: 1,
    why: "Core stability transfers to every movement.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"], trackPR: "plankHold" },

  { id: "c2", category: "core", name: "Side Plank",
    description: "On one forearm, body straight sideways. Hold, switch sides.",
    baseReps: "3 sets x 30 sec each", difficulty: 1,
    why: "Obliques for rotational strength.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "c3", category: "core", name: "Russian Twists",
    description: "Seated, lean back, rotate ball/object side to side.",
    baseReps: "3 sets x 30 total", difficulty: 2,
    why: "Rotational strength for passing and shooting.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "c4", category: "core", name: "Dead Bug",
    description: "On back, opposite arm/leg extend. Control the movement.",
    baseReps: "3 sets x 10 each side", difficulty: 1,
    why: "Anti-extension core stability.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "c5", category: "core", name: "Bicycle Crunches",
    description: "Elbow to opposite knee, alternating. Slow and controlled.",
    baseReps: "3 sets x 20 total", difficulty: 1,
    why: "Rotational abs.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "c6", category: "core", name: "Hanging Knee Raises",
    description: "From pull-up bar, raise knees to chest. Control the lower.",
    baseReps: "3 sets x 10", difficulty: 2,
    why: "Lower abs and grip strength.",
    envs: ["homegym","gym"] },

  { id: "c7", category: "core", name: "Mountain Climbers",
    description: "Plank position, drive knees to chest alternating fast.",
    baseReps: "3 sets x 30 sec", difficulty: 2,
    why: "Core plus conditioning combo.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "c8", category: "core", name: "V-Ups",
    description: "Lying flat, simultaneously raise legs and torso to V shape.",
    baseReps: "3 sets x 12", difficulty: 2,
    why: "Full abs recruitment.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  // PLYO (need space)
  { id: "p1", category: "plyo", name: "Depth Jumps",
    description: "Step off box, land, immediately explode into max jump.",
    baseReps: "3 sets x 6", difficulty: 3,
    why: "Teaches fast ground contact for vertical.",
    envs: ["homegym","gym"] },

  { id: "p2", category: "plyo", name: "Lateral Bounds",
    description: "Jump side to side off one leg, stick each landing.",
    baseReps: "3 sets x 10 each side", difficulty: 2,
    why: "Lateral power for cutting.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "p3", category: "plyo", name: "Tuck Jumps",
    description: "Jump up, pull knees to chest. Land, immediate next rep.",
    baseReps: "3 sets x 8", difficulty: 2,
    why: "Explosive hip flexion and core.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "p4", category: "plyo", name: "Skater Jumps",
    description: "Bound laterally side to side like a speed skater.",
    baseReps: "3 sets x 20 total", difficulty: 2,
    why: "Single-leg lateral power.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "p5", category: "plyo", name: "Pogo Jumps",
    description: "Stiff legs, bounce off balls of feet, minimal ground time.",
    baseReps: "3 sets x 30 sec", difficulty: 1,
    why: "Ankle stiffness for faster first step.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  // MOBILITY (anywhere)
  { id: "m1", category: "mobility", name: "Foam Roll Quads",
    description: "Roll front of thighs slowly, pause on tight spots 20 sec.",
    baseReps: "2 min each leg", difficulty: 1,
    why: "Releases tight quads from jumping.",
    envs: ["homegym","gym"] },

  { id: "m2", category: "mobility", name: "Couch Stretch",
    description: "Back foot on couch, front foot forward, drive hip forward.",
    baseReps: "90 sec each side", difficulty: 1,
    why: "Opens hip flexors without equipment.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "m3", category: "mobility", name: "Hip Flexor Stretch",
    description: "Kneeling lunge, squeeze glute, lean forward slightly.",
    baseReps: "2 min each side", difficulty: 1,
    why: "Counters sitting, opens sprint stride.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "m4", category: "mobility", name: "World's Greatest Stretch",
    description: "Lunge, hand down inside foot, rotate top arm up.",
    baseReps: "5 each side", difficulty: 2,
    why: "Opens everything before training.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },

  { id: "m5", category: "mobility", name: "Ankle Mobility",
    description: "Half-kneeling, drive front knee over toes. Heel stays down.",
    baseReps: "10 each side", difficulty: 1,
    why: "Ankle mobility equals better squat depth and agility.",
    envs: ["fullct","halfct","hoop","nohoop","homegym","gym"] },
];

// WEEKLY TEMPLATE - same as before; workout generator now filters drills by env
const WEEKLY_TEMPLATE = {
  monday: {
    name: "Monday", type: "training",
    title: "Heavy Legs + Light Handling", duration: 55,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Lower Body Strength", category: "lower", count: 3 },
      { label: "Plyometrics", category: "plyo", count: 1 },
      { label: "Ball Handling", category: "ball-handling", count: 2 },
      { label: "Core", category: "core", count: 2 },
    ],
  },
  tuesday: {
    name: "Tuesday", type: "training",
    title: "Shooting + Upper Body", duration: 55,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Shooting", category: "shooting", count: 3 },
      { label: "Finishing", category: "finishing", count: 1 },
      { label: "Upper Body Strength", category: "upper", count: 3 },
      { label: "Core", category: "core", count: 1 },
    ],
  },
  wednesday: {
    name: "Wednesday", type: "recovery",
    title: "Active Recovery", duration: 25,
    blocks: [
      { label: "Mobility Flow", category: "mobility", count: 3 },
      { label: "Easy Ball Handling", category: "ball-handling", count: 2 },
      { label: "Core", category: "core", count: 1 },
    ],
  },
  thursday: {
    name: "Thursday", type: "training",
    title: "Full Body + Skills", duration: 60,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Ball Handling", category: "ball-handling", count: 2 },
      { label: "Footwork", category: "footwork", count: 2 },
      { label: "Shooting", category: "shooting", count: 2 },
      { label: "Defense", category: "defense", count: 1 },
      { label: "Upper Body", category: "upper", count: 2 },
      { label: "Lower Body", category: "lower", count: 1 },
    ],
  },
  friday: {
    name: "Friday", type: "pregame",
    title: "Pre-Game Sharpener", duration: 30,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Shooting Tune-Up", category: "shooting", count: 2 },
      { label: "Light Handling", category: "ball-handling", count: 1 },
      { label: "Mobility", category: "mobility", count: 1 },
    ],
  },
  saturday: {
    name: "Saturday", type: "gameday",
    title: "Game Day", duration: 0,
    blocks: [],
  },
  sunday: {
    name: "Sunday", type: "gameday",
    title: "Game Day", duration: 0,
    blocks: [],
  },
};

const PREGAME_WARMUP = [
  { name: "Dynamic Stretching", description: "Leg swings, arm circles, high knees, butt kicks (5 min)." },
  { name: "Form Shooting", description: "Start close, work out. 3 makes each spot." },
  { name: "Ball-handling activation", description: "Pound dribbles and crossovers 1 min each hand." },
  { name: "Layup lines", description: "Right side, left side, 5 makes each." },
  { name: "Spot shooting", description: "5 makes each from 3 spots around arc." },
  { name: "Free throws", description: "10 to settle in. Same routine." },
];

const POSTGAME_RECOVERY = [
  "Water — minimum 32 oz in next hour",
  "Protein within 45 min (shake, meal, anything)",
  "Light stretching — 5 min minimum",
  "Review one thing you did well",
  "Identify one thing to work on",
  "8+ hours sleep tonight",
];

const BADGES = [
  { id: "streak3",   icon: "🔥", name: "3 Day Streak",   description: "3 in a row", condition: { type: "streak", value: 3 } },
  { id: "streak7",   icon: "🔥", name: "Week Warrior",   description: "7 in a row", condition: { type: "streak", value: 7 } },
  { id: "streak14",  icon: "⚡", name: "Two Weeks",      description: "14 in a row", condition: { type: "streak", value: 14 } },
  { id: "streak30",  icon: "💎", name: "Iron Month",     description: "30 in a row", condition: { type: "streak", value: 30 } },
  { id: "streak60",  icon: "👑", name: "Dedicated",      description: "60 in a row", condition: { type: "streak", value: 60 } },
  { id: "streak100", icon: "🏆", name: "Centurion",      description: "100 in a row", condition: { type: "streak", value: 100 } },
  { id: "work10",    icon: "💪", name: "Getting Started",description: "10 workouts", condition: { type: "workouts", value: 10 } },
  { id: "work25",    icon: "💪", name: "Quarter Century",description: "25 workouts", condition: { type: "workouts", value: 25 } },
  { id: "work50",    icon: "💪", name: "Half Hundred",   description: "50 workouts", condition: { type: "workouts", value: 50 } },
  { id: "work100",   icon: "💯", name: "Century Club",   description: "100 workouts", condition: { type: "workouts", value: 100 } },
  { id: "ft100",     icon: "🎯", name: "Bunny Maker",    description: "100 FTs made", condition: { type: "ftMade", value: 100 } },
  { id: "ft500",     icon: "🎯", name: "FT Machine",     description: "500 FTs made", condition: { type: "ftMade", value: 500 } },
  { id: "ft1000",    icon: "🎯", name: "Free Points",    description: "1000 FTs made", condition: { type: "ftMade", value: 1000 } },
  { id: "ft80pct",   icon: "🎯", name: "80% Shooter",    description: "80% FT in a session", condition: { type: "ftPct", value: 80 } },
  { id: "push100",   icon: "💪", name: "Push Master",    description: "100 pushups total", condition: { type: "pushupsTotal", value: 100 } },
  { id: "push500",   icon: "💪", name: "Push Army",      description: "500 pushups total", condition: { type: "pushupsTotal", value: 500 } },
  { id: "pull5",     icon: "🔥", name: "First 5 Pullups",description: "5 in one set", condition: { type: "pullupPR", value: 5 } },
  { id: "pull10",    icon: "🔥", name: "10 Pullup Club", description: "10 in one set", condition: { type: "pullupPR", value: 10 } },
  { id: "game1",     icon: "🏀", name: "First Game",     description: "Logged first game", condition: { type: "gamesPlayed", value: 1 } },
  { id: "game10",    icon: "🏀", name: "Ten Games Deep", description: "10 games logged", condition: { type: "gamesPlayed", value: 10 } },
  { id: "sleep7",    icon: "💤", name: "Sleep Pro",      description: "7 days 8+ hours", condition: { type: "sleepStreak", value: 7 } },
  { id: "checkin10", icon: "📋", name: "Self-Aware",     description: "10 check-ins", condition: { type: "checkins", value: 10 } },
  { id: "checkin30", icon: "📋", name: "Locked In",      description: "30 check-ins", condition: { type: "checkins", value: 30 } },
];

// Expose globally so main app can read
window.HOOPERS_DATA = {
  ENVIRONMENTS,
  BASKETBALL_DRILLS,
  STRENGTH_DRILLS,
  WEEKLY_TEMPLATE,
  PREGAME_WARMUP,
  POSTGAME_RECOVERY,
  BADGES,
};
