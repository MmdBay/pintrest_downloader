import { Context } from "grammy";

export const startText = (ctx: Context): string => {
    try {
        return `درود بهت <b>${ctx?.from?.first_name}</b>👋🏻
به ربات Pinterest دانلودر خوش اومدی🌱\n\nبرای دانلود محتوایی که میخوای لینکش رو برام ارسال کن، تا بصورت فایل برات بفرستمش مثال :\n
  -  <code>https://pin.it/3OurPQOoz</code>
  -  <code>https://tr.pinterest.com/pin/834573374713984975/</code>
\n<b><a href="https://t.me/Suren_Tm">${process.env.CHANNLE_NAME as string}</a></b>`;
    } catch (error) {
        console.log(error+ ' : Error startText in constansts function');
        return '<Error startText in constansts function>'
    }
};