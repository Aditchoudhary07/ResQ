# ResQ — Right Hospital. Right Time.

**ResQ – An Emergency Hospital Recommendation and Coordination System for Ambulance Services.**

ResQ helps ambulance crews find a suitable hospital with a free bed, send a request, and get a clear answer, while hospitals see incoming requests and confirm bed allocation in real time. All dashboards share one central database, so every user sees the same bed count.

> ⚠️ **Academic prototype.** ResQ is a college project for demonstration and learning. It is **not** connected to real emergency services, and all hospital records are **simulated data**. In a real emergency, call **112** (India) or your local emergency number.

---

## Features

### 🚑 Ambulance Dashboard
- Simple emergency request form: ambulance number, emergency type, patient condition, age and pickup location (GPS or nearby area).
- Recommended hospitals table with **required specialty match, distance, estimated travel time and available beds**.
- One-click **Request Bed**.
- Clear request status: **Pending → Accepted → Bed Allocated**, or **Rejected / Cancelled**.
- Live bed availability for all hospitals (refreshes every 3 seconds).

### 🏥 Hospital Dashboard
- Choose which hospital you are viewing; see its available beds, specialties and location.
- Incoming requests in a simple table with **Accept** and **Reject**.
- **Confirm Bed** is a separate step after acceptance. Beds go down only when the allocation is confirmed.
- Optional advanced tools: patient preparation, resource status and handovers.

### 🛠️ Admin Dashboard (internal demo page)
- Add and edit hospitals: name, location, specialties, total beds and available beds.
- View every emergency request and its status, and accept, reject, allocate or cancel it.
- Hidden from regular visitors. The link appears only on `localhost` (e.g. VS Code Live Server) or with `?demo=1`.

### 🔒 Bed allocation rules (enforced in the database)
| Action | Effect on available beds |
|---|---|
| Accept request | No change |
| Confirm bed allocation | −1 (only once per request, never below 0) |
| Reject request | No change |
| Cancel an allocated request | +1 (never above total beds) |

These rules run inside PostgreSQL functions (`accept_request`, `confirm_allocation`, `reject_request`, `cancel_request`). Each one is atomic, so two hospitals can't allocate the same bed twice, and the browser can't change a status or bed flag directly.

---

## Technologies

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, vanilla JavaScript (no build step) |
| Database / backend | [Supabase](https://supabase.com) (PostgreSQL, Row Level Security, SQL functions) |
| Client library | `@supabase/supabase-js` v2 (loaded from CDN) |
| Sync | Automatic refresh every 3 seconds |
| Local server | VS Code **Live Server** (or any static file server) |

---

## Project structure

```
ResQ/
├── index.html           # Main website: Ambulance & Hospital dashboards
├── admin.html           # Internal Admin Dashboard (demo/testing)
├── style.css            # All styles (clean white / blue / green theme)
├── script.js            # App logic, recommendations, dashboards, sync
├── db.js                # Shared Supabase data layer (used by both pages)
├── config.example.js    # Template for config.js (Supabase URL + publishable key)
├── supabase-setup.sql   # Database tables, constraints, indexes, functions, security
├── .env.example         # Names of the required settings (no real values)
└── .gitignore
```

---

## Setup

### 1. Create the database (free Supabase project)
1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste the contents of [`supabase-setup.sql`](supabase-setup.sql) and click **Run**.
   This creates the `hospitals` and `emergency_requests` tables and loads 7 **simulated** hospitals.

### 2. Connect the website
1. Copy `config.example.js` to `config.js`.
2. In Supabase, go to **Project Settings → API Keys** and paste the **Project URL** and the **publishable** key into `config.js`.

> Never put the **secret / service-role key** or the **database password** in `config.js` or anywhere in this repository. `config.js` is git-ignored.

### 3. Run locally
- **VS Code:** install the *Live Server* extension, right-click `index.html` → **Open with Live Server**.
- **Or** any static server, for example:
  ```bash
  npx serve .
  ```
Then open the printed address (e.g. `http://127.0.0.1:5500`).

Without `config.js`, the site still opens using built-in demo data, but the shared database features are disabled.

---

## How to use (demo walkthrough)

1. **Ambulance Dashboard:** fill in the form → **Find Hospitals** → **Request Bed** at a hospital. Status: *Pending*.
2. **Hospital Dashboard** (another tab or device): select that hospital → **Accept** (beds unchanged) → **Confirm Bed** (beds −1). Status: *Bed Allocated*.
3. Any other ambulance now sees the reduced bed count.
4. **Reject** leaves beds unchanged; **Cancel Case** after allocation returns the bed.
5. **Admin Dashboard** (`admin.html`): edit a hospital's beds and the other dashboards update within about 3 seconds.

---

## Limitations

- **No login:** the demo database can be edited by anyone who has the site and its key. Add Supabase Auth before any real use.
- Distances are straight-line estimates and travel times are rough approximations.
- All hospital data is simulated for academic demonstration.

---

## License

Academic project, provided for educational purposes.
