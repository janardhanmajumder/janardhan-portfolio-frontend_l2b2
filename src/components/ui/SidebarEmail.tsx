"use client";

const SidebarEmail = () => {
  const email = "janardhan.md03@gmail.com";
  return (
    <p
      onClick={() => navigator.clipboard.writeText(email)}
      title="Click to copy email"
      className="mt-0.5 mb-4 text-xs text-zinc-400 hover:text-violet-400 font-mono tracking-tight cursor-pointer transition-colors duration-200"
    >
      {email}
    </p>
  );
};

export default SidebarEmail;
