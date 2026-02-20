import WebShell from "@/components/WebShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <WebShell>{children}</WebShell>;
}