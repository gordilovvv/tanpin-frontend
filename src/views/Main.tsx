
import { PromoComponent } from "./Home/Components/Promo/PromoComponent";
import { SliderComponent } from "./Home/Components/HomeSlider/HomeSlider";
import { Container } from '@/components/Layout';
export function Main() {
  return (
    <main>
      <Container>
        <PromoComponent />
      </Container>

      <div style={{overflow: "hidden", transform: "translateZ(0)"}}>
        <Container>
          <SliderComponent />
        </Container>
      </div>
    </main>
  )
}
