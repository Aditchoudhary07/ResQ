-- ResQ — Supabase setup for a college prototype. ALL RECORDS ARE SIMULATED DATA.
-- Run once in Supabase → SQL Editor. Safe to re-run: it never drops tables or deletes data.
--
-- Request lifecycle:
--   Pending --accept--> Accepted --confirm_allocation--> (bed_allocated = true, beds - 1)
--   Pending/Accepted --reject--> Rejected            (beds unchanged)
--   Pending/Accepted --cancel--> Cancelled           (if a bed was allocated, beds + 1)

create table if not exists hospitals (
  hospital_id    text primary key,
  hospital_name  text not null,
  location       text not null default '',
  specialty      text not null default '',
  total_beds     int  not null default 0 check (total_beds >= 0),
  available_beds int  not null default 0 check (available_beds >= 0),
  is_simulated   boolean not null default true,
  last_updated   timestamptz not null default now(),
  constraint available_within_total check (available_beds <= total_beds)
);

create table if not exists emergency_requests (
  request_id       text primary key,
  ambulance_number text not null,
  emergency_type   text not null,
  hospital_id      text not null references hospitals(hospital_id) on delete cascade,
  request_status   text not null default 'Pending'
                   check (request_status in ('Pending','Accepted','Rejected','Cancelled')),
  bed_allocated    boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  case_id          text,   -- links rows to the ResQ case
  case_data        jsonb,  -- case snapshot so every device shows the same case
  constraint bed_only_when_accepted check (not bed_allocated or request_status = 'Accepted')
);

create index if not exists emergency_requests_hospital_idx on emergency_requests (hospital_id);
create index if not exists emergency_requests_status_idx   on emergency_requests (request_status);
create index if not exists emergency_requests_case_idx     on emergency_requests (case_id);
create index if not exists emergency_requests_created_idx  on emergency_requests (created_at desc);

-- SIMULATED hospitals. Hospital A = City General Hospital, 10 of 20 beds available.
insert into hospitals (hospital_id, hospital_name, location, specialty, total_beds, available_beds) values
 ('H001','City General Hospital (Simulated)','12, Station Road, Sector 14, New Delhi','Cardiology, Neurology, Trauma Surgery, Paediatrics, Obstetrics & Gynaecology, ICU',20,10),
 ('H002','Metro Heart Institute (Simulated)','45, Ring Road, Lajpat Nagar, New Delhi','Cardiology, Cardiac Surgery, Electrophysiology, ICU',15,6),
 ('H003','District Trauma Centre (Simulated)','78, NH-8, Gurugram, Haryana','Trauma Surgery, Orthopaedics, Burns, Critical Care, ICU',25,4),
 ('H004','Sunrise Neurology Hospital (Simulated)','23, MG Road, Bengaluru, Karnataka','Neurology, Neurosurgery, Stroke, Interventional Radiology, ICU',12,7),
 ('H005','Mother & Child Hospital (Simulated)','56, Park Street, Central NCR, New Delhi','Obstetrics & Gynaecology, Paediatrics, Neonatal ICU',18,9),
 ('H006','Apollo Multispecialty Hospital (Simulated)','11, Greams Road, Chennai, Tamil Nadu','Cardiology, Neurology, Trauma, Paediatrics, Obstetrics, Burns',40,15),
 ('H007','AIIMS Apex Trauma Center (Simulated)','Ring Road, Safdarjung Enclave, New Delhi','All Major Specialties, Trauma, Burns, Toxicology, Paediatrics',50,3)
on conflict (hospital_id) do nothing;

-- Timestamps
create or replace function touch_hospital() returns trigger language plpgsql as $$
begin new.last_updated := now(); return new; end $$;
drop trigger if exists hospitals_touch on hospitals;
create trigger hospitals_touch before update on hospitals for each row execute function touch_hospital();

create or replace function touch_request() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists requests_touch on emergency_requests;
create trigger requests_touch before update on emergency_requests for each row execute function touch_request();

