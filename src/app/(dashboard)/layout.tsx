import { ReactNode } from "react";
import Header from "../components/header";

export default function Dashboard({ children }: { children: ReactNode }) {
    return <div>
        <Header />
        {children}
    </div>
}