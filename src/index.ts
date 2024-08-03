import 'dotenv/config';
import { Bot, Context } from 'grammy';
import { startText } from './constants/context.Constants';
import { extractDataFromPinterestUrl } from './components/download.Module';
import connectDB from './configs/db.Module';
import UserModel from './models/User';
import mongoose from 'mongoose';
import PostModel from './models/Post';




const bot = new Bot(process.env.BOT_TOKEN_DEV as string);


bot.command('start', async (ctx: Context) => {
    try {
        const sendMessageStartToUser: string = startText(ctx)
        ctx.reply(sendMessageStartToUser, {
            parse_mode: 'HTML',
            reply_to_message_id: ctx?.message?.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Suren Tm CH 📣', url: 'https://t.me/Suren_Tm' }]
                ]
            }
        })

        await connectDB()
        const existUser: object | null = await UserModel.findOne({ chat_id: ctx.from?.id });

        if (existUser) {
            mongoose.connection.close();
            return
        }

        const newUser = new UserModel({
            first_name: ctx.from?.first_name,
            username: ctx.from?.username ?? '',
            chat_id: ctx.from?.id,
        })

        await newUser.save()

        await bot.api.sendMessage(1430613559, `New User ${ctx.from?.first_name} - @${ctx.from?.username} - ${ctx.from?.id}`);

        mongoose.connection.close();
    } catch (error) {
        console.error(error + ' : bot.command(start)');
        return
    } finally {
    }
});



bot.on('msg::url', async (ctx: Context) => {
    try {
        const pinterestUrl: string | undefined = ctx?.message?.text?.trim();
        if (pinterestUrl) {
            const parsedPinterestData: Record<string, string> = await extractDataFromPinterestUrl(pinterestUrl);
            await connectDB();            
            const findPost = await PostModel.findOne({ key: pinterestUrl.split('/')[4] == undefined ?  pinterestUrl.split('/')[3] : pinterestUrl.split('/')[4]})
            const findUser = await UserModel.findOne({ chat_id: ctx.from?.id });
            if (findPost) {
                ctx.replyWithDocument(findPost.file_id as string, {
                    caption: `${parsedPinterestData?.caption}\n\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                    parse_mode: 'HTML'
                }).catch(err => {
                    if (err.error_code === 400) {
                        ctx.replyWithPhoto(findPost.file_id as string, {
                            caption: `${parsedPinterestData?.caption}\n\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                            parse_mode: 'HTML'
                        })
                    }
                })
                return
            }

            if (parsedPinterestData.contentUrl) {

                const response = await ctx.replyWithVideo(parsedPinterestData.contentUrl, {
                    caption: `${parsedPinterestData?.caption}\n\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                    parse_mode: 'HTML'
                })
                if (findUser) {
                    const newPost = new PostModel({
                        author: findUser?._id,
                        file_id: response.video.file_id,
                        key: pinterestUrl.split('/')[4] == undefined ?  pinterestUrl.split('/')[3] : pinterestUrl.split('/')[4]
                    })
                    newPost.save();
                }
                await ctx.replyWithDocument(parsedPinterestData.thumbnailUrl, {
                    caption: `Cover\n\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                    parse_mode: 'HTML'
                })
                mongoose.connection.close();
                return
            }
            const imageResponse = await ctx.replyWithPhoto(parsedPinterestData.thumbnailUrl, {
                caption: `${parsedPinterestData?.caption}\n\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                parse_mode: 'HTML'
            })

            if (findUser) {
                const newPost = new PostModel({
                    author: findUser?._id,
                    file_id: imageResponse?.photo[imageResponse?.photo.length - 1].file_id,
                    key: pinterestUrl.split('/')[4] == undefined ?  pinterestUrl.split('/')[3] : pinterestUrl.split('/')[4]
                })
                newPost.save();
            }

            await ctx.replyWithDocument(parsedPinterestData.thumbnailUrl, {
                caption: `<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`,
                parse_mode: 'HTML'
            })
            mongoose.connection.close();
            return
        } else {
            return;
        }
    } catch (error) {
        console.log(error + ' : bot.on(msg::url, (ctx: Context))');
    } finally {
        if (mongoose.connection.readyState === 1) {
            mongoose.connection.close();
        }
    }

})


bot.start()