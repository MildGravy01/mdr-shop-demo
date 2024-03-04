/* eslint-disable max-len */
import i18next from 'i18next';

export const translation = i18next.createInstance();
translation.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        menu: {
          server: 'Сервер',
          shop: 'Магазин',
          rules: 'Правила',
          bans: 'Баны',
          discord: 'Discord',
          vk: 'Группа',
        },
        copyTooltip: {
          copied: 'Скопировано!',
          pressToCopy: 'Нажмите, чтобы скопировать',
        },
        server: {
          online: 'Онлайн',
          offline: 'Тех. работы',
        },
        footer: {
          rights: 'Полное или частичное копирования сайта запрещено',
        },
        rules: {
          header: 'Правила сервера',
        },
        terms: {
          header: 'Информация и Политика использования',
          email: 'support@md-resorts.ru',
          publicOffer: 'Договор-оферта'
        },
        pages: {
          about: {
            project: 'MD-RESORTS',
            slogan: 'Лучший сервер для тебя и твоих друзей',
            ip: 'play.md-resorts.ru',
            button: 'ИГРАТЬ СЕЙЧАС',
          },
          shop: {
            header: 'Магазин',
            purchaseForever: 'Покупка привилегии навсегда!',
            purchaseInheritance: 'Наследуются возможности всех более дешевых привилегий!',
            mysteryboxDescription: 'Содержат питомцев, косметику, гаджеты и многое другое',
            mysteryboxAll: 'Общие гаджеты для Выживания и Анархии',
            platinumDescription: 'Валюта для покупки предметов в Платиновом магазине',
            cases: 'Дают возможность открыть кейс на спавне',
          },
          page404: {
            text: 'Искомый ресурс не найден',
            button: 'На главную',
          },
        },
        product: {
          currency_symbol: '₽',
          countable_price: '/шт',
          more: 'Подробнее',
          buy: 'Оплатить',
          modal: {
            commands: 'Команды',
            case_contains: 'Кейс содержит',
            contains: 'Содержит',
            gives: 'Дает вам',
            possibilities: 'Возможности',
            payment: 'Оплата',
            username_label: 'Ваш никнейм',
            username_placeholder: 'Никнейм',
            email_label: 'Ваш E-mail',
            email_placeholder: 'E-mail',
            payment_label: 'Способ оплаты',
            promo_label: 'Промокод',
            promo_placeholder: 'Промокод (необязательно)',
            buy: 'Продолжить',
            continue: 'Перейти к оплате',
            agreement_text:
              'Нажимая на кнопку "Оплатить", вы подтверждаете свое согласие с ',
            agreement_link: 'правилами и политикой использования',
            agreement_and: ', а также с ',
            publicOffer_link: 'Договором-офертой ',
            errors: {
              field_isRequired: 'Это поле обязательное',
              not_valid_email: 'Укажите правильную почту',
              player_not_found: 'Игрок не найден',
              promo_not_found: 'Промокод не найден',
              promo_expired: 'Истек срок действия',
              promo_wrong_product: 'Этот промокод не подходит к этому товару',
              promo_unavailable: 'Промокод недоступен',
              purchase_isHigher: 'У этого игрока уже есть эта привилегия',
            },
            succeed: {
              promo_applied: 'Промокод применен!',
              found_purchase:
                'У вас есть покупка в этой категории, цена снижена!',
            },
          },
        },
      },
    },
  },
});
