import z from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1,"Title Is Required").max(255,"Title must be less than 255 characters"),
    description: z.string().min(1,"Description Is Required").max(5000,"Description must be less than 5000 characters"),
});


export const PatchIssueSchema = z.object({
    title: z.string().min(1,"Title Is Required").max(255,"Title must be less than 255 characters").optional(),
    description: z.string().min(1,"Description Is Required").max(5000,"Description must be less than 5000 characters").optional(),
    assignedToUserId: z.string().min(1,"Assignee Id Is Required").max(255,"Assignee Id must be less 255 characters").optional().nullable(),


})
