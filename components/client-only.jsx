import { useIsClient } from "@/hooks/use-is-client";
import Spinner from "./spinner";
export function ClientOnly({ children }) {
    const isClient = useIsClient();
    return isClient ? <>{children}</> : <Spinner />;
}
