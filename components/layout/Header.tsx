import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="p-4 md:p-6 flex justify-center sticky top-0 md:bg-opacity-90 z-50">
            <Link href="/">
                <Image
                    src="https://kfz-werkstatt-rhein-neckar-kreis.de/wp-content/uploads/all-in-wiesloch-logo-filled.svg"
                    alt="All In Wiesloch Logo"
                    width={180}
                    height={60}
                    className="h-12 md:h-16 w-auto"
                    priority
                />
            </Link>
        </header>
    );
}
