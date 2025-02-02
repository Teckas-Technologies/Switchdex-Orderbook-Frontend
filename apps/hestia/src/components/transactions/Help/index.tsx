"use client";

import { Button } from "@polkadex/ux";
import { forwardRef } from "react";
import Link from "next/link";
import { RiExternalLinkLine } from "@remixicon/react";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex items-center border-t border-primary">
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Link
          href="#"
          target="_blank"
        >
          <Button.Icon variant="outline">
            <RiExternalLinkLine className="w-full h-full" />
          </Button.Icon>
        </Link>
      </Card>
    </div>
  );
});

Help.displayName = "Help";
