Dim Fso
Set Fso = WScript.CreateObject("Scripting.FileSystemObject")

Dim arr
arr = Array("ue", "hup", "xi", "zi", "zi1", "ban2", "a", "ap1", "am", "at", "ak1", "ai2", "aip1", "aim2", "aik2", "aum2", "auk2", "ia1", "iam1", "iat1", "ian1", "iak1", "ua", "uai1", "uaip2", "i2", "im1", "in2", "ik2", "y", "y1", "yp", "yt2", "yn2", "yk2", "ut2", "un1", "em", "et2", "o1", "om2", "ie", "iei2", "io", "io1", "io2", "ue1", "uep", "uep1", "uet", "uo1", "pa2", "pai2", "pau1", "pia2", "pua2", "puat2", "pit1", "py", "put", "pui1", "pet2", "pek1", "pek2", "po1", "pok", "bap", "bai2", "bait", "bau2", "bia1", "bu1", "bup2", "bum1", "be1", "bet2", "bo1", "bot1", "bon2", "buo1", "ma1", "mam1", "man1", "mak1", "mak2", "maun1", "mua2", "muak1", "mit", "mit2", "mut2", "mun1", "mui1", "mo1", "mot2", "mok1", "muo1", "can2", "cai1", "cuau2", "cy2", "cuk2", "cet2", "cei2", "co1", "cue", "cue1", "cuet", "cuop2", "sa1", "sam1", "sat2", "sak2", "sau2", "saup1", "sia1", "sip1", "sit1", "sin1", "sik2", "sy2", "syt2", "su1", "sui1", "sep", "so1", "son1", "sue1", "suo2", "xa2", "xai1", "xau1", "xi1", "xit2", "xy1", "xep2", "xem1", "xo1", "xo2", "xom1", "xot1", "xuo1")

For i = 1 to 142
Fso.MoveFile ("out" & Mid(CStr(1000 + i), 2, 3) & ".mp3"), (arr(i-1) & ".mp3")
Next