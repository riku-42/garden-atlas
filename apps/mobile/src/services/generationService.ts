import type { StartGenerationRequest, StartGenerationResponse } from "@garden-atlas/shared";

export async function startMockGeneration(_request: StartGenerationRequest): Promise<StartGenerationResponse> {
  return {
    generation: {
      id: "gen_mock",
      status: "processing",
      estimatedSeconds: 12
    }
  };
}
