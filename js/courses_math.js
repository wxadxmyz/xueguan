/* ============================================================
 *  数学 · 原创纵向贯通内容（幼儿园 → 高三，13 个学段）
 *  全部为原创讲解与原创 SVG 示意图，不复制任何教材原文。
 *  结构： MATH[gradeId] = { ed, et, units:[{id,t,lessons}] }
 *  本文件加载于 courses_more_1.js 之后，直接覆盖其生成的 数学 课程。
 * ============================================================ */

/* ---------- 原创 SVG 示意图库 ---------- */
function svgNumLine(max){
  const W=320,H=92,x0=26,x1=298,step=(x1-x0)/max; let t='';
  for(let i=0;i<=max;i++){const x=x0+i*step;
    t+=`<line x1="${x}" y1="42" x2="${x}" y2="52" stroke="#5b6679" stroke-width="2"/>`;
    t+=`<text x="${x}" y="70" font-size="14" text-anchor="middle" fill="#2f6fed" font-weight="700">${i}</text>`;}
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <line x1="${x0}" y1="47" x2="${x1}" y2="47" stroke="#5b6679" stroke-width="2"/>
    <line x1="${x1}" y1="47" x2="${x1-9}" y2="42" stroke="#5b6679" stroke-width="2"/>
    <line x1="${x1}" y1="47" x2="${x1-9}" y2="52" stroke="#5b6679" stroke-width="2"/>${t}</svg>`;
}
function svgFrac(n,d){
  const W=320,H=92,x0=24,y0=22,w=272,h=46,col=w/d; let r='';
  for(let i=0;i<d;i++){const x=x0+i*col;
    r+=`<rect x="${x}" y="${y0}" width="${col}" height="${h}" fill="${i<n?'#2f6fed':'#fff'}" stroke="#cdd6e6" stroke-width="2"/>`;}
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="#5b6679" stroke-width="2"/>${r}
    <text x="${W/2}" y="86" font-size="15" text-anchor="middle" fill="#2f6fed" font-weight="700">${n}/${d}</text></svg>`;
}
function svgShapes(){
  return `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="24" width="50" height="50" fill="#2f6fed" rx="4"/>
    <circle cx="140" cy="49" r="27" fill="#5b8bff"/>
    <polygon points="230,76 256,24 282,76" fill="#7a4bf2"/>
    <text x="49" y="96" font-size="12" text-anchor="middle" fill="#5b6679">正方形</text>
    <text x="140" y="96" font-size="12" text-anchor="middle" fill="#5b6679">圆</text>
    <text x="256" y="96" font-size="12" text-anchor="middle" fill="#5b6679">三角形</text></svg>`;
}
function svgBar(){
  const bars=[[60,40],[110,90],[160,65],[210,30],[260,80]]; let b='';
  bars.forEach(([x,h])=>{ b+=`<rect x="${x}" y="${100-h}" width="26" height="${h}" fill="#2f6fed" rx="3"/>`; });
  return `<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="100" x2="300" y2="100" stroke="#5b6679" stroke-width="2"/>${b}</svg>`;
}
function svgAxis(){
  return `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="100" x2="300" y2="100" stroke="#5b6679" stroke-width="2"/>
    <line x1="40" y1="110" x2="40" y2="20" stroke="#5b6679" stroke-width="2"/>
    <line x1="290" y1="100" x2="282" y2="96" stroke="#5b6679" stroke-width="2"/>
    <line x1="290" y1="100" x2="282" y2="104" stroke="#5b6679" stroke-width="2"/>
    <line x1="40" y1="100" x2="200" y2="40" stroke="#2f6fed" stroke-width="3"/>
    <circle cx="200" cy="40" r="5" fill="#e0463e"/>
    <text x="206" y="36" font-size="14" fill="#e0463e" font-weight="700">P</text>
    <text x="300" y="100" font-size="12" fill="#5b6679">x</text>
    <text x="30" y="22" font-size="12" fill="#5b6679">y</text></svg>`;
}
function svgTri(){
  return `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40,100 40,40 250,100" fill="none" stroke="#2f6fed" stroke-width="3"/>
    <rect x="40" y="84" width="16" height="16" fill="none" stroke="#5b6679" stroke-width="2"/>
    <text x="28" y="58" font-size="15" fill="#5b6679" font-weight="700">a</text>
    <text x="135" y="118" font-size="15" fill="#5b6679" font-weight="700">b</text>
    <text x="135" y="36" font-size="15" fill="#e0463e" font-weight="700">c</text></svg>`;
}
function svgCircle(){
  return `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="60" r="46" fill="none" stroke="#2f6fed" stroke-width="3"/>
    <circle cx="150" cy="60" r="4" fill="#5b6679"/>
    <line x1="150" y1="60" x2="196" y2="60" stroke="#e0463e" stroke-width="3"/>
    <text x="160" y="52" font-size="14" fill="#e0463e" font-weight="700">r</text>
    <text x="206" y="64" font-size="13" fill="#5b6679">C = 2πr</text></svg>`;
}
function svgCube(){
  return `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <polygon points="90,40 150,20 230,20 230,80 150,100 90,100" fill="#eef3ff" stroke="#2f6fed" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="100" stroke="#2f6fed" stroke-width="3"/>
    <line x1="90" y1="40" x2="150" y2="20" stroke="#2f6fed" stroke-width="3"/>
    <text x="140" y="118" font-size="14" fill="#5b6679" font-weight="700">a³</text></svg>`;
}

