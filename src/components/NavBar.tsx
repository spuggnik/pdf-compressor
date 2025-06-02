import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="flex gap-4 p-4 bg-white/20 backdrop-blur border-b dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <span className='font-bold text-black'>Simple Tools</span>
        </nav>
    );
}