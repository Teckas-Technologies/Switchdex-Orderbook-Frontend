import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectIsUserSignedIn } from "../modules/user/profile";

const BalancesTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Balances").then((mod) => mod.BalancesTemplate),
  {
    ssr: false,
  }
);
const Balances = () => {
  const router = useRouter();
  const hasUser = useReduxSelector(selectIsUserSignedIn);

  useEffect(() => {
    if (!hasUser) router?.push("/trading/");
  }, [hasUser, router]);

  if (!hasUser) return <div />;
  return <BalancesTemplate />;
};

export default Balances;