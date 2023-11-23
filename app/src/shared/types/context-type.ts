import type {environmentSchema} from "~/environment.server";
import type * as z from "zod";
import type {Theme} from "~/src/shared/types/theme";
import {SupabaseClient} from "@supabase/supabase-js";

export type ContextType = {
    // permissions: string[]
    // messages: Message[]
    // messagesCount: number
    // user: UserProfile
    theme: Theme | null
    supabaseClient: SupabaseClient
    environment: z.infer<typeof environmentSchema>
}
