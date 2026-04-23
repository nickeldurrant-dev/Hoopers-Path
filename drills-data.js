// Drill library - basketball skill drills and strength drills
// Videos are curated YouTube embeds from reputable coaches/trainers
// Edit this file to add/update drills

const BASKETBALL_DRILLS = [
  // BALL HANDLING
  { id: "bh1", category: "ball-handling", name: "Pound Dribble", description: "Hard pound dribble, ball below knee. Stay low, keep eyes up.", baseReps: "2 sets x 30 sec each hand", difficulty: 1, why: "Builds hand strength and control for tight-space dribbling.", video: "https://www.youtube.com/embed/6N6y9xq6ecs" },
  { id: "bh2", category: "ball-handling", name: "Crossover Dribble", description: "Low crossovers side to side. Keep ball below waist.", baseReps: "3 sets x 20 crosses", difficulty: 1, why: "Foundation for breaking down defenders off the dribble.", video: "https://www.youtube.com/embed/QbNKYTRZ2FI" },
  { id: "bh3", category: "ball-handling", name: "Figure 8 Dribble", description: "Dribble between legs in figure 8 pattern, stay low.", baseReps: "3 sets x 30 sec", difficulty: 2, why: "Improves hand coordination and ball feel.", video: "https://www.youtube.com/embed/rkEPmhUTAlo" },
  { id: "bh4", category: "ball-handling", name: "Two-Ball Dribble", description: "Dribble two balls simultaneously - same height, then alternating.", baseReps: "3 sets x 45 sec", difficulty: 3, why: "Develops weak-hand equality and peripheral awareness.", video: "https://www.youtube.com/embed/b1nZLeO4Fbs" },
  { id: "bh5", category: "ball-handling", name: "Spider Dribble", description: "Alternate dribbles front and back of legs rapidly.", baseReps: "3 sets x 20 sec", difficulty: 2, why: "Quick hands and fingertip control.", video: "https://www.youtube.com/embed/kmQuZ-0OGLE" },
  { id: "bh6", category: "ball-handling", name: "In-and-Out Dribble", description: "Fake crossover with hand on top of ball, keep ball in same hand.", baseReps: "3 sets x 15 each hand", difficulty: 2, why: "Essential move to freeze defenders.", video: "https://www.youtube.com/embed/vFwOqKrAVEY" },
  { id: "bh7", category: "ball-handling", name: "Behind-the-Back Dribble", description: "Continuous behind-the-back dribbles while walking forward.", baseReps: "3 sets x 10 switches", difficulty: 2, why: "Escape move under pressure.", video: "https://www.youtube.com/embed/O8Si03VgJ-A" },
  { id: "bh8", category: "ball-handling", name: "Cone Weave Dribble", description: "Set 5 cones, weave through with crossover at each cone.", baseReps: "4 trips", difficulty: 2, why: "Combines handling with change of direction.", video: "https://www.youtube.com/embed/qyUzeAspD18" },

  // SHOOTING
  { id: "sh1", category: "shooting", name: "Form Shooting", description: "Start 3 ft from basket. One-handed shots focusing on arc and follow-through.", baseReps: "25 makes each side", difficulty: 1, why: "Grooves proper shooting mechanics.", video: "https://www.youtube.com/embed/aKz9mW5oo5w" },
  { id: "sh2", category: "shooting", name: "Free Throws", description: "Same routine every shot. Track makes out of attempts.", baseReps: "50 attempts, log makes", difficulty: 1, why: "Free points in games. Every missed FT is a mistake.", video: "https://www.youtube.com/embed/eYjEbaYV49E", trackPR: "freeThrowPct" },
  { id: "sh3", category: "shooting", name: "Mikan Drill", description: "Right-hand layup, catch with left, left-hand layup, continuous.", baseReps: "30 makes", difficulty: 1, why: "Finishing touch with both hands around the rim.", video: "https://www.youtube.com/embed/UKJgCHZKr0Q" },
  { id: "sh4", category: "shooting", name: "Spot Shooting", description: "5 spots around arc. Make 5 in a row before moving to next spot.", baseReps: "All 5 spots", difficulty: 2, why: "Builds consistency from game spots.", video: "https://www.youtube.com/embed/HSu_C9B1ImM" },
  { id: "sh5", category: "shooting", name: "Catch and Shoot", description: "Partner passes or self-toss. Square up on catch, shoot in rhythm.", baseReps: "3 sets x 10 makes", difficulty: 2, why: "Most common shot in real games.", video: "https://www.youtube.com/embed/BfH8XKBzmvw" },
  { id: "sh6", category: "shooting", name: "Pull-Up Jumper", description: "Dribble into pull-up from mid-range. Plant hard and rise.", baseReps: "3 sets x 10 makes each side", difficulty: 3, why: "Creates your own shot when defense closes out.", video: "https://www.youtube.com/embed/JxFyJpm4PzE" },
  { id: "sh7", category: "shooting", name: "3-Point Routine", description: "3 spots beyond arc (corner, wing, top). 10 shots each spot, track makes.", baseReps: "30 attempts, log makes", difficulty: 3, why: "Range extension for modern game.", video: "https://www.youtube.com/embed/mgP87TAx5Fk", trackPR: "threePtPct" },
  { id: "sh8", category: "shooting", name: "Beat the Pro", description: "You get 1pt per make, pro gets 3pts per miss. Race to 21.", baseReps: "1 game to 21", difficulty: 2, why: "Pressure shooting simulation.", video: "https://www.youtube.com/embed/dExAKYXUEHQ" },

  // FINISHING
  { id: "fin1", category: "finishing", name: "Euro Step", description: "Drive baseline, fake one direction, step through the other.", baseReps: "3 sets x 10 each side", difficulty: 2, why: "Essential counter for aggressive help defense.", video: "https://www.youtube.com/embed/H4B9PzXtg1U" },
  { id: "fin2", category: "finishing", name: "Reverse Layup", description: "Attack middle, finish on far side of rim using backboard.", baseReps: "3 sets x 10 each side", difficulty: 2, why: "Uses rim as protection from shot blockers.", video: "https://www.youtube.com/embed/wRM5Ovof0Nk" },
  { id: "fin3", category: "finishing", name: "Floater", description: "Short one-foot jumper from 6-10 ft over taller defender.", baseReps: "3 sets x 10 each side", difficulty: 3, why: "Key weapon against shot blockers.", video: "https://www.youtube.com/embed/OSRjbvpMENk" },
  { id: "fin4", category: "finishing", name: "Up and Under", description: "Pump fake, step through, finish with opposite hand.", baseReps: "3 sets x 8 each side", difficulty: 2, why: "Creates space when defender jumps.", video: "https://www.youtube.com/embed/RBYnBOyKwqc" },
  { id: "fin5", category: "finishing", name: "1-2 Step Layup", description: "Controlled 2-step approach, strong push off inside foot.", baseReps: "3 sets x 10 each side", difficulty: 1, why: "Foundation of every layup.", video: "https://www.youtube.com/embed/UKJgCHZKr0Q" },

  // FOOTWORK
  { id: "ft1", category: "footwork", name: "Jump Stop + Pivot", description: "Sprint, jump stop, pivot 180 both feet. Balance is everything.", baseReps: "3 sets x 10", difficulty: 1, why: "Control and balance in triple threat.", video: "https://www.youtube.com/embed/KFyPdfbPf4E" },
  { id: "ft2", category: "footwork", name: "Triple Threat Attack", description: "From triple threat: rip and drive each direction.", baseReps: "3 sets x 10 each side", difficulty: 2, why: "First step quickness off catch.", video: "https://www.youtube.com/embed/v_UdVn4yzmA" },
  { id: "ft3", category: "footwork", name: "Jab Step Series", description: "Jab step, jab-and-go, jab-and-shoot. Mix the sequence.", baseReps: "3 sets x 8 each move", difficulty: 2, why: "Moves defender before you even dribble.", video: "https://www.youtube.com/embed/VkHqULYuXrM" },
  { id: "ft4", category: "footwork", name: "Closeout Stance", description: "Sprint to shooter, break down into low stance with high hands.", baseReps: "3 sets x 10", difficulty: 1, why: "Contest without fouling or getting blown by.", video: "https://www.youtube.com/embed/BJ1C2hG0lJ4" },

  // DEFENSE
  { id: "df1", category: "defense", name: "Defensive Slides", description: "Low stance, slide side to side touching cones 8 ft apart.", baseReps: "3 sets x 30 sec", difficulty: 1, why: "Lateral quickness to stay in front.", video: "https://www.youtube.com/embed/xQL3J0Djbig" },
  { id: "df2", category: "defense", name: "Zig-Zag Defense", description: "Slide diagonally court-length, drop step at each change of direction.", baseReps: "3 trips", difficulty: 2, why: "Game-speed lateral movement.", video: "https://www.youtube.com/embed/lhnOdmOR3OE" },
  { id: "df3", category: "defense", name: "Close-Out Drill", description: "Start under rim, sprint to 3pt line, break down, high hand contest.", baseReps: "3 sets x 8", difficulty: 2, why: "Most common defensive action.", video: "https://www.youtube.com/embed/BJ1C2hG0lJ4" },
  { id: "df4", category: "defense", name: "Box Out Drill", description: "Partner drill: make contact, hold position, secure rebound.", baseReps: "3 sets x 10", difficulty: 2, why: "Rebounding is effort and technique.", video: "https://www.youtube.com/embed/8LHF7hHWPxQ" },

  // CONDITIONING
  { id: "cd1", category: "conditioning", name: "Suicides", description: "Sprint to FT line, back. Half court, back. Far FT, back. Baseline, back.", baseReps: "4 reps, 45 sec rest", difficulty: 2, why: "Game-shape conditioning.", video: "https://www.youtube.com/embed/H9mFRSDoRog", trackPR: "suicideTime" },
  { id: "cd2", category: "conditioning", name: "17s", description: "Sideline to sideline, 17 trips in 60 sec.", baseReps: "3 rounds, 60 sec rest", difficulty: 3, why: "Lateral conditioning for defense.", video: "https://www.youtube.com/embed/E5B0CKOqnM4" },
  { id: "cd3", category: "conditioning", name: "Mile Run", description: "1 mile as fast as possible. Track time.", baseReps: "1 mile", difficulty: 2, why: "Aerobic base for 4-quarter games.", video: "https://www.youtube.com/embed/_kGESn8ArrU", trackPR: "mileTime" },
  { id: "cd4", category: "conditioning", name: "Full Court Layup Finisher", description: "Sprint full court, layup, sprint back, layup. Continuous.", baseReps: "10 makes", difficulty: 2, why: "Conditioning + finishing while tired.", video: "https://www.youtube.com/embed/Rnre_0xdkKY" },

  // WARM-UP (used on game days)
  { id: "wu1", category: "warmup", name: "Dynamic Stretching", description: "Leg swings, arm circles, high knees, butt kicks, walking lunges.", baseReps: "5 min flow", difficulty: 1, why: "Activates muscles for game performance.", video: "https://www.youtube.com/embed/nPHfEnZD1Wk" },
  { id: "wu2", category: "warmup", name: "Form Shooting Warmup", description: "Start close, work out. 3 makes each spot before moving back.", baseReps: "5-10 min", difficulty: 1, why: "Calibrates shooting touch.", video: "https://www.youtube.com/embed/aKz9mW5oo5w" },
  { id: "wu3", category: "warmup", name: "Activation Series", description: "20 bodyweight squats, 10 push-ups, 10 jumping jacks, 5 vertical jumps.", baseReps: "2 rounds", difficulty: 1, why: "Gets CNS firing before tip-off.", video: "https://www.youtube.com/embed/R0mMK8ZkZDI" },
];

