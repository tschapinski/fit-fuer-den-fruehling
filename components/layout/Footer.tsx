export default function Footer() {
    return (
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-[#3a3a3a] mt-12 bg-[#0a0a0a]">
            <p>© {new Date().getFullYear()} All In Wiesloch GmbH / Timeless Motors</p>
            <div className="mt-2 space-x-4">
                <a href="https://kfz-werkstatt-rhein-neckar-kreis.de/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Impressum</a>
                <span className="opacity-50">·</span>
                <a href="https://kfz-werkstatt-rhein-neckar-kreis.de/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Datenschutz</a>
            </div>
        </footer>
    );
}
