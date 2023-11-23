import type {environmentSchema} from "~/environment.server";
import type * as z from "zod";
import type {Theme} from "~/src/shared/types/theme";
<<<<<<< Updated upstream
=======
import type {SupabaseClient} from "@supabase/supabase-js";
>>>>>>> Stashed changes

export type ContextType = {
    // permissions: string[]
    // messages: Message[]
    // messagesCount: number
    // user: UserProfile
    theme: Theme | null
    // supabase: SupabaseClient
    // accessToken: string
    environment: z.infer<typeof environmentSchema>
}
