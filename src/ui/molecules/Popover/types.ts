import { OverlayTriggerProps as OverlayTriggerPropsAria } from "@react-aria/overlays";
import { OverlayTriggerProps } from "@react-types/overlays";
import {
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
  RefObject,
} from "react";

import { Content } from "./content";
import { Trigger } from "./trigger";
import { usePopover } from "./usePopover";

import { Placement } from "@polkadex/orderbook/utils/types";

export type PopoverProps = {
  children?: ReactNode[];
} & UsePopoverProps;

export type UsePopoverProps = {
  onClose?: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  placement?: Placement;
  triggerType?: OverlayTriggerPropsAria["type"];
  isDismissable?: boolean;
  offset?: number;
  shouldFlip?: boolean;
  popoverScrollRef?: RefObject<HTMLElement>;
} & OverlayTriggerProps;

export type UsePopoverReturn = ReturnType<typeof usePopover>;

export type PopoverComponent<T = {}, P = HTMLDivElement> = ForwardRefExoticComponent<
  PropsWithChildren<T> & RefAttributes<P>
>;

export type PopoverBaseComponent = PopoverComponent<PopoverProps, HTMLDivElement> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
};
