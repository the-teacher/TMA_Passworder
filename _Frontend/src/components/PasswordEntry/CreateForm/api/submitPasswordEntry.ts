import type { FormData } from "../validationSchema";
import type { ServerErrors } from "../utils/getFieldStatus";

export const submitPasswordEntry = async (
  data: FormData
): Promise<{ success: true } | { success: false; errors: ServerErrors }> => {
  const response = await fetch("https://api.example.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, errors: errorData };
  }

  return { success: true };
};
