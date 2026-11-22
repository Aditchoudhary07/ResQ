/* ResQ — shared Supabase database layer (used by index.html and admin.html). */
(function () {
  const cfg = window.RESQ_CONFIG || {};
  const ok = cfg.SUPABASE_URL && !cfg.SUPABASE_URL.startsWith("PASTE") && window.supabase;
  const client = ok ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;

  function need() { if (!client) throw new Error("Database not configured — fill in config.js"); }
  function chk({ data, error }) { if (error) throw new Error(error.message); return data; }

  window.ResQDB = {
    connected: !!client,
    async listHospitals() { need(); return chk(await client.from("hospitals").select("*").order("hospital_id")); },
    async saveHospital(row) { need(); return chk(await client.from("hospitals").upsert(row).select()); },
    async deleteHospital(id) { need(); return chk(await client.from("hospitals").delete().eq("hospital_id", id)); },
    async listRequests() { need(); return chk(await client.from("emergency_requests").select("*").order("created_at", { ascending: false })); },
    // New rows are inserted once (status starts Pending); later saves only refresh the case snapshot.
    async pushCase(c) {
      need();
      const rows = (c.acceptanceRequests || []).map(r => ({
        request_id: r.id, case_id: c.id, ambulance_number: c.ambPlate || c.ambId || "—",
        emergency_type: c.categoryLabel || c.category || "—", hospital_id: r.hospId, case_data: c
      }));
      if (!rows.length) return;
      chk(await client.from("emergency_requests").upsert(rows, { onConflict: "request_id", ignoreDuplicates: true }));
      chk(await client.from("emergency_requests").update({ case_data: c }).eq("case_id", c.id));
    },
    async acceptRequest(id) { need(); return chk(await client.rpc("accept_request", { p_request_id: id })); },
    async confirmAllocation(id) { need(); return chk(await client.rpc("confirm_allocation", { p_request_id: id })); },
    async rejectRequest(id) { need(); return chk(await client.rpc("reject_request", { p_request_id: id })); },
    async cancelRequest(id) { need(); return chk(await client.rpc("cancel_request", { p_request_id: id })); }
  };
})();
