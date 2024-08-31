import { Logo, Typography } from "@polkadex/ux";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/ui";

export const Footer = () => {
  return (
    <footer className="max-w-screen-2xl max-2xl:px-2 mx-auto w-full border-t border-primary">
      <div className="flex flex-wrap gap-10 justify-between py-10">
        {/* <Logo.Orderbook className="min-w-[150px] h-7 flex-1" /> */}
        <Link
          href="/"
          className="min-w-[150px] h-7 flex-1 md:ml-[130px]"
        >
          <div className="logo h-8 w-auto flex items-center gap-1">
            <img src="img/dark_switchdex_logo.jpg" className="h-8 w-8" alt="" />
            <h2 className="text-lg text-white">Switchdex</h2>
          </div>
          {/* <Logo.Orderbook className="max-md:pointer-events-none max-md:h-8 max-md:[&_g]:hidden" /> */}
        </Link>
        {data.map((value) => (
          <div key={value.title} className="flex-1 flex flex-col gap-4">
            <Typography.Heading type="h4" size="md">
              {value.title}
            </Typography.Heading>
            <div className="flex flex-col gap-3">
              {value.links.map((val) => (
                <Typography.Text
                  key={val.title}
                  appearance="primary"
                  className="hover:text-current duration-300 transition-colors whitespace-nowrap"
                >
                  <Link href={val.href} target={val.target}>
                    {val.title}
                  </Link>
                </Typography.Text>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-md:flex-col md:mx-8 gap-3 flex md:items-center justify-between py-5 border-t border-primary">
        <div className="max-md:flex-1 flex items-center max-md:justify-between gap-4">
          <Typography.Text>Copyright ©2024 Switchdex Inc.</Typography.Text>
          <Typography.Text
            appearance="primary"
            className="hover:text-current duration-300 transition-colors"
          >
            <Link
              href="/"
              target="_blank"
            >
              Terms and conditions
            </Link>
          </Typography.Text>
          <Typography.Text
            appearance="primary"
            className="hover:text-current duration-300 transition-colors"
          >
            <Link
              href="/"
              target="_blank"
            >
              Privacy policy
            </Link>
          </Typography.Text>
        </div>
        <div className="flex items-center gap-2">
          {socialMedia.map((val) => {
            const IconCompontent = Icons[val.iconName as keyof typeof Icons];

            return (
              <Link
                target={val.target}
                href={val.href}
                key={val.iconName}
                className="grid place-content-center w-7 h-7"
              >
                <IconCompontent className="w-4 h-4 fill-white" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

const data = [
  {
    title: "About us",
    links: [
      {
        title: "Overview",
        href: "/",
        target: "_blank",
      },
      {
        title: "Roadmap",
        href: "/",
        target: "_blank",
      },
      {
        title: "Token economics",
        href: "/",
        target: "_blank",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        title: "Orderbook",
        href: "/",
        target: "_blank",
      }
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Github Repository",
        href: "/",
        target: "_blank",
      },
      {
        title: "Tutorials",
        href: "/",
        target: "_blank",
      },
      {
        title: "Substrate",
        href: "/",
        target: "_blank",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help center",
        href: "/",
        target: "_blank",
      },
      {
        title: "Report issues",
        href: "/",
        target: "_blank",
      },
      {
        title: "Beginner's guide",
        href: "/",
        target: "_blank",
      },
    ],
  },
];

const socialMedia = [
  {
    alt: "Twitter logo",
    iconName: "Twitter",
    href: "/",
    target: "_blank",
  },
  {
    alt: "Telegram logo",
    iconName: "Telegram",
    href: "/",
    target: "_blank",
  },
  {
    alt: "Medium logo",
    iconName: "Medium",
    href: "/",
    target: "_blank",
  },
  {
    alt: "Reddit logo",
    iconName: "Reddit",
    href: "/",
    target: "_blank",
  },
  {
    alt: "Discord logo",
    iconName: "Discord",
    href: "/",
    target: "_blank",
  },
];
