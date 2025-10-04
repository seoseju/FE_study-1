// var typingBool = false; 
// var typingIdx=0; 
// var liIndex = 0;
// var liLength = $(".typing-txt>ul>li").length;
// var del = -1;
// var repeatInt= null;
// var tyInt = null;


// // 타이핑될 텍스트를 가져온다 
// var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 

// typingTxt=typingTxt.split(""); // 한글자씩 자른다. 

// if(typingBool==false){ 
//   // 타이핑이 진행되지 않았다면 
//     typingBool=true; 
//     tyInt = setInterval(typing,200); // 첫번재 반복동작 
// } 
     
// function typing(){ 
//   if(typingIdx<typingTxt.length){ 
//     // 타이핑될 텍스트 길이만큼 반복 
//    $(".typing").append(typingTxt[typingIdx]); 
//     // 한글자씩 이어준다. 
//      typingIdx++; 
//     if(typingIdx == typingTxt.length){
//       //첫번째 단어가 써지면 1분쉰다.
//         clearInterval(tyInt);
//          setTimeout(function(){
//            tyInt = setInterval(typing,200);
//          },1000);
//        }
//    } else{ 
     
//      //한문장이끝나면
//        if(-typingTxt.length-1 < del ){
//          //한글자씩 지운다.
//           $(".typing").html(typingTxt.slice(0, del))
//           del--;
//        }else{
//          if(liIndex >= liLength-1){
//               liIndex=0;
//          }else{
//            liIndex++;
//          }
         
//          //변수초기화 
//          typingIdx=0;
//          del= -1;
//          typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
         
//          //1분후 다음분장 타이핑 
//          clearInterval(tyInt);
//          setTimeout(function(){
//            tyInt = setInterval(typing,200);
//          },1000);
//        }
     

//     } 
// }

$(function(){
    // 숨겨둔 원본 목록(.typing-txt)은 화면에 안 보여도 됨
    // 보여야 하면 display:none 제거
    const $items = $(".typing-txt > ul > li");
    if ($items.length === 0) return; // 아이템 없으면 종료
  
    const $out = $(".typing").first(); // 출력 타겟 (문단 중간의 <span class="typing"></span>)
    $out.text(""); // 초기화
  
    let typingBool = false;
    let typingIdx  = 0;
    let liIndex    = 0;
    let del        = -1;
    let tyInt      = null;
  
    let typingTxt  = $items.eq(liIndex).text().split(""); // 첫 문장
  
    if (!typingBool){
      typingBool = true;
      tyInt = setInterval(typing, 100);
    }
  
    function typing(){
      if (typingIdx < typingTxt.length){
        // 한 글자씩 추가
        $out.append(typingTxt[typingIdx]);
        typingIdx++;
  
        // 문장 끝까지 쓰면 잠깐 쉬었다가 삭제 단계로 전환
        if (typingIdx === typingTxt.length){
          clearInterval(tyInt);
          setTimeout(function(){
            tyInt = setInterval(erase, 100);
          }, 1000);
        }
      }
    }
  
    function erase(){
      // del: -1, -2, ..., -(len)
      if (-typingTxt.length - 1 < del){
        // 뒤에서부터 한 글자씩 지움 (slice의 음수 인덱스 활용)
        $out.html(typingTxt.slice(0, del));
        del--;
      }else{
        // 다음 문장으로 전환
        liIndex = (liIndex >= $items.length - 1) ? 0 : liIndex + 1;
  
        // 변수 초기화
        typingIdx = 0;
        del = -1;
        typingTxt = $items.eq(liIndex).text().split("");
  
        

        clearInterval(tyInt);
        setTimeout(function(){
          tyInt = setInterval(typing, 200);
        }, 1000);
      }
    }
    // typingTxt=$(".typing-txt>ul>li").eq(liIndex).text(); s
  });