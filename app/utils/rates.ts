export type RateResolution = {
  rateCents: number; // cents per hour
  source: "matter" | "practiceArea" | "attorney" | "default";
  appliedOn?: string; // ISO date when rate applies
};

// Prototype stub data — in a real app this would be fetched from the backend
const MOCK_RATES: {
  attorneys: Record<number, number>;
  practiceAreas: Record<number, number>;
  matters: Record<number, number>;
  default: number;
} = {
  attorneys: {
    1: 7500,
  },
  practiceAreas: {
    1: 8500,
  },
  matters: {},
  default: 5000,
};

export function resolveRate({
  matterId,
  practiceAreaId,
  attorneyId,
}: {
  matterId?: number | null;
  practiceAreaId?: number | null;
  attorneyId?: number | null;
}): RateResolution {
  // Most specific: matter -> practiceArea -> attorney -> default
  if (matterId && MOCK_RATES.matters[matterId]) {
    return { rateCents: MOCK_RATES.matters[matterId], source: "matter" };
  }

  if (practiceAreaId && MOCK_RATES.practiceAreas[practiceAreaId]) {
    return { rateCents: MOCK_RATES.practiceAreas[practiceAreaId], source: "practiceArea" };
  }

  if (attorneyId && MOCK_RATES.attorneys[attorneyId]) {
    return { rateCents: MOCK_RATES.attorneys[attorneyId], source: "attorney" };
  }

  return { rateCents: MOCK_RATES.default, source: "default" };
}
