import { useNavigate } from "react-router-dom";
import HomeBanner from "@/components/Home/HomeBanner";
import InfoCard from "@/components/common/card/InfoCard";
import { HOME_BANNERS, HOME_INFO_CARDS } from "@/mocks/homeContents";

export default function EmployedHome() {
  const navigate = useNavigate();
  const banner = HOME_BANNERS.employed;
  const infoCards = HOME_INFO_CARDS.employed;

  return (
    <>
      <HomeBanner
        userType="employed"
        title={banner.title}
        descriptions={banner.descriptions}
        buttonLabel={banner.buttonLabel}
        onButtonClick={() => navigate("/pension-scenario")}
      />

      <h2 className="mt-8 text-sm text-neutral-400">더 알아보기</h2>

      <div className="mt-3 flex flex-col gap-3">
        {infoCards.map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            description={card.description}
            onClick={card.path ? () => navigate(card.path!) : undefined}
          />
        ))}
      </div>
    </>
  );
}
