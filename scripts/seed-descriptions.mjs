// Seed platform descriptions for all WPL cards
// Run: node scripts/seed-descriptions.mjs
//
// Platform strategy applied:
//
// INSTAGRAM — 150-300 char hook + body, pain-point first, one specific CTA,
//             3-5 hashtags, optimized for Saves (educational) and Shares (relatable)
//
// TIKTOK — 50-150 chars, keyword-rich for algorithm categorization,
//           no #FYP, 3-5 niche hashtags, community-resonant hook
//
// YOUTUBE — Title under 60 chars, keywords front-loaded, description opens
//           with searchable terms, 3-5 hashtags in description not title
//
// REDDIT — First-person story, NO direct promo CTA, genuine peer tone,
//          ends with a question for comment velocity, 400-900 chars

const descriptions = {
  1: {
    // Dementia — meal refusal, finger foods, neurological not behavioral
    rdTitle: `Stopped fighting meal times with my mom — switching to finger foods through the day changed everything`,
    rdSub: `dementia`,
    ig: `If your loved one with dementia keeps refusing meals — this is why.

Dementia neurologically disrupts hunger cues and food recognition. They're not being difficult. Their brain genuinely can't signal hunger or identify a full plate as food.

What works: ditch three full meals. Offer 5–6 small finger foods throughout the day — banana slices, soft turkey pieces, cheese cubes, scrambled eggs. Less pressure. More eaten. Mealtime stops being a battle.

Save this if you're in the middle of this right now. Book a free call at wellpreppedlife.com

#DementiaCaregiver #AgingParents #CaregiverLife #SeniorNutrition #BayAreaCare`,

    tt: `Dementia disrupts how the brain recognizes food — it's neurological, not behavioral. Small finger foods 5–6x a day > 3 full meals. Less stress, more eaten. #DementiaCare #CaregiverLife #AgingParents`,

    ytTitle: `Why Dementia Patients Refuse Food (And What Works)`,
    yt: `Dementia neurologically disrupts hunger cues and food recognition — it's not behavioral, and it's not your fault. Offering 5–6 small finger foods throughout the day works better than three full meals for seniors with dementia.

Bay Area dementia caregivers — book a free Kitchen Assessment at wellpreppedlife.com

#Shorts #DementiaCare #CaregiverTips #SeniorNutrition`,

    rd: `My mom's dementia got to a point where every meal felt like a battle. She'd sit at the table, stare at the plate, and not touch anything. We thought she just wasn't hungry anymore.

Eventually learned it's neurological. Dementia disrupts the brain's hunger signals and its ability to recognize food as food. It's not a behavior thing you can reason through.

What actually changed things: dropping the three-meal structure entirely. Started offering small amounts of finger foods 5–6 times through the day. Soft stuff she could pick up herself — banana slices, cheese cubes, scrambled eggs, small pieces of soft chicken. No pressure to finish a plate.

Mealtime went from a daily source of anxiety to something manageable. She's eating more overall.

Has anyone else made this shift? What foods actually worked for your person?`,
  },

  2: {
    // Post-surgery recovery nutrition
    rdTitle: `Nobody told me what to feed my dad after surgery — figured it out the hard way`,
    rdSub: `AgingParents`,
    ig: `Nobody explains the nutrition side of post-surgery recovery. So families go home and guess.

The doctor sends discharge papers about wound care. Nobody covers what to feed them to actually help them heal. Soft, high-protein foods in small frequent portions support tissue repair without overwhelming a recovering digestive system. That's what makes a real difference in week one and two.

Save this for anyone you know coming home from surgery. Book a free call at wellpreppedlife.com

#PostSurgery #RecoveryNutrition #CaregiverLife #AgingParents #BayAreaCare`,

    tt: `Post-surgery discharge papers don't explain what to feed them. Soft, high-protein, small frequent portions = faster tissue repair. #PostSurgeryCare #CaregiverTips #RecoveryNutrition`,

    ytTitle: `Post-Surgery Nutrition Nobody Tells You About`,
    yt: `Discharge papers explain wound care but almost never explain nutrition. Soft, high-protein foods in small frequent portions support tissue repair and speed recovery — it's one of the highest-leverage things a caregiver can control after surgery.

Bay Area caregivers — book a free Kitchen Assessment at wellpreppedlife.com

#Shorts #PostSurgeryNutrition #CaregiverLife #SeniorHealth`,

    rd: `When my dad came home after hip surgery, the discharge packet covered wound care, physical therapy follow-ups, and medication timing. Nothing about what to actually feed him to help him heal.

Figured it out on my own: post-surgery, the body needs high protein to rebuild tissue. A recovering digestive system handles smaller, more frequent meals better than three big ones. Soft textures matter when someone is fatigued and has reduced appetite.

Once I adjusted to that — small soft high-protein meals every few hours instead of the usual three — his energy came back noticeably faster. His PT mentioned it.

Surprised this isn't covered at discharge. Is this something others have had to piece together on their own after a parent's surgery?`,
  },

  3: {
    // Caregiver meal prep burnout — batch cooking solution
    rdTitle: `Batch prepping once a week instead of cooking daily gave me 6 hours back and probably saved me from burning out`,
    rdSub: `CaregiverSupport`,
    ig: `Daily caregiver cooking is one of the fastest routes to burnout — and nobody warns you.

You signed up to care for your parent. Not to be a short-order cook every single day.

The fix is simpler than it sounds: stop building from scratch daily. Prep proteins, roasted vegetables, and one soup once a week — then mix and match through the week. Same nutrition. Same variety. 5–8 hours of your time back.

Caregiving starts feeling sustainable again.

Save this if you're drowning in the daily meal routine. wellpreppedlife.com

#CaregiverBurnout #MealPrep #FamilyCaregiving #AgingParents #CaregiverLife`,

    tt: `Cooking for a parent every single day is a fast path to burnout. Batch prep once a week, mix combinations daily. Saves 5–8 hours. Caregiving becomes sustainable. #CaregiverLife #MealPrep #CaregiverBurnout`,

    ytTitle: `Caregiver Meal Prep: Stop Cooking Every Day`,
    yt: `Daily meal cooking is one of the leading causes of caregiver burnout. One weekly batch prep session — proteins, vegetables, soup — and you have a week of mix-and-match meals without starting from scratch every day. Saves 5–8 hours per week.

Bay Area family caregivers — book a free Kitchen Assessment at wellpreppedlife.com

#Shorts #CaregiverBurnout #MealPrep #FamilyCaregiving`,

    rd: `About six months into caregiving, I realized I was burning out — and the meals were a big part of it. Driving over three or four times a week, cooking full meals each time, going home exhausted. Then doing it again.

Someone suggested batch prepping instead. I was skeptical it would take any less time.

It did. One Sunday afternoon: a batch of chicken, roasted vegetables, one pot of soup. Portioned into containers. Different combinations each day so it didn't feel repetitive. That was the week handled.

Saved me around six hours a week. More importantly, showing up stopped feeling like a grind.

If you're doing daily meal cooking for a parent right now — has batch prepping made a difference for you? Genuinely curious what others are doing to keep this sustainable.`,
  },

  4: {
    // Parkinson's — kitchen independence, adaptive tools, not taking over
    rdTitle: `Keeping my dad in the kitchen despite Parkinson's — what actually worked instead of just taking over`,
    rdSub: `Parkinsons`,
    ig: `Parkinson's doesn't mean losing the kitchen. It means adapting it.

Taking over cooking entirely is the fastest way to strip away independence. Seated prep eliminates balance and standing risk. Adaptive tools work with tremors instead of against them. Timing cooking around medication makes a real difference. They stay in the kitchen — safer, still capable, still themselves.

Save this if you're navigating Parkinson's at home. Book a free call at wellpreppedlife.com

#ParkinsonsCare #IndependentLiving #AdaptiveKitchen #CaregiverLife #BayAreaCare`,

    tt: `Taking over cooking strips Parkinson's patients of independence faster than the disease does. Seated prep + adaptive tools + timing around meds = they stay in the kitchen. #Parkinsons #AdaptiveKitchen #CaregiverLife`,

    ytTitle: `Parkinson's and the Kitchen: Don't Take Over`,
    yt: `Taking over cooking entirely strips independence faster than Parkinson's does. Seated prep, adaptive utensils, and cooking around medication timing keeps your loved one in the kitchen — safely and on their own terms.

Bay Area adaptive kitchen coaching for Parkinson's — wellpreppedlife.com

#Shorts #ParkinsonsAwareness #AdaptiveKitchen #IndependentLiving`,

    rd: `My dad has Parkinson's, and when his tremors got worse, the obvious answer seemed to be that I should just cook for him.

He got quiet in a way that had nothing to do with the tremors.

A friend who works in occupational therapy said this happens constantly — caregivers take over with good intentions, and the person loses a piece of themselves that was still fully there.

We changed approach. Set him up at the kitchen table for prep — eliminates the balance and standing issues entirely. Got a few adaptive tools designed to work with tremors instead of requiring grip strength. Shifted his cooking time to when his medication was at peak effectiveness.

He's still cooking. Differently than before, but himself.

Anyone else found ways to keep a parent with Parkinson's in the kitchen? What actually worked in practice?`,
  },

  5: {
    // Disability — adaptive cooking, independence, one-handed techniques
    rdTitle: `Getting back into the kitchen after my injury — adaptive techniques that actually worked`,
    rdSub: `disability`,

    ig: `Disability doesn't mean losing the kitchen — it means relearning it.

Doing everything for someone isn't help if it takes away the last thing they had control over. One-handed techniques, seated prep stations, adaptive tools, and simplified task breakdowns make self-directed cooking possible again.

Independence isn't about perfection. It's about doing it yourself.

Save this if someone you love has been told the kitchen is off-limits. wellpreppedlife.com

#DisabilityInclusion #AdaptiveKitchen #IndependentLiving #AccessibilityMatters #CaregiverLife`,

    tt: `Disability doesn't mean the kitchen is off-limits. Seated prep, one-handed techniques, adaptive tools — self-directed cooking is still possible. #DisabilityInclusion #AdaptiveKitchen #Independence`,

    ytTitle: `Disability and Kitchen Independence: Still Possible`,
    yt: `Adaptive cooking techniques restore kitchen independence for disabled adults. One-handed prep, seated workstations, and adaptive tools rebuild capability and dignity — self-directed cooking is possible with the right approach.

Bay Area adaptive cooking coaching — wellpreppedlife.com

#Shorts #DisabilityInclusion #AdaptiveKitchen #AccessibilityMatters`,

    rd: `After my injury, cooking got handed over to my caregivers by default. Made sense at first — I needed a lot of help.

Months in, I noticed I'd quietly stopped trying. Every time I thought about the kitchen, someone was already doing it. And I let them.

Started working on adaptive techniques when I finally pushed back on it. Seated prep station at the counter. One-handed methods for cutting and measuring. Simplified recipes with fewer steps. Different tools than I'd used before.

It took time. But I made dinner for myself last week for the first time in almost a year.

That probably sounds small. It wasn't.

If disability has made the kitchen feel completely off-limits, you might have more options than you've been told. Happy to share what worked if it's useful to anyone.`,
  },

  6: {
    // Disability — the dignity of independence, what it means to cook for yourself again
    rdTitle: `People kept doing things for me after my disability — I didn't realize how much that was costing me`,
    rdSub: `disability`,
    ig: `There's a version of "helping" that quietly takes something away.

When someone has a disability, well-meaning people take over the kitchen. It makes sense. But over time, the person stops trying. The kitchen starts to feel like someone else's space. And they lose something that wasn't about food at all.

Cooking for yourself is control. It's a decision you made. It's proof that you can still do things.

Adaptive setups exist specifically so that people don't have to give that up. Seated prep. One-handed techniques. Better tools. Simpler steps.

The kitchen doesn't have to be off-limits. It just has to work differently.

Save this for anyone who's been told to let others handle it. wellpreppedlife.com

#DisabilityInclusion #IndependentLiving #AdaptiveKitchen #AccessibilityMatters #CaregiverLife`,

    tt: `"Helping" someone by taking over their kitchen can quietly take away the last thing they had control over. Adaptive setups give it back. #DisabilityInclusion #IndependentLiving #AdaptiveKitchen`,

    ytTitle: `The Hidden Cost of "Helping" Disabled Adults`,
    yt: `Well-meaning caregivers often take over kitchen tasks for disabled adults — but over time this quietly removes independence and control. Adaptive setups like seated prep, one-handed techniques, and better tools restore self-directed cooking without risk.

Bay Area adaptive kitchen coaching for disabled adults — wellpreppedlife.com

#Shorts #DisabilityInclusion #AdaptiveKitchen #IndependentLiving`,

    rd: `After my disability, people started doing things for me without asking. Cooking, shopping, all of it. It made sense — I needed help.

But months in, I noticed I'd stopped trying to do anything myself. The kitchen especially. Someone was always there to handle it, so I didn't bother.

When I finally tried to cook something simple, I realized I'd completely lost the habit. And more than that — I'd lost the feeling that I was still capable.

Started working on getting back into the kitchen. Seated prep station, one-handed techniques, different tools, simplified recipes. It was slower and more frustrating than before.

But I made breakfast for myself this week. Seems small. It isn't.

There's a version of helping that costs the person more than it gives them. Has anyone else dealt with this after a disability or medical situation?`,
  },

  7: {
    // Diabetes — meal timing as important as food choices
    rdTitle: `Dad's diabetes numbers finally stabilized — the only thing we changed was when he eats, not what`,
    rdSub: `diabetes`,
    ig: `Managing a parent's diabetes? The timing matters just as much as what they eat.

Skipped meals and erratic schedules create blood sugar swings that show up as fatigue, confusion, mood changes, and increased fall risk. Consistent meal times with balanced portions might be the single highest-leverage change available — and almost nobody talks about it enough.

Save this for anyone managing diabetes at home. Book a free call at wellpreppedlife.com

#DiabetesCare #CaregiverLife #BloodSugar #AgingParents #SeniorHealth`,

    tt: `Managing someone's diabetes? Meal timing is as important as food choices. Consistent schedule = stable blood sugar = fewer falls, less confusion, better energy. #DiabetesCare #CaregiverTips #BloodSugar`,

    ytTitle: `Diabetes: Meal Timing Is Half the Battle`,
    yt: `Erratic meal schedules cause blood sugar swings even with perfect food choices. Consistent meal times with balanced portions stabilize energy, reduce confusion, and lower fall risk for seniors managing diabetes.

Bay Area diabetes nutrition support — book a free Kitchen Assessment at wellpreppedlife.com

#Shorts #DiabetesCare #BloodSugar #CaregiverTips`,

    rd: `My dad's diabetes was being managed with medication but his numbers were still inconsistent. Doctor kept adjusting doses.

Took me a while to see it: his eating schedule was completely irregular. Skipping breakfast some days, eating a big lunch at 2pm, random snacking in the evening.

I set up consistent times. Nothing complicated — breakfast, mid-morning snack, lunch, afternoon snack, dinner, roughly the same times every day.

His numbers stabilized within a few weeks. His doctor's exact words were "whatever you changed, keep doing it." Nothing changed except the timing.

If a parent's diabetes numbers aren't responding to medication the way they should, it might be worth looking at whether they're eating consistently before assuming the medication needs adjustment. Anyone else had this experience?`,
  },

  8: {
    // Medication-food interactions — grapefruit, leafy greens, dairy, calcium
    rdTitle: `Mom's blood pressure wasn't responding to medication — turned out it was the grapefruit juice she'd been drinking for decades`,
    rdSub: `AgingParents`,
    ig: `Your loved one's medication might not be working as well as it should — because of what they're eating alongside it.

Most doctors don't have time to explain food interactions. But they're real and they matter: grapefruit weakens certain blood pressure and heart meds, leafy greens affect blood thinners, dairy blocks antibiotics, calcium interferes with thyroid medication.

The medication is there. It just can't do its job.

Save this for every caregiver managing a medication list. Book a free call at wellpreppedlife.com

#MedicationSafety #CaregiverLife #SeniorHealth #AgingParents #DrugFoodInteractions`,

    tt: `Most doctors don't explain this: common foods directly interfere with senior medications. Grapefruit + blood pressure meds. Dairy + antibiotics. Know the interactions. #MedicationSafety #SeniorHealth #CaregiverLife`,

    ytTitle: `Food-Drug Interactions Doctors Don't Explain`,
    yt: `Common foods block or weaken medication in seniors — and it's almost never explained at discharge. Grapefruit with blood pressure meds. Leafy greens with blood thinners. Dairy with antibiotics. Calcium with thyroid medication.

Medication-aware nutrition planning in the Bay Area — wellpreppedlife.com

#Shorts #MedicationSafety #DrugFoodInteractions #SeniorHealth`,

    rd: `My mom's blood pressure wasn't improving despite medication. Her doctor increased the dose twice. Numbers still not where they needed to be.

Eventually found out she drinks grapefruit juice every morning — she'd done it for decades. Grapefruit contains compounds that interfere with how certain blood pressure and heart medications are metabolized. Nobody had mentioned it. Not the prescribing doctor, not the pharmacy.

Stopped the grapefruit juice. Her numbers improved without any medication change.

There are a handful of common food-drug interactions that almost never get covered: leafy greens with blood thinners (vitamin K affects INR), dairy with antibiotics (reduces absorption), calcium supplements taken at the same time as thyroid medication (blocks absorption).

These aren't obscure interactions. They affect how well the medication actually works, and they're just not discussed.

If a parent's condition isn't responding to medication the way it should, it might be worth checking what they're eating around those medications before assuming the dose needs to change.`,
  },

  9: {
    // Unexplained weight loss — eating has become hard work, texture, fatigue
    rdTitle: `Mom lost 22 lbs and every test came back normal — the actual cause was simpler than any of us expected`,
    rdSub: `AgingParents`,
    ig: `"Unexplained" weight loss in seniors is usually not a mystery. Eating has just gotten hard.

Tough textures. Overwhelming portions. Fatigue from chewing. Eventually they stop trying. Doctors run tests and find nothing. The real answer is often simpler: eating has become too much effort, so they're doing less of it.

Softer, calorie-dense, smaller portions make eating easy again. Weight loss stops when eating stops being hard work.

Save this if you've been worried about a parent's weight. Book a free call at wellpreppedlife.com

#SeniorNutrition #AgingParents #CaregiverLife #HealthyAging #WeightLoss`,

    tt: `"Unexplained" weight loss in seniors is often just this: eating has become too hard. Softer textures, calorie-dense foods, small portions — one shift changes everything. #SeniorHealth #NutritionMatters #CaregiverTips`,

    ytTitle: `Senior Weight Loss That "Can't Be Explained"`,
    yt: `Unexplained weight loss in seniors often isn't a medical mystery — eating has simply become too hard. Tough textures, large portions, and the energy required to chew and swallow all reduce intake over time. Soft, calorie-dense, small-portion meals restore eating.

Bay Area nutrition support for seniors with weight loss — wellpreppedlife.com

#Shorts #SeniorNutrition #WeightLoss #CaregiverTips`,

    rd: `My mom lost about 22 pounds over four months. Her doctor ordered every test imaginable — thyroid, cancer screening, the full workup. Everything came back normal. He was stumped.

What I eventually figured out on my own: she has denture issues that had gotten worse over the previous year, and swallowing had become harder. Eating had quietly become effort she didn't want to put in. So she'd eat a few bites and stop.

I switched her entirely to softer, more calorie-dense foods. Scrambled eggs, soups, mashed sweet potato, Greek yogurt, soft pasta. Smaller portions so the amount on the plate didn't feel like a task. More frequent small meals through the day.

She started gaining weight within a month. Her energy came back. Her doctor was genuinely surprised.

The weight loss wasn't a mystery. Eating had just gotten hard, and none of us had noticed.

If doctors have ruled out the obvious medical causes and still can't explain weight loss, it might be worth looking honestly at whether eating itself has become difficult — chewing, swallowing, portion size, or just the physical energy it takes. Often the person won't say it directly.`,
  },

  10: {
    // Grief — losing a spouse, appetite loss, shared meals, connection not nutrition
    rdTitle: `Dad stopped eating after mom died — what eventually worked wasn't a meal plan or supplements`,
    rdSub: `widowers`,
    ig: `When a senior loses their spouse, they often lose their appetite too. This is why.

Cooking for one feels pointless. The table is too quiet. Every meal is a reminder someone's missing. This isn't a nutrition problem. It's a grief problem that shows up at mealtimes.

What helps isn't a meal plan. It's a reason to eat. Shared meals — even occasional ones — work when calorie supplements don't. Easy favorites that carry good memories. Someone at the table.

Save this if you're supporting someone through loss. Book a free call at wellpreppedlife.com

#GriefAndLoss #SeniorHealth #AgingParents #CaregiverCompassion #MentalHealthMatters`,

    tt: `Seniors stop eating after losing a spouse because the ritual belonged to both of them. Shared meals and familiar comfort foods matter more than any meal plan or supplement. #Grief #SeniorCare #CaregiverLife`,

    ytTitle: `Why Seniors Stop Eating After Losing a Spouse`,
    yt: `Appetite loss after spousal death isn't a nutrition problem — it's a grief problem that shows up at mealtimes. Eating was a shared ritual. Without that person, it stops feeling worth doing. Shared meals, familiar comfort foods, and simple routines give eating meaning again.

Bay Area compassionate senior nutrition support — wellpreppedlife.com

#Shorts #GriefSupport #SeniorWellness #CaregiverCompassion`,

    rd: `About eight months after my mom died, my dad had quietly lost almost 20 pounds. His doctor recommended nutritional supplements and referred him to a dietitian.

The supplements helped a little. The dietitian's plan didn't stick.

I eventually understood the real thing: eating had been something my parents did together for 52 years. Three meals a day, at the same table, together. Without her, none of it felt worth doing. It wasn't about hunger or nutrition. It was about the fact that the whole ritual was theirs, and now it was just his.

What actually worked: I started eating with him when I could. Breakfast or lunch, whatever fit. He ate noticeably more when someone was there. I also went back to the foods that were theirs together — things my mom used to make that he recognized. He'd eat those on the hard days when he'd refuse other things.

His weight came back slowly. Doctor was pleased.

I think about how many people in this situation get a supplement recommendation, when what they actually need is someone to sit at the table with them.

If a parent lost their spouse and stopped eating well, it might not respond to food-based solutions alone. The loneliness is usually the real thing.`,
  },
};

