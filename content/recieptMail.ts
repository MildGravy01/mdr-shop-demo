export const generateEmail = (recieptSrc: string) => {
  return (`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  <head>
      <meta charset="utf-8">
  </head>
  <div class="background">  
   <div class="header">Спасибо за Вашу покупку и поддержку проекта!</div>
      <div class="wrapper">
          <table border="0" cellpadding="0" cellspacing="0" >
              <tr align="center">
                  <td align="center">
                      <center style="max-width: 600px; width: 100%;">
                      <img class="receipt" src=${recieptSrc} /> 
                    </center>
                  </td>
              </tr>
          
          </table>
          <div class="subHeader">
              <p>
              Возможно вам нужно будет перезайти на сервер, чтобы покупка
              применилась. Если покупка не применилась напишите нам в
              <a class="discord" href="https://discord.com/invite/vVbYGcNMj8">
                Дискорд
              </a>
              или
              <a class="vk" href="https://vk.com/mdrserver">
                Вконтакте
              </a>
              </p>
          </div>
          <div class="footer">Всегда ваша, администрация MDR ❤️</div>
          <img src=""></img>
      </div>
  </div>
  <style> 
    .background{
      border-radius: 8px;
      background: #1B1B20;
      max-width: 500px;
      min-height: 500px;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 20px 30px;
    }
    .header {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      color: white;
      font-size: 33px;
      padding: 0px 25px 0px 0px;
      line-height: 40px;
      text-align: center;
      width: 100%;
    }
    .footer{
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: 700;
      font-size: 20px;
      width: 450px;
      color: white;
      margin-top: 10px;

    }
    .wrapper{
      width: 100%;
    }
    .receipt{
      width: 230px;
      height: 410px;
      padding: 5px;
      border-radius: 10px;
      display: inline-block;
    }
    .img{
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 8px;
      max-height: 250px;
    }
    .subHeader{
      color: white;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      padding: 10px;
      display: flex;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.34); 
      flex-direction: column;   
      width: 100%;
      margin-top: 10px;
  }
  table{
      width: 100%;
      margin-top: 10px;
  }
    .discord {
          color: rgba(141, 52, 255, 0.72);
      }
    .discord:hover{ 
          color: rgba(141, 52, 255, 0.32);
     } 
     .discord:focus{
          color: rgba(141, 52, 255, 0.32);
     }   
     .vk:hover{
          color: rgba(141, 52, 255, 0.32);
     }  
     .vk {
          color: rgba(36, 150, 255, 0.77);
      }
      .vk:hover{
          color: rgba(36, 150, 255, 0.57); 
      }
      .vk:focus{
          color: rgba(36, 150, 255, 0.27);
      }
  </style>`);
};
