import { redirect } from "next/navigation";

export default function LocaleRedirect() {
    redirect("/en/compressor");
}