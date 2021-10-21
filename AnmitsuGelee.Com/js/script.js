// タイトルロゴ アニメーション

const animationTargetElements = document.querySelectorAll('.mainTitle');
for(let i = 0; i < animationTargetElements.length; i++){
  const targetElement = animationTargetElements[i];
        texts = targetElement.textContent,
        textsArray = [];

  targetElement.textContent = "";
  
  for(let j = 0; j < texts.split('').length; j++){
    if(texts.split('')[j] === " "){
      textsArray.push('');
    } else {
      textsArray.push('<span><span style="animation-delay: ' + (j * .1) + 's;">' + texts.split('')[j] + '</span></span>');
    }
  }

  for(let k = 0; k < textsArray.length; k++){
    targetElement.innerHTML += textsArray[k];
  }
}


// 動く丸のやつ

document.querySelectorAll('main > section').forEach(element => {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  element.appendChild(circle)
});

const subTitle = new Rellax('.subTitle',{
  speed:-3,
  center:true,
})

const image = new Rellax('.image img',{
  speed:-3,
  center:true,
})

const circle = new Rellax('.circle',{
  center:true,
  speed:2,
})

const header = new Rellax('header',{
  speed:-10,
})

