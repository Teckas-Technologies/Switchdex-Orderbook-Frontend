import {
  ComponentProps,
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from "react";
import { Button, Icon, Loading, Typography } from "@polkadex/ux";
import type { IconsProps } from "@polkadex/ux";

import { ErrorMessage } from ".";

interface GenericHorizontalCardProps
  extends ComponentPropsWithoutRef<"button"> {
  title: string;
  icon: IconsProps;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}
export const GenericHorizontalCard = ({
  title,
  icon,
  children,
  loading,
  error,
  disabled,
  ...props
}: PropsWithChildren<GenericHorizontalCardProps>) => {
  const isStringType = typeof children === "string";
  const elementProps =
    !children && ({ role: "button", ...props } as ComponentProps<"div">);

  return (
    <Loading.Spinner active={!!loading}>
      <div
        {...elementProps}
        className={`flex flex-col gap-3 group ${
          disabled && "opacity-40 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 rounded-md border border-secondary group-hover:bg-level-1 duration-300 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <Icon
                name={icon}
                className="text-primary group-hover:text-current transition-colors duration-300"
              />
            </div>
            <Typography.Text
              appearance="primary"
              className="group-hover:text-current transition-colors duration-300"
            >
              {title}
            </Typography.Text>
          </div>
          {isStringType ? (
            <Button.Solid appearance="secondary" size="sm" {...props}>
              {children}
            </Button.Solid>
          ) : (
            children
          )}
        </div>
        {error && !loading && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </Loading.Spinner>
  );
};