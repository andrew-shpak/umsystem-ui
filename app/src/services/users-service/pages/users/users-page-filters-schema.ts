import * as z from "zod";

const usersPageFiltersSchema = z.object({
    educationProgramId: z.string().optional(),
    year: z.number()
        .positive()
        .min(1)
        .max(5)
        .optional(),
    start: z.date().optional(),
    end: z.date().optional(),
    educationFormId: z.string().optional(),
    educationLevelId: z.string().optional(),
    financialSourceId: z.string().optional(),
    deleted: z.boolean().optional(),
    userId: z.string().optional(),
});
export type UsersPageFilters = z.infer<typeof usersPageFiltersSchema>;
export {
    usersPageFiltersSchema
};