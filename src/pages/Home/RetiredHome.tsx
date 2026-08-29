import { useNavigate } from "react-router-dom";
import HomeBanner from "@/components/Home/HomeBanner";
import InfoCard from "@/components/common/card/InfoCard";
import { HOME_BANNERS, HOME_INFO_CARDS } from "@/mocks/homeContents";

export default function RetiredHome() {
  const navigate = useNavigate();
  const banner = HOME_BANNERS.retired;
  const infoCards = HOME_INFO_CARDS.retired;

  return (
    <>
      <HomeBanner
        userType="retired"
        title={banner.title}
        descriptions={banner.descriptions}
        buttonLabel={banner.buttonLabel}
        onButtonClick={() => navigate("/diagnosis")}
      />

      <h2 className="mt-8 text-sm text-neutral-400">더 알아보기</h2>

      <div className="mt-3 flex flex-col gap-3">
        {infoCards.map((card) => (
          <InfoCard key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </>
  );
}