/* ---------- 数学纵向内容 ---------- */
const MATH = {
  youeryuan:{ ed:'启蒙', et:15, units:[
    { id:'yk1', t:'数感启蒙（1~5）', lessons:[
      { type:'reading', title:'认识 1~5', illus:svgNumLine(5), paras:[
        '数一数：1 个娃娃、2 只手、3 朵花、4 条腿、5 根手指。',
        '数数要<b>一个对着一个</b>地数，不重复、不漏掉，最后数到几就是几。',
        '用手指帮忙数，是建立「数」与「量」对应的最好办法。' ]},
      { type:'quiz', title:'随堂测验·数感', questions:[
        {q:'3 朵花和 3 只蝴蝶，数量？',opts:['同样多','花多','蝶多'],ans:0,explain:'数量都是 3，所以同样多。'},
        {q:'数数时要？',opts:['一个一个数','随便数','跳着数'],ans:0,explain:'要一一对应地数。'},
        {q:'一只手有几根手指？',opts:['4','5','6'],ans:1,explain:'一只手 5 根手指。'},
        {q:'2 个再添 1 个是？',opts:['2','3','1'],ans:1,explain:'2 添 1 是 3。'} ]},
    ]},
    { id:'yk2', t:'比较多少与大小', lessons:[
      { type:'reading', title:'谁多谁少', paras:[
        '把两样东西<b>一一对应</b>摆好：都对上了叫「同样多」；有多出来的一方就「多」，少的一方就「少」。',
        '比较大小：3 比 2 大，2 比 3 小。开口朝大数：<span class="formula">3 &gt; 2</span>，<span class="formula">2 &lt; 3</span>。' ]},
      { type:'quiz', title:'随堂测验·比较', questions:[
        {q:'苹果 5 个、梨 3 个，谁多？',opts:['一样多','梨多','苹果多'],ans:2,explain:'5 比 3 大。'},
        {q:'同样多是指？',opts:['数量相等','一个多','一个少'],ans:0,explain:'对应后都没有剩余就是同样多。'},
        {q:'3 和 5 比，应写？',opts:['3 ＞ 5','3 ＜ 5','3 ＝ 5'],ans:1,explain:'开口朝大数，5 大。'} ]},
    ]},
    { id:'yk3', t:'认识图形', lessons:[
      { type:'reading', title:'身边的形状', illus:svgShapes, paras:[
        '皮球是<b>圆圆的</b>，积木块是<b>方方的</b>，三角尺是<b>尖尖的</b>。',
        '把相同形状的东西放在一起，就是「分类」，分类能帮我们更有条理地认识世界。' ]},
      { type:'quiz', title:'随堂测验·图形', questions:[
        {q:'皮球的形状是？',opts:['圆','方','三角'],ans:0,explain:'皮球是圆的。'},
        {q:'积木块一般是？',opts:['三角形','方形的','圆'],ans:1,explain:'积木多为方形。'},
        {q:'把同色的放一起是？',opts:['分类','数数','比较'],ans:0,explain:'按特征归组就是分类。'} ]},
    ]},
  ]},

  g1:{ ed:'人教版', et:40, units:[
    { id:'m1', t:'准备课：数一数·比多少', lessons:[
      { type:'reading', title:'数一数', illus:svgNumLine(5), paras:[
        '数一数：1 面红旗、2 个同学、3 朵花、4 只蝴蝶、5 棵树。',
        '数数时要一个一个地数，做到<b>不重复、不漏掉</b>。' ]},
      { type:'reading', title:'比多少', paras:[
        '把物品<b>一一对应</b>：小兔和萝卜一样多是「同样多」；有剩余的一方「多」，另一方「少」。',
        '用符号表示：<span class="formula">3 &gt; 2</span>（3 大于 2），<span class="formula">2 &lt; 3</span>（2 小于 3），<span class="formula">3 ＝ 3</span>（等于）。开口永远朝大数。' ]},
      { type:'quiz', title:'随堂测验·准备课', questions:[
        {q:'3 朵花和 3 只蝴蝶数量？',opts:['同样多','花多','蝶多'],ans:0,explain:'都是 3。'},
        {q:'数数时要？',opts:['一个一个数','随便数','跳着数'],ans:0,explain:'一一对应地数。'},
        {q:'5 和 3 比，正确的是？',opts:['5 ＜ 3','5 ＞ 3','5 ＝ 3'],ans:1,explain:'开口朝大数。'},
        {q:'苹果 5 个、梨 3 个，谁多？',opts:['一样多','梨多','苹果多'],ans:2,explain:'5 比 3 大。'} ]},
    ]},
    { id:'m2', t:'1~5 的认识和加减法', lessons:[
      { type:'reading', title:'认识 1~5', paras:[
        '1 像铅笔细又长，2 像小鸭水中游，3 像耳朵听声音，4 像小旗迎风飘，5 像秤钩称东西。',
        '书写顺序：从上到下、从左到右。数数可以<b>顺着数</b>，也可以<b>倒着数</b>。' ]},
      { type:'reading', title:'比大小与加减法', paras:[
        '比大小：<span class="formula">4 &gt; 2</span>，<span class="formula">2 &lt; 4</span>，<span class="formula">3 ＝ 3</span>。',
        '加法是把两部分<b>合起来</b>，用「＋」：<span class="formula">2 ＋ 1 ＝ 3</span>。',
        '减法是从总数里<b>去掉一部分</b>，用「－」：<span class="formula">3 － 1 ＝ 2</span>。' ]},
      { type:'quiz', title:'随堂测验·1~5 加减', questions:[
        {q:'2 ＋ 1 ＝ ?',opts:['2','3','4'],ans:1,explain:'合起来是 3。'},
        {q:'3 － 1 ＝ ?',opts:['1','2','3'],ans:1,explain:'去掉 1 剩 2。'},
        {q:'大于号的开口朝？',opts:['大数','小数','随便'],ans:0,explain:'开口朝大数。'},
        {q:'1 ＋ 1 ＝ ?',opts:['1','2','3'],ans:1,explain:'1 加 1 是 2。'} ]},
    ]},
    { id:'m3', t:'6~10 的认识和图形', lessons:[
      { type:'reading', title:'6~10 与图形', illus:svgShapes, paras:[
        '6、7、8、9、10 都比 5 大；10 是两位数，由 1 个十和 0 个一组成。',
        '常见图形：长长的<b>长方形</b>、四边相等的<b>正方形</b>、圆圆的<b>圆</b>、尖尖的<b>三角形</b>。',
        '数图形要按顺序数，做到不重复、不遗漏。' ]},
      { type:'quiz', title:'随堂测验·6~10 与图形', questions:[
        {q:'10 由几个十和几个一组成？',opts:['1 个十 0 个一','2 个十','0 个十'],ans:0,explain:'10 = 1 个十。'},
        {q:'皮球是哪种形状？',opts:['圆','方','三角'],ans:0,explain:'皮球是圆的。'},
        {q:'正方形有几条边？',opts:['3','4','5'],ans:1,explain:'正方形四条边相等。'},
        {q:'7 和 4 比，？',opts:['7 ＜ 4','7 ＞ 4','7 ＝ 4'],ans:1,explain:'7 更大。'} ]},
    ]},
  ]},

  g2:{ ed:'人教版', et:40, units:[
    { id:'g2m1', t:'100 以内数的认识与加减', lessons:[
      { type:'reading', title:'数位与加减', illus:svgBar, paras:[
        '数位：右边起第一位是个位，第二位是十位。35 里 3 在十位表示 3 个十，5 在个位表示 5 个一。',
        '<b>进位加</b>：28 ＋ 7，先算 8＋7＝15，再 20＋15＝35。',
        '<b>退位减</b>：32 － 5，先把 32 分成 20 和 12，12－5＝7，再 20＋7＝27。' ]},
      { type:'quiz', title:'随堂测验·100 以内', questions:[
        {q:'35 的十位是？',opts:['3','5','35'],ans:0,explain:'十位是 3。'},
        {q:'28 ＋ 7 ＝ ?',opts:['35','25','45'],ans:0,explain:'8＋7=15，20+15=35。'},
        {q:'比 47 小的数是？',opts:['46','48','50'],ans:0,explain:'46 比 47 小。'},
        {q:'退位减 32－5＝？',opts:['27','37','25'],ans:0,explain:'12-5=7，20+7=27。'} ]},
    ]},
    { id:'g2m2', t:'表内乘法与长度单位', lessons:[
      { type:'reading', title:'乘法与长度', paras:[
        '乘法是<b>几个相同数相加</b>的简便写法：3 个 4 相加 = <span class="formula">3 × 4 ＝ 12</span>。',
        '长度单位：<span class="formula">1 米 ＝ 100 厘米</span>。量较短物体用厘米（cm），较长用米（m）。',
        '角有一个顶点和两条边；方方正正的角是<b>直角</b>。' ]},
      { type:'quiz', title:'随堂测验·乘法与长度', questions:[
        {q:'3 × 4 ＝ ?',opts:['7','12','34'],ans:1,explain:'3 个 4 相加=12。'},
        {q:'1 米 ＝ ? 厘米',opts:['10','100','1000'],ans:1,explain:'1 米=100 厘米。'},
        {q:'直角是几度？',opts:['90','180','360'],ans:0,explain:'直角=90°。'},
        {q:'量课桌长度用？',opts:['厘米','千米','米'],ans:2,explain:'课桌用米更合适。'} ]},
    ]},
  ]},

  g3:{ ed:'人教版', et:45, units:[
    { id:'g3m1', t:'万以内数与乘除法', lessons:[
      { type:'reading', title:'乘除与倍', illus:svgBar, paras:[
        '读万以内的数，从<b>高位</b>读起，千位上是几就读几千。',
        '「倍」表示两个数之间的关系：3 的 4 倍就是 4 个 3，<span class="formula">3 × 4 ＝ 12</span>。',
        '多位数乘一位数：先乘个位，再乘十位，满几十就向前一位进几。' ]},
      { type:'quiz', title:'随堂测验·万以内', questions:[
        {q:'3 的 4 倍是？',opts:['7','12','34'],ans:1,explain:'4 个 3=12。'},
        {q:'200 × 3 ＝ ?',opts:['60','600','230'],ans:1,explain:'2×3=6，添两个 0=600。'},
        {q:'读数从哪起？',opts:['高位','低位','中间'],ans:0,explain:'从高位读起。'},
        {q:'24 × 2 ＝ ?',opts:['48','26','46'],ans:0,explain:'20×2+4×2=48。'} ]},
    ]},
    { id:'g3m2', t:'分数与长方形周长', lessons:[
      { type:'reading', title:'分数与周长', illus:svgFrac(1,2), paras:[
        '把一个整体<b>平均分成</b>几份，其中的一份或几份叫分数。一半记作 <span class="formula">1/2</span>。',
        '长方形周长 =（长＋宽）× 2。长 5、宽 3：<span class="formula">(5＋3)×2 ＝ 16</span>。',
        '质量单位：<span class="formula">1 千克 ＝ 1000 克</span>。' ]},
      { type:'quiz', title:'随堂测验·分数与周长', questions:[
        {q:'1/2 表示？',opts:['一半','两倍','无'],ans:0,explain:'平均分成两份取一份。'},
        {q:'长 5 宽 3 的长方形周长？',opts:['16','15','8'],ans:0,explain:'(5+3)×2=16。'},
        {q:'1 千克 ＝ ? 克',opts:['100','1000','10'],ans:1,explain:'1 千克=1000 克。'},
        {q:'分数要求？',opts:['平均分','随便分','切一刀'],ans:0,explain:'必须平均分。'} ]},
    ]},
  ]},

  g4:{ ed:'人教版', et:45, units:[
    { id:'g4m1', t:'大数的认识与运算', lessons:[
      { type:'reading', title:'亿以内的数', illus:svgBar, paras:[
        '计数单位：个、十、百、千、万、十万、百万、千万、亿。10 个千万是<b>一亿</b>。',
        '三位数乘两位数：<span class="formula">125 × 8 ＝ 1000</span>，注意末尾 0 的个数。',
        '除法是乘法的逆运算：知道积和一个因数，可求另一个因数。' ]},
      { type:'quiz', title:'随堂测验·大数', questions:[
        {q:'10 个千万是？',opts:['一亿','一千万','十亿'],ans:0,explain:'满十进一。'},
        {q:'125 × 8 ＝ ?',opts:['1000','100','10000'],ans:0,explain:'125×8=1000。'},
        {q:'除法是哪种运算的逆运算？',opts:['乘法','加法','减法'],ans:0,explain:'除法逆于乘法。'},
        {q:'一亿 ＝ ? 千万',opts:['10','100','1'],ans:0,explain:'10 个千万=一亿。'} ]},
    ]},
    { id:'g4m2', t:'线与角·平行四边形', lessons:[
      { type:'reading', title:'线与角', paras:[
        '线段有<b>两个端点</b>，射线有一个端点，直线没有端点。',
        '角的度量用「度」（°）：平角 <span class="formula">180°</span>，周角 <span class="formula">360°</span>，直角 90°。',
        '平行四边形<b>对边平行且相等</b>；只有一组对边平行的叫梯形。' ]},
      { type:'quiz', title:'随堂测验·图形', questions:[
        {q:'平角是几度？',opts:['180','90','360'],ans:0,explain:'平角=180°。'},
        {q:'线段有几个端点？',opts:['2','1','0'],ans:0,explain:'线段两端点。'},
        {q:'梯形有几组对边平行？',opts:['1','2','0'],ans:0,explain:'梯形只有一组。'},
        {q:'平行四边形对边？',opts:['平行且相等','不等','垂直'],ans:0,explain:'对边平行且相等。'} ]},
    ]},
  ]},

  g5:{ ed:'人教版', et:45, units:[
    { id:'g5m1', t:'小数与简易方程', lessons:[
      { type:'reading', title:'小数与方程', illus:svgFrac(3,4), paras:[
        '小数加减要<b>对齐小数点</b>再算：<span class="formula">0.3 ＋ 0.4 ＝ 0.7</span>。',
        '简易方程：用字母表示数，如 2x ＝ 6，则 <span class="formula">x ＝ 3</span>。',
        '倍数与因数：2 和 3 的公倍数有 6、12、18……' ]},
      { type:'quiz', title:'随堂测验·小数方程', questions:[
        {q:'0.3 ＋ 0.4 ＝ ?',opts:['0.7','0.07','7'],ans:0,explain:'小数点对齐相加。'},
        {q:'2x ＝ 6，则 x ＝ ?',opts:['3','12','2'],ans:0,explain:'两边同除以 2。'},
        {q:'2 和 3 的公倍数？',opts:['6','5','9'],ans:0,explain:'6 是公倍数。'},
        {q:'1.2 ＋ 0.8 ＝ ?',opts:['2','0.20','1.28'],ans:0,explain:'=2.0=2。'} ]},
    ]},
    { id:'g5m2', t:'分数的意义与长方体', lessons:[
      { type:'reading', title:'分数与体积', illus:svgFrac(3,4), paras:[
        '分数单位：1/4 是 3/4 的分数单位。通分、约分都不改变分数的<b>大小</b>。',
        '<span class="formula">3/4 ＝ 0.75</span>。长方体体积 = 长 × 宽 × 高。',
        '约分是把分子分母同除以公因数，使分数变简单。' ]},
      { type:'quiz', title:'随堂测验·分数', questions:[
        {q:'3/4 化为小数是？',opts:['0.75','0.34','0.25'],ans:0,explain:'3÷4=0.75。'},
        {q:'长方体体积＝',opts:['长×宽×高','长×宽','周长'],ans:0,explain:'三维相乘。'},
        {q:'约分不改变？',opts:['大小','形状','颜色'],ans:0,explain:'只变形式不变值。'},
        {q:'2/5 ＋ 1/5 ＝ ?',opts:['3/5','3/10','1'],ans:0,explain:'同分母相加=3/5。'} ]},
    ]},
  ]},

  g6:{ ed:'人教版', et:45, units:[
    { id:'g6m1', t:'分数乘除与比', lessons:[
      { type:'reading', title:'分数乘除与比', paras:[
        '分数乘法：分子乘分子、分母乘分母，<span class="formula">1/2 × 1/3 ＝ 1/6</span>。',
        '比表示两个数相除：3∶1 读作「三比一」。百分数就是分母为 100 的分数，50% ＝ 0.5。' ]},
      { type:'quiz', title:'随堂测验·分数比', questions:[
        {q:'1/2 × 1/3 ＝ ?',opts:['1/6','1/5','2/3'],ans:0,explain:'分子分母分别相乘。'},
        {q:'3∶1 读作？',opts:['三比一','三','一'],ans:0,explain:'比号读作比。'},
        {q:'50% 等于',opts:['0.5','5','0.05'],ans:0,explain:'百分之五十=0.5。'},
        {q:'2/3 × 3 ＝ ?',opts:['2','6','1'],ans:0,explain:'(2×3)/3=2。'} ]},
    ]},
    { id:'g6m2', t:'圆与圆柱圆锥', lessons:[
      { type:'reading', title:'圆与立体图形', illus:svgCircle, paras:[
        '圆的周长 <span class="formula">C ＝ πd ＝ 2πr</span>，面积 <span class="formula">S ＝ πr²</span>。',
        '圆柱体积 = 底面积 × 高；圆锥体积是等底等高圆柱的 <b>1/3</b>。',
        'π 约等于 3.14，半径 2 的圆面积 = 4π ≈ 12.56。' ]},
      { type:'quiz', title:'随堂测验·圆与立体', questions:[
        {q:'圆周长公式是？',opts:['πd','πr','2r'],ans:0,explain:'C=πd=2πr。'},
        {q:'半径 2 的圆面积？',opts:['4π','2π','4'],ans:0,explain:'πr²=4π。'},
        {q:'圆锥体积是圆柱的？',opts:['1/3','1/2','3 倍'],ans:0,explain:'等底等高时为 1/3。'},
        {q:'圆面积公式是？',opts:['πr²','πd','2πr'],ans:0,explain:'S=πr²。'} ]},
    ]},
  ]},

  c1:{ ed:'人教版', et:50, units:[
    { id:'c1m1', t:'有理数与数轴', lessons:[
      { type:'reading', title:'有理数', illus:svgNumLine(5), paras:[
        '正数与负数表示<b>相反意义</b>的量，如零上 5℃ 记 +5，零下 3℃ 记 −3。',
        '数轴三要素：<b>原点、正方向、单位长度</b>。',
        '一个数的绝对值是它的「距离原点多远」：<span class="formula">|−5| ＝ 5</span>；−3 的相反数是 3。' ]},
      { type:'quiz', title:'随堂测验·有理数', questions:[
        {q:'−3 的相反数是？',opts:['3','−3','0'],ans:0,explain:'符号相反。'},
        {q:'|−5| ＝ ?',opts:['5','−5','0'],ans:0,explain:'绝对值非负。'},
        {q:'0 是？',opts:['中性数','正数','负数'],ans:0,explain:'0 非正非负。'},
        {q:'−2 ＋ 5 ＝ ?',opts:['3','−7','7'],ans:0,explain:'异号相加取大号。'} ]},
    ]},
    { id:'c1m2', t:'整式与一元一次方程', lessons:[
      { type:'reading', title:'整式与方程', paras:[
        '用字母表示数；<b>同类项</b>才能合并：<span class="formula">3a ＋ 2a ＝ 5a</span>。',
        '解一元一次方程：移项、合并同类项、系数化为 1。如 2x＋3＝7 → 2x＝4 → <span class="formula">x ＝ 2</span>。',
        '方程是含有<b>未知数</b>的等式，用来把文字问题变成算式。' ]},
      { type:'quiz', title:'随堂测验·方程', questions:[
        {q:'2x＋3＝7，x＝？',opts:['2','5','−2'],ans:0,explain:'2x=4→x=2。'},
        {q:'3a＋2a＝？',opts:['5a','6a','a'],ans:0,explain:'同类项合并。'},
        {q:'方程是含什么的等式？',opts:['未知数','常数','分数'],ans:0,explain:'含未知数。'},
        {q:'3x＝9，x＝？',opts:['3','27','6'],ans:0,explain:'两边同除以 3。'} ]},
    ]},
  ]},

  c2:{ ed:'人教版', et:50, units:[
    { id:'c2m1', t:'三角形与轴对称', lessons:[
      { type:'reading', title:'三角形', illus:svgTri, paras:[
        '三角形内角和 <span class="formula">180°</span>，外角和为 360°。',
        '等腰三角形两底角相等；全等三角形用符号「≌」表示，判定有 SSS、SAS、ASA 等。',
        '轴对称图形沿对称轴对折后两边重合。' ]},
      { type:'quiz', title:'随堂测验·三角形', questions:[
        {q:'三角形内角和？',opts:['180°','360°','90°'],ans:0,explain:'内角和 180°。'},
        {q:'全等符号是？',opts:['≌','≈','≡'],ans:0,explain:'≌ 表示全等。'},
        {q:'等腰两底角？',opts:['相等','互补','互余'],ans:0,explain:'底角相等。'},
        {q:'轴对称沿什么重合？',opts:['对称轴','中线','高'],ans:0,explain:'沿对称轴对折。'} ]},
    ]},
    { id:'c2m2', t:'一次函数与勾股定理', lessons:[
      { type:'reading', title:'函数与勾股', illus:svgAxis, paras:[
        '函数表示两个<b>变量</b>之间的依赖关系。一次函数 <span class="formula">y ＝ kx ＋ b</span> 的图象是一条直线。',
        '勾股定理：直角三角形中 <span class="formula">a² ＋ b² ＝ c²</span>（c 为斜边）。3、4、5 是一组勾股数。' ]},
      { type:'quiz', title:'随堂测验·函数勾股', questions:[
        {q:'勾股定理？',opts:['a²+b²=c²','a+b=c','a²−b²=c²'],ans:0,explain:'直角边平方和=斜边平方。'},
        {q:'y＝2x＋1 中 k＝？',opts:['2','1','0'],ans:0,explain:'k 是斜率。'},
        {q:'3、4 的斜边？',opts:['5','7','6'],ans:0,explain:'√(9+16)=5。'},
        {q:'一次函数图象是？',opts:['直线','曲线','点'],ans:0,explain:'一次函数是直线。'} ]},
    ]},
  ]},

  c3:{ ed:'人教版', et:50, units:[
    { id:'c3m1', t:'二次函数与圆', lessons:[
      { type:'reading', title:'二次函数', illus:svgAxis, paras:[
        '二次函数 <span class="formula">y ＝ ax² ＋ bx ＋ c</span>（a≠0）的图象是<b>抛物线</b>。',
        '相似三角形对应角相等、对应边成比例。圆的周长 <span class="formula">C ＝ 2πr</span>。' ]},
      { type:'quiz', title:'随堂测验·二次函数', questions:[
        {q:'二次函数图象是？',opts:['抛物线','直线','双曲线'],ans:0,explain:'a≠0 时为抛物线。'},
        {q:'相似三角形对应角？',opts:['相等','互补','互余'],ans:0,explain:'相似对应角相等。'},
        {q:'圆周长＝？',opts:['2πr','πr²','πd²'],ans:0,explain:'C=2πr。'},
        {q:'a＝0 时还是二次函数吗？',opts:['不是','是','不确定'],ans:0,explain:'a≠0 才二次。'} ]},
    ]},
    { id:'c3m2', t:'概率与锐角三角函数', lessons:[
      { type:'reading', title:'概率与三角函数', paras:[
        '概率 = 有利结果数 ÷ 所有可能数，范围是 <b>0~1</b>。抛硬币正面概率 1/2。',
        '锐角三角函数：<span class="formula">sin30° ＝ 1/2</span>，<span class="formula">cos60° ＝ 1/2</span>。' ]},
      { type:'quiz', title:'随堂测验·概率三角', questions:[
        {q:'抛硬币正面概率？',opts:['1/2','1','0'],ans:0,explain:'两种等可能。'},
        {q:'sin30° ＝ ?',opts:['1/2','√3/2','1'],ans:0,explain:'特殊角值。'},
        {q:'概率的取值范围是？',opts:['0~1','<0','>1'],ans:0,explain:'概率在 0 到 1 间。'},
        {q:'cos60° ＝ ?',opts:['1/2','√3/2','1'],ans:0,explain:'cos60°=1/2。'} ]},
    ]},
  ]},

  h1:{ ed:'人教版', et:60, units:[
    { id:'h1m1', t:'集合与函数', lessons:[
      { type:'reading', title:'集合与函数', illus:svgShapes, paras:[
        '集合是一些确定对象的全体，空集记作 <span class="formula">∅</span>。交集 ∩、并集 ∪。',
        '函数三要素：<b>定义域、值域、对应法则</b>。指数幂：<span class="formula">2³ ＝ 8</span>。' ]},
      { type:'quiz', title:'随堂测验·集合函数', questions:[
        {q:'空集符号？',opts:['∅','0','{}'],ans:0,explain:'∅ 是空集。'},
        {q:'函数三要素含？',opts:['定义域值域对应法则','三点','两数'],ans:0,explain:'三要素记牢。'},
        {q:'2³ ＝ ?',opts:['8','6','9'],ans:0,explain:'2×2×2=8。'},
        {q:'A∩A ＝ ?',opts:['A','∅','U'],ans:0,explain:'交自身为自身。'} ]},
    ]},
    { id:'h1m2', t:'三角函数与向量', lessons:[
      { type:'reading', title:'三角函数与向量', paras:[
        '弧度制：<span class="formula">π 弧度 ＝ 180°</span>，<span class="formula">sin90° ＝ 1</span>。',
        '向量既有<b>大小</b>又有方向。正弦定理、余弦定理解三角形。' ]},
      { type:'quiz', title:'随堂测验·三角向量', questions:[
        {q:'π 弧度 ＝ ?',opts:['180°','90°','360°'],ans:0,explain:'π=180°。'},
        {q:'sin90° ＝ ?',opts:['1','0','−1'],ans:0,explain:'sin90°=1。'},
        {q:'向量具有？',opts:['大小方向','只大小','只方向'],ans:0,explain:'向量是双重性。'},
        {q:'cos0° ＝ ?',opts:['1','0','−1'],ans:0,explain:'cos0°=1。'} ]},
    ]},
  ]},

  h2:{ ed:'人教版', et:60, units:[
    { id:'h2m1', t:'数列与不等式', lessons:[
      { type:'reading', title:'数列与不等式', paras:[
        '等差数列：后项比前项多一个公差 d。a₁=1、d=2，则 a₃ = 1＋2×2 = <span class="formula">5</span>。',
        '等比数列：a₁=2、q=3，则 a₂ = 6。基本不等式：<span class="formula">a² ＋ b² ≥ 2ab</span>。' ]},
      { type:'quiz', title:'随堂测验·数列不等式', questions:[
        {q:'等差 a₁=1,d=2，a₃＝？',opts:['5','3','7'],ans:0,explain:'1+2×2=5。'},
        {q:'等比 a₁=2,q=3，a₂＝？',opts:['6','5','9'],ans:0,explain:'2×3=6。'},
        {q:'a²+b² ≥ ?',opts:['2ab','ab','a+b'],ans:0,explain:'基本不等式。'},
        {q:'等差数列公差是？',opts:['相邻差','公比','和'],ans:0,explain:'相邻两项之差。'} ]},
    ]},
    { id:'h2m2', t:'立体几何与圆锥曲线', lessons:[
      { type:'reading', title:'立体几何', illus:svgCube, paras:[
        '正方体棱长 a，体积 <span class="formula">V ＝ a³</span>，表面积 6a²。',
        '椭圆是平面斜截圆锥得到的封闭曲线；球体积 <span class="formula">4/3·πr³</span>。' ]},
      { type:'quiz', title:'随堂测验·立体几何', questions:[
        {q:'正方体体积？',opts:['a³','a²','6a²'],ans:0,explain:'三维相乘。'},
        {q:'椭圆是截什么得到？',opts:['圆锥','圆','直线'],ans:0,explain:'斜截圆锥成椭圆。'},
        {q:'球体积含？',opts:['4/3·πr³','πr²','4πr²'],ans:0,explain:'球体积公式。'},
        {q:'a₄ 等差 d=2,a₁=1 ＝？',opts:['7','5','9'],ans:0,explain:'1+3×2=7。'} ]},
    ]},
  ]},

  h3:{ ed:'人教版', et:90, units:[
    { id:'h3m1', t:'导数与极限', lessons:[
      { type:'reading', title:'导数', illus:svgAxis, paras:[
        '导数表示函数的<b>变化率（切线斜率）</b>。幂函数的导数：<span class="formula">(x²)′ ＝ 2x</span>，<span class="formula">(x³)′ ＝ 3x²</span>。',
        '极值点处导数为 0；可用导数判断增减与求最值。' ]},
      { type:'quiz', title:'随堂测验·导数', questions:[
        {q:'(x²)′ ＝ ?',opts:['2x','x','2'],ans:0,explain:'幂函数求导降一次。'},
        {q:'极值点处导数？',opts:['为 0','最大','最小'],ans:0,explain:'驻点导数为 0。'},
        {q:'(x³)′ ＝ ?',opts:['3x²','x²','3x'],ans:0,explain:'降幂并乘原指数。'},
        {q:'导数几何意义是？',opts:['切线斜率','面积','体积'],ans:0,explain:'局部变化率。'} ]},
    ]},
    { id:'h3m2', t:'概率统计与复数', lessons:[
      { type:'reading', title:'概率统计与复数', paras:[
        '排列 A(n,m)、组合 C(n,m)：<span class="formula">C(3,1) ＝ 3</span>。正态分布关于均值对称。',
        '复数单位 i 满足 <span class="formula">i² ＝ −1</span>。' ]},
      { type:'quiz', title:'随堂测验·统计复数', questions:[
        {q:'i² ＝ ?',opts:['−1','1','0'],ans:0,explain:'虚数单位定义。'},
        {q:'C(3,1) ＝ ?',opts:['3','1','6'],ans:0,explain:'从 3 选 1 有 3 种。'},
        {q:'正态分布关于什么对称？',opts:['均值','0','1'],ans:0,explain:'关于均值对称。'},
        {q:'A(3,2) ＝ ?',opts:['6','3','9'],ans:0,explain:'3×2=6。'} ]},
    ]},
  ]},
};

