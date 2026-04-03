/**
 * Post-deploy script: syncs services + blogs into gbp_queue via D1.
 * Run automatically as part of `npm run deploy`.
 *
 * Calls the /api/gbp-queue/sync endpoint against the live deployed worker.
 */
import { execSync } from "child_process";

const DB_NAME = "assurgit-db";
const PROJECT_NAME = "Well prepped life";

const SERVICES = [
  { slug: "personal-chef-for-seniors", title: "Personal Chef for Seniors", excerpt: "In-home meal prep tailored to dietary needs, health conditions, and personal tastes in the Bay Area." },
  { slug: "diabetic-meal-prep", title: "Diabetic Meal Prep for Seniors", excerpt: "Blood-sugar-stable, low-glycemic meals prepared fresh in your Bay Area home." },
  { slug: "kitchen-optimization-seniors", title: "Kitchen Optimization for Seniors", excerpt: "Safety assessments, adaptive tools, and accessibility reorganization for older adults in the Bay Area." },
  { slug: "meal-prep-for-seniors", title: "Meal Prep for Seniors Near Me", excerpt: "Fresh, nutritious meals prepared weekly in your own Bay Area home." },
  { slug: "adaptive-cooking", title: "Adaptive Cooking for Disabled Adults", excerpt: "In-home coaching for mobility limitations, tremors, and one-handed cooking techniques." },
  { slug: "caregiver-meal-support", title: "Meal Help for Family Caregivers", excerpt: "Weekly in-home meal prep so family caregivers can step back from the kitchen without worry." },
  { slug: "post-surgery-meal-prep", title: "Post-Surgery Meal Prep for Seniors", excerpt: "Protein-rich, soft-food-friendly recovery meals prepared fresh during the weeks when nutrition matters most." },
  { slug: "weekly-meal-prep", title: "Done-For-You Weekly Meal Prep", excerpt: "A full week of home-cooked meals without the daily grind of planning, shopping, and standing at the stove." },
  { slug: "low-sodium-cooking", title: "Low-Sodium Cooking for Seniors", excerpt: "Flavorful Bay Area in-home meal prep using herbs, spices, and citrus instead of salt." },
  { slug: "heart-healthy-meal-prep", title: "Heart-Healthy Meal Prep for Seniors", excerpt: "Mediterranean and DASH-style meals prepared in-home for seniors managing heart disease." },
  { slug: "renal-diet-meal-prep", title: "Renal Diet Meal Prep for Seniors", excerpt: "Potassium-, sodium-, and phosphorus-controlled meals for seniors with kidney disease." },
  { slug: "soft-food-meal-prep", title: "Soft Food & Pureed Meal Prep", excerpt: "Real ingredients, real flavor, and the right texture for swallowing and chewing difficulty." },
  { slug: "gluten-free-meal-prep", title: "Gluten-Free Meal Prep for Seniors", excerpt: "Certified gluten-free meal prep in-home with dedicated tools and zero cross-contamination risk." },
  { slug: "anti-inflammatory-cooking", title: "Anti-Inflammatory Diet Cooking", excerpt: "Turmeric, ginger, leafy greens, and omega-3-rich ingredients prepared fresh in your Bay Area home." },
  { slug: "allergen-free-cooking", title: "Allergen-Free Cooking for Seniors", excerpt: "Freshly prepared meals with color-coded tools and rigorous protocols to eliminate cross-contamination." },
  { slug: "vegetarian-meal-prep", title: "Vegetarian & Plant-Based Meal Prep", excerpt: "Buddha bowls, lentil soups, stuffed peppers, and more, prepared fresh in your home." },
  { slug: "holiday-meal-preparation", title: "Holiday Meal Preparation for Seniors", excerpt: "Family-style festive meals without putting the burden of cooking on an aging adult or their caregiver." },
];

