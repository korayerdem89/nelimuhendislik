import { db } from "../db/index.js";
import { activityLog } from "../db/schema.js";

type Action = "create" | "update" | "delete" | "bulk_delete" | "bulk_update" | "upload" | "settings_update";
type EntityType = "blog" | "project" | "map_pin" | "media" | "settings" | "milestone";

export function logActivity(
  action: Action,
  entityType: EntityType,
  entityTitle: string,
  username: string = "admin",
  entityId?: number,
  details?: string,
) {
  db.insert(activityLog)
    .values({ action, entityType, entityTitle, username, entityId, details })
    .run();
}
