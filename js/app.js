/* ============================================================
 *  学贯 App 逻辑：导航 / 认字卡 / 随堂测验 / 期末模拟考 / 进度
 * ============================================================ */
'use strict';

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const STORE_KEY = 'zx_progress_v1';
function loadProgress(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }catch(e){ return {}; } }
function saveProgress(p){ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
let PROGRESS = loadProgress();

// 当前首页状态：grade -> subject（vertical 为纵向贯通模式，vsub 为当前贯通学科）
let home = { grade:null, subject:null, vertical:false, vsub:null };

/* ---------------- 首页渲染 ---------------- */
function renderHome(){
  const view = $('#view');
  if(home.vertical){ view.innerHTML = verticalView(home.vsub); return; }
  if(!home.grade){ view.innerHTML = gradeGrid(); return; }
  const g = GRADES.find(x=>x.id===home.grade);
  if(!home.subject){ view.innerHTML = subjectList(g); return; }
  // 有完整课程？
  if(courseExists(home.grade, home.subject)){
    view.innerHTML = courseView(home.grade, home.subject);
  } else {
    view.innerHTML = emptyCourse(home.grade, home.subject);
  }
}

/* 由 COURSES 自动推导「有哪些学科已贯通到多个年级」 */
function subjectTracks(){
  const map = {};
  Object.keys(COURSES).forEach(k=>{
    const i = k.indexOf('-'); const g = k.slice(0,i), s = k.slice(i+1);
    (map[s] = map[s] || []).push(g);
  });
  return Object.keys(map).map(s=>({
    subject:s,
    grades: map[s].sort((a,b)=>GRADES.findIndex(x=>x.id===a)-GRADES.findIndex(x=>x.id===b))
  })).filter(t=>t.grades.length>=2);
}

function gradeGrid(){
  return subjectCards() +
    `<div class="section-title">选择学段 / 年级</div>
    <div class="grid">` +
    GRADES.map(g=>`<div class="card grade-card" data-grade="${g.id}">
      <div class="gicon">${gradeIcon(g.id)}</div>
      <div class="gname" style="margin-top:6px">${g.name}</div>
      <div class="gnote">${g.note||'　'}</div></div>`).join('') + `</div>
    <div class="empty" style="padding:18px">已内置纵向课程：<b>语文（幼儿园→高三）</b>、<b>数学 / 英语 / 物理 / 化学 / 生物（一年级→高三）</b>，含随堂测验与期末模拟考。点上方「学科贯通」卡片可逐科纵向通关；点「正版教材」看国家平台电子课本（人教版 / 苏教版）。</div>`;
}

function subjectCards(){
  const tracks = subjectTracks();
  const icon = { '语文':'📜','语言认字':'🌱','数学':'🔢','英语':'🔤','物理':'⚛️','化学':'🧪','生物':'🌿' };
  return `<div class="section-title">学科贯通之路（纵向 K12）</div>
    <div class="list">` +
    tracks.map(t=>`<div class="course-card" data-vsubject="${t.subject}">
      <div class="cc-ico">${icon[t.subject]||'📘'}</div>
      <div class="cc-main">
        <div class="cc-t">${t.subject} · 贯通</div>
        <div class="cc-s">${t.grades.length} 个年级纵向打通：${GRADES.find(x=>x.id===t.grades[0]).name} → ${GRADES.find(x=>x.id===t.grades[t.grades.length-1]).name}</div>
      </div><span class="it-arrow">›</span></div>`).join('') + `</div>`;
}

function verticalView(subject){
  const tr = subjectTracks().find(t=>t.subject===subject);
  if(!tr) return `<div class="back" data-vback="home">← 返回首页</div><div class="empty">暂无该学科贯通数据</div>`;
  const grades = tr.grades;
  const items = grades.map((gid,i)=>{
    const g = GRADES.find(x=>x.id===gid);
    const done = Object.keys(PROGRESS).filter(k=>k.startsWith(gid+'|'+subject+'|')&&PROGRESS[k].done).length;
    return `<div class="item v-item" data-vgrade="${gid}" data-vsub="${subject}">
      <div class="v-num">${i+1}</div>
      <div style="flex:1">
        <div class="it-title">${g.name} · ${subject}</div>
        <div class="it-sub">${COURSES[gid+'-'+subject].meta.edition}${done?` ｜ 已完成 ${done} 课`:''}</div>
      </div>
      <span class="it-arrow">›</span></div>`;
  }).join('');
  return `<div class="back" data-vback="home">← 返回首页</div>
    <div class="section-title">📘 ${subject} · 纵向贯通（${grades.length} 年级）</div>
    <div class="empty" style="padding:0 4px 14px;text-align:left;color:var(--sub)">
      从 ${GRADES.find(x=>x.id===grades[0]).name} 到 ${GRADES.find(x=>x.id===grades[grades.length-1]).name}，逐个点亮即完成该科 K12 贯通。</div>
    <div class="list">${items}</div>`;
}

function gradeIcon(id){
  if(id==='youeryuan') return '🌱';
  if(id.startsWith('g')) return '🏫';
  if(id.startsWith('c')) return '🎒';
  return '🎓';
}

function subjectList(g){
  return `<div class="back" data-back="grade">← 返回学段</div>
    <div class="section-title">${g.name} · 学科</div>
    <div class="list">` +
    g.subjects.map(s=>{
      const has = courseExists(g.id, s);
      return `<div class="item" data-subject="${s}">
        <div><div class="it-title">${s}</div>
          <div class="it-sub">${has?'已内置课程+测验+模拟考':'参考国家平台正版教材'}</div></div>
        <div style="display:flex;gap:6px;align-items:center">
          ${has?'<span class="tag done">可学</span>':'<span class="tag">待补</span>'}
          <span class="it-arrow">›</span></div></div>`;
    }).join('') + `</div>`;
}

function courseView(gradeId, subject){
  const c = COURSES[gradeId+'-'+subject];
  const backTxt = home.vsub ? '← 返回'+home.vsub+'贯通之路' : '← 返回学科';
  let html = `<div class="back" data-back="subject">${backTxt}</div>
    <div class="section-title">${c.meta.grade} ${c.meta.subject}（${c.meta.edition}${c.meta.volume}）</div>
    <div class="empty" style="padding:8px 4px;color:var(--sub);text-align:left">${c.meta.desc}</div>
    <a class="book-btn" href="${c.meta.book||NATIONAL_TEXTBOOK}" target="_blank" rel="noopener">📖 正版教材（人教版 / 苏教版 · 国家平台）</a>`;
  c.units.forEach(u=>{
    html += `<div class="section-title">${u.title}</div><div class="list">`;
    u.lessons.forEach(l=>{
      const key = keyOf(gradeId, subject, u.id, l.id);
      const p = PROGRESS[key];
      const tag = l.type==='exam' ? '<span class="tag exam">模拟考</span>'
                : p&&p.done ? '<span class="tag done">已完成</span>'
                : '<span class="tag">去学习</span>';
      const sub = l.type==='chars' ? '认字卡'
                : l.type==='reading' ? '课文/知识点'
                : l.type==='quiz' ? '随堂测验'
                : `${l.timeLimit}分钟·${l.questions.length}题`;
      html += `<div class="item" data-lesson='${JSON.stringify({gradeId,subject,unitId:u.id,lessonId:l.id})}'>
        <div><div class="it-title">${l.title}</div><div class="it-sub">${sub}</div></div>
        <div style="display:flex;gap:6px;align-items:center">${tag}<span class="it-arrow">›</span></div></div>`;
    });
    html += `</div>`;
  });
  return html;
}

function emptyCourse(gradeId, subject){
  const kw = SUBJECT_KEYWORD[subject] || subject;
  const backTxt = home.vsub ? '← 返回'+home.vsub+'贯通之路' : '← 返回学科';
  return `<div class="back" data-back="subject">${backTxt}</div>
    <div class="empty">
      <div style="font-size:40px">📖</div>
      <p><b>${GRADES.find(g=>g.id===gradeId).name} · ${subject}</b><br>本课程骨架已就位，完整课文与题库待填充。</p>
      <p>正版教材请到 <b>国家中小学智慧教育平台</b> 免费在线阅读（人教版）。</p>
      <a class="book-link" href="${NATIONAL_TEXTBOOK}" target="_blank" rel="noopener">
        <span class="bl-go">↗</span>
        <div class="bl-t">打开「${kw}」正版电子教材</div>
        <div class="bl-s">${NATIONAL_TEXTBOOK}</div></a>
      <button class="btn ghost" data-back="subject">返回学科列表</button>
    </div>`;
}

/* ---------------- 课程浮层 ---------------- */
function keyOf(gradeId, subject, unitId, lessonId){ return [gradeId,subject,unitId,lessonId].join('|'); }

function openLesson(meta){
  const c = COURSES[meta.gradeId+'-'+meta.subject];
  const u = c.units.find(x=>x.id===meta.unitId);
  const l = u.lessons.find(x=>x.id===meta.lessonId);
  $('#layerTitle').textContent = l.title;
  const body = $('#layerBody');
  if(l.type==='chars') renderChars(body, l, meta, u);
  else if(l.type==='reading') renderReading(body, l, meta);
  else if(l.type==='quiz') renderQuiz(body, l, meta, u, false);
  else if(l.type==='exam') renderQuiz(body, l, meta, u, true);
  $('#lessonLayer').classList.remove('hidden');
}

function renderReading(body, l, meta){
  let html = '';
  if(l.illus) html += `<div class="math-illus">${l.illus}</div>`;
  html += l.paras.map(p=>`<div class="q"><div class="qt">${p}</div></div>`).join('')
    + `<button class="btn" id="markDone">标记为已学完</button>`;
  body.innerHTML = html;
  $('#markDone').onclick = ()=>{ setDone(meta); body.innerHTML = `<div class="result"><div class="score">✓</div><div class="msg">已记录学习进度</div><button class="btn" onclick="closeLayer()">完成</button></div>`; };
}

let flashIdx = 0;
function renderChars(body, l, meta, u){
  flashIdx = 0;
  const draw = ()=>{
    const ch = l.chars[flashIdx];
    body.innerHTML = `
      <div class="flashcard">
        <div class="big">${ch.zi}</div>
        <div class="py">${ch.py}</div>
        <div class="wd">组词：${ch.word}</div>
        <div class="st">${ch.sent}</div>
      </div>
      <div class="progress-dots">${flashIdx+1} / ${l.chars.length}</div>
      <div class="flash-nav">
        <button id="prev">← 上一个</button>
        <button id="next">下一个 →</button>
      </div>
      <button class="btn ghost" id="finishChars" style="margin-top:14px">完成认字</button>`;
    $('#prev').onclick = ()=>{ if(flashIdx>0){flashIdx--;draw();} };
    $('#next').onclick = ()=>{ if(flashIdx<l.chars.length-1){flashIdx++;draw();} };
    $('#finishChars').onclick = ()=>{ setDone(meta); body.innerHTML = `<div class="result"><div class="score">${l.chars.length}</div><div class="msg">个汉字已学习</div><button class="btn" onclick="closeLayer()">完成</button></div>`; };
  };
  draw();
}

function renderQuiz(body, l, meta, u, isExam){
  let html = '';
  if(isExam) html += `<div class="timer" id="timer">⏱ 剩余 ${l.timeLimit} 分钟</div>`;
  html += l.questions.map((q,i)=>`
    <div class="q" data-i="${i}">
      <div class="qt">${i+1}. ${q.q}</div>
      ${q.opts.map((o,j)=>`<button class="opt" data-q="${i}" data-o="${j}">${o}</button>`).join('')}
      ${q.explain?`<div class="ex" style="display:none">解析：${q.explain}</div>`:''}
    </div>`).join('');
  html += `<button class="btn" id="submitQuiz">${isExam?'交卷':'提交测验'}</button>`;
  body.innerHTML = html;

  const picks = {};
  $$('.opt', body).forEach(b=>{
    b.onclick = ()=>{
      const qi = b.dataset.q;
      $$(`.opt[data-q="${qi}"]`, body).forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel'); picks[qi] = +b.dataset.o;
    };
  });

  let timerId=null;
  if(isExam){
    let left = l.timeLimit*60;
    timerId = setInterval(()=>{
      left--; const m=Math.floor(left/60), s=left%60;
      const t=$('#timer'); if(t) t.textContent = `⏱ 剩余 ${m}:${String(s).padStart(2,'0')}`;
      if(left<=0){ clearInterval(timerId); doSubmit(); }
    },1000);
  }

  function doSubmit(){
    if(timerId) clearInterval(timerId);
    let right=0; const wrong=[];
    l.questions.forEach((q,i)=>{
      const box = $(`.q[data-i="${i}"]`, body);
      const chosen = picks[i];
      $$('.opt', box).forEach((b,j)=>{
        b.onclick=null;
        if(j===q.ans) b.classList.add('correct');
        if(j===chosen && chosen!==q.ans) b.classList.add('wrong');
      });
      const ex = $('.ex', box); if(ex) ex.style.display='block';
      if(chosen===q.ans){ right++; }
    else { wrong.push({q:q.q, a:q.opts[q.ans], u:q.opts[chosen]});
           recordWrong(meta.gradeId, meta.subject, l.title, q.q, q.opts[q.ans], q.opts[chosen]); }
    });
    const score = Math.round(right/l.questions.length*100);
    setScore(meta, isExam?'exam':'quiz', score, wrong);
    const pct = Math.round(right/l.questions.length*100);
    body.innerHTML = `<div class="result">
      <div class="score">${score}<small>分</small></div>
      <div class="msg">答对 ${right} / ${l.questions.length} 题${wrong.length?`，错题已收入错题本`:' 🎉'}</div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <button class="btn" onclick="closeLayer()">完成</button>
      ${wrong.length?`<button class="btn ghost" id="seeWrong">查看错题</button>`:''}
    </div>`;
    const sw=$('#seeWrong'); if(sw) sw.onclick=()=>showWrong(body, wrong);
  }
  $('#submitQuiz').onclick = doSubmit;
}

function showWrong(body, wrong){
  body.innerHTML = `<div class="section-title">错题本（本次）</div>` +
    wrong.map(w=>`<div class="q"><div class="qt">${w.q}</div>
      <div class="ex">你的答案：${w.u||'未答'} ｜ 正确答案：<b>${w.a}</b></div></div>`).join('')
    + `<button class="btn" onclick="closeLayer()">返回</button>`;
}

/* ---------------- 进度存储 ---------------- */
function setDone(meta){
  const k = keyOf(meta.gradeId, meta.subject, meta.unitId, meta.lessonId);
  PROGRESS[k] = Object.assign(PROGRESS[k]||{}, {done:true});
  saveProgress(PROGRESS);
}
function setScore(meta, kind, score, wrong){
  const k = keyOf(meta.gradeId, meta.subject, meta.unitId, meta.lessonId);
  const prev = PROGRESS[k] || {};
  PROGRESS[k] = { done:true, kind, score, last:Date.now(),
                  wrong:(prev.wrong||[]).concat(wrong.map(w=>w.q)) };
  // 去重
  PROGRESS[k].wrong = [...new Set(PROGRESS[k].wrong)];
  saveProgress(PROGRESS);
}

/* ---------------- 错题记录 / 打卡 / 导出 ---------------- */
function fmtDate(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function todayStr(){ return fmtDate(new Date()); }

function recordWrong(grade, subject, lesson, q, correct, chosen){
  PROGRESS.__wrong = PROGRESS.__wrong || [];
  if(!PROGRESS.__wrong.some(w=>w.q===q)){
    PROGRESS.__wrong.push({ grade, subject, lesson, q, a:correct, u:chosen||'未答', t:Date.now() });
  }
  saveProgress(PROGRESS);
}
function checkedToday(){ return (PROGRESS.__checkin||[]).includes(todayStr()); }
function doCheckin(){
  PROGRESS.__checkin = PROGRESS.__checkin || [];
  const t = todayStr();
  if(!PROGRESS.__checkin.includes(t)){ PROGRESS.__checkin.push(t); saveProgress(PROGRESS); }
}
function streakDays(){
  const arr = new Set(PROGRESS.__checkin||[]);
  const base = new Date(); let start = arr.has(todayStr())?0:1; let s=0;
  for(let i=start;;i++){
    const d=new Date(base); d.setDate(base.getDate()-i);
    if(arr.has(fmtDate(d))) s++; else break;
  }
  return s;
}
function exportWrong(){
  const w = PROGRESS.__wrong||[];
  if(!w.length){ alert('错题本还是空的，去测验里练一练吧！'); return; }
  let txt = '学贯 · 错题本导出\n导出时间：'+new Date().toLocaleString()+'　共 '+w.length+' 题\n\n';
  w.forEach((x,i)=>{ txt += (i+1)+'. 【'+x.grade+'·'+x.subject+'】'+x.lesson+'\n   题目：'+x.q+'\n   你的答案：'+x.u+'\n   正确答案：'+x.a+'\n\n'; });
  const blob = new Blob([txt], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = '错题本_'+todayStr()+'.txt'; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}

window.closeLayer = function(){ $('#lessonLayer').classList.add('hidden'); renderHome(); };

/* ---------------- 正版教材页 ---------------- */
function renderBooks(){
  const items = [
    ['语文','识字、阅读、写作全线'],
    ['数学','数与代数、图形、统计'],
    ['英语','听说读写'],
    ['物理 / 化学 / 生物','理科实验与探究'],
    ['历史 / 地理 / 政治','人文与社会'],
  ];
  $('#view').innerHTML = `<div class="section-title">正版电子教材（官方入口）</div>
    <div class="empty" style="padding:0 4px 12px;text-align:left;color:var(--sub)">
      教材版权归原作者与出版社所有，本软件提供<b>官方免费阅读入口</b>，不复制、不分发教材原文。可在平台按<b>学段 / 学科 / 版本（人教版、苏教版等）</b>筛选。</div>
    <a class="book-link" href="${NATIONAL_TEXTBOOK}" target="_blank" rel="noopener">
      <span class="bl-go">↗</span>
      <div class="bl-t">国家中小学智慧教育平台 · 教材中心（多版本）</div>
      <div class="bl-s">${NATIONAL_TEXTBOOK}</div></a>
    <a class="book-link" href="https://www.pep.com.cn" target="_blank" rel="noopener">
      <span class="bl-go">↗</span>
      <div class="bl-t">人民教育出版社（人教版官网）</div>
      <div class="bl-s">https://www.pep.com.cn</div></a>
    <div class="section-title">按学科直达（国家平台）</div><div class="list">` +
    items.map(([t,s])=>`<a class="book-link" href="${NATIONAL_TEXTBOOK}" target="_blank" rel="noopener">
      <span class="bl-go">↗</span><div class="bl-t">${t}</div><div class="bl-s">${s}</div></a>`).join('') +
    `</div>`;
}

/* ---------------- 我的 ---------------- */
function renderMine(){
  const keys = Object.keys(PROGRESS).filter(k=>k!=='__wrong'&&k!=='__checkin');
  const done = keys.filter(k=>PROGRESS[k].done).length;
  const scored = keys.filter(k=>PROGRESS[k].score!=null);
  const avg = scored.length? Math.round(scored.reduce((a,k)=>a+PROGRESS[k].score,0)/scored.length):0;
  const wrong = PROGRESS.__wrong||[];
  const streak = streakDays();
  const checked = checkedToday();
  const last7 = [];
  for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); const k=fmtDate(d); last7.push({k, on:(PROGRESS.__checkin||[]).includes(k)}); }
  $('#view').innerHTML = `
    <div class="stat-row">
      <div class="stat"><div class="num">${done}</div><div class="lab">已完成课程</div></div>
      <div class="stat"><div class="num">${streak}</div><div class="lab">连续打卡·天</div></div>
      <div class="stat"><div class="num">${wrong.length}</div><div class="lab">错题数</div></div>
    </div>
    <div class="checkin-card">
      <div class="ci-top">
        <div><div class="ci-day">🔥 连续 ${streak} 天</div><div class="ci-sub">坚持打卡，积跬步以至千里</div></div>
        <button class="btn ci-btn" id="checkinBtn" ${checked?'disabled style="opacity:.6"':''}>${checked?'今日已打卡 ✓':'今日打卡'}</button>
      </div>
      <div class="ci-week">${last7.map(d=>`<span class="ci-dot ${d.on?'on':''}" title="${d.k}">${d.k.slice(5)}</span>`).join('')}</div>
    </div>
    <div class="section-title">错题本（${wrong.length}）</div>
    <div class="list">${wrong.length? wrong.slice().reverse().map(w=>`<div class="item"><div class="it-title">${w.q}</div><div class="it-sub">${w.grade}·${w.subject} ｜ 你的：${w.u} ／ 正确：${w.a}</div></div>`).join('')
      : '<div class="empty">还没有错题，去测验里练一练吧！</div>'}</div>
    <button class="btn ghost" id="exportWrong" style="margin-top:12px">导出错题本（TXT）</button>
    <button class="btn ghost" id="reset" style="margin-top:8px">清除全部进度</button>`;
  $('#checkinBtn').onclick = ()=>{ doCheckin(); renderMine(); };
  $('#exportWrong').onclick = exportWrong;
  $('#reset').onclick = ()=>{ if(confirm('确定清除全部学习进度与错题？')){ PROGRESS={}; saveProgress({}); renderMine(); } };
}

/* ---------------- 排行榜 ---------------- */
function renderRank(){
  const keys = Object.keys(PROGRESS).filter(k=>k!=='__wrong'&&k!=='__checkin');
  const scored = keys.filter(k=>PROGRESS[k].score!=null);
  const myScore = scored.reduce((a,k)=>a+PROGRESS[k].score,0);
  const myDone = keys.filter(k=>PROGRESS[k].done).length;
  const peers = [
    {name:'同桌·小明', score:1820},
    {name:'三班·王芳', score:1540},
    {name:'班长·李雷', score:1360},
    {name:'好友·韩梅', score:980},
  ];
  const all = peers.concat([{name:'我', score:myScore, me:true}]).sort((a,b)=>b.score-a.score);
  const myRank = all.findIndex(x=>x.me)+1;
  const subj = {};
  scored.forEach(k=>{ const s=k.split('|')[1]; subj[s]=(subj[s]||0)+PROGRESS[k].score; });
  const subjArr = Object.keys(subj).map(s=>({s, v:subj[s]})).sort((a,b)=>b.v-a.v);
  $('#view').innerHTML = `
    <div class="stat-row">
      <div class="stat"><div class="num">${myScore}</div><div class="lab">我的总积分</div></div>
      <div class="stat"><div class="num">${myRank}</div><div class="lab">当前排名</div></div>
      <div class="stat"><div class="num">${myDone}</div><div class="lab">完成课程</div></div>
    </div>
    <div class="section-title">🏆 学习积分榜（本地示例）</div>
    <div class="list">${all.map((p,i)=>`<div class="item rank-item ${p.me?'me':''}">
        <div class="rank-no">${i+1}</div>
        <div style="flex:1"><div class="it-title">${p.name}</div><div class="it-sub">${p.score} 分</div></div>
        ${p.me?'<span class="tag done">你</span>':'<span class="ci-dot-none"></span>'}</div>`).join('')}</div>
    <div class="section-title">我的学科积分</div>
    <div class="list">${subjArr.length? subjArr.map(x=>`<div class="item"><div class="it-title">${x.s}</div><div class="it-sub">${x.v} 分</div></div>`).join('')
      : '<div class="empty">还没有成绩，去测验里练一练吧！</div>'}</div>
    <div class="empty" style="padding:10px 4px">* 榜单为本地示例同学，仅用于激励；接入后端后可变为真实班级 / 全校排行。</div>`;
}

/* ---------------- 事件绑定 ---------------- */
function bindTabs(){
  $$('.tab').forEach(t=>t.onclick=()=>{
    $$('.tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.dataset.tab;
    $('#appbarTitle').textContent = tab==='home'?'学贯':tab==='books'?'正版教材':tab==='rank'?'学习榜':'我的';
    $('#appbarSub').textContent = tab==='home'?'幼儿园 → 高中 · 全科自学测评':tab==='books'?'国家中小学智慧教育平台':tab==='rank'?'积分排行与激励':'学习进度与错题本';
    if(tab==='home'){ home={grade:null,subject:null,vertical:false,vsub:null}; renderHome(); }
    else if(tab==='books') renderBooks();
    else if(tab==='rank') renderRank();
    else renderMine();
  });
}

function bindView(){
  $('#view').addEventListener('click', e=>{
    const vs = e.target.closest('[data-vsubject]');
    if(vs){ home = {grade:null, subject:null, vertical:true, vsub:vs.dataset.vsubject}; renderHome(); return; }
    const vc = e.target.closest('[data-vgrade]');
    if(vc){ home = {grade:vc.dataset.vgrade, subject:vc.dataset.vsub, vertical:false, vsub:vc.dataset.vsub}; renderHome(); return; }
    const vbh = e.target.closest('[data-vback="home"]');
    if(vbh){ home = {grade:null, subject:null, vertical:false, vsub:null}; renderHome(); return; }
    const gc = e.target.closest('[data-grade]');
    if(gc){ home = {grade:gc.dataset.grade, subject:null, vertical:false}; renderHome(); return; }
    const sc = e.target.closest('[data-subject]');
    if(sc){ home.subject = sc.dataset.subject; renderHome(); return; }
    const lc = e.target.closest('[data-lesson]');
    if(lc){ openLesson(JSON.parse(lc.dataset.lesson)); return; }
    const bc = e.target.closest('[data-back]');
    if(bc){ const b=bc.dataset.back; if(b==='grade'){home={grade:null,subject:null,vertical:false,vsub:null};} else { if(home.vsub){ home={grade:null,subject:null,vertical:true,vsub:home.vsub}; } else { home.subject=null; } } renderHome(); return; }
  });
  $('#layerBack').onclick = window.closeLayer;
}

/* ---------------- 启动 ---------------- */
bindTabs();
bindView();
renderHome();
