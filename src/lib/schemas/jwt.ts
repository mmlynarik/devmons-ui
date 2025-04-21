import {z} from "zod";

export type JWTPrivateClaims = {
    userId: number;
};

export const jwtSchema = z.object({
    userId: z.number(),
    aud: z.literal("vce"),
});

export type JWTSchema = z.infer<typeof jwtSchema>;
