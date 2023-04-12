import { TransitionGroup, CSSTransition } from "react-transition-group";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { selectNotificationsAlert } from "@polkadex/orderbook/providers/public/settings/helpers";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const Notifications = () => {
  const { onNotificationMarkAsReadBy, notification } = useSettingsProvider();
  const notifications = selectNotificationsAlert(notification);

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <TransitionGroup className="notifications">
          {notifications?.map((value, i) => {
            return (
              <CSSTransition key={i} timeout={300} classNames="notification">
                <Card
                  onRemove={() => onNotificationMarkAsReadBy({ id: value.id, by: "isActive" })}
                  {...value}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

const Card = ({
  type = "InformationAlert",
  message,
  time,
  actionTitle,
  actionUrl,
  onRemove,
  hasConfetti = false,
}: T.CardProps) => {
  const boxColor = (color: string) => {
    switch (color) {
      case "InformationAlert":
        return "blue";
      case "SuccessAlert":
        return "green";
      case "ErrorAlert":
        return "primary";
      case "LoadingAlert":
        return "tertiaryText";
      default:
        return "orange";
    }
  };
  useEffect(() => {
    if (hasConfetti)
      confetti({
        zIndex: 9999,
        origin: {
          x: 0.9,
          y: 0.4,
        },
      });
  }, [hasConfetti]);

  return (
    <S.CardWrapper borderColor={boxColor(type)}>
      <S.Card>
        <div style={{ alignSelf: "flex-start" }}>
          <Icon size="extraSmall" name={type} />
        </div>
        <S.Container>
          <S.Title>
            <span>{message.title}</span>
            <p>{message.description}</p>
          </S.Title>

          <S.Actions>
            <small>{new Date(time).toLocaleString()}</small>
            {actionUrl?.length && <Link href={actionUrl}>{actionTitle}</Link>}
          </S.Actions>
        </S.Container>
      </S.Card>
      <S.Close type="button" onClick={onRemove}>
        <Icons.Close />
      </S.Close>
    </S.CardWrapper>
  );
};
