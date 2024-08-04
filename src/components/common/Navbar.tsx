export default function Navbar() {
  return (
    <nav className="fixed z-10 w-full bg-white p-5 shadow-sm dark:border-b dark:border-neutral-800 dark:bg-dark">
      <div className="w-full max-w-7xl mx-auto flex justify-between">
        <div>Logo</div>

        <input type="text" className="bg-slate-200 rounded-sm " />
        <ul className="flex gap-4">
          <li>Home</li>
          <li>My network</li>
          <li>Notifications</li>
          <li>Me</li>
        </ul>
      </div>
    </nav>
  );
}
