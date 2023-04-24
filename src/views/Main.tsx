
import { PromoComponent } from "./Home/Components/Promo/PromoComponent";
import { SliderComponent } from "./Home/Components/HomeSlider/HomeSlider";
import { Container } from '@/components/Layout';
export function Main() {
  return (
    <main>
      <Container>
        <PromoComponent />
      </Container>
      <Container>
        <SliderComponent />
      </Container>
    </main>
  )
}
