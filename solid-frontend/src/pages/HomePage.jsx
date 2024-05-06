import logo from "../assets/favicon.ico";
import Card from "../components/Card";
import Card2 from "../components/Card2";
import ChangeName from "../components/ChangeName";

function Home() {
  return (
    <div className="flex-cols">
      <ChangeName />
      <Card
        name="Laptop Gaming ASUS ROG Zephyrus G14 GA401IHR-HZ015 cu procesor AMD Ryzen 7 4800HS"
        available={true}
      />
      <Card
        name="Laptop Gaming ASUS ROG Zephyrus Duo 16 GX650PZ cu procesor AMD Ryzen 9 7945HX pana la 5.40 GHz"
        available={false}
      />
      <Card2 name="Card with children" available={false}>
        <div class="mx-2 flex-none">
          <img src={logo} alt="img" />
        </div>
        <div className="flex-col">
          <h2>Card with children</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            distinctio in nobis, iste laudantium placeat id maxime illo
            temporibus harum odio hic nesciunt, quos ea architecto corrupti
            molestias eius saepe!
          </p>
        </div>
      </Card2>
    </div>
  );
}
export default Home;
