import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Clipboard } from "../../components/Clipboard";
import Modal from "../../components/Modal";
import { OnlineStatus } from "../../components/OnlineStatus";
import { translation } from "../../translations";
import { copyToClipboard } from "../../utils/Clipboard";
import {
  AboutServer,
  BackgroundHolder,
  InfoHolder,
  LeftHolder,
  ModalBackground,
  Preloader,
  ProsHolder,
  RightHolder,
  ServerProsItem,
  StyledButton,
  StyledLink,
  StyledTab,
  StyledTabList,
  StyledTabPanel,
  StyledTabs,
  TabContent,
  TabImage,
  Wrapper,
} from "./style";
import Image from "../../img/image.png";
import boots from "../../img/boots.svg";
import chestplate from "../../img/chestplate.svg";
import heart from "../../img/heart.svg";
import star from "../../img/star.svg";
import gold from "../../img/gold.svg";
import pickaxe from "../../img/pickaxe.svg";
import feather from "../../img/feather.svg";
import bottle from "../../img/bottle.svg";
import emerald from "../../img/emerald.svg";
import ench_pickaxe from "../../img/ench_pickaxe.svg";
import sword from "../../img/sword.svg";
import survival_img from "../../img/survival.png";
import tnt from "../../img/tnt.svg";
import diamondOre from "../../img/diamondOre.svg";
import grief_img from "../../img/grief.jpeg";
import bedwars_img from "../../img/bedwars.png";
import map from "../../img/map.svg";
import { Page } from "../../components/Page";
import API from "../../api";

