import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function NavBar() {
    return (
        <nav className="flex gap-5 p-4 bg-white/20 backdrop-blur border-b dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
            <span className='font-bold text-black mt-2'>Simple Tools</span><span><LanguageSwitcher /></span>
        </nav>
    );
}