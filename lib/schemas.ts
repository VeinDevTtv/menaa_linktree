import { z } from "zod"

export const officerApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  discordName: z.string().min(1, "Discord name is required"),
  email: z.string().email("Invalid email"),
  yearMajor: z.string().min(1, "Year/Major is required"),
  rolesInterested: z.enum([
    "Vice President",
    "Treasurer",
    "Secretary",
    "Event Coordinator",
  ], {
    required_error: "Please select a role",
    invalid_type_error: "Please select a role",
  }),
  availability: z.string().min(1, "Availability is required"),
  whyJoin: z.string().min(1, "This field is required"),
  experience: z.string().optional(),
  codeOfConduct: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the Code of Conduct",
    }),
  website: z.string().optional(),
})

export type OfficerApplicationInput = z.infer<typeof officerApplicationSchema>

export const memberRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  attendance: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  website: z.string().optional(),
})

export type MemberRegistrationInput = z.infer<typeof memberRegistrationSchema>