const STRENGTH_DRILLS = [
  // UPPER BODY
  { id: "u1", category: "upper", name: "Push-Ups", description: "Chest to ground, full lockout. Strict form.", baseReps: "3 sets x max reps", difficulty: 1, why: "Chest, shoulders, triceps - pushing strength.", video: "https://www.youtube.com/embed/IODxDxX7oi4", trackPR: "maxPushups" },
  { id: "u2", category: "upper", name: "Pull-Ups", description: "Full hang to chin over bar. Dead hang assisted if needed.", baseReps: "3 sets x max reps", difficulty: 3, why: "Back and biceps - critical for rebounding.", video: "https://www.youtube.com/embed/eGo4IYlbE5g", trackPR: "maxPullups" },
  { id: "u3", category: "upper", name: "Pike Push-Ups", description: "Hips high, push up pressing head toward ground. Shoulder focus.", baseReps: "3 sets x 8-12", difficulty: 2, why: "Builds overhead pressing strength.", video: "https://www.youtube.com/embed/x7_2yFxBDFM" },
  { id: "u4", category: "upper", name: "Diamond Push-Ups", description: "Hands together forming diamond. Elbows stay tight.", baseReps: "3 sets x max", difficulty: 2, why: "Tricep emphasis for shooting arm strength.", video: "https://www.youtube.com/embed/zTkBTWZpUVE" },
  { id: "u5", category: "upper", name: "Inverted Rows", description: "Under bar or table edge, pull chest to bar. Keep body straight.", baseReps: "3 sets x 10-15", difficulty: 2, why: "Back strength without pull-up bar.", video: "https://www.youtube.com/embed/hXTc1mDnZCw" },
  { id: "u6", category: "upper", name: "Dumbbell Bench Press", description: "Lying on bench or floor, press dumbbells up. Control the descent.", baseReps: "3 sets x 10", difficulty: 2, why: "Absorbs contact in the post.", video: "https://www.youtube.com/embed/VmB1G1K7v94" },
  { id: "u7", category: "upper", name: "Dumbbell Shoulder Press", description: "Seated or standing, press dumbbells overhead.", baseReps: "3 sets x 10", difficulty: 2, why: "Strong shoulders absorb contact and shoot through fatigue.", video: "https://www.youtube.com/embed/qEwKCR5JCog" },
  { id: "u8", category: "upper", name: "Dumbbell Rows", description: "One arm at a time, hinge at hip, pull dumbbell to hip.", baseReps: "3 sets x 10 each", difficulty: 2, why: "Back width and pulling strength.", video: "https://www.youtube.com/embed/roCP6wCXPqo" },

  // LOWER BODY
  { id: "l1", category: "lower", name: "Bodyweight Squats", description: "Feet shoulder width, sit back, chest up, break parallel.", baseReps: "3 sets x 20", difficulty: 1, why: "Foundation for jumping and defensive stance.", video: "https://www.youtube.com/embed/aclHkVaku9U" },
  { id: "l2", category: "lower", name: "Jump Squats", description: "Squat down, explode up as high as possible. Land soft.", baseReps: "3 sets x 10", difficulty: 2, why: "Vertical jump power.", video: "https://www.youtube.com/embed/CVaEhXotL7M", trackPR: "vertical" },
  { id: "l3", category: "lower", name: "Walking Lunges", description: "Long step forward, back knee to ground, drive up and through.", baseReps: "3 sets x 20 total steps", difficulty: 2, why: "Single-leg strength for change of direction.", video: "https://www.youtube.com/embed/L8fvypPrzzs" },
  { id: "l4", category: "lower", name: "Reverse Lunges", description: "Step backward into lunge. Easier on knees.", baseReps: "3 sets x 10 each leg", difficulty: 1, why: "Single-leg balance and strength.", video: "https://www.youtube.com/embed/xrPteyQLGAo" },
  { id: "l5", category: "lower", name: "Bulgarian Split Squats", description: "Back foot elevated on bench/couch. Deep squat on front leg.", baseReps: "3 sets x 10 each", difficulty: 3, why: "Brutal for quad and glute strength.", video: "https://www.youtube.com/embed/2C-uNgKwPLE" },
  { id: "l6", category: "lower", name: "Calf Raises", description: "Rise on toes, slow down. Do on edge of stair for full range.", baseReps: "3 sets x 20", difficulty: 1, why: "Ankle stability and first-step quickness.", video: "https://www.youtube.com/embed/gwLzBJYoWlI" },
  { id: "l7", category: "lower", name: "Broad Jumps", description: "Jump forward for distance. Stick the landing. Walk back.", baseReps: "3 sets x 6", difficulty: 2, why: "Horizontal power for drives.", video: "https://www.youtube.com/embed/OWu5FgsT9RY" },
  { id: "l8", category: "lower", name: "Box Jumps", description: "Jump onto sturdy box or bench. Stand fully, step down.", baseReps: "3 sets x 8", difficulty: 2, why: "Vertical jump training.", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
  { id: "l9", category: "lower", name: "Glute Bridges", description: "On back, feet flat, drive hips up squeezing glutes.", baseReps: "3 sets x 15", difficulty: 1, why: "Glute strength for jumping and cutting.", video: "https://www.youtube.com/embed/wPM8icPu6H8" },
  { id: "l10", category: "lower", name: "Single-Leg Glute Bridges", description: "Same as bridge but one leg extended straight.", baseReps: "3 sets x 10 each", difficulty: 2, why: "Single-leg power and hip stability.", video: "https://www.youtube.com/embed/lG31u-evvCQ" },
  { id: "l11", category: "lower", name: "Lateral Lunges", description: "Step wide to side, sit into that hip, push back to center.", baseReps: "3 sets x 10 each", difficulty: 2, why: "Lateral quickness for defense.", video: "https://www.youtube.com/embed/GZbfZ033f74" },
  { id: "l12", category: "lower", name: "Wall Sit", description: "Back flat on wall, thighs parallel to floor. Hold.", baseReps: "3 sets x 45 sec", difficulty: 1, why: "Isometric quad endurance.", video: "https://www.youtube.com/embed/-cdph8hv0O0" },

  // CORE
  { id: "c1", category: "core", name: "Plank", description: "Forearms and toes, straight line. No sagging or piking.", baseReps: "3 sets x 45 sec", difficulty: 1, why: "Core stability transfers to every movement.", video: "https://www.youtube.com/embed/ASdvN_XEl_c", trackPR: "plankHold" },
  { id: "c2", category: "core", name: "Side Plank", description: "On one forearm, body straight sideways. Hold, switch sides.", baseReps: "3 sets x 30 sec each", difficulty: 1, why: "Obliques for rotational strength.", video: "https://www.youtube.com/embed/wqzrb67Dwf8" },
  { id: "c3", category: "core", name: "Russian Twists", description: "Seated, lean back, rotate ball/object side to side. Feet up if possible.", baseReps: "3 sets x 30 total", difficulty: 2, why: "Rotational strength for passing and shooting.", video: "https://www.youtube.com/embed/wkD8rjkodUI" },
  { id: "c4", category: "core", name: "Dead Bug", description: "On back, opposite arm/leg extend. Control the movement.", baseReps: "3 sets x 10 each side", difficulty: 1, why: "Anti-extension core stability.", video: "https://www.youtube.com/embed/g_BYB0R-4Ws" },
  { id: "c5", category: "core", name: "Bicycle Crunches", description: "Elbow to opposite knee, alternating. Slow and controlled.", baseReps: "3 sets x 20 total", difficulty: 1, why: "Rotational abs.", video: "https://www.youtube.com/embed/9FGilxCbdz8" },
  { id: "c6", category: "core", name: "Hanging Knee Raises", description: "From pull-up bar, raise knees to chest. Control the lower.", baseReps: "3 sets x 10", difficulty: 2, why: "Lower abs and grip strength.", video: "https://www.youtube.com/embed/Pr1ieGZ5atk" },
  { id: "c7", category: "core", name: "Mountain Climbers", description: "Plank position, drive knees to chest alternating fast.", baseReps: "3 sets x 30 sec", difficulty: 2, why: "Core + conditioning combo.", video: "https://www.youtube.com/embed/nmwgirgXLYM" },

  // PLYOMETRICS / EXPLOSIVE
  { id: "p1", category: "plyo", name: "Depth Jumps", description: "Step off box, land, immediately explode into max jump.", baseReps: "3 sets x 6", difficulty: 3, why: "Teaches fast ground contact for vertical.", video: "https://www.youtube.com/embed/TVJegCWSrOo" },
  { id: "p2", category: "plyo", name: "Lateral Bounds", description: "Jump side to side off one leg, stick each landing.", baseReps: "3 sets x 10 each side", difficulty: 2, why: "Lateral power for cutting.", video: "https://www.youtube.com/embed/BIn9GokpUBo" },
  { id: "p3", category: "plyo", name: "Tuck Jumps", description: "Jump up, pull knees to chest. Land, immediate next rep.", baseReps: "3 sets x 8", difficulty: 2, why: "Explosive hip flexion and core.", video: "https://www.youtube.com/embed/KKGVoF3I4oU" },
  { id: "p4", category: "plyo", name: "Skater Jumps", description: "Bound laterally side to side like a speed skater.", baseReps: "3 sets x 20 total", difficulty: 2, why: "Single-leg lateral power.", why2: "", video: "https://www.youtube.com/embed/xHgvJMhhaFg" },
  { id: "p5", category: "plyo", name: "Pogo Jumps", description: "Stiff legs, bounce off balls of feet repeatedly, minimal ground time.", baseReps: "3 sets x 30 sec", difficulty: 1, why: "Ankle stiffness for faster first step.", video: "https://www.youtube.com/embed/FMeQYl7yAPU" },

  // MOBILITY / RECOVERY
  { id: "m1", category: "mobility", name: "Foam Roll Quads", description: "Roll front of thighs slowly, pause on tight spots 20 sec.", baseReps: "2 min each leg", difficulty: 1, why: "Releases tight quads from jumping.", video: "https://www.youtube.com/embed/FC_mgYVaP7o" },
  { id: "m2", category: "mobility", name: "Foam Roll IT Band", description: "Side-lying, roll outside of thigh from hip to knee.", baseReps: "2 min each side", difficulty: 1, why: "Prevents knee pain from tight IT band.", video: "https://www.youtube.com/embed/YuBeN0MTWOs" },
  { id: "m3", category: "mobility", name: "Hip Flexor Stretch", description: "Kneeling lunge, squeeze glute, lean forward slightly.", baseReps: "2 min each side", difficulty: 1, why: "Counters sitting and opens up sprint stride.", video: "https://www.youtube.com/embed/UGEpQ1BRx-4" },
  { id: "m4", category: "mobility", name: "World's Greatest Stretch", description: "Lunge, hand down inside foot, rotate up. Full-body mobility.", baseReps: "5 each side", difficulty: 2, why: "Opens everything before training.", video: "https://www.youtube.com/embed/cv_6yZJ23Vw" },
  { id: "m5", category: "mobility", name: "Ankle Mobility", description: "Half-kneeling, drive front knee over toes. Heel stays down.", baseReps: "10 each side", difficulty: 1, why: "Ankle mobility = better squat depth and agility.", video: "https://www.youtube.com/embed/EtiDLUj3ltw" },
];

// Weekly template - Mon through Sun
// Each day specifies drill categories and counts
const WEEKLY_TEMPLATE = {
  monday: {
    name: "Monday",
    type: "training",
    title: "Heavy Legs + Light Handling",
    duration: 55,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Lower Body Strength", category: "lower", count: 3 },
      { label: "Plyometrics", category: "plyo", count: 1 },
      { label: "Ball Handling", category: "ball-handling", count: 2 },
      { label: "Core", category: "core", count: 2 },
    ],
  },
  tuesday: {
    name: "Tuesday",
    type: "training",
    title: "Shooting + Upper Body",
    duration: 55,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Shooting", category: "shooting", count: 3 },
      { label: "Finishing", category: "finishing", count: 1 },
      { label: "Upper Body Strength", category: "upper", count: 3 },
      { label: "Core", category: "core", count: 1 },
    ],
  },
  wednesday: {
    name: "Wednesday",
    type: "recovery",
    title: "Active Recovery",
    duration: 25,
    blocks: [
      { label: "Mobility", category: "mobility", count: 3 },
      { label: "Light Shooting", category: "shooting", count: 1, filter: "sh1" },
      { label: "Core", category: "core", count: 2 },
    ],
  },
  thursday: {
    name: "Thursday",
    type: "training",
    title: "Full Body + Skills",
    duration: 60,
    blocks: [
      { label: "Warm-up", category: "warmup", count: 1, mandatory: true },
      { label: "Ball Handling", category: "ball-handling", count: 2 },
      { label: "Footwork", category: "footwork", count: 2 },
      { label: "Full Body Strength", category: "lower", count: 1 },
      { label: "Upper Body Strength", category: "upper", count: 2 },
      { label: "Conditioning", category: "conditioning", count: 1 },
    ],
  },
  friday: {
    name: "Friday",
    type: "pregame",
    title: "Pre-Game Prep",
    duration: 20,
    blocks: [
      { label: "Mobility", category: "mobility", count: 2 },
      { label: "Form Shooting", category: "shooting", count: 2, filter: "sh1,sh3" },
      { label: "Light Footwork", category: "footwork", count: 1 },
    ],
  },
  saturday: {
    name: "Saturday",
    type: "gameday",
    title: "Game Day",
    duration: 0,
    blocks: [],
  },
  sunday: {
    name: "Sunday",
    type: "gameday",
    title: "Game Day",
    duration: 0,
    blocks: [],
  },
};

