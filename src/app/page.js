'use client'
import { useEffect, useState } from "react";

const constcard = [
      { id: 1, url: "/cards/b.png", chosen: false, free: false },
      { id: 2, url: "/cards/eee.png", chosen: false, free: false },
      { id: 3, url: "/cards/eeeee.png", chosen: false, free: false },
      { id: 4, url: "/cards/eeeeeeeeeeeeeeee.png", chosen: false, free: false },
      { id: 5, url: "/cards/f.png", chosen: false, free: false },
      { id: 6, url: "/cards/Gemini_Generated_Image_xnr112xnr112xnr1.png", chosen: false, free: false },
      { id: 7, url: "/cards/Gemini_Generated_Image_xnr112xnr112xnr1ww.png", chosen: false, free: false },
      { id: 8, url: "/cards/Gemini_Generated_Image_xqh2p4xqh2p4xqh2.png", chosen: false, free: false },
      { id: 9, url: "/cards/Gemini_Generated_Image_yut74pyut74pyut7 (1).png", chosen: false, free: false },
      { id: 10, url: "/cards/p.png", chosen: false, free: false },
      { id: 11, url: "/cards/u.png", chosen: false, free: false },
      { id: 12, url: "/cards/uu.png", chosen: false, free: false },
      { id: 13, url: "/cards/v.png", chosen: false, free: false },
      { id: 14, url: "/cards/vvv.png", chosen: false, free: false },
      { id: 15, url: "/cards/y.png", chosen: false, free: false },
      { id: 16, url: "/cards/yy.png", chosen: false, free: false },
];

export default function Home() {
  function rendomeARR(newarr){
    let arr = [...newarr]
    for (let i = arr.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[r]] = [arr[r], arr[i]];
    }
    return(arr);
  }

  const [numpercard,setNumpercard]=useState(6);
  const [timer,settimer]=useState(0);
  const [timerON,setTimerON]=useState(false)
  const [slide,setSlied]=useState(0);
  const [result,setresult]=useState(1);
  const [times,setTimes]=useState(0);
  const [cardImages,setCardImage]=useState([]);

  useEffect(()=>{
    setCardImage(rendomeARR([...constcard.slice(0,numpercard),...constcard.slice(0,numpercard)]).map((card,i)=>{return {...card,i}}))
  },[numpercard])
  useEffect(()=>{
    if(cardImages.filter(card=>!card.free).length==0&&cardImages.length!=0){
      setresult(0)
    }
  },[cardImages])
  useEffect(()=>{
    console.log(slide)
    console.log(result)
    if(slide==0||result==0){
      return
    }
    const interval= setInterval(()=>{
      settimer(prev=>prev+1)
    },1000)
    return () => clearInterval(interval);
  },[timerON,slide,result])

  const [prev,setPrev]=useState(null)
  function handelgame (item){
    if(prev?.free||item.free||item.i==prev?.i){return};
    if(!prev){
      console.log("اول اختيرا")
      setPrev(item);
      setCardImage(cardImages.map(card=>card.i === item.i? { ...card, chosen: true }: card))
    }else{
      console.log("ثانى اختبرا")
      setCardImage(cardImages.map(card=>card.i === item.i? { ...card, chosen: true }: card))
      setTimes(times+1)
      if(item.id!=prev.id){
        setTimeout(()=>{
            setCardImage(prev=>prev.map((card)=>{return{...card,chosen:false}}))
        },500)
      }
      setPrev(null)
    }
    setCardImage(prevvv=>{
        return prevvv.map(card=>{
            if(prevvv.filter(filtercard=>filtercard.id==card.id&&card.chosen&&filtercard.chosen).length==2){
              return {...card,free:true}
            }else{
              return card
            }
        })})
  }

  function reblay (){
    setresult(1);
    setSlied(1);
    setTimes(0);
    settimer(0)
    setCardImage(rendomeARR([...constcard.slice(0,numpercard),...constcard.slice(0,numpercard)]).map((card,i)=>{return {...card,i}}));
  }
  function mainPag() {
    setSlied(0);
    setresult(1);
    settimer(0);
    setTimes(0)
  }
   return (
    <div className={"home-page"}>
      <div className="card home" style={{left:`${slide*100}%`}}>
        <h1>
          اختبر ذكائك
          {/* task */}
        </h1>
        <img src="/homepage/Gemini_Generated_Image_sivojwsivojwsivo.png" ></img>
        <button onClick={()=>{reblay()}}>ابدأ اللعب</button>
        <div className="levels">
          <button onClick={()=>{setSlied(1);setNumpercard(6)}}  style={{backgroundColor:"rgb(143, 234, 196)"}}>
            سهل
            <br/>(4x6)
          </button>
          <button onClick={()=>{setSlied(1);setNumpercard(8)}}  style={{backgroundColor:"rgb(240, 192, 78)"}}>
            متوسط
            <br/>(4x8)
          </button>
          <button  onClick={()=>{setSlied(1);setNumpercard(16)}}  style={{backgroundColor:"rgb(228, 68, 68)"}}>
            صعب
            <br/>(4x16)
          </button>
        </div>
      </div>


      <div className="card game"  style={{left:`${slide*100}%`}}>
        <div className="inf">
          <button>
            {times} محاولة <span className="material-symbols-outlined">autorenew</span>
          </button>
          <button>
            { Math.floor(timer/60)}:{timer}
            <span className="material-symbols-outlined">timer</span>
            {/* task */}
          </button>
        </div>
        <div className="elements" style={{gridTemplateColumns:`repeat(${numpercard/2},.1fr)`}}>
          {
            cardImages.map((item)=>{
              return <div  key={item.i} onClick={()=>{handelgame(item)}}  className="el" >
                <img src={item.url} className={(item.chosen||item.free)?"ttt":""} />
              </div>
            })
          }
        </div>
      </div>

      <div className="result" style={{top:`-${result*100}%`}}>
        <div className="frame">
          <h1>احسنت!</h1>
          <div className="stars">
            <span className={'material-symbols-outlined star '+((numpercard)/times>0.5)} >
               star
            </span>
            <span className={" material-symbols-outlined "+((numpercard)/times>0.4)}>
               star
            </span>
            <span className={"material-symbols-outlined star "+((numpercard)/times>0.1)} style={{rotate:"-10deg"}}>
               star
            </span>
          </div>
          <div className="inf">
            <div className="inf-card">
              <div className="title">
                عدد المرات
              </div>
              <div>
                {times}
              </div>
            </div>
            <div className="inf-card">
              <div className="title" style={{backgroundColor:"rgb(72, 228, 80)"}}>
                وقت
              </div>
              <div>
                { Math.floor(timer/60)}:{timer}
              </div>
            </div>
          </div>
          <button onClick={()=>{reblay()}}>
            العب مرة اخرى
          </button>
          <button onClick={()=>{mainPag()}} style={{color:"black",textShadow:"none",backgroundColor:"white"}}>
            القائمة الرئيسسة
          </button>
        </div>

      </div>
    </div>

  );
}
