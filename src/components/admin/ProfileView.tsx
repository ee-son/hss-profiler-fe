import type { ProfileResponse } from "../../types/profile";
import ResultCard from "../ResultCard";
import { X } from "lucide-react";

interface ProfileViewProps {
  profile: ProfileResponse | null;
  onClose: () => void;
}

function ProfileView({
  profile,
  onClose,
}: ProfileViewProps) {
  if (!profile) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="pr-10">
          <ResultCard data={profile} />
        </div>
      </div>
    </div>
  );
}

export default ProfileView;