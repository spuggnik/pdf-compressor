'use client';

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;

        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <select
            onChange={handleChange}
            value={locale}
            className="p-2 border rounded-md bg-white text-gray-800"
            >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
            </select>
    );
}