const BLOGS = [
  { slug: "adaptive-cooking-tools-for-seniors-with-arthritis", title: "Adaptive Cooking Tools for Seniors with Arthritis", excerpt: "The best adaptive cooking tools for seniors with arthritis that restore kitchen independence in the Bay Area." },
  { slug: "affordable-healthy-meals-for-seniors-near-me", title: "Affordable Healthy Meals for Seniors Near Me", excerpt: "How to find affordable, nutritious meal options for seniors in the San Francisco Bay Area." },
  { slug: "batch-cooking-for-family-caregivers", title: "Batch Cooking for Family Caregivers", excerpt: "A practical guide to batch cooking so family caregivers can keep aging parents well-fed without burning out." },
  { slug: "best-low-sodium-meal-ideas-for-seniors", title: "Best Low-Sodium Meal Ideas for Seniors", excerpt: "Delicious low-sodium meal ideas for seniors managing hypertension or heart disease." },
  { slug: "can-senior-meal-prep-companies-accept-medicare", title: "Can Senior Meal Prep Companies Accept Medicare?", excerpt: "What seniors and families need to know about Medicare coverage for in-home meal prep services." },
  { slug: "caregiver-freezer-meal-plan-one-weekend", title: "Caregiver Freezer Meal Plan: One Weekend", excerpt: "A one-weekend freezer meal plan that gives family caregivers a full month of easy dinners." },
  { slug: "cooking-life-skills-for-disabled-adults-bay-area", title: "Cooking Life Skills for Disabled Adults in the Bay Area", excerpt: "Practical cooking life skills and resources for disabled adults building kitchen independence in the Bay Area." },
  { slug: "cooking-tips-for-seniors-with-parkinsons", title: "Cooking Tips for Seniors with Parkinson's", excerpt: "Safe, practical cooking tips and adaptive tools for seniors managing Parkinson's disease." },
  { slug: "eating-well-alone-seniors-who-cook-for-one", title: "Eating Well Alone: Seniors Who Cook for One", excerpt: "How seniors living alone can eat well, cook safely, and enjoy meals without the hassle." },
  { slug: "how-much-does-personal-chef-for-seniors-cost", title: "How Much Does a Personal Chef for Seniors Cost?", excerpt: "A transparent breakdown of personal chef costs for seniors in the San Francisco Bay Area." },
  { slug: "how-to-get-home-cooked-meals-for-senior-living-alone", title: "How to Get Home-Cooked Meals for a Senior Living Alone", excerpt: "Practical options for getting nutritious, home-cooked meals to a senior living independently." },
  { slug: "how-to-organize-a-kitchen-for-wheelchair-access", title: "How to Organize a Kitchen for Wheelchair Access", excerpt: "Step-by-step guide to reorganizing a kitchen for wheelchair users and mobility-limited adults." },
  { slug: "how-to-talk-to-aging-parent-about-kitchen-help", title: "How to Talk to an Aging Parent About Kitchen Help", excerpt: "Compassionate strategies for having the kitchen help conversation without conflict." },
  { slug: "is-personal-chef-for-elderly-parents-worth-it", title: "Is a Personal Chef for Elderly Parents Worth It?", excerpt: "An honest look at the costs, benefits, and alternatives to hiring a personal chef for aging parents." },
  { slug: "kitchen-safety-tips-for-elderly-parents-living-alone", title: "Kitchen Safety Tips for Elderly Parents Living Alone", excerpt: "The most important kitchen safety modifications and habits for seniors living independently." },
  { slug: "meal-prep-after-stroke-recovery-for-seniors", title: "Meal Prep After Stroke Recovery for Seniors", excerpt: "Nutrition and meal prep strategies to support stroke recovery in elderly adults." },
  { slug: "meal-prep-for-elderly-after-surgery-recovery", title: "Meal Prep for the Elderly After Surgery Recovery", excerpt: "How to plan and prepare recovery meals for elderly adults after surgery." },
  { slug: "meal-prep-for-seniors-with-dementia", title: "Meal Prep for Seniors with Dementia", excerpt: "Safe, simple meal prep strategies for seniors with dementia and their caregivers." },
  { slug: "meal-prep-for-seniors-with-diabetes", title: "Meal Prep for Seniors with Diabetes", excerpt: "Blood-sugar-friendly meal prep strategies and recipe ideas for seniors managing diabetes." },
  { slug: "personal-chef-vs-home-care-aide-meal-preparation", title: "Personal Chef vs. Home Care Aide: Meal Preparation", excerpt: "Understanding the difference between a personal chef and a home care aide for senior meal prep." },
  { slug: "when-to-hire-meal-prep-service-for-aging-parent", title: "When to Hire a Meal Prep Service for an Aging Parent", excerpt: "The signs that it's time to bring in professional meal prep help for an aging parent." },
  { slug: "who-provides-fresh-senior-meal-prep-bay-area", title: "Who Provides Fresh Senior Meal Prep in the Bay Area?", excerpt: "A guide to fresh, in-home senior meal prep providers in the San Francisco Bay Area." },
];