const About = () => {
  //useFetchGet("/api/server/status");
  const [data, setData] = useState({});
  const [modal, setModal] = useState();
  useEffect(() => {
    API.get("/api/server/status", (response) => {
      setData(response.data);
    });
  },[]);

  return (
    <Page title={translation.t("menu.server")}>
      <Wrapper>
        <BackgroundHolder>
          <Modal
            isOpen={modal}
            closeHandler={() => {
              setModal(false);
            }}
          >
            <ModalBackground>
              <h3>IP Скопирован в буфер обмена</h3>
              <h4>
                1. Нажмите на кнопку добавить сервер, на странице с серверами в
                Minecraft
              </h4>
              <h4>2. Вставьте скопированный IP и нажмите добавить</h4>
              <h4>3. Наш сервер появится в списке серверов!</h4>
              <h4>4. Нажмите на него, чтобы подключиться!</h4>
            </ModalBackground>
          </Modal>
          <LeftHolder>
            <h1>{translation.t("pages.about.project")}</h1>
            <h2>{translation.t("pages.about.slogan")}</h2>
            <StyledButton
              onClick={() => {
                setModal(true);
                copyToClipboard("play.md-resorts.ru");
              }}
            >
              {translation.t("pages.about.button")}
            </StyledButton>
          </LeftHolder>
          <RightHolder>
            {Object.keys(data).length === 0 ? (
              <Preloader>
                <h4>
                  <Clipboard
                    textToCopy={translation.t("pages.about.ip")}
                    tooltipPosition="top"
                  >
                    <div>
                      <FontAwesomeIcon icon="fa-regular fa-clone" />{" "}
                      {translation.t("pages.about.ip").toUpperCase()}
                    </div>
                  </Clipboard>
                </h4>
              </Preloader>
            ) : (
              <InfoHolder>
                <h4>
                  <Clipboard
                    textToCopy={translation.t("pages.about.ip")}
                    tooltipPosition="top"
                  >
                    <div>
                      <FontAwesomeIcon icon="fa-regular fa-clone" />{" "}
                      {translation.t("pages.about.ip").toUpperCase()}
                    </div>
                  </Clipboard>
                </h4>
                
                <OnlineStatus
                  online={data?.bungee?.online}
                  showStatus
                  showPlayers
                  players={data?.bungee?.players?.online}
                  maxplayers={data?.bungee?.players?.max}
                />
              </InfoHolder>
            )}
            <InfoHolder className="leftAlign">
              <h3>Скидки в магазине до 50%</h3>
              <h4>Успей купить пока не закончились</h4>
              <StyledLink to="/shop">В магазин</StyledLink>
            </InfoHolder>
          </RightHolder>
        </BackgroundHolder>
        <StyledTabs>
          <StyledTabList>
            <StyledTab>
              <div className="child">
                <h3>MDR Выживание</h3>
                <OnlineStatus
                  online={data?.survival?.online}
                  showOnlineText={false}
                  showPlayersIcon={false}
                  align="flex-start"
                  showStatus
                  showPlayers
                  players={data?.survival?.players?.online}
                  maxplayers={data?.survival?.players?.max}
                >
                  {"|| 1.16.5-1.19.2"}
                </OnlineStatus>
              </div>
            </StyledTab>
            <StyledTab>
              <h3>MDR Гриферский</h3>
              <OnlineStatus
                online={data?.grief?.online}
                showOnlineText={false}
                showPlayersIcon={false}
                align="flex-start"
                showStatus
                showPlayers
                players={data?.grief?.players?.online}
                maxplayers={data?.grief?.players?.max}
              >
                {"|| 1.16.5-1.19.2"}
              </OnlineStatus>
            </StyledTab>
            <StyledTab>
              <h3>MDR BedWars</h3>
              <OnlineStatus
                online={data?.bedwars?.online}
                showOnlineText={false}
                showPlayersIcon={false}
                align="flex-start"
                showStatus
                showPlayers
                players={data?.bedwars?.players?.online}
                maxplayers={data?.bedwars?.players?.max}
              >
                {"|| 1.12.2-1.19.2"}
              </OnlineStatus>
            </StyledTab>
            {/* <StyledTab>
                <h3>MDR Skyblock</h3> 
                <OnlineStatus 
                online={data?.online}
                showOnlineText={false} 
                showPlayersIcon={false}
                align='flex-start'
                showStatus showPlayers
                 players={data?.players?.online} 
                 maxplayers={data?.players?.max}>
                    {"|| 1.16.5-1.19.2"}
                 </OnlineStatus>
            </StyledTab> */}
          </StyledTabList>
          <StyledTabPanel>
            <TabContent>
              <TabImage src={survival_img}>
                <AboutServer>
                  <h3>MDR Выживание</h3>
                  <ProsHolder>
                    <ServerProsItem>
                      <img src={pickaxe} alt="" />
                      Работы
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={emerald} alt="" />
                      Экономика
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={sword} alt="" />
                      PVP Арена
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={star} alt="" />
                      Гаджеты и косметика
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={bottle} alt="" />
                      Боевой пропуск
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={feather} alt="" />
                      Паркур
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={ench_pickaxe} alt="" />
                      Кастомные предметы
                    </ServerProsItem>
                  </ProsHolder>
                </AboutServer>
              </TabImage>
            </TabContent>
          </StyledTabPanel>
          <StyledTabPanel>
            <TabContent>
              <TabImage src={grief_img}>
                <AboutServer>
                  <h3>MDR Гриферский</h3>
                  <ProsHolder>
                    <ServerProsItem>
                      <img src={pickaxe} alt="" />
                      Работы
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={emerald} alt="" />
                      Экономика
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={diamondOre} alt="" />
                      Блоки приватов
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={star} alt="" />
                      Гаджеты и косметика
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={bottle} alt="" />
                      Боевой пропуск
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={feather} alt="" />
                      Аирдропы
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={tnt} alt="" />
                      Кастомные ТНТ
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={ench_pickaxe} alt="" />
                      Кастомные предметы
                    </ServerProsItem>
                  </ProsHolder>
                </AboutServer>
              </TabImage>
            </TabContent>
          </StyledTabPanel>
          <StyledTabPanel>
            <TabContent>
              <TabImage src={bedwars_img}>
                <AboutServer>
                  <h3>MDR BedWars</h3>
                  <ProsHolder>
                    <ServerProsItem>
                      <img src={bottle} alt="" />
                      Рейтинг игроков
                    </ServerProsItem>
                    <ServerProsItem>
                      <img src={map} alt="" />
                      Много карт
                    </ServerProsItem>
                  </ProsHolder>
                </AboutServer>
              </TabImage>
            </TabContent>
          </StyledTabPanel>
        </StyledTabs>
      </Wrapper>
    </Page>
  );
};
export {About};
