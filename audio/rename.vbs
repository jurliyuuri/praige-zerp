Dim Fso
Set Fso = WScript.CreateObject("Scripting.FileSystemObject")

Dim arr
arr = Array("zat1_tc", "zit1_tc", "zui1_tc", "zuit2_tc", "zo1_tc", "zuo1_tc", "zap2_tx", "zat1_tx", "zau_tx", "zip1_tx", "zit1_tx", "ze1_tx", "zep1_tx", "zie1_tx", "ta", "ta1", "tam2", "tat2", "tan1", "tak1", "tai", "tau2", "taun1", "tauk1", "tia1", "tia2", "tua1", "tuai2", "tit1", "tin1", "ty", "tyn1", "tu2", "tum1", "tut1", "tun2", "tuk2", "tui2", "tuik1", "tet", "ten1", "to2", "dat2", "dau2", "daut1", "dit1", "dui", "det", "dop1", "na1", "nap1", "nam2", "nan2", "naip2", "nau", "nua2", "nuak1", "ni1", "nim2", "nin1", "nik2", "num1", "nut2", "nun1", "nui2", "ne2", "net2", "no1", "nom2", "non1", "nie", "niek1", "nuok2", "la1", "lai1", "lia1", "lua1", "li1", "li2", "lip", "lit1", "lin", "ly", "lu2", "lup1", "let1", "lek1", "lo", "lo1", "lot2", "lok1", "liok1", "ka1", "kat1", "kat2", "kan1", "kak", "kai1", "kait", "kaik", "kaun1", "kauk2", "kia1", "kiak1", "kua2", "kuak1", "kuai1", "kuai2", "ki1", "kit", "kit1", "kin2", "kik1", "ky1", "ky2", "ku", "kut2", "kun2", "ket", "ko1", "kot", "kot2", "kok1", "kue", "kuo1", "kuot1", "gat2", "gak1", "gau2", "giau1", "gua2", "gy1", "guk2", "gui2", "ge", "gek", "hak2", "hau2", "hauk1", "hia1", "hua1", "huap1", "huat1", "huai2", "hi1", "hy2", "hup1", "hut2", "hui2", "he", "hem", "hem1", "hen", "hei2", "ho", "ho1", "ho2", "hop1", "hon1", "hok1", "hio1", "hue", "hue1", "huep2", "huet", "huo2", "huok1", "huok2")

For i = 1 to 168
Fso.MoveFile ("out" & Mid(CStr(1000 + i), 2, 3) & ".mp3"), (arr(i-1) & ".mp3")
Next