-- GBP location configuration: categories and services per business
CREATE TABLE IF NOT EXISTS gbp_locations (
  id                     TEXT PRIMARY KEY,
  name                   TEXT NOT NULL,
  location_id            TEXT NOT NULL UNIQUE,  -- GBP location ID (numeric string)
  primary_category       TEXT,                  -- e.g. "Aged care"
  additional_categories  TEXT NOT NULL DEFAULT '[]',  -- JSON array of strings
  services               TEXT NOT NULL DEFAULT '{}',  -- JSON object: { "Category": ["service1", ...] }
  notes                  TEXT DEFAULT '',
  created_at             INTEGER NOT NULL,
  updated_at             INTEGER NOT NULL
);

-- Well Prepped Life
INSERT OR REPLACE INTO gbp_locations VALUES (
  'wellpreppedlife',
  'Well Prepped Life',
  '03176437503634995705',
  'Aged care',
  '["Personal chef service","Home health care service","Health consultant","Meal delivery","Disability services and support organization"]',
  '{
    "Aged care": [
      "Senior meal preparation service",
      "Elderly nutrition planning and support",
      "In-home cooking for aging adults",
      "Weekly meal service for homebound seniors",
      "Post-hospitalization meal service for seniors",
      "Soft food and texture-modified meal prep for seniors",
      "Diabetic meal planning for older adults",
      "Heart-healthy cooking for seniors",
      "Low-sodium meal preparation for elderly",
      "Kitchen safety assessment for aging in place",
      "Caregiver meal support and respite",
      "Senior-friendly pantry organization",
      "Adaptive kitchen setup for older adults",
      "Grocery shopping assistance for elderly"
    ],
    "Personal chef service": [
      "In-home personal chef for seniors",
      "Weekly meal prep by a personal chef",
      "Custom menu planning and cooking",
      "Private chef for medical diets",
      "Special diet personal chef (gluten-free, dairy-free, anti-inflammatory)",
      "Batch cooking and freezer meal service",
      "Personal chef for one- and two-person households",
      "In-home cooking lessons and kitchen coaching",
      "Personal chef for dietary restrictions",
      "Holiday and special occasion private cooking"
    ],
    "Meal delivery": [
      "Done-for-you weekly meal prep",
      "Bi-weekly meal prep service",
      "Batch cooking and freezer meals",
      "Single-serving portioned meals for seniors",
      "Post-surgery recovery meal prep",
      "Post-hospital discharge meal transition",
      "Freezer-friendly meal preparation and storage",
      "Customized meal prep for dietary restrictions",
      "Couples meal prep with dual dietary profiles",
      "Meal prep with labeled reheating instructions",
      "Fresh meal delivery for seniors at home",
      "Home cooked meal delivery service for elderly",
      "Chef-prepared meal delivery for aging adults",
      "Weekly fresh meal delivery with medical diet customization"
    ],
    "Home health care service": [
      "Medically tailored meal preparation at home",
      "Post-surgery meal support and recovery nutrition",
      "Caregiver respite meal service",
      "Long-distance caregiver meal coordination",
      "Dementia and Alzheimer'\''s meal support",
      "Parkinson'\''s-adapted meal prep",
      "Stroke recovery meal preparation",
      "Dysphagia-safe food preparation (pureed and soft)",
      "Renal diet meal preparation for kidney disease",
      "Cancer nutrition and treatment-support meals"
    ],
    "Health consultant": [
      "Personalized nutrition consulting for chronic conditions",
      "Nutritional needs assessment for seniors",
      "Diabetic meal planning and blood sugar management",
      "Renal diet consulting and meal planning",
      "Heart disease and hypertension diet consulting",
      "Anti-inflammatory diet planning",
      "Custom menu planning for medical diets",
      "Medical diet interpretation and recipe adaptation",
      "Nutrition education for seniors and caregivers",
      "Kitchen wellness assessment and optimization"
    ],
    "Disability services and support organization": [
      "Adaptive cooking services for adults with disabilities",
      "Adaptive cooking instruction for Parkinson'\''s disease",
      "One-handed cooking techniques for stroke survivors",
      "Wheelchair-accessible cooking instruction",
      "Arthritis-friendly cooking techniques",
      "Kitchen accessibility assessment and modification consulting",
      "Adaptive kitchen tool recommendations",
      "Seated cooking instruction for mobility-limited adults",
      "Cooking skill-building for disabled adults",
      "Tremor-adapted cooking techniques coaching"
    ]
  }',
  'Primary changed from Meal Delivery to Aged care (2026-04-11). 6 additional categories. 68 services across 6 categories.',
  1744386000000,
  1744386000000
);

-- Same Day Handyman OKC (placeholder — categories not yet finalized)
INSERT OR REPLACE INTO gbp_locations VALUES (
  'sdh_001',
  'Same Day Handyman OKC',
  '18028800819716616421',
  NULL,
  '[]',
  '{}',
  'Categories not yet researched. Run strategy analysis first.',
  1744386000000,
  1744386000000
);