const PREGAME_WARMUP = [
  { name: "Dynamic Stretching", description: "Leg swings, arm circles, high knees, walking lunges. 5 min." },
  { name: "Jog and Slides", description: "Light jog 2 min, defensive slides both directions 1 min each." },
  { name: "Form Shooting", description: "Start close, work out. 3 makes each spot before moving back." },
  { name: "Layup Lines", description: "Both sides. 5 makes each hand." },
  { name: "Spot Shooting", description: "3 shots each: both corners, both wings, top of key." },
  { name: "Free Throws", description: "10 free throws. Focus on routine, not results." },
  { name: "Visualization", description: "Close eyes 60 sec. See yourself making plays, defending, staying composed." },
];

const POSTGAME_RECOVERY = [
  "Hydrate: 20+ oz water within 30 min",
  "Protein + carbs within 1 hour (shake, sandwich, or meal)",
  "Static stretching: quads, hamstrings, hips, calves - 30 sec each",
  "Foam roll sore areas for 5-10 min",
  "Ice any tweaks for 15 min",
  "Sleep 8+ hours tonight",
  "Log your stats while the game is fresh",
];

// BADGES - unlocked based on progress
const BADGES = [
  // Streak badges
  { id: "streak3", name: "Getting Started", description: "3 day streak", icon: "🔥", condition: { type: "streak", value: 3 } },
  { id: "streak7", name: "Week Warrior", description: "7 day streak", icon: "⚡", condition: { type: "streak", value: 7 } },
  { id: "streak14", name: "Two Week Grind", description: "14 day streak", icon: "💪", condition: { type: "streak", value: 14 } },
  { id: "streak30", name: "Month of Mastery", description: "30 day streak", icon: "🏆", condition: { type: "streak", value: 30 } },
  { id: "streak60", name: "Relentless", description: "60 day streak", icon: "👑", condition: { type: "streak", value: 60 } },
  { id: "streak100", name: "Triple Digits", description: "100 day streak", icon: "💎", condition: { type: "streak", value: 100 } },

  // Workout count
  { id: "work10", name: "First 10", description: "10 workouts completed", icon: "🎯", condition: { type: "workouts", value: 10 } },
  { id: "work25", name: "Dedicated", description: "25 workouts completed", icon: "🎖️", condition: { type: "workouts", value: 25 } },
  { id: "work50", name: "Half a Hundred", description: "50 workouts completed", icon: "🥇", condition: { type: "workouts", value: 50 } },
  { id: "work100", name: "Century Club", description: "100 workouts completed", icon: "🏅", condition: { type: "workouts", value: 100 } },

  // Free throw milestones
  { id: "ft100", name: "Charity Stripe", description: "100 free throws made", icon: "🎯", condition: { type: "ftMade", value: 100 } },
  { id: "ft500", name: "Free Throw Pro", description: "500 free throws made", icon: "🏀", condition: { type: "ftMade", value: 500 } },
  { id: "ft80pct", name: "80% Club", description: "80%+ FT in a session (min 20 att)", icon: "🎪", condition: { type: "ftPct", value: 80 } },

  // Pushup milestones
  { id: "pu500", name: "Push Through", description: "500 pushups total", icon: "💪", condition: { type: "pushupsTotal", value: 500 } },
  { id: "pu2000", name: "Push Master", description: "2,000 pushups total", icon: "🦾", condition: { type: "pushupsTotal", value: 2000 } },

  // Pullup milestones
  { id: "pullup1", name: "First Pull-Up", description: "Complete your first pull-up", icon: "⭐", condition: { type: "pullupPR", value: 1 } },
  { id: "pullup5", name: "High Five", description: "5 pull-ups in a set", icon: "🌟", condition: { type: "pullupPR", value: 5 } },
  { id: "pullup10", name: "Pull-Up Beast", description: "10 pull-ups in a set", icon: "💫", condition: { type: "pullupPR", value: 10 } },

  // Games
  { id: "game1", name: "First Game", description: "Log your first game", icon: "🎮", condition: { type: "gamesPlayed", value: 1 } },
  { id: "game10", name: "Double Digits", description: "10 games logged", icon: "🎲", condition: { type: "gamesPlayed", value: 10 } },
  { id: "game25", name: "Season Player", description: "25 games logged", icon: "🎰", condition: { type: "gamesPlayed", value: 25 } },

  // Recovery
  { id: "sleep7", name: "Well Rested", description: "7 nights of 8+ hours sleep", icon: "😴", condition: { type: "sleepStreak", value: 7 } },
  { id: "checkin14", name: "Self-Aware", description: "14 morning check-ins", icon: "🧠", condition: { type: "checkins", value: 14 } },
];

window.HOOPERS_DATA = {
  BASKETBALL_DRILLS,
  STRENGTH_DRILLS,
  WEEKLY_TEMPLATE,
  PREGAME_WARMUP,
  POSTGAME_RECOVERY,
  BADGES,
};
