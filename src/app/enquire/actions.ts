"use server";

import { enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";

export interface EnquiryResult {
  ok: boolean;
  message: string;
}

export async function submitEnquiry(
  data: EnquiryInput
): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please check the highlighted fields." };
  }

  const payload = { ...parsed.data, receivedAt: new Date().toISOString() };

  // Log the enquiry payload. TODO: send via an email provider (e.g. Resend)
  // once credentials are configured, and store in a database.
  console.log("[enquiry]", JSON.stringify(payload));

  return {
    ok: true,
    message:
      "Thanks. Your enquiry is with us and we reply within one working day.",
  };
}
