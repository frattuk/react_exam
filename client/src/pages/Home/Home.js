import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/utils/Input";
import { Link } from "react-router-dom";
import AutoHeightTextarea from "../../components/textarea/Textarea";

const Home = () => {
  return (
    <>
      <Link to="/login">
        <Button type="contained">Užduoti klausimą</Button>
      </Link>

      <Card>
        <Input type="styled" placeholder="Tema" />
        <br />
        <br />
        <AutoHeightTextarea />

        <Button type="contained">Išsiųsti</Button>

        <Button type="outlined">Ištrinti</Button>
      </Card>
    </>
  );
};
export default Home;