-- Step 1: hospital accepts (no bed change yet)
create or replace function accept_request(p_request_id text) returns void
language plpgsql security definer set search_path = public as $$
begin
  update emergency_requests set request_status = 'Accepted'
   where request_id = p_request_id and request_status = 'Pending';
  if not found then raise exception 'Request is not pending (already handled or not found)'; end if;
end $$;

-- Step 2: hospital confirms bed allocation. Exactly once per request; beds never below 0.
create or replace function confirm_allocation(p_request_id text) returns int
language plpgsql security definer set search_path = public as $$
declare v_hosp text; v_left int;
begin
  select hospital_id into v_hosp from emergency_requests
   where request_id = p_request_id and request_status = 'Accepted' and not bed_allocated
   for update;
  if v_hosp is null then raise exception 'Request must be Accepted and not already allocated'; end if;

  update hospitals set available_beds = available_beds - 1
   where hospital_id = v_hosp and available_beds > 0
   returning available_beds into v_left;
  if v_left is null then raise exception 'No beds available at this hospital'; end if;

  update emergency_requests set bed_allocated = true where request_id = p_request_id;
  return v_left;
end $$;

-- Reject: bed count is NOT changed.
create or replace function reject_request(p_request_id text) returns void
language plpgsql security definer set search_path = public as $$
begin
  update emergency_requests set request_status = 'Rejected'
   where request_id = p_request_id and request_status in ('Pending','Accepted') and not bed_allocated;
  if not found then raise exception 'Only Pending, or Accepted-but-not-allocated, requests can be rejected'; end if;
end $$;

-- Cancel: releases the bed if one was allocated (never above total beds).
create or replace function cancel_request(p_request_id text) returns int
language plpgsql security definer set search_path = public as $$
declare v_hosp text; v_alloc boolean; v_left int;
begin
  select hospital_id, bed_allocated into v_hosp, v_alloc from emergency_requests
   where request_id = p_request_id and request_status in ('Pending','Accepted')
   for update;
  if v_hosp is null then raise exception 'Request is already closed or not found'; end if;

  update emergency_requests set request_status = 'Cancelled', bed_allocated = false
   where request_id = p_request_id;
  if v_alloc then
    update hospitals set available_beds = least(available_beds + 1, total_beds)
     where hospital_id = v_hosp returning available_beds into v_left;
  else
    select available_beds into v_left from hospitals where hospital_id = v_hosp;
  end if;
  return v_left;
end $$;

-- Prototype access (no login). Browser key may:
--   hospitals: read / add / edit / delete (admin page)
--   emergency_requests: read, insert new Pending requests, update only the case snapshot.
--   Status and bed allocation change ONLY through the functions above.
alter table hospitals enable row level security;
alter table emergency_requests enable row level security;
drop policy if exists demo_all on hospitals;
drop policy if exists demo_all on emergency_requests;
drop policy if exists demo_read on emergency_requests;
drop policy if exists demo_insert on emergency_requests;
drop policy if exists demo_update on emergency_requests;
create policy demo_all    on hospitals          for all    to anon, authenticated using (true) with check (true);
create policy demo_read   on emergency_requests for select to anon, authenticated using (true);
create policy demo_insert on emergency_requests for insert to anon, authenticated
  with check (request_status = 'Pending' and not bed_allocated);
create policy demo_update on emergency_requests for update to anon, authenticated using (true) with check (true);

revoke insert, update, delete on emergency_requests from anon, authenticated;
grant select on emergency_requests to anon, authenticated;
grant insert (request_id, case_id, ambulance_number, emergency_type, hospital_id, case_data)
  on emergency_requests to anon, authenticated;
grant update (case_data) on emergency_requests to anon, authenticated;
grant select, insert, update, delete on hospitals to anon, authenticated;

revoke execute on function accept_request(text), confirm_allocation(text), reject_request(text), cancel_request(text) from public;
grant execute on function accept_request(text), confirm_allocation(text), reject_request(text), cancel_request(text) to anon, authenticated;
