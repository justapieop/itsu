"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { Avatar, Dropdown, DropdownSection, DropdownTrigger, Header, Key, Label, Separator } from "@heroui/react";
import { JSX } from "react";
import { useAuthgear } from "@authgear/nextjs/client";

interface DropdownAvatarClientProps {
  data: any;
}

export function DropdownAvatarClient({ data }: DropdownAvatarClientProps): JSX.Element {
  const router = useRouter();
  const { signOut, signIn } = useAuthgear();

  const handleClick = (key: Key) => {
    switch (key.toString()) {
      case "view-profile": {
        router.push("/profile");
        break;
      }
      case "logout": {
        signOut();
        break;
      }
      case "login": {
        signIn(); 
        break;
      }
    }
  };

  const userAvatar = (
    <Avatar>
      <Avatar.Image alt={data?.email} src={data?.avatar_url} />
      <Avatar.Fallback>{data?.email?.charAt(0).toUpperCase() || "U"}</Avatar.Fallback>
    </Avatar>
  );

  return (
    <Dropdown>
      <DropdownTrigger>{userAvatar}</DropdownTrigger>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={handleClick}>
          {data ? (
            <>
              <DropdownSection>
                <Header>Chào mừng!</Header>
                <Dropdown.Item>
                  <Label>{data.email}</Label>
                </Dropdown.Item>
              </DropdownSection>
              <Separator />
              <DropdownSection>
                <Dropdown.Item id="view-profile">
                  <UserCircleIcon className="size-4" />
                  <Label>Hồ sơ</Label>
                </Dropdown.Item>
                <Dropdown.Item id="logout">
                  <ArrowLeftStartOnRectangleIcon className="size-4 fill-red-600" />
                  <Label className="label--invalid">Đăng xuất</Label>
                </Dropdown.Item>
              </DropdownSection>
            </>
          ) : (
            <Dropdown.Item id="login">
               <Label>Đăng nhập</Label>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}