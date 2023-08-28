# footballPoisson
足球泊松算法

#### 对象方法说明

|对象|方法|描述|参数|参数说明|类型|是否必须|可选值|返回值|
|--|--|--|--|--|--|--|--|--|--|
|AsiaHandicap|tranPanValue|让球盘或大小盘转换为数值|e，type|盘口, 类型|string, number|y||number|
|Util|arraySum|数组求和|arr|数组|array|y||number|
|Util|arrayMean|数组求平均|arr|数组|array|y||number|
|Util|calPayOut|求返还率|a, b, c|胜平负赔率|nubmer, number, number|y||number|
|Util|calChance2Odds|计算概率为赔率|pWin, pDraw, pLose, payOut|胜平负概率, 返还率|nubmer, number, number, number|y||{oddsW, oddsD, oddsL}|
|Util|calOdds2Chance|计算赔率为概率|oddsW, oddsD, oddsL|胜平负赔率|nubmer, number, number|y||{pWin, pDraw, pLose}|
|Util|calAmount310|计算胜平负数组|getArr, loseArr|得球数组， 失球数组|array, array|y||array|
|Util|judge310|比分判断胜平负|homeGoal, awayGoal|主动进球, 客队进球|number, number|y||number|
|Util|compareArr|俩数组求交集|a, b|a数组, b数组|array, array|y||array|
|PossionGoal|goal|不同进球数的概率|e, i|平均进球, 期望进球数|number, number|y||number|
|PossionGoal|p310|对阵双方胜平负概率|a, b, i|主队进球率, 客队进球率, 比分层级|number, number, int|y||{pWin, pDraw, pLose}|
|PossionGoal|allChance|所有比分的概率对象|a, b, i|主队进球率, 客队进球率, 比分层级|number, number, int|y||object|


