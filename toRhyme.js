
var Vinmeg = [["噫","同","加","北","皇","識","之"],
["此","四","互","書","母","出"],
["我","労","善","戦","在","aen"],
["将","倒","aeht","aehk","aehm","aehn"],
["形","aup","aut","長","傾","aun"],
["門","獣","深","文","auhm","馬"],
["猫","地","机","vk","如","vn"],
["全","言","雪","絵","月","vhn"],
["春","ep","星","ek","em","en"],
["万","ehp","eht","ehk","ehm","混"],
["墨","声","草","色","三","on"],
["山","手","季","行","積","悪"],
["反","ip","極","蜜","族","金","清"],
["男","国","正","機","毛","紙"],
["物","歪","川","人","um","神","付"],
["銭","鳥","毎","uhk","守","無"]];

var toIndex4 = {"":0,"p":1,"t":2,"k":3,"m":4,"n":5,"ng":6};
var toIndex3 = {"a":0, "ah":1, "ae":2, "aeh":3, "au":4, "auh":5, "v":6, "vh":7, "e":8, "eh":9, "o":10, "oh":11, "i":12, "ih":13, "u":14, "uh":15};
var toIndex2 = {"":"素", "i":"前", "u":"後"};
var toIndex1 = {
"p":"力","pr":"風","b":"箱","br":"圧","m":"大", "mr":"汝", "f":"処", "fr":"龍",
"s":"嗅","sr":"席","z":"祖","zr":"来","sh":"花","shr":"裁","ts":"広","tsr":"彼",
"t":"終","tr":"茶","d":"島","dr":"集","n":"静", "nr":"水", "l":"倉", "lr":"新",
"k":"火","kr":"筆","g":"層","gr":"祭","h":"心", "hr":"骨", "":"王",  "ng":"冠"
};

function toRhyme(txt)
{
	var arr = txt.match(/^((?:p|pr|b|br|m|mr|f|fr|s|sr|z|zr|sh|shr|ts|tsr|t|tr|d|dr|n|nr|l|lr|k|kr|g|gr|h|hr|ng)?)((?:i|u)?)((?:a|ae|au|v|e|o|i|u)h?)((?:p|t|k|m|n|ng)?)$/);
	if(arr == null) {
		return null;
	}
	/* 
	arr[1]: segbo 
	arr[2]: kaihom
	arr[3]: vinbo
	arr[4]: vinbi
	*/
	var vinmeg_ = Vinmeg[toIndex3[arr[3]]];
	if(vinmeg_ == null) {return null;}
	var vinmeg = vinmeg_[toIndex4[arr[4]]];
	if(vinmeg == null) {return null;}
	var kaihommeg = toIndex2[arr[2]];
	if(kaihommeg == null){return null;}
	var segbomeg = toIndex1[arr[1]];
	if(segbomeg == null){return null;}

	return segbomeg + vinmeg + kaihommeg;
}

var sample= ["prae","mrua","kah","tsvh","tsrap","nran","sruvh","bvh","muhn","ngaem","huaht","tihn","ku","sruk","vm","a","fv","kak","srit","puih","ziht","tsvhp","mahn","krua","ahk","fro","tauhk","tsuih","nihn","lvhk","fohp","shih","hiah","tah","iahm","hro","ngaek","fvt","huhp","kot","kahn","nrua","prua","zriu","krin","baet","shuoh","dui","mah","kruae","nih","sre","laeh","tahk","brae","kiah","shvhm","pret","zriut","frvp","tsoh","nrut","dohp","zrau","ngut","tiuhn","kiuh","kiahk","ngiuk","tahn","hrak","zruvh","hrut","ta","iahn","iht","ngvt","ngik","ngom","ahp","uhn","nrvt","nrik","nrom","nahp","krut","mohk","zrak","sran","zauhp","luhp","muih","fri","kihk","buh","kih","zah","tram","trun","muahk","krauk","grua","kauhn","drau","mauhn","truk","uaeh","io","zruo","tsau","diht","grau","sruop","mrut","kaet","hih","hvhm","gruk","trui","piu","liu","ua","hvm","am","tiu","iuhn","iv","truae","nohn","put","a","lvht","shoh","iaht","muoh","tsivh","grahk","krun","trau","iahk","drat","iu","mrak","sriohm","zihp","bap","ngin","nram","ngie","krat","kaht","tehn","lih","iuh","biah","brau","sria","nivhk","uvh","ueh","kvt","grat","hrau","kaek","mrot","gv","go","sruau","tuht","nah","giuh","kit","pok","shoht","zuh","zihn","nraep","nguaep","ngae","boh","nrim","lin","fahp","srio","kohk","tuah","pvhk","prvk","praek","ho","hoh","hre","aehp","ngauk","ngaum","brvt","buhm","buhn","buoh","srvt","soh","sriu","dauht","giauh","grui","hioh","hriu","hohk","hohn","fah","hruae","hruvh","fohk","fruok","ngi","iah","ngiut","kaeh","kriu","koh","kuaeh","kuoht","kuahk","liah","liohk","loh","lohk","lru","lruah","mahk","mahm","mrit","moh","nau","nrv","noh","nrui","nuhm","nuhn","pria","poh","pruat","zahm","zrat","ziah","zrik","zoh","zohn","zuih","trat","tvt","triah","tria","tiht","tro","tru","tuihk","tuhm","shaeh","shauh","srivp","shiuh","tsaht","tsiht","tsruit","tsuoh","uoh","priht","at","pauh","nruok"];
