import { authgearConfig } from "@/lib/authgear";
import { auth } from "@authgear/nextjs/server";
import { client } from "@itsu/api-sdk";
import { JSX } from "react";
import { DropdownAvatarClient } from "./DropdownAvatarClient";

export async function DropdownAvatar(): Promise<JSX.Element> {
  const session = await auth(authgearConfig);

  let data = null;
  if (session?.accessToken) {
    const res = await client.GET("/users/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    data = res.data;
  }

  return <DropdownAvatarClient data={data} />;
}