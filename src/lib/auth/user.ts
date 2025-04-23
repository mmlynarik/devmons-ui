import {BASE_API_URI} from "@/config";
import {generateSalt, hashPassword} from "@/lib/auth/passwordHasher";
import {SignUpSchema} from "@/lib/schemas/signup";

type UserCreated = {
    id: number;
    email: string;
};

type User = {
    id: number;
    email: string;
    password: string;
    salt: string;
};

export async function registerUser(parsedForm: SignUpSchema): Promise<UserCreated> {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(parsedForm.password, salt);

    const payload = JSON.stringify({email: parsedForm.email, password: hashedPassword, salt: salt});
    const res = await fetch(`${BASE_API_URI}/users`, {
        method: "POST",
        body: payload,
        headers: {"Content-Type": "application/json"},
    });
    return await res.json();
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const res = await fetch(`${BASE_API_URI}/users/${email}`);
    if (!res.ok) {
        return null;
    }
    return await res.json();
}
