export default function QuizLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
            <main className="flex-grow flex items-center justify-center w-full">
                {children}
            </main>
        </div>
    );
}
