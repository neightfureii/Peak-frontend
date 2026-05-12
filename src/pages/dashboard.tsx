import { useState } from "react";
import { Bell, Menu, User, Phone, Mail, MapPin, Facebook, Twitter, Instagram, X, Pencil, Trash2, LogOut, ChevronDown } from "lucide-react";

type Visibility = "students" | "captains" | "amalgamated club" | "";

interface Notice {
  noticeid: number;
  title: string;
  content: string;
  publishdate: string;
  publishtime: string;
  visibility: Visibility;
}

const VISIBILITY_LABELS: Record<string, string> = {
  students: "ALL STUDENTS",
  captains: "ONLY SPORTS CAPTAINS",
  "amalgamated club": "AMALGAMATED CLUB",
};

const MOCK_NOTICES: Notice[] = [
  {
    noticeid: 1,
    title: "Inter-Faculty Games 2024",
    content:
      "All sports captains are reminded that the Inter-Faculty Games registration deadline is December 15th. Please submit your team lists promptly.",
    publishdate: "2024-11-20",
    publishtime: "09:30:00",
    visibility: "captains",
  },
  {
    noticeid: 2,
    title: "Ground Maintenance Notice",
    content:
      "The main sports ground will be closed for maintenance from November 25–27. Please plan practice sessions accordingly.",
    publishdate: "2024-11-18",
    publishtime: "14:00:00",
    visibility: "students",
  },
];

let nextId = 3;

function Badge({ visibility }: { visibility: string }) {
  const colors: Record<string, string> = {
    students: "bg-blue-100 text-blue-800",
    captains: "bg-amber-100 text-amber-800",
    "amalgamated club": "bg-purple-100 text-purple-800",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${colors[visibility] ?? "bg-gray-100 text-gray-700"}`}
    >
      {VISIBILITY_LABELS[visibility] ?? visibility.toUpperCase()}
    </span>
  );
}

const Dashboard = () => {
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Add form
  const [addForm, setAddForm] = useState({ title: "", content: "", visibility: "" as Visibility | "" });
  const [addErrors, setAddErrors] = useState<{ title?: string; content?: string; visibility?: string }>({});

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<Notice | null>(null);

  function validateAdd() {
    const errs: typeof addErrors = {};
    if (!addForm.title.trim()) errs.title = "Title is required.";
    if (!addForm.content.trim()) errs.content = "Content is required.";
    if (!addForm.visibility) errs.visibility = "Visibility is required.";
    return errs;
  }

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAdd();
    if (Object.keys(errs).length) { setAddErrors(errs); return; }
    const now = new Date();
    setNotices([
      {
        noticeid: nextId++,
        title: addForm.title,
        content: addForm.content,
        visibility: addForm.visibility as Visibility,
        publishdate: now.toISOString().slice(0, 10),
        publishtime: now.toTimeString().slice(0, 8),
      },
      ...notices,
    ]);
    setAddForm({ title: "", content: "", visibility: "" });
    setAddErrors({});
  }

  function openEdit(n: Notice) {
    setEditForm({ ...n });
    setEditOpen(true);
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editForm) return;
    setNotices(notices.map((n) => (n.noticeid === editForm.noticeid ? editForm : n)));
    setEditOpen(false);
  }

  function deleteNotice(id: number) {
    if (!window.confirm("Delete this notice?")) return;
    setNotices(notices.filter((n) => n.noticeid !== id));
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold mb-4">
            <img src="/images/uoc_logo.png" alt="uoc_logo" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Physical Education Administrative Kit</h1>
          <p className="text-gray-500 mt-1">University of Colombo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── ADD NOTICE FORM ─── */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Publish Notice</h2>
              <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={addForm.title}
                    onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {addErrors.title && <p className="text-red-500 text-xs mt-1">{addErrors.title}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Content"
                    rows={4}
                    value={addForm.content}
                    onChange={(e) => setAddForm({ ...addForm, content: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                  {addErrors.content && <p className="text-red-500 text-xs mt-1">{addErrors.content}</p>}
                </div>
                <select
                  value={addForm.visibility}
                  onChange={(e) => setAddForm({ ...addForm, visibility: e.target.value as Visibility })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">-- Select Visibility --</option>
                  <option value="students">All Students</option>
                  <option value="captains">Only Sports Captains</option>
                  <option value="amalgamated club">Amalgamated Club</option>
                </select>
                {addErrors.visibility && <p className="text-red-500 text-xs mt-1">{addErrors.visibility}</p>}
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
                >
                  Publish Notice
                </button>
              </form>
            </div>
          </div>

          {/* ─── NOTICES LIST ─── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {notices.length === 0 && (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-400 text-sm">
                No notices yet. Publish one to get started.
              </div>
            )}
            {notices.map((n) => (
              <div
                key={n.noticeid}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{n.title}</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{n.content}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-gray-400">
                        Published: {n.publishdate} at {n.publishtime}
                      </span>
                      <Badge visibility={n.visibility} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(n)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-emerald-600 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => deleteNotice(n.noticeid)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ─── EDIT MODAL ─── */}
      {editOpen && editForm && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">Edit Notice</h2>
              <button
                onClick={() => setEditOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
                <textarea
                  rows={4}
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Visibility</label>
                <select
                  value={editForm.visibility}
                  onChange={(e) => setEditForm({ ...editForm, visibility: e.target.value as Visibility })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">-- Select Visibility --</option>
                  <option value="students">All Students</option>
                  <option value="captains">Only Sports Captains</option>
                  <option value="amalgamated club">Only Amalgamated Club</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg py-2.5 transition-colors mt-1"
              >
                Update Notice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard