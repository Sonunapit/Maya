export const MAX_FILE = 5 * 1024 * 1024; // 5 MB
export const MAX_FILES = 5;

export const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

export const readFile = (f) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res({ name: f.name, type: f.type, size: f.size, data: r.result });
    r.onerror = rej;
    r.readAsDataURL(f);
  });

// DB message -> UI message (DB me role "model" hota hai, UI me "ai")
export const toUi = (m) => ({ id: m._id, role: m.role === "model" ? "ai" : "user", text: m.content });

export const displayName = (u) =>
  u?.fullName?.firstName
    ? `${u.fullName.firstName} ${u.fullName.lastName || ""}`.trim()
    : u?.email?.split("@")[0] || "User";

export const initials = (u) =>
  displayName(u).split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
