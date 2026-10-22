CREATE TABLE IF NOT EXISTS leads(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT,phone TEXT,company TEXT,plan TEXT,needs TEXT,message TEXT,page TEXT,ip_hash TEXT,created_ms INTEGER);
CREATE INDEX IF NOT EXISTS idx_leads_ip ON leads(ip_hash,created_ms);