const WEBSITE = "https://wellpreppedlife.com";

function buildBody(type, slug, title, excerpt) {
  if (type === "service") {
    return `${excerpt}\n\nBook a free consultation at wellpreppedlife.com. Serving the San Francisco Bay Area.`;
  }
  return `${excerpt}\n\nRead the full article at ${WEBSITE}/blog/${slug}`;
}

function d1(sql) {
  try {
    const out = execSync(
      `npx wrangler d1 execute ${DB_NAME} --remote --command "${sql.replace(/"/g, '\\"')}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
    const match = out.match(/\[[\s\S]*\]/);
    if (match) {
      const data = JSON.parse(match[0]);
      return data[0]?.results || [];
    }
  } catch (e) {
    // ignore
  }
  return [];
}

function d1Insert(sql) {
  try {
    execSync(
      `npx wrangler d1 execute ${DB_NAME} --remote --command "${sql.replace(/"/g, '\\"')}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
  } catch (e) {
    // ignore duplicate key errors
  }
}

// Get project ID
const projects = d1(`SELECT id FROM projects WHERE name = '${PROJECT_NAME}' LIMIT 1`);
if (!projects.length) {
  console.log(`[gbp-sync] Project not found: ${PROJECT_NAME}`);
  process.exit(0);
}
const projectId = projects[0].id;

// Get existing slugs
const existing = d1(`SELECT slug FROM gbp_queue WHERE project_id = '${projectId}'`);
const existingSlugs = new Set(existing.map(r => r.slug));

// Get max position
const posRows = d1(`SELECT MAX(position) as max_pos FROM gbp_queue WHERE project_id = '${projectId}'`);
let nextPos = (posRows[0]?.max_pos ?? -1) + 1;

let added = 0;

const now = Date.now();
const nanoid = () => Math.random().toString(36).slice(2, 13) + Math.random().toString(36).slice(2, 13);

for (const svc of SERVICES) {
  if (existingSlugs.has(svc.slug)) continue;
  const body = buildBody("service", svc.slug, svc.title, svc.excerpt).replace(/'/g, "''");
  const title = svc.title.replace(/'/g, "''");
  const url = `${WEBSITE}/services/${svc.slug}`;
  d1Insert(`INSERT OR IGNORE INTO gbp_queue (id, project_id, type, slug, title, body, url, status, position, created_at) VALUES ('${nanoid()}', '${projectId}', 'service', '${svc.slug}', '${title}', '${body}', '${url}', 'pending', ${nextPos++}, ${now})`);
  added++;
  console.log(`[gbp-sync] + service: ${svc.slug}`);
}

for (const blog of BLOGS) {
  if (existingSlugs.has(blog.slug)) continue;
  const body = buildBody("blog", blog.slug, blog.title, blog.excerpt).replace(/'/g, "''");
  const title = blog.title.replace(/'/g, "''");
  const url = `${WEBSITE}/blog/${blog.slug}`;
  d1Insert(`INSERT OR IGNORE INTO gbp_queue (id, project_id, type, slug, title, body, url, status, position, created_at) VALUES ('${nanoid()}', '${projectId}', 'blog', '${blog.slug}', '${title}', '${body}', '${url}', 'pending', ${nextPos++}, ${now})`);
  added++;
  console.log(`[gbp-sync] + blog: ${blog.slug}`);
}

console.log(`[gbp-sync] Done — ${added} items added to queue`);
