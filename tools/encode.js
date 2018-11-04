// 实例化一个JSEncrypt对象
import JsEncrypt from 'jsencrypt'
var a = '{"1":"18101255226","2":"13439017760","3":"953931979","4":"qq2531704850","5":"13051830388","6":"qq992005240","7":"qq1134352669","8":"15811073018","9":"无","10":"无","11":"13031139588","12":"15172446250","13":"13021119099","14":"18810365951","15":"18810365951","16":"1305163988","17":"qq:1464903293","18":"qq:3040886902","19":"18810009133","20":"彩虹：13720036366","21":"17812161971","22":"13180165677","23":"qq:1515539854","24":"15810813320","25":"","26":"13261093653","27":"qq1324518083","28":"17090136670","29":"18610599813","30":"无","31":"18810319152","32":"18811613906","33":"wx:18813151697","34":"qq814626657","35":"13260306955","36":"18801312410","37":"13146158633","38":"18801312410","39":"18801175283","40":"17710224990","41":"18810156095","42":"13146129377","43":"15201306658","44":"13381050164","45":"1758522370","46":"15810662927","47":"17812161867","48":"18003231710","49":"18810858175","50":"15231435045","51":"13116728039","52":"13116728039","53":"TEL:13031168899","54":"TEL:18800120127","55":"WX:13261509898","56":"18801236153","57":"13146875700","58":"张超楠13001190500","59":"WX:13261509898","60":"TEL:18811613558","61":"TEL:13031168899","62":"TEL:18146517767","63":"13051392796","64":"15739612887","65":"18811563472","66":"18567181675","67":"QQ1531901681","68":"QQ873752372","69":"TEL:13261510606","70":"18810619360","71":"13051681366","72":"15216881865","73":"17600852673","74":"17801000168","75":"18810858175","76":"15754316497","77":"18810217996","78":"19801202337","79":"QQ571798905","80":"WX:18813150860","81":"TEL:18801273510","82":"WX：print_caiyuanzi","83":"TEL:18810352163","84":"TEL:15254661234","85":"TEL:15611779006","86":"18801335516","87":"TEL:18810778373","88":"TEL:18500361252","89":"13261514882","90":"18810909156","91":"18567181675","92":"18810959982","93":"","94":"13001119699","95":"13051660388","96":"13331377319","97":"qq1464903293","98":"18522088220","99":"15307272281","100":"18822138546","101":"13260129811","102":"15216881865","103":"18810217946","104":"qq623232747","105":"","106":"18196549882","107":"13051681366","108":"19801836337","109":"18813133707","110":"18801312410","111":"18810749170","112":"","113":"13146158633","114":"15652001613","115":"18813138071","116":"QQ3057669949","117":"","118":"1131129377","119":"18310796892","120":"qq873752372","121":"","122":"15910680295","123":"17710224990","124":"18586024956","125":"13031139588","126":"15201306658","127":"13001190500","128":"18801273510","129":"15270823705","130":"15032355213","131":"18811563472","132":"15810662927","133":"15600055199","134":"1324236930","135":"","136":"13051851288","137":"18810778373","138":"","139":"18811637036","140":"18810858175","141":"wechat:jellycrystal0316","142":"","143":"15384838571","144":"wechat:wgg15056933699","145":"13031096188","146":"","147":"18310237956","148":"hmsdy_hy","149":"","150":"13141220475","151":"18810619360","152":"18811526679","153":"13051938288","154":"18801112310","155":"13196158622","156":"15703370296","157":"qq2421441229","158":"13001001219","159":"13941746330","160":"18610599813","161":"18101255226","162":"qq992005240","163":"艾林燕微信uukaffa","164":"17812161867","165":"18813150860","166":"18813151697","167":"18003231710","168":"13381050164","169":"qq2398737634","170":"17600852673","171":"qq1324518083","172":"13261093653","173":"qq953931979","174":"","175":"13051633988","176":"15231435045","177":"18810156095","178":"18810541781","179":"18810352163","180":"18801312410","181":"18811613906","182":"qq1531901681","183":"13239072526","184":"18810361092"}';
var out = [];
let jse = new JsEncrypt()
jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdyrW8+mCrsie42qivAblKtqoS
LexARnl151xTjqkrOcZRGEdOb2ljcSKNcnsQF7TVkyk2PjVhw7R3/tNHt+V2Ob+i
AbkqRqQQPDyF0wA3nkX/XbAu/mPAUkqfNwO8wKYLnt2mJDqYW63KQlH345NuzcmE
H/bu5kGeCNkNAIrLswIDAQAB
-----END PUBLIC KEY-----`)
    // 设置需要加密的字符串
for (var i = 0, len = a.length / 100; i < len; i++) {　
    str1 = a.substr(i * 100, 100);
    let str = jse.encrypt(str1);
    out.push(str);
}

// 输出加密结果
console.log(JSON.stringify(out))