// D1 (production) IDs — used when seeding remote
const positionMapD1 = {
  1:  "TzvF0VpuuX25Lpd25Wwx-",
  2:  "znXWqJtFdsf5nTjWP766f",
  3:  "-P_Jqo4Pvk_zUbALAusTt",
  4:  "1rfYjuq2ZzIf1lzkIm8uH",
  5:  "UUfyCsKCZy_I6LI0ikYJL",
  6:  "i6w1j_LHLH-J9ewaqTKK7",
  7:  "lpuzA8fENeTr8Sg59xTIX",
  8:  "eD4GKbNsV3qayPNczrIrE",
  9:  "4o7mZ0Iup1hIgQLOyDECa",
  10: "w3-u0IR2ySBeu8ik283U3",
};

// Local SQLite IDs — used when seeding content-approval.db
const positionMapLocal = {
  1:  "TzvF0VpuuX25Lpd25Wwx-",
  2:  "znXWqJtFdsf5nTjWP766f",
  3:  "-P_Jqo4Pvk_zUbALAusTt",
  4:  "1rfYjuq2ZzIf1lzkIm8uH",
  5:  "UUfyCsKCZy_I6LI0ikYJL",
  // card 6 exists only on D1; cards 7-10 use placeholder IDs locally
  7:  "card7_wpl_diabetes01",
  8:  "card8_wpl_meds01",
  9:  "card9_wpl_weightloss01",
  10: "card10_wpl_grief01",
};

const env   = process.argv[2] === "local" ? "local" : "d1";
const positionMap = env === "local" ? positionMapLocal : positionMapD1;

const lines = [];
const now = Date.now();

for (const [pos, descs] of Object.entries(descriptions)) {
  const id   = positionMap[pos];
  const ig   = descs.ig.replace(/'/g, "''");
  const tt   = descs.tt.replace(/'/g, "''");
  const yt   = descs.yt.replace(/'/g, "''");
  const ytT  = descs.ytTitle.replace(/'/g, "''");
  const rd   = descs.rd.replace(/'/g, "''");
  const rdT  = descs.rdTitle.replace(/'/g, "''");
  const rdS  = descs.rdSub.replace(/'/g, "''");
  lines.push(`UPDATE cards SET desc_instagram='${ig}', desc_tiktok='${tt}', desc_youtube='${yt}', desc_youtube_title='${ytT}', desc_facebook='${rd}', desc_reddit_title='${rdT}', desc_reddit_subreddit='${rdS}', updated_at=${now} WHERE id='${id}';`);
}

console.log(lines.join("\n"));
