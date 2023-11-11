import * as z from "zod";

const workSchema = z.object({
    url: z.string().optional(),
    includeInReport: z.boolean().optional(),
    includeInCv: z.boolean().optional(),
    plannedHours: z.number().optional(),
    hours: z.number().optional(),
    workTypeId: z.string(),
    description: z.string(),
    date: z.date(),

});
export type Work = z.infer<typeof workSchema>;
export {
    workSchema
};