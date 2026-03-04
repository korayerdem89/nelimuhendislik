import { useState, useEffect } from "react";
import { api } from "@/lib/api";

type SiteSettings = Record<string, string>;

let cachedSettings: SiteSettings | null = null;
let fetchPromise: Promise<SiteSettings> | null = null;

async function fetchSettings(): Promise<SiteSettings> {
  if (cachedSettings) return cachedSettings;
  if (fetchPromise) return fetchPromise;

  fetchPromise = api.get<SiteSettings>("/api/public/settings").then((data) => {
    cachedSettings = data;
    fetchPromise = null;
    return data;
  });

  return fetchPromise;
}

export function invalidateSettingsCache() {
  cachedSettings = null;
  fetchPromise = null;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings || {});
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    fetchSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
