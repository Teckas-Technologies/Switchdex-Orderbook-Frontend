import {
  Accordion,
  Typography,
  Illustrations,
  Interaction,
} from "@polkadex/ux";
import { MINIMUM_PDEX_REQUIRED } from "@orderbook/core/constants";

import { GenericInfoCard, GenericExternalCard } from "../ReadyToUse";

export const InsufficientBalance = ({
  onClose,
  balance,
  fee = MINIMUM_PDEX_REQUIRED,
}: {
  balance?: number;
  fee?: number;
  onClose: () => void;
}) => {
  return (
    <Interaction className="w-full">
      <Interaction.Content className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2 border-b border-primary">
          <div className="py-6 flex flex-col gap-5 items-center text-center">
            <div className="max-w-[8rem]">
              <Illustrations.Error className="max-w-[6rem] w-full" />
            </div>
            <Typography.Text appearance="primary">
              It seems that you don&lsquo;t have enough funds to cover the
              transaction fees and existential deposit.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-2 pb-4">
            <GenericInfoCard label="Your balance">
              {balance} PDEX
            </GenericInfoCard>
            <GenericInfoCard label="Balance required">
              {fee} PDEX
            </GenericInfoCard>
          </div>
        </div>
        <Accordion type="single" defaultValue="accordion1">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Heading type="h4" size="xs" className="mb-4">
                Explore ways to get PDEX
              </Typography.Heading>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <GenericExternalCard
                  href="https://www.kucoin.com/trade/PDEX-USDT"
                  icon="Exchange"
                >
                  Centralized exchanges
                </GenericExternalCard>
                <GenericExternalCard
                  href="https://thea.polkadex.trade/"
                  icon="DecentralizedBridge"
                >
                  Decentralized bridge
                </GenericExternalCard>
                <GenericExternalCard href="#" icon="Free" disabled>
                  Get 1 PDEX for free
                </GenericExternalCard>
                <GenericExternalCard href="#" icon="CreditCard" disabled>
                  Credit Card
                </GenericExternalCard>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};