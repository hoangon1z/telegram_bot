//6855735816:AAESodAlPPtcB7DVMDyGtjd1-mK4tgxPk1E
const TelegramBot = require('node-telegram-bot-api');


const Vn_go_1p = require("./82com/auto82/vn_go_1p_82");


const token = '6855735816:AAESodAlPPtcB7DVMDyGtjd1-mK4tgxPk1E';
console.log(" ------------------- bắt đầu bot VN GO 82COM---------------------------")
const adminGroup = require('./82com/admingroup_82')
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const axios = require("axios")
const replyMarkup = {
    keyboard: [
        [
            'Bắt đầu',
            'Cài DCA Thua'
        ],
        [
            "Đăng Nhập",
            "Cài Ngược",
            "Chốt lời/lỗ"
        ],
        [
            "Chiến lược",
            "Bật copy",
            "Lịch sử"
        ],
        [
            "Cài công thức",
            "Bật đợi gãy"
        ]

    ],

};
// Listen for any kind of message. There are different kinds of
// messages.
const help = require('./82com/help82/vngohelp_82')
const Res = require("./json_82");
bot.on('channel_post', (msg) => {
    if(msg.text =='/check id'){
        bot.sendMessage(msg.chat.id, "ID group là "+msg.chat.id)
    }
  
});
bot.on('message', async (msg) => {

    let type = msg.chat?.type
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    // send a message to the chat acknowledging receipt of their message
    let text = msg.text ? msg.text : false
    if (type == 'group' || type =="supergroup") {
        if (text) {
            let check = text[0]
            if (check == '/') {
                let array = text.split("\n")
                let key_work = array[0]
                if (key_work == '/check id') {
                    return bot.sendMessage(chatId, "ID group là " + chatId, {
                        reply_to_message_id: messageId
                    })
                }
            }
            if (chatId==-1001759197056 && (check == '/' || check=="A") ) {
                
                return adminGroup.admingroup(chatId, msg, text, bot, messageId,"users_telegram_vngo" ,"copytinhieu_vngo")
            }
        }
        return

    }
    let checklogin = await help.check_login(chatId)
    let name = msg.from.first_name ? msg.from.first_name : msg.from.last_name ? msg.from.last_name : msg.from.username
    let userLink = msg.from.username ? msg.from.username : ""

    if (text) {
        if (text.includes('Login') || text.toLocaleLowerCase().includes('login')) {
            // đăng nhập
            help.login_telegram(text, chatId, bot, messageId, name,userLink)
        } else if (text.includes('/THEMCT') || text.includes('/themct')) {
            //  thêm công thức vào 

            if (checklogin) {
                help.themcongthuc(text, chatId, bot, checklogin, messageId)
            } else {
                bot.sendMessage(chatId, Res.dangnhap, {
                    reply_to_message_id: messageId,
                })
            }

        }
        else if (text.includes('BET') || text.includes('bet')) {
            //  thêm chiến lược chọn 

            if (checklogin) {
                help.themchienluoc(text, chatId, bot, checklogin, messageId)
            } else {
                bot.sendMessage(chatId, Res.dangnhap, {
                    reply_to_message_id: messageId,
                })
            }
        }
        else if (text.includes('/CT') || text.includes('/ct')) {
            //  chọn theo công thức nào
            if (checklogin && checklogin.activeacc == 0) {
                return bot.sendMessage(chatId, "Tài khoản của bạn chưa được active, Liên hệ Hỗ trợ ")
            }
            if (checklogin) {
                help.choncongthuc(text, chatId, bot, checklogin, messageId)
            } else {
                bot.sendMessage(chatId, Res.dangnhap, {
                    reply_to_message_id: messageId,
                })
            }

        }
        // else if (text.includes('/ADD') || text.includes('/Add') || text.includes('/add')) {
        //     //  chọn theo công thức nào
        //     if (checklogin && checklogin.activeacc == 0) {
        //         return bot.sendMessage(chatId, "Tài khoản của bạn chưa được active, Liên hệ Hỗ trợ ")
        //     }
        //     if (checklogin) {
        //         help.addthemso(text, chatId, bot, checklogin, messageId)
        //     } else {
        //         bot.sendMessage(chatId, Res.dangnhap, {
        //             reply_to_message_id: messageId,
        //         })
        //     }

        // }
        // else if (text.includes('/STOP') || text.includes('/stop')) {
        //     //  chọn theo công thức nào

        //     if (checklogin) {
        //         help.stopthemso(text, chatId, bot, checklogin, messageId)
        //     } else {
        //         bot.sendMessage(chatId, Res.dangnhap, {
        //             reply_to_message_id: messageId,
        //         })
        //     }

        // }
        else if (text.includes('SLTP') || text.includes('sltp')) {
            //   chốt lời cắt lỗi

            if (checklogin) {
                help.dunglocatloi(text, chatId, bot, checklogin, messageId)
            } else {
                bot.sendMessage(chatId, Res.dangnhap, {
                    reply_to_message_id: messageId,
                })
            }
        }
        else {
            switch (text) {
                case "/START":
                    // code block
                    if (checklogin) {
                        help.batdau(text, chatId, bot, checklogin, messageId)
                    } else {
                        Res.send_dang_nhap(name, chatId, messageId, bot)

                        // bot.sendMessage(chatId, Res.dangnhap, {
                        //     reply_to_message_id: messageId,
                        // })
                    }

                    break;
                case "Bắt đầu":
                    // code block
                    if (checklogin) {
                        help.batdau(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }


                    break;
                case "Cài DCA Thua":
                    // code block caiDCA cài DCA thắng
                    if (checklogin) {
                        help.caiDCA(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }

                    break;
                case "Cài DCA Thắng":
                    // code block caiDCA cài DCA thắng
                    if (checklogin) {
                        help.caiDCA(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }

                    break;
                case "Đăng Nhập":

                    bot.sendMessage(chatId, Res.dangnhap, {
                        reply_to_message_id: messageId,
                    })
                    // code block
                    break;
                case "Cài Ngược":
                    // code block 

                    if (checklogin) {
                        help.cainguoc(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                case "Cài thuận":
                    // code block 

                    if (checklogin) {
                        help.cainguoc(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                case "Chốt lời/lỗ":
                    // code block
                    bot.sendMessage(chatId, Res.chot_loi, {
                        reply_to_message_id: messageId,
                    })
                    break;
                case "Chiến lược":
                    // code block
                    bot.sendMessage(chatId, Res.chienluoc, {
                        reply_to_message_id: messageId,
                        parse_mode: "HTMl"
                    })
                    break;
                case "BẬT copy":
                    // code block coppy
                    if (checklogin && checklogin.activeacc == 0) {
                        return bot.sendMessage(chatId, "Tài khoản của bạn chưa được active, Liên hệ Hỗ trợ ")
                    }
                    if (checklogin) {
                        help.batcopy(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                case "TẮT copy":
                    // code block coppy
                    if (checklogin && checklogin.activeacc == 0) {
                        return bot.sendMessage(chatId, "Tài khoản của bạn chưa được active, Liên hệ Hỗ trợ ")
                    }
                    if (checklogin) {
                        help.batcopy(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                case "TẮT công thức":
                    // code block coppy
                    if (checklogin) {
                        help.tatcongthuc(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                case "Lịch sử":
                    // code block
                    break;
                case "Cài công thức":
                    // code block congthuc
                    if (checklogin) {

                        help.caicongthuc(text, chatId, bot, checklogin, messageId)


                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }

                    break;
                case "Bật đợi gãy":
                    // code block ✅ Đã đổi trạng thái chờ gãy sang ON
                    if (checklogin) {
                        help.battatdoigay(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }

                    break;
                case "Tắt đợi gãy":
                    // code block ✅ Đã đổi trạng thái chờ gãy sang ON
                    if (checklogin) {
                        help.battatdoigay(text, chatId, bot, checklogin, messageId)
                    } else {
                        bot.sendMessage(chatId, Res.dangnhap, {
                            reply_to_message_id: messageId,
                        })
                    }
                    break;
                default:
                    bot.sendMessage(chatId, `Cú pháp sai
/START để quay lại`, {
                        reply_to_message_id: messageId,
                    })

                // code block
            }
        }
    }

});
Vn_go_1p.runbot(bot)
var cron = require('node-cron');
let db = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'PokerVn@123P',
        database: 'bot_telegram_82'
    }
})
cron.schedule('0 * * * *', async () => {
    // Hàm bạn muốn thực hiện mỗi giờ
    console.log('Chạy hàm mỗi giờ');
    await db("lichsu_ma_group").del().where('created_at', '<', db.raw('NOW() - INTERVAL 3 HOUR'))
    await db("lichsu_tong_hop").del().where('created_at', '<', db.raw('NOW() - INTERVAL 4 HOUR'))
    await db("bonhotam").del().where('created_at', '<', db.raw('NOW() - INTERVAL 1 HOUR'))
  });


