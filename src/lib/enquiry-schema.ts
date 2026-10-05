import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please give your full name."),
  email: z.string().trim().email("That email address does not look right."),
  trip: z.string().min(1, "Choose a trip."),
  departureDate: z.string().optional(),
  month: z.string().min(1, "Pick a preferred month."),
  groupSize: z.coerce
    .number({ invalid_type_error: "Enter a number." })
    .int("Enter a whole number.")
    .min(1, "At least one traveller.")
    .max(30, "For groups over 30, email us directly."),
  message: z
    .string()
    .trim()
    .max(2000, "Keep it under 2000 characters.")
    .optional()
    .or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
