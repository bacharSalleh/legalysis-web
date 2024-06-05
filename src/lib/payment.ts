import { AllPacks, PACK_NAMES, proPack, starterPack, valuePack } from "@/config/payment";
import { PackDetails } from "@/types";

export function getPackFrom(plan: string | null) {
    let requestedPlan: PackDetails | null = null;
    if (plan == PACK_NAMES.STARTER_PACK) {
        requestedPlan = starterPack;
    } else if (plan == PACK_NAMES.PRO_PACK) {
        requestedPlan = proPack;
    } else if (plan == PACK_NAMES.VALUE_PACK) {
        requestedPlan = valuePack;
    }

    return requestedPlan;
}

export function getPackCreditFromPriceId(priceId?: string) {
    const plan = priceId ? AllPacks[priceId] || starterPack : starterPack;
    return plan.credits;
}
