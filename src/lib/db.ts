import {PrismaClient} from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


export function removeKeys<T, Key extends keyof T>(
    object: T,
    keysToRemove: Key[]
): Omit<T, Key> {
    return Object.entries(object as {}).reduce((acc, [key, value]) => {
        if (!keysToRemove.includes(key as Key)) {
            (acc as any)[key as keyof typeof acc] = value;
        }
        return acc;
    }, {} as Omit<T, Key>);
}