/* ---------- 展开为 COURSES（覆盖 courses_more_1.js 生成的 数学） ---------- */
Object.keys(MATH).forEach(gid=>{
  const m = MATH[gid];
  const gradeName = (GRADES.find(x=>x.id===gid)||{}).name || gid;
  const units = m.units.map(u=>({
    id:u.id, title:u.t,
    lessons: u.lessons.map((L,i)=>({ id:u.id+'l'+(i+1), ...L }))
  }));
  units.push({ id:'exam', title:gradeName+'·期末模拟考', lessons:[
    { id:'exam1', title:'数学·期末模拟考', type:'exam', timeLimit:m.et,
      questions: m.units.flatMap(u=>u.lessons.filter(l=>l.type==='quiz').flatMap(l=>l.questions)) }
  ]});
  COURSES[gid+'-数学'] = {
    meta:{
      grade:gradeName, subject:'数学', edition:m.ed, volume: gid==='youeryuan'?'':'',
      book:NATIONAL_TEXTBOOK,
      desc:'数学（'+m.ed+'）'+gradeName+'原创纵向课程：原创讲解 + 原创示意图 + 随堂测验 + 期末模拟考。点「正版教材」前往国家中小学智慧教育平台（人教版/苏教版）免费阅读对应课本。'
    },
    units
  };
});
