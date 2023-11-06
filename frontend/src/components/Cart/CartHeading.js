import { useTranslation } from "react-i18next";

export default function CartHeading({ amount }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center p-3 font-bold">
      <div className="capitalize">{t("content.shopping-cart")}</div>
      <div>{amount} {t("content.item")}</div>
    </div>
  );
}
