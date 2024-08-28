const axios = require('axios');
const https = require('https');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

module.exports.handler = async function (event) {
    const body = JSON.parse(event.body);

    if (!body.message || !body.message.chat || typeof body.message.text !== 'string') {
        // Log the missing properties and send an early response
        console.log('Message, chat, or text property is missing in the incoming event. Sending early OK response.');
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'ok' })
        };
    }

    const chat_id = body.message.chat.id;
    console.log(chat_id);
    const incoming_text = body.message.text;
    console.log(incoming_text);

    if (!incoming_text.toLowerCase().includes('отмаз') && !incoming_text.toLowerCase().includes('отмаж')) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'ok' })
        };
    }

    const message_start = `Ты не сможешь прийти на следующую игру, потому что `;

    const message_ends = [
        'болит нога',
        'болит рука',
        'болит тело',
        'болит жопа',
        'болит голова',
        'сейчас ничего не болит, но вдруг заболит',
        'бухаешь',
        'мешок',
        'нытик',
        'вступил в чат просто так',
        'никогда и не собирался играть, вы че',
        'у тебя дети',
        'делаешь детей',
        'ты ребенок',
        'погода такая',
        'ты не придумал отмазку',
        'придёшь в следующий раз (нет)',
        'ты Козлов',
        'это самое',
        'ой, ну прям как-то я не знаю',
        'баба',
        'тряпка',
        'опоздаю на 2 часа',
        'денег нет',
        'деньги есть, но нет воли',
        'курс доллара',
        'женат',
        'гей',
        'слишком возбудждаешься при виде потных парней',
        'страшно',
        'лень',
        'стыдно',
        'идите в жопу',
        'в отпуске',
        'работаешь',
        'мама не пускает',
        'Вано бесит',
        'Ник не пасуется',
        'Дегть не попадает',
        'Козлов ноет',
        'Леха не успевает',
        'Егоров понтуется',
        'Андрей опаздывает',
        'Славок калечит',
        'Илья потеет',
        'Денис устает',
        'у тебя красная карточка',
        'путаешь ворота',
        'слабак',
        'слишком хорош',
        'есть дела поважнее',
        'будешь лежать',
        'диван',
        'устал',
        'на даче',
        'отстаньте от дряхлого пенсионера',
        'врач запретил',
        'ты больше по шахматам',
        'ты лучше придёшь пить пиво и курить калик после игры',
        'всего доброго',
        'у тебя две левых ноги',
        'ты нас не знаешь',
        'Вано бесит, Ник не пасуется, Дегть не попадает, Козлов ноет, Леха не успевает, Егоров понтуется, Андрей опаздывает, Славок калечит, Илья потеет, Денис устает',
        'в этом нет смысла',
        'зажал штукарь',
        'ты пёс',
        'улитка',
        'у тебя футболофобия',
        'жирный',
        'красивый',
        'следующая игра должна прийти на тебя',
        'ты не мальчик на побегушках',
        'лучше бегать за пивком, чем за мячом',
        'ни к чему хорошему это не приводит',
        'у тебя было видение',
        'от этого портится настроение',
        'потерял ключи от дома и не можешь выйти',
        'тебя похитили сомалийские пираты и заставляют играть с ними в нарды',
        'шашлык сам себя не пожарит',
        'и так очень холодно',
        'уже не можешь видеть этот их футбол',
        'американцы развалили такую страну',
        'ненавидишь всё круглое',
        'петух',
    ];

    const text = message_start + message_ends[Math.floor(Math.random() * message_ends.length)];
    console.log(text);

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const params = {
        chat_id: chat_id,
        text: text
    };

    try {
        const response = await axios.post(url, params);
    } catch (error) {
        console.error(`Failed to send message: "${error}"`);
        throw error;
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({ status: 'ok' })
    };
};
