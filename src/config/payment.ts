import { PackDetails } from "@/types";

export const PACK_NAMES = {
    STARTER_PACK: "Starter Pack",
    VALUE_PACK: "Value Pack",
    PRO_PACK: "Pro Pack",
    ENTERPRISE_PACK: "Enterprise Pack",
    FREE: "Free",
} as const;

export const freePlan: PackDetails = {
    name: PACK_NAMES.FREE,
    stripePriceId: "",
    credits: 3,
};

export const starterPack: PackDetails = {
    name: PACK_NAMES.STARTER_PACK,
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    credits: 35,
};

export const proPack: PackDetails = {
    name: PACK_NAMES.PRO_PACK,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "",
    credits: 375,
};

export const valuePack: PackDetails = {
    name: PACK_NAMES.VALUE_PACK,
    stripePriceId: process.env.STRIPE_VALUE_PRICE_ID || "",
    credits: 180,
};

export const AllPacks = {
    [process.env.STRIPE_STARTER_PRICE_ID!]: starterPack,
    [process.env.STRIPE_VALUE_PRICE_ID!]: valuePack,
    [process.env.STRIPE_PRO_PRICE_ID!]: proPack,
};
