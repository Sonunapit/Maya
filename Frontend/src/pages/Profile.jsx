import { useAuth } from "../hooks/useAuth.js";
import EditProfile from "../components/profile/EditProfile.jsx";
import Button from "../components/common/Button.jsx";
import { displayName, initials } from "../utils/helpers.js";

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-xl space-y-8 px-4 py-8 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-xl font-bold text-onaccent">{initials(user)}</span>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{displayName(user)}</h2>
            <p className="truncate text-sm text-mute">{user.email}</p>
          </div>
        </div>
        <section>
          <h3 className="mb-3 text-sm font-semibold text-mute">Edit profile</h3>
          <EditProfile />
        </section>
        <Button variant="outline" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
}
