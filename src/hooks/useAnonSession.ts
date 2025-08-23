import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAnonSession() {
    const [ready, setReady] = useState(false);
    const [sessionError, setSessionError] = useState<null | string>(null);

    useEffect(() => {
        let unsub = () => { };

        (async () => {
            try {
                // 1) Already have a session?
                const { data: { session } } = await supabase.auth.getSession();

                // 2) If not, sign in anonymously
                if (!session) {
                    const { error } = await supabase.auth.signInAnonymously();
                    if (error) throw error;
                }

                // 3) Optional: keep local state in sync with auth changes
                const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
                    // You could store user id in state here if needed
                });
                unsub = () => sub.subscription.unsubscribe();

                setReady(true);
            } catch (err: any) {
                setSessionError(err?.message ?? "Failed to create anonymous session");
                setReady(true); // still render; you may show a toast
            }
        })();

        return () => unsub();
    }, []);

    return { ready, sessionError };
}
