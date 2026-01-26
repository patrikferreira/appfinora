import { ApiResponse, User } from "./AppTypes";

export async function createUser(payload: User): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to create user");
    }
    return data as ApiResponse;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}
