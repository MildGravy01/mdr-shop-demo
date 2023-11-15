import Modal from "../../../../components/Modal";
import { Background, Footer, Header, Image, SubHeader, Wrapper } from "./style";
import success from '../../../../img/success.png';
import Confetti from "react-confetti";
export const SuccessModal = ({isOpen, closeHandler}) => {
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <Background onClick={(e) => e.stopPropagation()}>
      <Header>Спасибо за Вашу покупку и поддержку проекта!</Header>
        <Wrapper>
        <SubHeader>
          Возможно вам нужно будет перезайти на сервер, чтобы покупка применилась. Если покупка не
          применилась напишите нам в <a className="discord" href="https://discord.com/invite/vVbYGcNMj8">Дискорд</a> или <a className="vk" href="https://vk.com/mdrserver">Вконтакте</a>
        </SubHeader>
        <Footer>Всегда ваша, администрация MDR ❤️</Footer>
        <Image src={success}></Image>
        </Wrapper>
      </Background>
    </Modal>
  );
};
