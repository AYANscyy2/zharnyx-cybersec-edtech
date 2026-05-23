// Programs use their own SyllabusLayout — no global navbar/footer needed
export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
